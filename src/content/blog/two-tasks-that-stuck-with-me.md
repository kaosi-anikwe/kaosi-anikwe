---
title: "Two Tasks That Stuck With Me"
description: "Reflections from the HNG Internship — how a streaming CSV pipeline changed how I think about scale, and how a one-line migration broke staging right before a presentation."
pubDate: 2026-06-13
tags: ["python", "backend", "hng", "internship", "postgresql"]
---

*Reflections from the HNG Internship — Written at Stage 9*

---

I'm at Stage 9 of the HNG internship. When I look back at what I've built, reviewed, broken, and fixed over the past months, two moments stand out — not because they went smoothly, but because they didn't.

One changed how I think about system design. The other humbled me in front of my whole team the week before a presentation.

---

## Task One: Building a CSV Ingestion Pipeline at Scale (Stage 4B)

### What it was

Stage 4B was the implementation follow-up to Stage 4A's design work. The system — Insighta Labs+ — had grown to over a million records, handling hundreds to thousands of queries per minute. The task was to make it *perform* under that pressure, across three areas: query optimization, query normalization, and data ingestion.

The ingestion requirement was what stood out to me: users needed to upload CSV files of up to 500,000 rows of profile data.

### The problem it was solving

At scale, uploads are genuinely hard in a way that isn't obvious until you've run into it. You can't read the whole file into memory — at 500k rows, that gets expensive fast. You can't insert records one at a time — it's too slow and hammers the database. You can't let an upload block query performance for other users, because the system was already read-heavy and under load.

The spec was clear about expectations: stream the file, don't load it all at once, don't insert row by row, support concurrent uploads, and handle bad rows gracefully. One malformed row should never abort the entire job. If the process dies halfway through, every row already inserted stays — no rollback. At the end, report a full summary: how many rows were processed, how many were inserted, how many were skipped, and why.

### How I approached it

My first instinct was the standard approach — write the uploaded file to disk, open it, iterate through it line by line, validate, insert. Familiar. But the constraints killed that almost immediately.

I chose to use **Polars**, a high-performance DataFrame library, to process the file in batches. The core idea: instead of validating each row in a Python loop, load a chunk of rows into a Polars DataFrame and apply all validation rules across the whole batch at once. Polars does this with vectorized operations — filtering 5,000 rows for invalid ages or missing fields is essentially one operation, not 5,000.

The pipeline looked like this: receive the file from the Flask request as a stream, read it in chunks without touching disk, load each chunk into a DataFrame, apply validation across the batch, filter out bad rows while logging the failure reasons, bulk-insert the valid rows, and move to the next chunk. Repeat until the file is exhausted, then return the summary.

### What broke

Getting the uploaded file as a usable stream — without writing it to disk — was harder than it looked.

Flask's file upload gives you a `FileStorage` object. Polars' `read_csv` can accept a file-like object. In theory, these two things should connect easily. In practice, I kept passing Polars something that looked like a stream but wasn't in quite the form it expected. It kept failing in ways that weren't immediately obvious from the error messages.

I burned more time than I want to admit before I did what I should have done first: actually read the documentation. Flask's `FileStorage` has a `.stream` attribute that gives you the raw byte stream. Once I understood exactly what Polars needed and what Flask was providing, the fix was a few lines. But getting there took a while.

### What I took away

The conventional pattern for file uploads is: write to disk, then read. The conventional pattern for CSV validation is: loop through every row. Both of those work fine at small scale. At 500,000 rows, they become the bottleneck.

What this task made concrete for me is that scale doesn't just change the numbers — it changes the problem. The task was still "validate and insert CSV data," but the approach had to be genuinely different. Polars, streaming, batched processing — none of this was exotic or over-engineered. It was just what the constraints actually required.

I also learned to read the documentation before I guess. Every hour I spent experimenting without reading was an hour I could've spent solving the real problem.

This task changed the way I think about system design. I now ask myself earlier: what does this look like at 10x? What assumption am I making that breaks when volume goes up?

### Why I picked it

Because I hadn't done anything like it before. And because I came out of it thinking differently about a class of problems I thought I already understood.

---

## Task Two: The One-Line Change That Broke Staging (PR #113 → PR #117)

### What it was

A frontend team member reached out asking me to update an enum value. The system used a `NotificationType` Python `StrEnum`, with a member `BADGE_CREATION` whose value was the string `"badge_creation"`. The design spec called for it to be `"badge_alert"`. The notification title in `badge.py` also needed updating — from the generic `"New badge created"` to something more descriptive for organisers.

### The problem it was solving

Nothing architectural. The system just needed to match the spec. Clearer wording for organisers when a participant creates a badge. A cosmetic change, really — the kind of thing you can do with your eyes closed.

### How I approached it

I changed the string. Updated the value in `notifications.py`. Updated the title in `badge.py`. Ran `alembic revision --autogenerate` to generate the database migration. Pushed.

I did not test locally.

### What broke

The migration failed in staging.

Here is what happened: when Alembic auto-generated the migration, it produced SQL that referenced `'badge_creation'` — lowercase — in the `WHERE` clause used to update existing rows in the database.

The issue is that PostgreSQL doesn't store enum labels the way Python represents them. The original migration that created the `notification_type` enum had written the labels as raw uppercase strings — `BADGE_CREATION`, `DAILY_DIGEST`, `WEEKLY_REPORT`. That's what actually lived in the database. Alembic's auto-generator looked at the Python `StrEnum` value (`"badge_creation"`, lowercase) and used that instead. PostgreSQL had never heard of `"badge_creation"`. It only knew `BADGE_CREATION`.

The error that came back was unambiguous in hindsight:

```
InvalidTextRepresentationError: invalid input value for enum notification_type: "badge_creation"
```

The migration ran, hit that line, and stopped. In staging. The week we were preparing for a presentation.

### How I fixed it

PR #117 corrected the `WHERE` clauses in both the `upgrade()` and `downgrade()` functions to reference the actual PostgreSQL enum label — `'BADGE_CREATION'` — instead of the Python value. Once that was in, the migration ran cleanly, updated the existing rows correctly, and the enum moved from `BADGE_CREATION` to `badge_alert` as intended.

The fix was about five lines. What it cost the team in timeline was considerably more than five lines.

### What I took away

Code quality trumps speed. This is a thing people say, and I'd nodded along to it before. I understand it now.

I moved fast because the change seemed trivial. The code change itself *was* trivial. What wasn't trivial was the mismatch between how Python represents an enum value and how PostgreSQL actually stores it — a distinction I knew existed in theory and didn't verify in practice. I assumed the auto-generated migration was correct. I didn't check. That assumption cost my team.

Test locally. Always. When you're touching a database migration on a system with existing data, you are not operating in isolation. Verify that it works before it reaches an environment other people depend on.

The other thing: I'm not used to working in teams. I'm used to my mistakes affecting me. Having to own up to the fact that my carelessness held up other people — right before a presentation we'd been building toward — was uncomfortable in a way I hadn't felt before in this internship. Feeling bad about it didn't help anyone. Fixing it, being accountable, and making sure it doesn't happen again — that's what mattered.

### Why I picked it

Because I felt the weight of it. Because "I didn't test it" is a lesson that only lands when you've lived through the cost of it. And because learning to take responsibility in a team setting, not just technically but personally, was something new for me.

---

## Closing

Two very different tasks. One stretched my thinking about what performance actually means when volume goes up. The other showed me what it costs when you move fast without thinking carefully.

Stage 9 now. Both of these are still sitting with me.
