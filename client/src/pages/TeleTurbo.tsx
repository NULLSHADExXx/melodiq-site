/*
  DESIGN: "Vinyl Noir" variant — TeleTurbo uses Telegram blue (#0088CC) accent.
  TeleTurbo is a HIGH-SPEED TELEGRAM FILE DOWNLOADER with parallel chunked downloads.
  Built with Go + gotd/td (pure Go Telegram client), React + TypeScript frontend, Wails v2 framework.
  Cross-platform: macOS (Apple Silicon ARM64) + Windows (x86_64).
  Features: 4-16 concurrent threads (5-10x faster), private & public channels, all media types,
  real-time progress with speed/size tracking, modern dark UI, single binary under 10MB.
  License: MIT (open source). GitHub: https://github.com/NULLSHADExXx/TeleTurbo
*/

import { useEffect, useRef } from "react";
import { DownloadButton } from "@/components/DownloadButton";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Download,
  Zap,
  Lock,
  FileVideo,
  BarChart3,
  Monitor,
  Feather,
  ArrowRight,
  Github,
  Cpu,
  Globe,
  Link2,
  Terminal,
  Layers,
  Gauge,
} from "lucide-react";
import { AppNav, AppFooter } from "@/components/AppNav";
import { FeedbackSection } from "@/components/FeedbackSection";
import { useSEO } from "@/hooks/useSEO";

const ACCENT = "#0088CC";
const ACCENT_HOVER = "#29A8E0";

const ASSETS = {
  icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/rbphDyswkXDexgoS.png",
  heroBg: "https://private-us-east-1.manuscdn.com/sessionFile/8P7TK5wMX27jvm9wWAs1vD/sandbox/RjkuLnerltAqgIgZMs6Fbo-img-1_1770588589000_na1fn_dGVsZXR1cmJvLWhlcm8.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOFA3VEs1d01YMjdqdm05d1dBczF2RC9zYW5kYm94L1Jqa3VMbmVybHRBcWdJZ1pNczZGYm8taW1nLTFfMTc3MDU4ODU4OTAwMF9uYTFmbl9kR1ZzWlhSMWNtSnZMV2hsY204LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=rjCB5b1iEwqUGu4HnQPN-RMc1LoMQiJOr70uoDRpUYbaqdu8ST~TVpixvJAxtWlXI9vn46REgOM3~DF8sjVrjZetjXd-ldB0Xc~d58zXM40mDm67zVqi03U4HiZS2uqdAOs-VpSee2k4qz26bNCkWkkga-Kx8aLf0w1JWmcxasLTWU7C5ySK46UhTl8nxENkNgD2tp4xpM~HkZJsyS~GcfY7AMNgMdF4vIR~mQFzEp5zhMR-fkB~oeX2DyhzaEj0mjJLQjb68mUftjE4qt~cr4VcSK49BT66jKWQqPlfnqMlHCTjyRpm2reYD50AoqUoMIj3e5HEWQbh~5i~Y7vJDQ__",
  screenshot: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/dkCcwzOLlMgRUugX.png",
  dmgDownload: "https://github.com/NULLSHADExXx/TeleTurbo/releases/download/v1.0.0/TeleTurbo.dmg",
  github: "https://github.com/NULLSHADExXx/TeleTurbo",
};

/* ─── Fade-in on scroll wrapper ─── */
function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionNum({ num }: { num: string }) {
  return (
    <span className="font-serif text-[clamp(4rem,8vw,7rem)] font-bold leading-none text-white/[0.04] select-none absolute -top-6 -left-2 lg:-left-8">
      {num}
    </span>
  );
}

