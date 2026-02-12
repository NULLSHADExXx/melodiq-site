/*
  DESIGN: Cinematic streaming — StreamFlix uses a cyan→purple→magenta gradient accent.
  StreamFlix is a Netflix-like streaming app for macOS built with SwiftUI.
  Browse trending movies, popular films, and TV shows. In-app player, themes,
  subtitles, multi-language. Powered by TMDB + VidSrc.
  macOS 14.0+ (Sonoma), Apple Silicon & Intel.
*/

import { useEffect, useRef, useState } from "react";
import { DownloadButton } from "@/components/DownloadButton";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Download,
  Play,
  Search,
  Tv,
  Film,
  TrendingUp,
  Settings,
  Palette,
  Languages,
  Subtitles,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Monitor,
  Cpu,
  Wifi,
} from "lucide-react";
import { AppNav, AppFooter } from "@/components/AppNav";
import { FeedbackSection } from "@/components/FeedbackSection";
import { useSEO } from "@/hooks/useSEO";

const ACCENT_START = "#00D4FF";
const ACCENT_MID = "#8B5CF6";
const ACCENT_END = "#EC4899";
const GRADIENT = `linear-gradient(135deg, ${ACCENT_START}, ${ACCENT_MID}, ${ACCENT_END})`;

const ASSETS = {
  logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/sHmAeHIDXUrgaMFh.png",
  heroBg: "https://private-us-east-1.manuscdn.com/sessionFile/8P7TK5wMX27jvm9wWAs1vD/sandbox/ZzxmrlGsZXVPeAcMbHRD5j-img-1_1770664735000_na1fn_c3RyZWFtZmxpeC1oZXJv.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOFA3VEs1d01YMjdqdm05d1dBczF2RC9zYW5kYm94L1p6eG1ybEdzWlhWUGVBY01iSFJENWotaW1nLTFfMTc3MDY2NDczNTAwMF9uYTFmbl9jM1J5WldGdFpteHBlQzFvWlhKdi5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=hlZ2yurDD9qIicBVfguNCm66DyvwccogGshgd0XfnUe0XZ9UxkbO5OtDTHvz~aR3pnlEtCeJrs94svE0MXUNdxp-vaRXwFqJiNmkKZmXyJNwlH9aTtUNEUYxjVY3wht~ejPfkRkpcvFb~iBmfHf1nPEGTObGOpk5mSbf4ClLSqun-jkMAo2NE2CJp31CuGmFD7euptO8WPwf07eg0cOwiYznqH4Ya33~DMpcbU9iMTC~9tUQ-mRv6th0O3l3vrfmB5H3UTsKqqtptaYv0ymww8kHNhC3cDaSz0dB7e5LiE6lYQ5A-a7HeLn7oXYvQDUuBQ7TS9RoWi1zwIW4QY8gPA__",
  dmgDownload: "https://github.com/NULLSHADExXx/StreamFlix/releases/download/v1.0.0/StreamFlix.dmg",
  ssTrending: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/qHWwayslJBeXYUjd.png",
  ssMovies: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/AzzrpfOyWnlqHqCr.png",
  ssTvShows: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/oifeglKZXzVXYreo.png",
  ssSearch: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/hCJANgtJlfCAeOIs.png",
  ssSettings: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/nEtaUPBHkNDPLCaU.png",
  demoVideo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/bSaZfsDfMhTGejUg.mov",
};

/* ─── Fade-in on scroll ─── */
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

