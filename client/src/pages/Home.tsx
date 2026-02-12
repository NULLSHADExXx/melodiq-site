/*
  DESIGN: "Vinyl Noir" — Editorial Music Magazine Aesthetic
  - Asymmetric layouts, dramatic serif typography
  - Near-black bg, warm off-white text, magenta accent sparingly
  - Playfair Display headlines, DM Sans body, JetBrains Mono code
  - Oversized section numerals, editorial rules, grain texture
*/

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Download,
  Music,
  Youtube,
  BookOpen,
  ListMusic,
  Monitor,
  Globe,
  ChevronDown,
  Apple,
  Command,
  ArrowRight,
  Play,
  Headphones,
  Film,
  Mail,
  Send,
} from "lucide-react";
import { Link } from "wouter";
import { AppNav, AppFooter, ALL_APPS } from "@/components/AppNav";
import { FeedbackSection } from "@/components/FeedbackSection";
import { DownloadButton } from "@/components/DownloadButton";
import { useSEO } from "@/hooks/useSEO";
import { ExternalLink } from "lucide-react";


// CDN URLs
const ASSETS = {
  icon1024: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/tJMGufLNleGezsqu.png",
  icon256: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/wYeYsAErMFvzUfgQ.png",
  icon128: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/TFLbzLpsIxnxNhCK.png",
  screenshotLibrary: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/zdedqWyJKrIZzmMx.png",
  screenshotAudiobooks: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/bkeIJsxVltiuKPsw.png",
  screenshotVideos: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/ZixSCtAJxMYUIyWL.png",
  screenshotNowPlaying: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/YPgjHTrqIRWnKKpU.png",
  screenshotPlaylists: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/ojqKJisiDsNhQySs.png",
  screenshotYoutube: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/aCVIznMAubfCKsvC.png",
  screenshotDownloads: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/HgasVZsLkvLIRkIG.png",
  dmgDownload: "https://github.com/NULLSHADExXx/MelodiQ/releases/download/v1.0.0/MelodiQ.dmg",
  heroBg: "https://private-us-east-1.manuscdn.com/sessionFile/8P7TK5wMX27jvm9wWAs1vD/sandbox/rKa4EEnBI3u0jKnwqdhdTk-img-1_1770559193000_na1fn_aGVyby1iZw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOFA3VEs1d01YMjdqdm05d1dBczF2RC9zYW5kYm94L3JLYTRFRW5CSTN1MGpLbndxZGhkVGstaW1nLTFfMTc3MDU1OTE5MzAwMF9uYTFmbl9hR1Z5YnkxaVp3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=KZxBluJ1hW71zRm9Giaiuz2qu7VC19DVT0vlh3Ys9RRCGqmnBUTHuKsO1IQSL6GSjCuIc6yKMlzWEGjQ2fkftquGILSo95SocK7NMU4uMELC7pZFZvl3XtFdsA64ljQpcMxPz0PJWRJgHAxm9bJwM6fLleZ5WEu~fUChHlRIlG495p-QZHMVm5kve~S6IQ7X1TKELUew3YUWVIFmPbNt5sUvJ6FqyiH4pgSC7iTVyidtF4ehdBvnpkaXBrFzepzBDAICPbZyICGwyOLn1wMVFI0HQzJp95QLF9zmoLYcRvhQ84DBIf5poDy3gVLv2WJPtlXTj2nsSvPgh~3~Oh0qzw__",
  featuresBg: "https://private-us-east-1.manuscdn.com/sessionFile/8P7TK5wMX27jvm9wWAs1vD/sandbox/rKa4EEnBI3u0jKnwqdhdTk-img-2_1770559163000_na1fn_ZmVhdHVyZXMtYmc.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOFA3VEs1d01YMjdqdm05d1dBczF2RC9zYW5kYm94L3JLYTRFRW5CSTN1MGpLbndxZGhkVGstaW1nLTJfMTc3MDU1OTE2MzAwMF9uYTFmbl9abVZoZEhWeVpYTXRZbWMuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=s9d8SMBi-qF3WQdVrcO58aoODocyp7Fkx~hrS9M-Jyv1~smQGgw7UCVrtU2VFrU1pnMfJQq0b7UEfF-pPprGPYseP~l93qA9wE22VBFFDSEylJgVlIzNN6RSfNhC813HwO7Lh55OjeuckSn-Pk2gdaoB4QgPEKmysiHZEVW2IzlA57FY4rEZZG4USd4nujgKEgMutNOoHa46YB48ZZ1~aOvbBudQlC7h8AWF~~HgEjFmntOlo2Dpb9vrpQv6zTEXcJC9GIg2pSJ3LDMRrvlwK~xWqRibklfZVb45-LyChgCba6FOnWw-zMdvZx5JnbNl4i-5P3bulK4Y62XHT4xCtw__",
  downloadBg: "https://private-us-east-1.manuscdn.com/sessionFile/8P7TK5wMX27jvm9wWAs1vD/sandbox/rKa4EEnBI3u0jKnwqdhdTk-img-3_1770559185000_na1fn_ZG93bmxvYWQtc2VjdGlvbi1iZw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOFA3VEs1d01YMjdqdm05d1dBczF2RC9zYW5kYm94L3JLYTRFRW5CSTN1MGpLbndxZGhkVGstaW1nLTNfMTc3MDU1OTE4NTAwMF9uYTFmbl9aRzkzYm14dllXUXRjMlZqZEdsdmJpMWlady5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=baJ910ztBntYApjkQCdbFtxxkjewJ2UGqDbmQ0XTriKzGkEPUiQNMJIahUO3caCxAPT2hvgMtG~~E-V1Rc0LFV8yyhzrd9mZyXXIsuL27IGPDBPkEC2DyyqCeKf33-EyjFK6uoToM1qvnTBGblTZZ19LxI9FD~VqBTmG2syghowJfo0lzN3cMHNmThHKgX71f5VMz4Z45MSkcki7IVNrk6D6R-8nf5tQ01qgk0AOLHoseqnVgGhQowrJjdwTAl9FY0v07j~ntYNTAeOoSlQYg~vlBljGrVfXHNAbdq95z3wtp7PpSVe-8kDWwNq~61B9LuB6MwAEjL1g2qJZi9b1hQ__",
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

/* ─── Section numeral ─── */
function SectionNum({ num }: { num: string }) {
  return (
    <span className="font-serif text-[clamp(4rem,8vw,7rem)] font-bold leading-none text-white/[0.04] select-none absolute -top-6 -left-2 lg:-left-8">
      {num}
    </span>
  );
}

/* ─── Screenshot in window frame ─── */
function AppScreenshot({ src, alt, className = "", showTitlebar = false }: { src: string; alt: string; className?: string; showTitlebar?: boolean }) {
  return (
    <div className={`app-window ${className}`}>
      {showTitlebar && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2A2A2D] border-b border-white/[0.06]">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          <span className="text-[11px] text-white/30 ml-2 font-sans">MelodiQ</span>
        </div>
      )}
      <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
    </div>
  );
}

