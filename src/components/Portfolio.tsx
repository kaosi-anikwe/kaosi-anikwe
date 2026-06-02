import { FileText, Mail, Sun, Moon, Copy, ArrowUp, Check } from "lucide-react";
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
    year: string;
    description: string;
    live?: string;
    source?: string;
};

const projects: Project[] = [
    {
        name: "PassVault",
        year: "2025",
        description: "Secure & Zero Knowledge Architecture based password manager.",
        live: "#",
        source: "#",
    },
    {
        name: "LeafLinks",
        year: "2025",
        description: "A sleek, free link in bio platform that lets you share all your important links.",
        live: "#",
        source: "#",
    },
    {
        name: "MiniLinks",
        year: "2025",
        description: "A no-nonsense URL shortener built for speed, simplicity, and privacy.",
        live: "#",
        source: "#",
    },
];

const writing = [
    { title: "Building Scalable Microservices with Node.js", date: "Jan 2026", href: "#" },
    { title: "Designing for Clarity: A Reductive Approach", date: "Dec 2025", href: "#" },
    { title: "The Future of Web Architecture", date: "Nov 2025", href: "#" },
];

const education = [
    {
        title: "B. Tech CSE(AIML)",
        sub: "Dr. A. P. J. Abdul Kalam Technical University",
        range: "2022 — 2026",
    },
    {
        title: "Highschool and Junior College",
        sub: "St. Joseph's College",
        range: "2009 — 2022",
    },
];

