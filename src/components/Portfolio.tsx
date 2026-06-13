import { Mail, Sun, Moon, Copy, ArrowUp, Check } from "lucide-react";
import { useEffect, useState } from "react";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const mono = "'JetBrains Mono', 'Consolas', ui-monospace, monospace";
const script = "'Monsieur La Doulaise', cursive";
const sans = "'Geist', 'Inter', ui-sans-serif, system-ui, sans-serif";

type Project = {
  name: string;
  description: string;
  stack: string;
  contribution: string;
  source?: string;
  live?: string;
};

const projects: Project[] = [
  {
    name: "Insighta Labs+ API",
    description:
      "A Flask REST API that classifies names by predicted gender, age, and nationality using external APIs. Features GitHub OAuth with PKCE, Redis-backed caching and rate limiting, natural language search, CSV bulk ingestion via Polars streaming, and a dashboard with aggregate statistics.",
    stack: "Python, Flask, SQLAlchemy, PostgreSQL, Redis, Polars, GitHub Actions, Vercel",
    contribution:
      "Sole developer. Built the full API from scratch — OAuth with PKCE flow, JWT auth with one-time-use refresh tokens, Redis response caching with SHA-256 keys, natural language search with query normalization, streaming CSV ingestion (50k-row batches via Polars), role-based access control, and six database indexes for optimized query patterns.",
    source: "https://github.com/kaosi-anikwe/hng-14",
  },
  {
    name: "Retry Engine",
    description:
      "An HTTP retry service that queues failed outbound API requests and retries them with exponential backoff and jitter. Built for scenarios where backends call external services that occasionally fail — payment gateways, SMS providers, banks.",
    stack: "Python, FastAPI, SQLite (WAL mode), httpx, Pydantic, asyncio",
    contribution:
      "Sole developer. Designed the state machine (pending → retrying → completed/failed), built the async background worker with a 500ms polling loop, implemented exponential backoff with jitter (0.8–1.2x range), per-attempt audit logging in a separate table, and immediate 4xx failure (non-retryable client errors).",
    source: "https://github.com/kaosi-anikwe/retry-engine",
  },
  {
    name: "Social Badge API",
    description:
      "A collaborative platform where event organisers create and share customizable digital badges for hackathons, conferences, and meetups. Full async stack with PostgreSQL, Redis-backed job queues, and Cloudinary media storage.",
    stack: "Python, FastAPI, SQLAlchemy 2.0, PostgreSQL, Redis, arq, Cloudinary, Alembic",
    contribution:
      "Built the badge generation pipeline with validation logic and Redis dependency management. Implemented badge analytics (share/creation counters with failure logging), the newsletter subscribe/unsubscribe system, profile photo removal endpoint, platform template listing with category filtering and pagination, admin token validation, and refresh token metadata tests.",
    source: "https://github.com/kaosi-anikwe/social-badge-api",
  },
];

type Skill = {
  name: string;
  project: string;
};

const skills: Skill[] = [
  { name: "API Design", project: "All three projects — REST endpoints with versioning, pagination, filtering" },
  { name: "Authentication", project: "Insighta Labs+ (GitHub OAuth + PKCE, JWT with refresh rotation), Social Badge (JWT + bcrypt)" },
  { name: "Databases", project: "Insighta Labs+ (PostgreSQL, 6 custom indexes), Retry Engine (SQLite WAL), Social Badge (PostgreSQL + Alembic migrations)" },
  { name: "Caching", project: "Insighta Labs+ (Redis response cache with SHA-256 keys, cached COUNT queries), Social Badge (Redis)" },
  { name: "Background Jobs", project: "Retry Engine (async polling worker), Social Badge (arq Redis-backed job queue)" },
  { name: "Testing", project: "Social Badge (pytest + pytest-asyncio + fakeredis), Retry Engine (integration test suite with mock server)" },
  { name: "Deployment", project: "Insighta Labs+ (Vercel serverless), all projects (GitHub Actions CI)" },
  { name: "Rate Limiting", project: "Insighta Labs+ (Flask-Limiter + Redis, per-identity limits), Social Badge (slowapi)" },
  { name: "Data Ingestion", project: "Insighta Labs+ (streaming CSV upload — 500k rows via Polars, 50k-row batch INSERTs with per-batch rollback)" },
];