/* Nav is now handled by shared AppNav component */

/* ─── Hero ─── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-end pb-20 lg:pb-28 pt-24 lg:pt-32 overflow-hidden grain-overlay">
      {/* Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img
          src={ASSETS.heroBg}
          alt="MelodiQ hero background — abstract dark atmospheric gradient"
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/60 to-transparent" />
      </motion.div>

      <motion.div className="container relative z-10" style={{ opacity }}>
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <img
                src={ASSETS.icon256}
                alt="MelodiQ icon"
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl shadow-2xl"
              />
              <div>
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-white/40 mb-1">
                  Independent macOS App
                </p>
              </div>
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-white mb-6">
              Your music.<br />
              <span className="text-white/40">Your way.</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/55 leading-relaxed max-w-xl mb-10 font-light">
              A modern, native macOS media player that plays your local library, streams YouTube, and manages audiobooks — all from one lightweight app.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <DownloadButton
              url={ASSETS.dmgDownload}
              filename="MelodiQ.dmg"
              className="group flex items-center gap-3 px-7 py-4 bg-[#C42D78] hover:bg-[#D4357F] text-white font-semibold rounded-full transition-all duration-300 active:scale-95 shadow-lg shadow-[#C42D78]/20 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              Download for macOS
              <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </DownloadButton>
            <span className="text-sm text-white/30 font-mono">
              v1.0 &middot; 1.8 MB &middot; macOS 14+
            </span>
          </motion.div>
        </div>

        {/* Hero screenshot floating on right */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block absolute -right-8 bottom-8 w-[55%] max-w-[700px]"
        >
          <AppScreenshot src={ASSETS.screenshotLibrary} alt="MelodiQ Library" showTitlebar />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-0 left-4 lg:left-auto lg:right-8 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/20 [writing-mode:vertical-lr]">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 text-white/20 animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Features ─── */