/* ─── Hero ─── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-end pb-20 lg:pb-28 pt-24 lg:pt-32 overflow-hidden grain-overlay">
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img src={ASSETS.heroBg} alt="TeleTurbo hero background" className="w-full h-[120%] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/60 to-transparent" />
      </motion.div>

      <motion.div className="container relative z-10" style={{ opacity }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <img src={ASSETS.icon} alt="TeleTurbo icon" className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl shadow-2xl" />
              <div>
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-white/40 mb-1">Independent &amp; Open Source</p>
              </div>
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-white mb-6">
              Download faster.<br />
              <span className="text-white/30">From any channel.</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/50 leading-relaxed max-w-xl mb-10">
              High-speed Telegram file downloader with parallel chunked downloads. 4–16 concurrent threads saturate your bandwidth for 5–10x faster downloads from any private or public channel.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <DownloadButton
                url={ASSETS.dmgDownload}
                filename="TeleTurbo.dmg"
                className="inline-flex items-center gap-3 px-7 py-3.5 text-white font-semibold rounded-full transition-all duration-300 active:scale-95 shadow-lg text-base cursor-pointer"
                style={{ backgroundColor: ACCENT, boxShadow: `0 10px 30px ${ACCENT}30` }}
              >
                <Download className="w-5 h-5" />
                Download for Mac
              </DownloadButton>
              <a
                href={ASSETS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-white/60 font-semibold rounded-full border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] hover:text-white/80 transition-all duration-300 active:scale-95 text-base"
              >
                <Github className="w-5 h-5" />
                Source Code
              </a>
            </div>
            <p className="text-sm text-white/25 font-mono mt-4">macOS &middot; Windows &middot; Go + Wails v2</p>
          </motion.div>

          {/* Right: Screenshot */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <div className="relative rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/60">
              <img
                src={ASSETS.screenshot}
                alt="TeleTurbo app showing active downloads with parallel connections"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 border border-white/[0.06] rounded-xl pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── How It Works — Sequential vs Parallel ─── */