/* ─── Hero ─── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-end pb-20 lg:pb-28 pt-24 lg:pt-32 overflow-hidden">
      {/* Cinematic background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img src={ASSETS.heroBg} alt="" className="w-full h-[120%] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/70 to-[#0A0A0B]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B]/80 via-transparent to-transparent" />
      </motion.div>

      {/* Gradient glow accent */}
      <div className="absolute top-0 right-0 w-[60%] h-[60%] opacity-[0.07] blur-[120px] pointer-events-none"
        style={{ background: GRADIENT }} />

      <motion.div className="container relative z-10" style={{ opacity }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <img src={ASSETS.logo} alt="StreamFlix" className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl shadow-2xl" />
              <div>
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-white/40 mb-1">Independent macOS App</p>
              </div>
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-white mb-2">
              Stream smarter.
            </h1>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight mb-6"
              style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Watch better.
            </h1>
            <p className="text-lg lg:text-xl text-white/50 leading-relaxed max-w-xl mb-10">
              A beautiful media browsing and playback application built natively for macOS with SwiftUI.
              Discover trending titles, browse popular films, and explore TV series — all from one sleek interface
              with a built-in player, customizable themes, and multi-language subtitles.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <DownloadButton
                url={ASSETS.dmgDownload}
                filename="StreamFlix.dmg"
                className="group inline-flex items-center gap-3 px-7 py-3.5 text-white font-semibold rounded-full transition-all duration-300 active:scale-95 shadow-lg text-base relative overflow-hidden cursor-pointer"
                style={{ background: GRADIENT, boxShadow: `0 10px 30px ${ACCENT_MID}30` }}
              >
                <Download className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Download for Mac</span>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
              </DownloadButton>
              <span className="text-sm text-white/25 font-mono">macOS 14+ &middot; Apple Silicon &amp; Intel</span>
            </div>
          </motion.div>

          {/* Right: Movies screenshot in a floating frame */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/60 border border-white/[0.08]">
                <img src={ASSETS.ssMovies} alt="StreamFlix Movies view" className="w-full" />
              </div>
              {/* Floating glow behind */}
              <div className="absolute -inset-4 -z-10 rounded-2xl opacity-20 blur-2xl"
                style={{ background: GRADIENT }} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Screenshot Theater ─── */
function ScreenshotTheater() {
  const screenshots = [
    { src: ASSETS.ssTrending, label: "Trending Now", desc: "Discover what's hot — a grid of trending movies and shows updated in real-time from TMDB.", icon: <TrendingUp className="w-4 h-4" /> },
    { src: ASSETS.ssMovies, label: "Movies", desc: "Hero banners for featured films plus horizontally scrollable rows of popular movies.", icon: <Film className="w-4 h-4" /> },
    { src: ASSETS.ssTvShows, label: "TV Shows", desc: "Browse popular TV series with hero banners and poster rows. Full episode navigation built in.", icon: <Tv className="w-4 h-4" /> },
    { src: ASSETS.ssSearch, label: "Search", desc: "Find any movie or TV show instantly with the search bar. Results appear as you type.", icon: <Search className="w-4 h-4" /> },
    { src: ASSETS.ssSettings, label: "Settings", desc: "4 themes (Dark, OLED Black, Midnight Blue, Crimson), 12+ languages, subtitle controls, playback preferences.", icon: <Settings className="w-4 h-4" /> },
  ];

  const [active, setActive] = useState(0);

  const next = () => setActive((a) => (a + 1) % screenshots.length);
  const prev = () => setActive((a) => (a - 1 + screenshots.length) % screenshots.length);

  /* Auto-advance every 5 seconds */
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] opacity-[0.04] blur-[100px] pointer-events-none"
        style={{ background: GRADIENT }} />

      <div className="container">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-[0.25em] mb-4"
              style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              App Preview
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-tight">
              Your personal cinema,<br />
              <span className="text-white/30">right on your Mac.</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          {/* Tab bar */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            {screenshots.map((ss, i) => (
              <button
                key={ss.label}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  i === active
                    ? "text-white shadow-lg"
                    : "text-white/30 hover:text-white/50 bg-transparent hover:bg-white/[0.03]"
                }`}
                style={i === active ? { background: GRADIENT, boxShadow: `0 4px 20px ${ACCENT_MID}25` } : {}}
              >
                {ss.icon}
                <span className="hidden sm:inline">{ss.label}</span>
              </button>
            ))}
          </div>

          {/* Screenshot display */}
          <div className="relative max-w-5xl mx-auto">
            {/* Navigation arrows */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.1] transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.1] transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* macOS window frame */}
            <div className="rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/60 bg-[#1a1a1d]">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1d] border-b border-white/[0.06]">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                <span className="ml-3 text-xs text-white/30 font-medium">StreamFlix — {screenshots[active].label}</span>
              </div>

              {/* Screenshot with crossfade */}
              <div className="relative aspect-[16/10] bg-[#0d0d0f]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={active}
                    src={screenshots[active].src}
                    alt={screenshots[active].label}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Caption */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-6 text-center"
              >
                <p className="text-white/60 text-base max-w-lg mx-auto">{screenshots[active].desc}</p>
              </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-5">
              {screenshots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="transition-all duration-300"
                >
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      i === active ? "w-6 h-2" : "w-2 h-2 bg-white/15 hover:bg-white/25"
                    }`}
                    style={i === active ? { background: GRADIENT } : {}}
                  />
                </button>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Demo Video ─── */
function DemoVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!ref.current) return;
    if (ref.current.paused) {
      ref.current.play();
      setIsPlaying(true);
    } else {
      ref.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] opacity-[0.06] blur-[120px] pointer-events-none rounded-full"
        style={{ background: GRADIENT }} />

      <div className="container max-w-5xl">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-sm font-mono uppercase tracking-[0.25em] mb-4"
              style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              See It In Action
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold text-white leading-tight">
              Watch StreamFlix come alive.
            </h2>
            <p className="text-white/40 mt-3 max-w-lg mx-auto text-base">
              Browse trending content, explore movies and TV shows, and stream — all from your Mac.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="relative group cursor-pointer" onClick={togglePlay}>
            {/* macOS window frame */}
            <div className="rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/60">
              {/* Title bar */}
              <div className="bg-[#1C1C1E] px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.06]">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <span className="text-white/40 text-xs font-medium ml-2">StreamFlix — Demo</span>
              </div>

              {/* Video */}
              <div className="relative bg-black">
                <video
                  ref={ref}
                  src={ASSETS.demoVideo}
                  className="w-full"
                  playsInline
                  onEnded={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Play overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${ACCENT_MID}40` }}>
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Glow behind */}
            <div className="absolute -inset-3 -z-10 rounded-2xl opacity-15 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
              style={{ background: GRADIENT }} />
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
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Trending Movies",
      desc: "Discover what's hot right now. Trending content is powered by TMDB and updated in real-time.",
      gradient: `linear-gradient(135deg, ${ACCENT_START}15, transparent)`,
    },
    {
      icon: <Film className="w-5 h-5" />,
      title: "Popular Movies",
      desc: "Browse the most popular films worldwide with hero banners and poster carousels.",
      gradient: `linear-gradient(135deg, ${ACCENT_MID}15, transparent)`,
    },
    {
      icon: <Tv className="w-5 h-5" />,
      title: "TV Shows",
      desc: "Explore popular TV series with full season and episode navigation. Pick any episode, any season.",
      gradient: `linear-gradient(135deg, ${ACCENT_END}15, transparent)`,
    },
    {
      icon: <Search className="w-5 h-5" />,
      title: "Instant Search",
      desc: "Find any movie or TV show instantly. Type a title and results appear as you search.",
      gradient: `linear-gradient(135deg, ${ACCENT_START}15, transparent)`,
    },
    {
      icon: <Play className="w-5 h-5" />,
      title: "In-App Player",
      desc: "Stream content directly inside the app. No browser redirects, no external players needed.",
      gradient: `linear-gradient(135deg, ${ACCENT_MID}15, transparent)`,
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Episode Controls",
      desc: "Season and episode picker with next/previous buttons for seamless TV show binge-watching.",
      gradient: `linear-gradient(135deg, ${ACCENT_END}15, transparent)`,
    },
  ];

  return (
    <section id="features" className="py-24 lg:py-32 relative">
      <div className="container">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-[0.25em] mb-4"
              style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Features
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-tight">
              Everything you need<br />
              <span className="text-white/30">to stream anything.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.08}>
              <div className="group relative p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500 h-full">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-white/70 group-hover:text-white transition-colors duration-300"
                  style={{ background: f.gradient }}
                >
                  {f.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold text-white/80 group-hover:text-white transition-colors duration-300 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-white/35 group-hover:text-white/50 leading-relaxed transition-colors duration-300">
                  {f.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Content Tip ─── */
function ContentTip() {
  return (
    <section className="py-8 lg:py-12">
      <div className="container max-w-3xl">
        <FadeIn>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-white/50"
              style={{ background: `linear-gradient(135deg, ${ACCENT_START}15, ${ACCENT_MID}15)` }}>
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-semibold text-white/70 mb-2">Can't find a title?</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                The curated sections — Trending, Movies, and TV Shows — showcase a selection of popular content.
                If a specific title doesn't appear in these sections, head over to the <span className="text-white/60 font-medium">Search</span> tab
                and look it up directly. StreamFlix has access to a vast library, and most titles can be found through search
                even if they aren't featured on the main pages.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Themes Showcase ─── */
function ThemesShowcase() {
  const themes = [
    { name: "Dark", color: "#1a1a2e", border: "#2a2a3e" },
    { name: "OLED Black", color: "#000000", border: "#1a1a1a" },
    { name: "Midnight Blue", color: "#1a1a3e", border: "#2a2a5e" },
    { name: "Crimson", color: "#2e1a1a", border: "#4e2a2a" },
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] opacity-[0.03] blur-[80px] pointer-events-none"
        style={{ background: GRADIENT }} />

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <p className="text-sm font-mono uppercase tracking-[0.25em] mb-4"
              style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Customization
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold text-white leading-tight mb-6">
              Your theater,<br />
              <span className="text-white/30">your rules.</span>
            </h2>
            <p className="text-white/40 leading-relaxed mb-8 max-w-md">
              Choose from 4 handcrafted themes to match your mood. Set your preferred language from 12+ options,
              toggle subtitles with your choice of subtitle language, control autoplay, and pick your video quality.
            </p>

            <div className="space-y-4">
              {[
                { icon: <Palette className="w-4 h-4" />, label: "4 Themes", detail: "Dark, OLED Black, Midnight Blue, Crimson" },
                { icon: <Languages className="w-4 h-4" />, label: "12+ Languages", detail: "English, Arabic, Spanish, French, and more" },
                { icon: <Subtitles className="w-4 h-4" />, label: "Subtitles", detail: "Toggle on/off with language selection" },
                { icon: <Play className="w-4 h-4" />, label: "Playback", detail: "Autoplay next episode, video quality control" },
              ].map((item, i) => (
                <div key={item.label} className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 group-hover:text-white/70 transition-colors duration-300 shrink-0"
                    style={{ background: `linear-gradient(135deg, ${[ACCENT_START, ACCENT_MID, ACCENT_END, ACCENT_START][i]}10, transparent)` }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/60 group-hover:text-white/80 transition-colors">{item.label}</p>
                    <p className="text-xs text-white/25">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {themes.map((t) => (
                <div
                  key={t.name}
                  className="aspect-[4/3] rounded-xl border flex items-center justify-center transition-all duration-300 hover:scale-[1.03] cursor-default"
                  style={{ backgroundColor: t.color, borderColor: t.border }}
                >
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center"
                      style={{ background: `${t.border}` }}>
                      <Palette className="w-4 h-4 text-white/40" />
                    </div>
                    <p className="text-xs font-medium text-white/50">{t.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── How to Use ─── */
function HowToUse() {
  const steps = [
    { num: "01", title: "Browse", desc: "Use the tabs — Trending, Movies, TV Shows — to discover content. Hero banners highlight featured titles." },
    { num: "02", title: "Click", desc: "Tap any movie or show poster to see full details — synopsis, cast, director, and rating." },
    { num: "03", title: "Play", desc: "Hit the Play button to start playback directly inside the app. No external browser needed." },
    { num: "04", title: "Navigate", desc: "For TV shows, use the season and episode picker to jump between episodes. Next/previous buttons included." },
    { num: "05", title: "Search", desc: "Use the Search tab to find specific movies or shows by title. Results appear instantly." },
    { num: "06", title: "Customize", desc: "Head to Settings to pick your theme, language, subtitle preferences, and playback options." },
  ];

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="container">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-[0.25em] mb-4"
              style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Getting Started
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-tight">
              Six steps to<br />
              <span className="text-white/30">your next watch.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.08}>
              <div className="group relative p-6 rounded-xl border border-white/[0.05] bg-white/[0.015] hover:border-white/[0.1] transition-all duration-500">
                <span
                  className="font-serif text-4xl font-bold leading-none mb-3 block"
                  style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", opacity: 0.3 }}
                >
                  {s.num}
                </span>
                <h3 className="font-serif text-lg font-semibold text-white/80 group-hover:text-white transition-colors mb-2">{s.title}</h3>
                <p className="text-sm text-white/30 group-hover:text-white/45 leading-relaxed transition-colors">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Specs ─── */
function Specs() {
  return (
    <section id="specs" className="py-24 lg:py-32 relative">
      <div className="container max-w-4xl">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-[0.25em] mb-4"
              style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Technical Details
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold text-white leading-tight">
              Built native.<br />
              <span className="text-white/30">Runs native.</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { icon: <Monitor className="w-5 h-5" />, label: "macOS 14.0+", sub: "Sonoma or later" },
              { icon: <Cpu className="w-5 h-5" />, label: "Universal", sub: "Apple Silicon & Intel" },
              { icon: <Wifi className="w-5 h-5" />, label: "Internet", sub: "Required for streaming" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-4 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white/50"
                  style={{ background: `linear-gradient(135deg, ${ACCENT_MID}15, transparent)` }}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/70">{s.label}</p>
                  <p className="text-xs text-white/30">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            <div className="px-6 py-4 border-b border-white/[0.06]">
              <h3 className="font-serif text-base font-semibold text-white/70">Architecture</h3>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {[
                ["Framework", "SwiftUI (native macOS)"],
                ["Data Source", "TMDB API (movies & TV metadata)"],
                ["Playback Engine", "Built-in player (in-app playback)"],
                ["Themes", "Dark, OLED Black, Midnight Blue, Crimson"],
                ["Languages", "12+ supported (English, Arabic, Spanish, French, etc.)"],
                ["Subtitles", "Configurable language, toggle on/off"],
                ["Playback", "Autoplay next episode, quality selection (Auto/720p/1080p)"],
                ["Version", "1.1.0"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start justify-between px-6 py-3.5 gap-4">
                  <span className="text-sm text-white/30 shrink-0">{k}</span>
                  <span className="text-sm text-white/60 text-right">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── What's New ─── */
function WhatsNew() {
  const changes = [
    { tag: "Fix", text: "TV shows now display the correct number of seasons instead of always showing 10" },
    { tag: "Fix", text: "Episode counts accurately reflect each season's real number of episodes" },
    { tag: "New", text: "Video player now goes fully fullscreen with auto-hiding controls" },
    { tag: "New", text: "Improved hero banner images using high-quality widescreen artwork" },
    { tag: "New", text: "Continue Watching — the app remembers your last watched episode" },
    { tag: "New", text: "Redesigned TV show detail page with cleaner layout and episode browser" },
    { tag: "Perf", text: "General stability and performance improvements" },
  ];

  const tagColors: Record<string, { bg: string; text: string }> = {
    Fix: { bg: `${ACCENT_END}20`, text: ACCENT_END },
    New: { bg: `${ACCENT_START}20`, text: ACCENT_START },
    Perf: { bg: `${ACCENT_MID}20`, text: ACCENT_MID },
  };

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="container max-w-3xl">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-[0.25em] mb-4"
              style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Changelog
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold text-white leading-tight">
              What's new in<br />
              <span className="text-white/30">version 1.1</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden divide-y divide-white/[0.04]">
            {changes.map((c, i) => {
              const color = tagColors[c.tag] || tagColors.New;
              return (
                <div key={i} className="flex items-start gap-4 px-6 py-4">
                  <span
                    className="shrink-0 mt-0.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider"
                    style={{ background: color.bg, color: color.text }}
                  >
                    {c.tag}
                  </span>
                  <p className="text-sm text-white/55 leading-relaxed">{c.text}</p>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Troubleshooting ─── */
function Troubleshooting() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container max-w-3xl">
        <FadeIn>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
            <h3 className="font-serif text-lg font-semibold text-white/70 mb-4">Troubleshooting</h3>
            <p className="text-sm text-white/40 mb-4 leading-relaxed">
              If macOS shows <span className="text-white/60 font-medium">"StreamFlix is damaged and can't be opened"</span>,
              it's a Gatekeeper quarantine flag — not actual damage. Run this in Terminal:
            </p>
            <div className="bg-black/40 rounded-lg p-4 font-mono text-sm text-white/60 border border-white/[0.06] mb-4 overflow-x-auto">
              <span className="text-white/30">$</span> sudo xattr -rd com.apple.quarantine /Applications/StreamFlix.app
            </div>
            <p className="text-xs text-white/25 leading-relaxed">
              This removes the quarantine attribute so macOS will let the app run normally.
              You may need to enter your administrator password.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Disclaimer ─── */
function Disclaimer() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container max-w-3xl">
        <FadeIn>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
            <h3 className="font-serif text-lg font-semibold text-white/70 mb-4">Disclaimer</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              StreamFlix is a media browsing and playback application. It aggregates publicly available
              metadata and streaming links from third-party sources across the internet. StreamFlix does
              not host, upload, store, or distribute any media content on its own servers. All content
              accessed through the application is provided by and hosted on external third-party services
              over which we have no control. Users are solely responsible for ensuring that their use of
              the application complies with all applicable laws in their jurisdiction. If you are a content
              owner and believe your rights are being infringed, please contact us and we will promptly
              address your concerns.
            </p>
            <p className="text-xs text-white/20 mt-4">
              By downloading and using StreamFlix, you agree to our{" "}
              <a href="/terms" className="text-white/30 hover:text-white/50 transition-colors underline underline-offset-2">Terms of Use</a>
              {" "}and{" "}
              <a href="/legal" className="text-white/30 hover:text-white/50 transition-colors underline underline-offset-2">Legal Disclaimer</a>.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function BottomCTA() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${ACCENT_MID}, transparent 70%)` }} />

      <div className="container text-center relative z-10">
        <FadeIn>
          <img src={ASSETS.logo} alt="StreamFlix" className="w-20 h-20 rounded-2xl mx-auto mb-8 shadow-2xl" />
          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold text-white mb-4">
            Ready for movie night?
          </h2>
          <p className="text-white/40 text-lg max-w-md mx-auto mb-10">
            Download StreamFlix and start browsing movies and TV shows — Independent, native, and beautiful.
          </p>
          <DownloadButton
            url={ASSETS.dmgDownload}
            filename="StreamFlix.dmg"
            className="group inline-flex items-center gap-3 px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 active:scale-95 shadow-lg text-base relative overflow-hidden cursor-pointer"
            style={{ background: GRADIENT, boxShadow: `0 10px 40px ${ACCENT_MID}30` }}
          >
            <Download className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Download for Mac</span>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
          </DownloadButton>
          <p className="mt-4 text-xs text-white/20 font-mono">macOS 14+ &middot; Apple Silicon &amp; Intel &middot; Independent</p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Credits ─── */
function Credits() {
  return (
    <section className="pb-8">
      <div className="container max-w-3xl">
        <FadeIn>
          <div className="text-center">
            <p className="text-xs text-white/15 leading-relaxed">
              Movie &amp; TV metadata provided by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="text-white/25 hover:text-white/40 transition-colors underline underline-offset-2">TMDB</a>.
              Built with SwiftUI for macOS.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function StreamFlix() {
  useSEO({
    title: "StreamFlix — Independent macOS Media Browser for Movies & TV Shows",
    description: "StreamFlix is an independent native macOS media browser. Discover trending movies and TV shows, search any title, with built-in playback, 4 themes, subtitle support, and autoplay. Built with Swift and SwiftUI.",
    keywords: "StreamFlix, macOS media browser, movie browser mac, TV shows mac, media player macOS, native mac app",
    ogUrl: "https://melodiq.sbs/streamflix",
    canonical: "https://melodiq.sbs/streamflix",
  });

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white overflow-x-hidden">
      <AppNav currentApp="StreamFlix" />
      <Hero />
      <ScreenshotTheater />
      <DemoVideo />
      <Features />
      <ContentTip />
      <ThemesShowcase />
      <HowToUse />
      <Specs />
      <WhatsNew />
      <Troubleshooting />
      <Disclaimer />
      <BottomCTA />
      <Credits />
      <FeedbackSection appName="StreamFlix" accent={ACCENT_MID} />
      <AppFooter currentApp="StreamFlix" accent={ACCENT_MID} />
    </div>
  );
}