const FEATURES = [
  {
    icon: Music,
    title: "Play Everything",
    desc: "MP3, FLAC, WAV, M4A, MKV, MP4, and 20+ other audio and video formats. Native macOS decoding — no codecs to install.",
  },
  {
    icon: Youtube,
    title: "YouTube Built-In",
    desc: "Paste a link, hit Fetch. Stream video, listen audio-only, or download for offline. No browser needed.",
  },
  {
    icon: BookOpen,
    title: "Audiobook Mode",
    desc: "Drop a folder of chapters and MelodiQ sorts them. M4B support, natural sorting, adjustable speed from 0.5x to 2.0x.",
  },
  {
    icon: Globe,
    title: "Arabic & RTL",
    desc: "Full right-to-left support with smart detection for Arabic, Hebrew, Persian, and Urdu. Locale-aware title sorting.",
  },
  {
    icon: ListMusic,
    title: "Playlists & Library",
    desc: "Organize with custom playlists, drag-and-drop import, search, and smart sorting by title, artist, or duration.",
  },
  {
    icon: Play,
    title: "Mini Player",
    desc: "A persistent bottom bar with playback controls, seek, volume, and speed — always accessible while browsing your library.",
  },
  {
    icon: Monitor,
    title: "Native & Lightweight",
    desc: "Built for macOS. Follows system dark mode, uses native controls, and weighs under 2 MB. No Electron, no bloat.",
  },
];