function HowItWorks() {
  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-[#0A1020] via-[#0A0A0B] to-[#0A0A0B]" />
        <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-[#0088CC]/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="01" />
            <p className="text-sm font-mono uppercase tracking-[0.25em] mb-4" style={{ color: ACCENT }}>
              How It Works
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-2xl">
              Parallel downloads,<br />
              <span className="text-white/30">not sequential waits.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Sequential (slow) */}
          <FadeIn delay={0.1}>
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <h3 className="text-lg font-semibold text-white/60">Regular Telegram Client</h3>
              </div>
              <div className="font-mono text-sm text-white/30 space-y-2 bg-black/30 rounded-lg p-5">
                <p className="text-white/50">Part 1 <span className="text-red-400/60">→ Wait →</span> Part 2 <span className="text-red-400/60">→ Wait →</span> Part 3 <span className="text-red-400/60">→ Wait...</span></p>
                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <p className="text-xs text-white/20">Sequential download — one part at a time</p>
                  <div className="mt-2 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                    <div className="h-full rounded-full bg-red-500/40 w-[20%]" />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Parallel (fast) */}
          <FadeIn delay={0.2}>
            <div className="p-8 rounded-2xl border" style={{ backgroundColor: `${ACCENT}06`, borderColor: `${ACCENT}20` }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ACCENT }} />
                <h3 className="text-lg font-semibold text-white/80">TeleTurbo</h3>
              </div>
              <div className="font-mono text-sm space-y-2 bg-black/30 rounded-lg p-5">
                <div className="space-y-1.5">
                  <p><span className="text-white/40">Thread 1 →</span> <span style={{ color: ACCENT }}>Part 1</span> <span className="text-white/20">┐</span></p>
                  <p><span className="text-white/40">Thread 2 →</span> <span style={{ color: ACCENT }}>Part 2</span> <span className="text-white/20">│ simultaneous</span></p>
                  <p><span className="text-white/40">Thread 3 →</span> <span style={{ color: ACCENT }}>Part 3</span> <span className="text-white/20">│</span></p>
                  <p><span className="text-white/40">Thread 4 →</span> <span style={{ color: ACCENT }}>Part 4</span> <span className="text-white/20">┘</span></p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <p className="text-xs text-white/20">Parallel download — 4-16 threads at once</p>
                  <div className="mt-2 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                    <div className="h-full rounded-full w-[85%]" style={{ backgroundColor: ACCENT }} />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Speed callout */}
        <FadeIn delay={0.3} className="mt-12">
          <div className="flex items-center justify-center gap-6 py-6 px-8 rounded-xl bg-white/[0.02] border border-white/[0.06] max-w-lg mx-auto">
            <Gauge className="w-8 h-8 flex-shrink-0" style={{ color: ACCENT }} />
            <div>
              <p className="text-2xl font-serif font-bold text-white">5–10x Faster</p>
              <p className="text-sm text-white/40">Than standard Telegram clients</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Features ─── */
function Features() {
  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Parallel Downloads",
      desc: "4–16 concurrent threads to saturate your bandwidth. Configurable thread count — defaults to your CPU core count.",
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Private & Public Channels",
      desc: "Download from any Telegram channel you're a member of. Works with both private (invite-only) and public channels.",
    },
    {
      icon: <FileVideo className="w-5 h-5" />,
      title: "All Media Types",
      desc: "Videos, documents, photos, audio — anything Telegram can send. No file type restrictions.",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Real-Time Progress",
      desc: "Live progress bar, download speed (KB/s), and file size tracking for every active download.",
    },
    {
      icon: <Monitor className="w-5 h-5" />,
      title: "Modern Dark UI",
      desc: "Clean, dark interface built with React. Shows active downloads, thread/core count, and supported link formats at a glance.",
    },
    {
      icon: <Feather className="w-5 h-5" />,
      title: "Lightweight",
      desc: "Single binary, no dependencies, under 10MB. Just download and run — nothing else to install.",
    },
  ];

  return (
    <section id="features" className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-bl from-[#0A0A0B] via-[#0A0A0B] to-[#0A1020]" />
        <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-[#0088CC]/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="02" />
            <p className="text-sm font-mono uppercase tracking-[0.25em] mb-4" style={{ color: ACCENT }}>
              Features
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-2xl">
              Everything you need.<br />
              <span className="text-white/30">Nothing you don't.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.08}>
              <div className="group p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#0088CC]/20 hover:bg-[#0088CC]/[0.03] transition-all duration-500 h-full">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-colors duration-500"
                  style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}
                >
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-white/80 mb-2">{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Screenshot Section (mobile-visible) ─── */
function ScreenshotSection() {
  return (
    <section className="lg:hidden py-16">
      <div className="container">
        <FadeIn>
          <div className="rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/60">
            <img
              src={ASSETS.screenshot}
              alt="TeleTurbo app showing active downloads with parallel connections"
              className="w-full h-auto"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Quick Start ─── */
function QuickStart() {
  const steps = [
    {
      num: "1",
      title: "Get Telegram API Credentials",
      desc: (
        <>
          Go to{" "}
          <a href="https://my.telegram.org" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: ACCENT }}>
            my.telegram.org
          </a>{" "}
          → Log in → "API development tools" → Create app → Copy your <strong className="text-white/70">App ID</strong> and <strong className="text-white/70">App Hash</strong>.
        </>
      ),
    },
    {
      num: "2",
      title: "Launch TeleTurbo",
      desc: "Open the app and enter your API credentials (App ID and App Hash).",
    },
    {
      num: "3",
      title: "Authenticate",
      desc: "Enter your phone number, then the OTP code sent to your Telegram app.",
    },
    {
      num: "4",
      title: "Paste & Download",
      desc: "Paste any Telegram file link and hit Download. Watch your files arrive at maximum speed.",
    },
  ];

  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-tr from-[#0A1020] via-[#0A0A0B] to-[#0A0A0B]" />
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="03" />
            <p className="text-sm font-mono uppercase tracking-[0.25em] mb-4" style={{ color: ACCENT }}>
              Quick Start
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-2xl">
              Four steps to<br />
              <span className="text-white/30">maximum speed.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.1}>
              <div className="group flex gap-5 p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#0088CC]/20 transition-all duration-500">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ backgroundColor: `${ACCENT}20`, color: ACCENT }}
                >
                  {s.num}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white/80 mb-2">{s.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Supported Links ─── */
function SupportedLinks() {
  const links = [
    { format: "https://t.me/c/1234567890/123", label: "Private channel" },
    { format: "https://t.me/channelname/123", label: "Public channel" },
    { format: "t.me/c/1234567890/123", label: "Short format" },
  ];

  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-bl from-[#0A0A0B] via-[#0A0A0B] to-[#0A1020]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-[#0088CC]/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="04" />
            <p className="text-sm font-mono uppercase tracking-[0.25em] mb-4" style={{ color: ACCENT }}>
              Supported Links
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-2xl">
              Any Telegram link.<br />
              <span className="text-white/30">Private or public.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="space-y-4 max-w-2xl">
          {links.map((l, i) => (
            <FadeIn key={l.format} delay={i * 0.1}>
              <div className="flex items-center justify-between p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <Link2 className="w-4 h-4 flex-shrink-0" style={{ color: ACCENT }} />
                  <code className="text-sm font-mono text-white/60">{l.format}</code>
                </div>
                <span className="text-xs text-white/30 font-mono ml-4 flex-shrink-0">({l.label})</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Tech Stack ─── */
function TechStack() {
  const stack = [
    {
      icon: <Terminal className="w-5 h-5" />,
      name: "Backend",
      tech: "Go + gotd/td",
      desc: "Pure Go Telegram client — no Python, no Telethon, no external dependencies.",
    },
    {
      icon: <Monitor className="w-5 h-5" />,
      name: "Frontend",
      tech: "React + TypeScript",
      desc: "Modern reactive UI with real-time download progress and status updates.",
    },
    {
      icon: <Layers className="w-5 h-5" />,
      name: "Framework",
      tech: "Wails v2",
      desc: "Go + WebView — native desktop app with web technologies. No Electron bloat.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      name: "Downloader",
      tech: "gotd parallel chunked",
      desc: "Multi-threaded chunked download engine built on gotd's streaming API.",
    },
  ];

  return (
    <section id="specs" className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-tr from-[#0A0A0B] via-[#0A0A0B] to-[#0A1020]" />
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="05" />
            <p className="text-sm font-mono uppercase tracking-[0.25em] mb-4" style={{ color: ACCENT }}>
              Tech Stack
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-2xl">
              Built with Go &amp; Wails.<br />
              <span className="text-white/30">Powered by gotd.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stack.map((s, i) => (
            <FadeIn key={s.name} delay={i * 0.1}>
              <div className="p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#0088CC]/20 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-xs text-white/30 font-mono uppercase tracking-wider">{s.name}</p>
                    <p className="text-base font-semibold text-white/80">{s.tech}</p>
                  </div>
                </div>
                <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Platform badges */}
        <FadeIn delay={0.3} className="mt-12">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { label: "macOS", sub: "Apple Silicon (ARM64)" },
              { label: "Windows", sub: "x86_64" },
            ].map((p) => (
              <div
                key={p.label}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06]"
              >
                <Globe className="w-4 h-4" style={{ color: ACCENT }} />
                <div>
                  <p className="text-sm font-semibold text-white/70">{p.label}</p>
                  <p className="text-xs text-white/30">{p.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Build From Source ─── */
function BuildFromSource() {
  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-bl from-[#0A1020] via-[#0A0A0B] to-[#0A0A0B]" />
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="06" />
            <p className="text-sm font-mono uppercase tracking-[0.25em] mb-4" style={{ color: ACCENT }}>
              Build From Source
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-2xl">
              Open source.<br />
              <span className="text-white/30">Build it yourself.</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-2xl">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-6">
              <p className="text-sm font-mono text-white/40 mb-3">Requirements</p>
              <div className="flex flex-wrap gap-3">
                {["Go 1.21+", "Node.js 18+", "Wails CLI"].map((r) => (
                  <span key={r} className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/[0.06] text-white/50">
                    {r}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/[0.06] font-mono text-sm">
              <p className="text-white/30 mb-2"># Clone and build</p>
              <p className="text-white/60">
                <span style={{ color: ACCENT }}>$</span> git clone https://github.com/NULLSHADExXx/TeleTurbo.git
              </p>
              <p className="text-white/60">
                <span style={{ color: ACCENT }}>$</span> cd TeleTurbo
              </p>
              <p className="text-white/60">
                <span style={{ color: ACCENT }}>$</span> wails build
              </p>
              <p className="text-white/30 mt-3"># Output: build/bin/</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Troubleshooting ─── */
function Troubleshooting() {
  const issues = [
    {
      q: "API credentials not working?",
      a: "Make sure you're using the numeric App ID and the full App Hash from my.telegram.org. Don't confuse them with bot tokens.",
    },
    {
      q: "OTP code not arriving?",
      a: "Check your Telegram app — the code is sent as a Telegram message, not SMS. Make sure you're logged into Telegram on another device.",
    },
    {
      q: "Download speed is slow?",
      a: "Try increasing the thread count in the app. Your ISP or Telegram's servers may also throttle during peak hours.",
    },
    {
      q: "macOS says the app is damaged?",
      a: "Open Terminal and run:",
    },
  ];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="container relative z-10">
        <FadeIn>
          <h3 className="text-lg font-semibold text-white/60 mb-8">Troubleshooting</h3>
        </FadeIn>
        <div className="space-y-4 max-w-2xl">
          {issues.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <p className="text-sm font-semibold text-white/60 mb-1.5">{item.q}</p>
                <p className="text-sm text-white/35 leading-relaxed">{item.a}</p>
                {item.q.includes("damaged") && (
                  <code className="block mt-3 px-4 py-2.5 rounded-lg bg-black/40 text-xs font-mono text-white/50 border border-white/[0.06]">
                    $ xattr -cr /Applications/TeleTurbo.app
                  </code>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Bottom CTA ─── */
function BottomCTA() {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A1020] to-[#0A0A0B]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-[#0088CC]/[0.06] rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 text-center">
        <FadeIn>
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] text-white mb-6">
            Download faster. From any channel.
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto mb-10">
            Independent, open source, and cross-platform. Built with Go for maximum performance.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <DownloadButton
              url={ASSETS.dmgDownload}
              filename="TeleTurbo.dmg"
              className="inline-flex items-center gap-3 px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 active:scale-95 shadow-lg text-base cursor-pointer"
              style={{ backgroundColor: ACCENT, boxShadow: `0 10px 30px ${ACCENT}30` }}
            >
              <Download className="w-5 h-5" />
              Download TeleTurbo
            </DownloadButton>
            <a
              href={ASSETS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-4 text-white/60 font-semibold rounded-full border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] hover:text-white/80 transition-all duration-300 active:scale-95 text-base"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
          <p className="text-sm text-white/20 font-mono mt-6">macOS &middot; Windows &middot; MIT License</p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function TeleTurbo() {
  useSEO({
    title: "TeleTurbo — High-Speed Telegram File Downloader",
    description: "TeleTurbo is an independent, open-source high-speed Telegram file downloader. Parallel chunked downloads with 4-16 threads for 5-10x faster speeds. Supports private and public channels. Built with Go and Wails v2.",
    keywords: "TeleTurbo, Telegram downloader, fast Telegram download, parallel download Telegram, Telegram file downloader mac, chunked download, private channel downloader, Telegram speed boost, Go Wails app, open source Telegram",
    ogUrl: "https://melodiq.sbs/teleturbo",
    canonical: "https://melodiq.sbs/teleturbo",
  });

  return (
    <div className="bg-[#0A0A0B] text-white min-h-screen overflow-x-hidden">
      <AppNav currentApp="TeleTurbo" />
      <Hero />
      <ScreenshotSection />
      <HowItWorks />
      <Features />
      <QuickStart />
      <SupportedLinks />
      <TechStack />
      <BuildFromSource />
      <Troubleshooting />
      <BottomCTA />
      <FeedbackSection appName="TeleTurbo" accent={ACCENT} />
      <AppFooter currentApp="TeleTurbo" accent={ACCENT} />
    </div>
  );
}