function SocialIcon({ children, href, label }: { children: React.ReactNode; href: string; label: string }) {
    return (
        <a
            href={href}
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
    const email = "blackhawkalpha009@gmail.com";

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    useEffect(() => {
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const raw = max > 0 ? window.scrollY / max : 0;
            const start = 0.7;
            const p = Math.max(0, Math.min(1, (raw - start) / (1 - start)));
            setScrollProgress(p);
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
            <div className="relative z-10 mx-auto w-full max-w-[512px] px-8">
                {/* HERO */}
                <section className="pt-28 pb-12">
                    <div className="flex items-center justify-between">
                        <h1
                            style={{ fontFamily: script, letterSpacing: "-1.2px" }}
                            className="text-[48px] leading-[48px]"
                        >
                            Abdul Samad
                        </h1>
                        <button
                            onClick={(e) => {
                                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
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
                                    const t = document.startViewTransition(() => setDark((d) => !d));
                                    t.finished.finally(() => root.classList.remove("theme-toggle-circle"));
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
                        className="opacity-60 mt-6 text-[17px] leading-[27.625px]"
                        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                    >
                        Exploring the intersection of human intuition and digital logic.
                        Architecting scalable systems for the next generation of the web with
                        a commitment to the philosophy of reductive design and clarity,
                        transforming complex requirements into fluid projects.
                    </p>

                    <div className="flex gap-6 items-center pt-8">
                        <SocialIcon href="#" label="GitHub"><GithubIcon size={16} /></SocialIcon>
                        <SocialIcon href="#" label="LinkedIn"><LinkedinIcon size={16} /></SocialIcon>
                        <SocialIcon href="#" label="Resume"><FileText size={16} /></SocialIcon>
                        <SocialIcon href={`mailto:${email}`} label="Email"><Mail size={16} /></SocialIcon>
                    </div>
                </section>

                {/* EDUCATION */}
                <section className={`border-t ${border} pt-8 pb-12`}>
                    <h2 className="text-[24px] leading-[32px]" style={{ fontWeight: 500, letterSpacing: "-0.6px" }}>
                        Education
                    </h2>
                    <div className="pt-8 flex flex-col gap-6">
                        {education.map((e) => (
                            <div key={e.title} className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-[14px] leading-[20px]" style={{ fontWeight: 500 }}>{e.title}</h3>
                                    <p className="opacity-50 text-[12px] leading-[16px] pt-1" style={{ fontWeight: 300 }}>{e.sub}</p>
                                </div>
                                <span
                                    className="opacity-40 text-[14px] leading-[20px] uppercase whitespace-nowrap"
                                    style={{ fontFamily: mono, letterSpacing: "1.4px" }}
                                >
                                    {e.range}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* PROJECTS */}
                <section className={`border-t ${border} pt-12 pb-12`}>
                    <h2 className="text-[24px] leading-[32px]" style={{ fontWeight: 500, letterSpacing: "-0.6px" }}>
                        Projects
                    </h2>
                    <div className="pt-10 flex flex-col gap-10">
                        {projects.map((p) => (
                            <div key={p.name}>
                                <div className="flex items-start justify-between">
                                    <h3 className="text-[18px] leading-[28px]" style={{ fontWeight: 500 }}>{p.name}</h3>
                                    <span
                                        className="opacity-40 text-[12px] leading-[16px] pt-2"
                                        style={{ fontFamily: mono }}
                                    >
                                        {p.year}
                                    </span>
                                </div>
                                <p
                                    className="opacity-60 text-[14px] leading-[22.75px] pt-2"
                                    style={{ fontWeight: 300 }}
                                >
                                    {p.description}
                                </p>
                                <div className="flex gap-6 items-center pt-3">
                                    {p.live && (
                                        <a
                                            href={p.live}
                                            className="opacity-40 hover:opacity-100 transition-opacity text-[10px] uppercase"
                                            style={{ letterSpacing: "1px" }}
                                        >
                                            Live
                                        </a>
                                    )}
                                    {p.source && (
                                        <a
                                            href={p.source}
                                            className="opacity-40 hover:opacity-100 transition-opacity text-[10px] uppercase"
                                            style={{ letterSpacing: "1px" }}
                                        >
                                            Source
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* WRITING */}
                <section className={`border-t ${border} pt-12 pb-12`}>
                    <h2 className="text-[24px] leading-[32px]" style={{ fontWeight: 500, letterSpacing: "-0.6px" }}>
                        Writing
                    </h2>
                    <div className="pt-10 flex flex-col gap-6">
                        {writing.map((w) => (
                            <a
                                key={w.title}
                                href={w.href}
                                className="group flex items-start justify-between gap-4"
                            >
                                <h3
                                    className="text-[18px] leading-[22.5px] opacity-90 group-hover:opacity-100 transition-opacity"
                                    style={{ fontWeight: 500 }}
                                >
                                    {w.title}
                                </h3>
                                <span
                                    className="opacity-40 text-[10px] uppercase whitespace-nowrap pt-2"
                                    style={{ fontFamily: mono, letterSpacing: "1px" }}
                                >
                                    {w.date}
                                </span>
                            </a>
                        ))}
                    </div>
                </section>

                {/* CONTACT */}
                <section className="pt-20 pb-10">
                    <div className="flex flex-col items-center">
                        <h2
                            className="text-[60px] leading-[60px] text-center bg-clip-text text-transparent"
                            style={{
                                fontWeight: 500,
                                letterSpacing: "-3px",
                                backgroundImage: dark
                                    ? "linear-gradient(to bottom, rgba(255,255,255,0.4), #ffffff)"
                                    : "linear-gradient(to bottom, rgba(0,0,0,0.4), #000000)",
                            }}
                        >
                            Let's build.
                        </h2>
                        <p
                            className="text-[18px] leading-[28px] text-center pt-4 max-w-[384px]"
                            style={{ fontWeight: 300 }}
                        >
                            Currently available for select freelance opportunities and
                            collaborative internal systems.
                        </p>
                        <button
                            onClick={handleCopy}
                            className={`mt-12 flex items-center gap-4 pb-2.5 border-b-2 ${borderStrong} w-full max-w-[404px] justify-center`}
                        >
                            <span className="text-[24px] leading-[32px] text-center" style={{ fontWeight: 500 }}>
                                {email}
                            </span>
                            {copied ? <Check size={20} /> : <Copy size={20} className="opacity-40" />}
                        </button>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className={`border-t ${border} pt-10 pb-10 flex items-center justify-between`}>
                    <p
                        className="text-[10px] uppercase leading-[15px]"
                        style={{ fontWeight: 500, letterSpacing: "1px" }}
                    >
                        © 2026 Abdul Samad.<br />All Rights Reserved.
                    </p>
                    <button
                        onClick={scrollTop}
                        className="flex gap-3 items-center group"
                    >
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