function SocialIcon({
  children,
  href,
  label,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      aria-label={label}
      className="opacity-40 hover:opacity-100 transition-opacity duration-200"
    >
      {children}
    </a>
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const email = "anikwehenryasa@gmail.com";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const raw = max > 0 ? window.scrollY / max : 0;
      const start = 0.7;
      const linear = Math.max(0, Math.min(1, (raw - start) / (1 - start)));
      // cubic ease-in-out for a slower, gentler ramp
      const eased = linear < 0.5
        ? 4 * linear * linear * linear
        : 1 - Math.pow(-2 * linear + 2, 3) / 2;
      setScrollProgress(eased);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCopy = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const bg = dark ? "bg-black text-white" : "bg-white text-black";
  const border = dark ? "border-white/10" : "border-black/10";
  const borderStrong = dark ? "border-white" : "border-black";
  const muted = dark ? "text-white/50" : "text-black/50";
  const tag = dark
    ? "bg-white/5 text-white/70 border-white/10"
    : "bg-black/5 text-black/70 border-black/10";

  return (
    <div
      className={`relative min-h-screen w-full ${bg} transition-colors duration-300`}
      style={{ fontFamily: sans }}
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 h-[70vh] z-0 transition-opacity duration-300"
        style={{
          opacity: scrollProgress,
          background: dark
            ? "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(120,20,55,0.85) 0%, rgba(80,10,40,0.55) 30%, rgba(40,5,20,0.25) 60%, rgba(0,0,0,0) 100%)"
            : "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(255,200,215,0.7) 0%, rgba(255,220,225,0.4) 40%, rgba(255,255,255,0) 100%)",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-160 px-8">
        {/* PROFILE */}
        <section className="pt-28 pb-12">
          <div className="flex items-center justify-between">
            <h1
              style={{ fontFamily: script, letterSpacing: "-1.2px" }}
              className="text-[48px] leading-12"
            >
              Kaosi Anikwe
            </h1>
            <button
              onClick={(e) => {
                const rect = (
                  e.currentTarget as HTMLElement
                ).getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                const r = Math.hypot(
                  Math.max(x, window.innerWidth - x),
                  Math.max(y, window.innerHeight - y)
                );
                const root = document.documentElement;
                root.style.setProperty("--toggle-x", `${x}px`);
                root.style.setProperty("--toggle-y", `${y}px`);
                root.style.setProperty("--toggle-r", `${r}px`);
                // @ts-ignore
                if (document.startViewTransition) {
                  root.classList.add("theme-toggle-circle");
                  // @ts-ignore
                  const t = document.startViewTransition(() =>
                    setDark((d) => !d)
                  );
                  t.finished.finally(() =>
                    root.classList.remove("theme-toggle-circle")
                  );
                } else {
                  setDark((d) => !d);
                }
              }}
              aria-label="Toggle theme"
              className="opacity-40 hover:opacity-100 transition-opacity duration-200 p-1"
            >
              {dark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>

          <p
            className={`mt-2 text-[14px] leading-5 ${muted}`}
            style={{ fontFamily: mono, letterSpacing: "0.5px" }}
          >
            Backend Developer · WAT (UTC+1)
          </p>

          <p
            className="opacity-60 mt-6 text-[17px] leading-[27.625px]"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
          >
            Backend engineer focused on building reliable APIs, async systems,
            and data pipelines in Python. I care about clean architecture,
            honest error handling, and systems that work under real load — not
            just in demos.
          </p>

          <div className="flex gap-6 items-center pt-8">
            <SocialIcon href="https://github.com/kaosi-anikwe" label="GitHub">
              <GithubIcon size={16} />
            </SocialIcon>
            <SocialIcon
              href="https://www.linkedin.com/in/kaosi-anikwe/"
              label="LinkedIn"
            >
              <LinkedinIcon size={16} />
            </SocialIcon>
            <SocialIcon href={`mailto:${email}`} label="Email">
              <Mail size={16} />
            </SocialIcon>
            <a
              href="/blog"
              className="opacity-40 hover:opacity-100 transition-opacity text-[10px] uppercase"
              style={{ letterSpacing: "1px", fontFamily: mono }}
            >
              Writing
            </a>
          </div>
        </section>

        {/* HNG PROJECTS */}
        <section className={`border-t ${border} pt-12 pb-12`}>
          <h2
            className="text-[24px] leading-8"
            style={{ fontWeight: 500, letterSpacing: "-0.6px" }}
          >
            HNG Projects
          </h2>
          <div className="pt-10 flex flex-col gap-12">
            {projects.map((p) => (
              <div key={p.name}>
                <div className="flex items-start justify-between">
                  <h3
                    className="text-[18px] leading-7"
                    style={{ fontWeight: 500 }}
                  >
                    {p.name}
                  </h3>
                </div>
                <p
                  className="opacity-60 text-[14px] leading-[22.75px] pt-2"
                  style={{ fontWeight: 300 }}
                >
                  {p.description}
                </p>
                <p
                  className={`text-[12px] leading-4.5 pt-3 ${muted}`}
                  style={{ fontFamily: mono }}
                >
                  {p.stack}
                </p>
                <button
                  onClick={() =>
                    setExpandedProject(
                      expandedProject === p.name ? null : p.name
                    )
                  }
                  className="opacity-40 hover:opacity-100 transition-opacity text-[10px] uppercase mt-3"
                  style={{ letterSpacing: "1px" }}
                >
                  {expandedProject === p.name
                    ? "Hide details"
                    : "What I built"}
                </button>
                {expandedProject === p.name && (
                  <p
                    className="opacity-50 text-[13px] leading-5.25 pt-3 pl-3"
                    style={{
                      fontWeight: 300,
                      borderLeft: `2px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`,
                    }}
                  >
                    {p.contribution}
                  </p>
                )}
                <div className="flex gap-6 items-center pt-3">
                  {p.source && (
                    <a
                      href={p.source}
                      className="opacity-40 hover:opacity-100 transition-opacity text-[10px] uppercase"
                      style={{ letterSpacing: "1px" }}
                    >
                      Source
                    </a>
                  )}
                  {p.live && (
                    <a
                      href={p.live}
                      className="opacity-40 hover:opacity-100 transition-opacity text-[10px] uppercase"
                      style={{ letterSpacing: "1px" }}
                    >
                      Live
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BACKEND SKILLS */}
        <section className={`border-t ${border} pt-12 pb-12`}>
          <h2
            className="text-[24px] leading-8"
            style={{ fontWeight: 500, letterSpacing: "-0.6px" }}
          >
            Backend Skills
          </h2>
          <div className="pt-8 flex flex-col gap-5">
            {skills.map((s) => (
              <div key={s.name}>
                <h3
                  className="text-[14px] leading-5"
                  style={{ fontWeight: 500 }}
                >
                  {s.name}
                </h3>
                <p
                  className={`text-[12px] leading-4.5 pt-1 ${muted}`}
                  style={{ fontWeight: 300 }}
                >
                  {s.project}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED PROJECT DEEP DIVE */}
        <section className={`border-t ${border} pt-12 pb-12`}>
          <h2
            className="text-[24px] leading-8"
            style={{ fontWeight: 500, letterSpacing: "-0.6px" }}
          >
            Deep Dive: Retry Engine
          </h2>

          <div className="pt-8 flex flex-col gap-8">
            <div>
              <h3
                className="text-[14px] leading-5 uppercase"
                style={{
                  fontWeight: 500,
                  fontFamily: mono,
                  letterSpacing: "1px",
                }}
              >
                Problem
              </h3>
              <p
                className="opacity-60 text-[14px] leading-[22.75px] pt-2"
                style={{ fontWeight: 300 }}
              >
                When a backend calls external services — payment gateways, SMS
                providers, bank APIs — those calls sometimes fail due to
                transient network issues or rate limits. Without a retry
                mechanism, those failures are silently lost. I needed a
                self-contained service that could queue failed requests, retry
                them intelligently, and provide full visibility into what
                happened.
              </p>
            </div>

            <div>
              <h3
                className="text-[14px] leading-5 uppercase"
                style={{
                  fontWeight: 500,
                  fontFamily: mono,
                  letterSpacing: "1px",
                }}
              >
                Architecture
              </h3>
              <p
                className="opacity-60 text-[14px] leading-[22.75px] pt-2"
                style={{ fontWeight: 300 }}
              >
                Client submits a request via POST /request. FastAPI stores it in
                SQLite and returns immediately with a pending status. A
                background async worker polls every 500ms for due retries,
                executes the HTTP call via httpx, and transitions the request
                through a state machine: pending → retrying → completed or
                failed. SQLite runs in WAL mode for safe concurrent reads and
                writes. No external message broker — the worker is an in-process
                asyncio task, keeping the system zero-dependency.
              </p>
            </div>

            <div>
              <h3
                className="text-[14px] leading-5 uppercase"
                style={{
                  fontWeight: 500,
                  fontFamily: mono,
                  letterSpacing: "1px",
                }}
              >
                Key Endpoints
              </h3>
              <div className="pt-3 flex flex-col gap-2">
                {[
                  [
                    "POST /request",
                    "Submit a request for retry. Returns {id, status: pending} immediately.",
                  ],
                  [
                    "GET /requests/{id}",
                    "Fetch a single request with full attempt history.",
                  ],
                  [
                    "GET /requests?status=",
                    "List requests filtered by status (pending, retrying, completed, failed).",
                  ],
                ].map(([endpoint, desc]) => (
                  <div key={endpoint} className="flex gap-3 items-start">
                    <code
                      className={`text-[11px] leading-4.5 whitespace-nowrap px-1.5 py-0.5 rounded border ${tag}`}
                      style={{ fontFamily: mono }}
                    >
                      {endpoint}
                    </code>
                    <span
                      className="opacity-50 text-[12px] leading-4.5"
                      style={{ fontWeight: 300 }}
                    >
                      {desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3
                className="text-[14px] leading-5 uppercase"
                style={{
                  fontWeight: 500,
                  fontFamily: mono,
                  letterSpacing: "1px",
                }}
              >
                Challenge Solved
              </h3>
              <p
                className="opacity-60 text-[14px] leading-[22.75px] pt-2"
                style={{ fontWeight: 300 }}
              >
                The main challenge was preventing thundering herd — when many
                failed requests share the same backoff schedule, they all retry
                at the same instant and overwhelm the target service again. I
                solved this with jitter: each retry delay is multiplied by a
                random factor between 0.8 and 1.2, spreading retries across a
                window instead of a single point. Combined with the exponential
                backoff formula (baseDelay × 2^attempt), this keeps retry
                pressure smooth even under burst failures. I also made 4xx
                responses fail immediately — client errors won't self-correct on
                retry, so burning through attempts on a 400 is wasteful.
              </p>
            </div>
          </div>
        </section>

        {/* LEARNING REFLECTION */}
        <section className={`border-t ${border} pt-12 pb-12`}>
          <h2
            className="text-[24px] leading-8"
            style={{ fontWeight: 500, letterSpacing: "-0.6px" }}
          >
            What I Learned
          </h2>
          <p
            className="opacity-60 text-[14px] leading-[22.75px] pt-6"
            style={{ fontWeight: 300 }}
          >
            Before HNG, I understood how to build APIs. During HNG, I learned
            how to build APIs that hold up. The Insighta Labs+ project forced me
            to think about caching not as an optimization but as a requirement —
            without Redis response caching and query normalization, the same
            search hit the database dozens of times per minute. I learned to
            bypass the ORM for list endpoints because hydrating 50 objects per
            page was measurably slower than raw mappings.
          </p>
          <p
            className="opacity-60 text-[14px] leading-[22.75px] pt-4"
            style={{ fontWeight: 300 }}
          >
            The retry engine taught me async discipline — managing background
            tasks that outlive individual requests, handling graceful shutdown,
            and writing state machines where every transition is explicit.
            Working on Social Badge as part of a team was a different kind of
            challenge: reading other people's code, writing tests against
            existing schemas, and shipping features that don't break what's
            already there.
          </p>
          <p
            className="opacity-60 text-[14px] leading-[22.75px] pt-4"
            style={{ fontWeight: 300 }}
          >
            The biggest shift was in how I think about failure. I used to write
            code for the happy path and handle errors as an afterthought. Now I
            design for the failure case first — what happens when Redis is down,
            when a CSV has 500k malformed rows, when a token gets replayed.
            That's the change I'm keeping.
          </p>
        </section>

        {/* CONTACT */}
        <section className="pt-20 pb-10">
          <div className="flex flex-col items-center">
            <h2
              className="text-[60px] leading-15 text-center bg-clip-text text-transparent"
              style={{
                fontWeight: 500,
                letterSpacing: "-3px",
                backgroundImage: dark
                  ? "linear-gradient(to bottom, rgba(255,255,255,0.4), #ffffff)"
                  : "linear-gradient(to bottom, rgba(0,0,0,0.4), #000000)",
              }}
            >
              Get in touch.
            </h2>
            <p
              className="text-[18px] leading-7 text-center pt-4 max-w-[384px]"
              style={{ fontWeight: 300 }}
            >
              Open to backend roles and collaborative projects.
            </p>
            <button
              onClick={handleCopy}
              className={`mt-12 flex items-center gap-4 pb-2.5 border-b-2 ${borderStrong} w-full max-w-101 justify-center`}
            >
              <span
                className="text-[20px] leading-8 text-center"
                style={{ fontWeight: 500 }}
              >
                {email}
              </span>
              {copied ? (
                <Check size={20} />
              ) : (
                <Copy size={20} className="opacity-40" />
              )}
            </button>
            <div className="flex gap-8 items-center pt-6">
              <a
                href="https://github.com/kaosi-anikwe"
                className="opacity-40 hover:opacity-100 transition-opacity text-[10px] uppercase"
                style={{ letterSpacing: "1px" }}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/kaosi-anikwe/"
                className="opacity-40 hover:opacity-100 transition-opacity text-[10px] uppercase"
                style={{ letterSpacing: "1px" }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          className={`border-t ${border} pt-10 pb-10 flex items-center justify-between`}
        >
          <p
            className="text-[10px] uppercase leading-3.75"
            style={{ fontWeight: 500, letterSpacing: "1px" }}
          >
            © 2026 Kaosi Anikwe.
            <br />
            All Rights Reserved.
          </p>
          <button onClick={scrollTop} className="flex gap-3 items-center group">
            <span
              className="text-[10px] uppercase"
              style={{ fontWeight: 500, letterSpacing: "1px" }}
            >
              Back to Top
            </span>
            <span
              className={`rounded-full size-7 border ${borderStrong} flex items-center justify-center group-hover:-translate-y-0.5 transition-transform`}
            >
              <ArrowUp size={14} />
            </span>
          </button>
        </footer>
      </div>
    </div>
  );
}