function Features() {
  return (
    <section id="features" className="relative py-28 lg:py-40">
      <div className="container">
        <FadeIn>
          <div className="relative mb-20 lg:mb-28">
            <SectionNum num="01" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-[#C42D78] mb-4 relative">Features</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Everything you need.<br />
              <span className="text-white/30">Nothing you don't.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 lg:gap-y-20">
          {FEATURES.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.08}>
              <div className="group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-[#C42D78]/30 group-hover:bg-[#C42D78]/[0.06] transition-all duration-500">
                    <f.icon className="w-5 h-5 text-white/40 group-hover:text-[#C42D78] transition-colors duration-500" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-white/90">{f.title}</h3>
                </div>
                <p className="text-[15px] text-white/40 leading-relaxed pl-[52px]">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Screenshot Showcase ─── */
const SCREENSHOTS = [
  { src: ASSETS.screenshotLibrary, label: "Library", desc: "Your entire media collection, organized and searchable." },
  { src: ASSETS.screenshotYoutube, label: "YouTube", desc: "Stream or download directly — paste a URL and go." },
  { src: ASSETS.screenshotAudiobooks, label: "Audiobooks", desc: "Smart chapter detection with adjustable playback speed." },
  { src: ASSETS.screenshotPlaylists, label: "Playlists", desc: "Create and manage custom playlists for any occasion." },
  { src: ASSETS.screenshotVideos, label: "Videos", desc: "Manage and play your video collection." },
  { src: ASSETS.screenshotNowPlaying, label: "Now Playing", desc: "Minimal, focused playback view with full controls." },
  { src: ASSETS.screenshotDownloads, label: "Downloads", desc: "Save YouTube content for offline listening." },
];

function Screenshots() {
  const [active, setActive] = useState(0);

  return (
    <section id="screenshots" className="relative py-28 lg:py-40 overflow-hidden">
      {/* Subtle bg */}
      <div className="absolute inset-0 z-0">
        <img src={ASSETS.featuresBg} alt="MelodiQ features section background" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-[#0A0A0B]/80" />
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="02" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-[#C42D78] mb-4 relative">Screenshots</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              See it in action.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Tab list */}
            <LayoutGroup>
            <div className="flex lg:flex-col gap-2 lg:gap-1 overflow-x-auto lg:overflow-visible lg:w-56 shrink-0 pb-2 lg:pb-0">
              {SCREENSHOTS.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setActive(i)}
                  className={`text-left px-4 py-3 rounded-lg transition-all duration-300 whitespace-nowrap lg:whitespace-normal relative ${
                    active === i
                      ? "bg-white/[0.06] text-white"
                      : "text-white/35 hover:text-white/60 hover:bg-white/[0.02]"
                  }`}
                >
                  {active === i && (
                    <motion.div
                      layoutId="screenshot-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#C42D78] rounded-full hidden lg:block"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="text-sm font-semibold">{s.label}</span>
                  <p className="text-xs text-white/30 mt-0.5 hidden lg:block">{s.desc}</p>
                </button>
              ))}
            </div>
            </LayoutGroup>

            {/* Screenshot */}
            <div className="flex-1 relative">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <AppScreenshot
                  src={SCREENSHOTS[active].src}
                  alt={SCREENSHOTS[active].label}
                  className="max-w-full"
                  showTitlebar
                />
              </motion.div>
              {/* Glow behind screenshot */}
              <div className="absolute -inset-20 bg-[#C42D78]/[0.04] rounded-full blur-3xl -z-10 pointer-events-none" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Specs / Formats ─── */
function Specs() {
  return (
    <section id="specs" className="relative py-28 lg:py-40">
      <div className="container">
        <FadeIn>
          <div className="relative mb-20 lg:mb-28">
            <SectionNum num="03" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-[#C42D78] mb-4 relative">Technical</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Under the hood.
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Formats */}
          <FadeIn>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Headphones className="w-5 h-5 text-[#C42D78]" />
                <h3 className="font-serif text-xl font-semibold text-white/90">Audio Formats</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["MP3", "M4A", "M4B", "AAC", "WAV", "FLAC", "OGG", "WMA", "AIFF", "ALAC", "OPUS"].map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1.5 text-xs font-mono font-medium text-white/50 bg-white/[0.04] border border-white/[0.06] rounded-md"
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-6 mt-10">
                <Film className="w-5 h-5 text-[#C42D78]" />
                <h3 className="font-serif text-xl font-semibold text-white/90">Video Formats</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["MP4", "MKV", "AVI", "MOV", "WMV", "FLV", "WebM", "M4V", "MPG", "MPEG", "TS"].map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1.5 text-xs font-mono font-medium text-white/50 bg-white/[0.04] border border-white/[0.06] rounded-md"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Shortcuts */}
          <FadeIn delay={0.1}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Command className="w-5 h-5 text-[#C42D78]" />
                <h3 className="font-serif text-xl font-semibold text-white/90">Keyboard Shortcuts</h3>
              </div>
              <div className="space-y-0 border border-white/[0.06] rounded-lg overflow-hidden">
                {[
                  ["Space", "Play / Pause"],
                  ["\u2318 \u2192", "Next Track"],
                  ["\u2318 \u2190", "Previous Track"],
                  ["\u2318 \u2191", "Volume Up"],
                  ["\u2318 \u2193", "Volume Down"],
                  ["\u2318 O", "Open Files"],
                  ["\u21E7\u2318 O", "Open Folder"],
                ].map(([key, action], i) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between px-5 py-3.5 ${
                      i > 0 ? "border-t border-white/[0.04]" : ""
                    }`}
                  >
                    <span className="text-sm text-white/40">{action}</span>
                    <kbd className="px-2.5 py-1 text-xs font-mono font-medium text-white/60 bg-white/[0.05] border border-white/[0.08] rounded-md">
                      {key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* System requirements */}
        <FadeIn delay={0.15}>
          <div className="mt-20 lg:mt-28 pt-16 border-t border-white/[0.06]">
            <h3 className="font-serif text-xl font-semibold text-white/90 mb-8">System Requirements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">Operating System</p>
                <p className="text-sm text-white/60">macOS 14.0 (Sonoma) or later</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">Download Size</p>
                <p className="text-sm text-white/60">1.8 MB</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">YouTube (Optional)</p>
                <p className="text-sm text-white/60">yt-dlp + ffmpeg via Homebrew</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Install Guide ─── */
function InstallGuide() {
  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={ASSETS.downloadBg} alt="MelodiQ download section background" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-[#0A0A0B]/70" />
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="04" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-[#C42D78] mb-4 relative">Get Started</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Up and running<br />
              <span className="text-white/30">in seconds.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Install steps */}
          <FadeIn>
            <div className="space-y-8">
              {[
                { step: "1", title: "Download", desc: "Grab the DMG file — it's under 2 MB." },
                { step: "2", title: "Install", desc: "Open the DMG and drag MelodiQ to your Applications folder." },
                { step: "3", title: "Launch", desc: "Open from Applications or Spotlight. That's it." },
              ].map((s) => (
                <div key={s.step} className="flex gap-5">
                  <div className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center shrink-0">
                    <span className="font-serif text-lg font-bold text-white/30">{s.step}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white/80 mb-1">{s.title}</h4>
                    <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* YouTube setup */}
          <FadeIn delay={0.1}>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Youtube className="w-5 h-5 text-red-500" />
                <h3 className="font-serif text-lg font-semibold text-white/90">YouTube Setup</h3>
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/30 bg-white/[0.05] px-2 py-0.5 rounded-full">
                  Optional
                </span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed mb-6">
                To enable YouTube streaming and downloads, install these open-source tools via{" "}
                <a href="https://brew.sh" target="_blank" rel="noopener" className="text-[#C42D78] hover:text-[#D4357F] transition-colors">
                  Homebrew
                </a>
                :
              </p>
              <div className="bg-black/40 border border-white/[0.06] rounded-lg p-4 font-mono text-sm text-white/60">
                <span className="text-white/30">$</span> brew install yt-dlp ffmpeg
              </div>
              <p className="text-xs text-white/30 mt-4 leading-relaxed">
                MelodiQ detects them automatically — no configuration needed.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Troubleshooting */}
        <FadeIn delay={0.15}>
          <div className="mt-16 bg-white/[0.02] border border-white/[0.05] rounded-xl p-8">
            <h3 className="font-serif text-lg font-semibold text-white/80 mb-4">Troubleshooting</h3>
            <div className="space-y-4 text-sm text-white/40 leading-relaxed">
              <p>
                <strong className="text-white/60">macOS says the app is damaged?</strong>{" "}
                Since MelodiQ is distributed outside the App Store, macOS may quarantine it. Open Terminal and run:
              </p>
              <div className="bg-black/40 border border-white/[0.06] rounded-lg p-4 font-mono text-sm text-white/60">
                <span className="text-white/30">$</span> xattr -cr /Applications/MelodiQ.app
              </div>
              <p>Then launch MelodiQ again. This removes the quarantine flag and is safe to do.</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Browse All Apps ─── */
function BrowseAllApps() {
  return (
    <section className="relative py-28 lg:py-40">
      <div className="container">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="05" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-[#C42D78] mb-4 relative">Explore</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              All our apps.<br />
              <span className="text-white/30">Independent macOS App.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ALL_APPS.map((app, i) => (
            <FadeIn key={app.name} delay={i * 0.06}>
              <Link
                href={app.path}
                className="group relative block p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-400 overflow-hidden"
              >
                {/* Accent glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 30% 20%, ${app.accent}, transparent 70%)` }}
                />

                <div className="relative flex items-start gap-4">
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="w-14 h-14 rounded-xl shadow-lg shrink-0 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="font-serif text-lg font-semibold text-white/90 group-hover:text-white transition-colors duration-300 truncate">
                        {app.name}
                      </h3>
                      <span
                        className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0"
                        style={{ borderColor: `${app.accent}30`, color: `${app.accent}90` }}
                      >
                        {app.category}
                      </span>
                    </div>
                    <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/55 transition-colors duration-300">
                      {app.tagline}
                    </p>
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="absolute top-6 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                  <ArrowRight className="w-4 h-4 text-white/30" />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Featured App: StreamFlix ─── */
const STREAMFLIX = {
  logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/sHmAeHIDXUrgaMFh.png",
  ssMovies: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/AzzrpfOyWnlqHqCr.png",
  ssTrending: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/qHWwayslJBeXYUjd.png",
  ssTvShows: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/oifeglKZXzVXYreo.png",
};

function FeaturedApp() {
  const [hoveredShot, setHoveredShot] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const shots = [
    { src: STREAMFLIX.ssMovies, label: "Movies" },
    { src: STREAMFLIX.ssTrending, label: "Trending" },
    { src: STREAMFLIX.ssTvShows, label: "TV Shows" },
  ];

  return (
    <section ref={containerRef} className="relative py-28 lg:py-40 overflow-hidden">
      {/* Cinematic ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] opacity-[0.04] blur-[150px] pointer-events-none rounded-full"
        style={{ background: "linear-gradient(135deg, #00D4FF, #8B5CF6, #EC4899)" }} />

      <div className="container">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="06" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative"
              style={{ background: "linear-gradient(90deg, #00D4FF, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Featured App
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Your personal cinema,<br />
              <span className="text-white/30">right on your Mac.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-center">
          {/* Left: Info card */}
          <FadeIn delay={0.1}>
            <div className="relative">
              {/* Gradient border card */}
              <div className="relative p-[1px] rounded-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ background: "linear-gradient(135deg, #00D4FF, #8B5CF6, #EC4899)" }} />
                <div className="relative bg-[#111113] rounded-2xl p-8 lg:p-10">
                  {/* Logo + name */}
                  <div className="flex items-center gap-4 mb-8">
                    <img
                      src={STREAMFLIX.logo}
                      alt="StreamFlix"
                      className="w-16 h-16 rounded-2xl shadow-lg"
                    />
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-white">StreamFlix</h3>
                      <p className="text-xs font-mono text-white/30 mt-0.5">Independent macOS App</p>
                    </div>
                  </div>

                  <p className="text-[15px] text-white/50 leading-relaxed mb-8">
                    A beautiful, Netflix-like streaming app built natively with SwiftUI. Browse trending movies, popular films, and TV shows — with an in-app player, customizable themes, and multi-language subtitles.
                  </p>

                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {["Trending", "Movies", "TV Shows", "In-App Player", "4 Themes", "Subtitles"].map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/[0.08] text-white/40 bg-white/[0.02]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href="/streamflix"
                    className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full font-semibold text-white text-sm transition-all duration-300 active:scale-95 shadow-lg"
                    style={{ background: "linear-gradient(135deg, #00D4FF, #8B5CF6, #EC4899)", boxShadow: "0 8px 30px rgba(139,92,246,0.25)" }}
                  >
                    <Film className="w-4 h-4" />
                    Explore StreamFlix
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: Stacked screenshots */}
          <FadeIn delay={0.25}>
            <div className="relative">
              {/* Perspective container */}
              <div className="relative h-[400px] lg:h-[480px]">
                {shots.map((shot, i) => {
                  const isHovered = hoveredShot === i;
                  const baseRotate = -3 + i * 3;
                  const baseTranslateY = -20 + i * 20;
                  const baseTranslateX = -10 + i * 10;
                  const zIndex = hoveredShot !== null
                    ? (isHovered ? 30 : i < (hoveredShot ?? 0) ? 10 : 20)
                    : 10 + i * 5;

                  return (
                    <motion.div
                      key={shot.label}
                      className="absolute top-0 left-0 w-[85%] lg:w-[90%] cursor-pointer"
                      style={{ zIndex }}
                      initial={false}
                      animate={{
                        rotate: isHovered ? 0 : baseRotate,
                        y: isHovered ? -10 : baseTranslateY,
                        x: isHovered ? 20 : baseTranslateX,
                        scale: isHovered ? 1.04 : 1 - (2 - i) * 0.03,
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                      onMouseEnter={() => setHoveredShot(i)}
                      onMouseLeave={() => setHoveredShot(null)}
                    >
                      <div className="rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/60">
                        {/* macOS title bar */}
                        <div className="bg-[#1C1C1E] px-4 py-2 flex items-center gap-1.5 border-b border-white/[0.06]">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                          <span className="text-[10px] text-white/25 ml-2 font-mono">StreamFlix — {shot.label}</span>
                        </div>
                        <img
                          src={shot.src}
                          alt={`StreamFlix ${shot.label}`}
                          className="w-full h-auto block"
                          loading="lazy"
                        />
                      </div>

                      {/* Glow underneath */}
                      {isHovered && (
                        <div
                          className="absolute -inset-2 -z-10 rounded-2xl opacity-20 blur-2xl"
                          style={{ background: "linear-gradient(135deg, #00D4FF, #8B5CF6, #EC4899)" }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Hover hint */}
              <p className="text-center text-[11px] font-mono text-white/20 mt-4 tracking-wider uppercase">
                Hover to explore
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA / Download ─── */
function DownloadCTA() {
  return (
    <section className="relative py-32 lg:py-44">
      <div className="container text-center">
        <FadeIn>
          <img
            src={ASSETS.icon256}
            alt="MelodiQ"
            className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl mx-auto mb-8 shadow-2xl"
          />
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-bold leading-[1] text-white mb-4">
            Ready to listen?
          </h2>
          <p className="text-lg text-white/40 mb-10 max-w-md mx-auto">
            Independent, native, and under 2 MB. No account required.
          </p>
          <DownloadButton
            url={ASSETS.dmgDownload}
            filename="MelodiQ.dmg"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#C42D78] hover:bg-[#D4357F] text-white font-semibold rounded-full transition-all duration-300 active:scale-95 shadow-lg shadow-[#C42D78]/20 text-lg cursor-pointer"
          >
            <Download className="w-5 h-5" />
            Download MelodiQ
          </DownloadButton>
          <p className="text-xs text-white/25 mt-4 font-mono">
            v1.0 &middot; macOS 14+ &middot; 1.8 MB DMG
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-12 lg:py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <img src={ASSETS.icon128} alt="MelodiQ" className="w-7 h-7 rounded-lg" />
            <div>
              <span className="font-serif text-base font-semibold text-white/70">MelodiQ</span>
              <p className="text-xs text-white/25 mt-0.5">Play local. Stream YouTube. Listen to audiobooks. One app.</p>
            </div>
          </div>

          {/* Right: Contact */}
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="mailto:NULLSHADExXx@proton.me"
              className="group flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-lg hover:border-[#C42D78]/30 hover:bg-[#C42D78]/[0.04] transition-all duration-300"
            >
              <Mail className="w-4 h-4 text-white/30 group-hover:text-[#C42D78] transition-colors duration-300" />
              <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300">NULLSHADExXx@proton.me</span>
            </a>
            <a
              href="https://t.me/NULLSHADExXx"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-lg hover:border-[#C42D78]/30 hover:bg-[#C42D78]/[0.04] transition-all duration-300"
            >
              <Send className="w-4 h-4 text-white/30 group-hover:text-[#C42D78] transition-colors duration-300" />
              <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300">@NULLSHADExXx</span>
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-white/20">&copy; 2026 MelodiQ</span>
          <div className="flex items-center gap-4">
            <Link href="/dropdock" className="text-[11px] text-white/20 hover:text-white/40 transition-colors">
              DropDock
            </Link>
            <span className="text-[11px] text-white/15 font-mono">Bug reports &amp; feedback welcome</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Affiliate Banner ─── */
function AffiliateBanner() {
  return (
    <section className="relative py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <a
          href="https://faceless.video/?ref=MelodiQ"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-5 md:gap-7 rounded-2xl border border-[#32FF32]/10 bg-gradient-to-r from-[#0f1a0f] via-[#0a0a0b] to-[#1a0a1a] px-7 py-5 md:px-9 md:py-6 transition-all duration-300 hover:border-[#32FF32]/25 hover:-translate-y-0.5 no-underline overflow-hidden"
        >
          {/* Glow */}
          <div className="absolute -top-1/2 -right-1/5 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(50,255,50,0.06)_0%,transparent_70%)] pointer-events-none" />

          {/* Sponsored tag */}
          <span className="absolute top-3 right-4 text-[9px] tracking-[1.5px] uppercase text-white/20">Sponsored</span>

          {/* Icon */}
          <div className="flex-shrink-0 w-12 h-12 md:w-13 md:h-13 bg-gradient-to-br from-[#1a3a1a] to-[#0d1f0d] border border-[#32FF32]/20 rounded-xl flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="#32FF32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="text-[15px] md:text-base font-semibold text-[#E8E4DF] mb-1">
              Create faceless videos with AI — <span className="text-[#32FF32]">earn while you sleep</span>
            </div>
            <div className="text-[12px] md:text-[13px] text-white/40 leading-relaxed">
              Faceless.video auto-creates and posts short-form content to your channels. Set it up once, let AI handle the rest.
            </div>
          </div>

          {/* CTA */}
          <span className="flex-shrink-0 hidden sm:inline-flex items-center gap-1.5 bg-[#32FF32] text-black text-[13px] font-semibold px-5 py-2.5 rounded-lg transition-colors group-hover:bg-[#45ff45]">
            Try Free <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </a>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function Home() {
  useSEO({
    title: "MelodiQ — Independent macOS Media Player",
    description: "MelodiQ is an independent, native macOS media player. Play local music and videos, stream YouTube, and manage audiobooks in one lightweight app under 2 MB.",
    keywords: "MelodiQ, macOS media player, indie music player mac, YouTube streaming mac, audiobook player macOS, native mac app",
    ogUrl: "https://melodiq.sbs/",
    canonical: "https://melodiq.sbs/",
  });

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E8E4DF]">
      <AppNav currentApp="MelodiQ" />
      <Hero />
      <div className="editorial-rule" />
      <Features />
      <div className="editorial-rule" />
      <Screenshots />
      <div className="editorial-rule" />
      <Specs />
      <div className="editorial-rule" />
      <InstallGuide />
      <div className="editorial-rule" />
      <BrowseAllApps />
      <div className="editorial-rule" />
      <FeaturedApp />
      <DownloadCTA />
      <FeedbackSection appName="MelodiQ" accent="#C42D78" />
      <AffiliateBanner />
      <AppFooter currentApp="MelodiQ" accent="#C42D78" />
    </div>
  );
}
