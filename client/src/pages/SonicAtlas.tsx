/*
  DESIGN: "Vinyl Noir" variant — SonicAtlas uses deep teal (#0EA5E9) accent
  to evoke radio waves and global exploration. Dark editorial foundation
  with subtle globe/wave visual motifs.
*/

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, LayoutGroup } from "framer-motion";
import {
  Download,
  Globe,
  Radio,
  Heart,
  Search,
  Volume2,
  Headphones,
  Command,
  ArrowRight,
  ChevronDown,
  Music,
  Languages,
  Gauge,
  Cloud,
  Monitor,
  Keyboard,
  Send,
  Mail,
} from "lucide-react";
import { Link } from "wouter";
import { AppNav, AppFooter } from "@/components/AppNav";
import { FeedbackSection } from "@/components/FeedbackSection";
import { DownloadButton } from "@/components/DownloadButton";
import { useSEO } from "@/hooks/useSEO";

const ACCENT = "#0EA5E9";
const ACCENT_HOVER = "#38BDF8";

const ASSETS = {
  icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/uFCWKtaBZQqKoqCi.png",
  screenshotGlobe: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/FYpGdfDMyorQyXgD.png",
  screenshotStation: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/LYsHHjRUgMDLKOeX.png",
  screenshotMiniPlayer: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/KBWCMjlLuDjJYhDU.png",
  dmgDownload: "https://github.com/NULLSHADExXx/SonicAtlas/releases/download/v1.0.0/SonicAtlas.dmg",
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
    <div className={`rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/60 ${className}`}>
      {showTitlebar && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1C1C1E] border-b border-white/[0.06]">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          <span className="text-[11px] text-white/30 ml-2 font-sans">SonicAtlas</span>
        </div>
      )}
      <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
    </div>
  );
}

/* ─── Hero ─── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-end pb-20 lg:pb-28 pt-24 lg:pt-32 overflow-hidden grain-overlay">
      {/* Background — deep navy with radio-wave glows */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-[#020617] via-[#0C1929] to-[#0A0A0B]" />
        {/* Concentric radio-wave rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#0EA5E9]/[0.06]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#0EA5E9]/[0.08]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#0EA5E9]/[0.10]" />
        {/* Teal glow */}
        <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-[#0EA5E9]/[0.05] rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[30%] h-[30%] bg-[#06B6D4]/[0.04] rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent" />
      </div>

      <motion.div className="container relative z-10" style={{ opacity }}>
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <img
                src={ASSETS.icon}
                alt="SonicAtlas icon"
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl shadow-2xl"
              />
              <div>
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-white/40 mb-1">
                  Independent macOS App
                </p>
              </div>
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-white mb-6">
              The world is<br />
              <span className="text-white/40">your jukebox.</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/55 leading-relaxed max-w-xl mb-10 font-light">
              Explore 30,000+ live radio stations on an interactive globe. Spin the planet, tap a pin, and listen to any city on Earth — from Tokyo jazz to Algerian folk to New York blues.
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
              filename="SonicAtlas.dmg"
              className="group flex items-center gap-3 px-7 py-4 text-white font-semibold rounded-full transition-all duration-300 active:scale-95 shadow-lg shadow-[#0EA5E9]/20 cursor-pointer"
              style={{ backgroundColor: ACCENT }}
            >
              <Download className="w-5 h-5" />
              Download for macOS
              <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </DownloadButton>
            <span className="text-sm text-white/30 font-mono">
              v1.0 &middot; ~5 MB &middot; macOS 14+
            </span>
          </motion.div>
        </div>

        {/* Hero screenshot — the globe */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block absolute -right-8 bottom-8 w-[55%] max-w-[700px]"
        >
          <AppScreenshot src={ASSETS.screenshotGlobe} alt="SonicAtlas globe view" showTitlebar />
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
    icon: Globe,
    title: "Interactive 3D Globe",
    desc: "Powered by Apple MapKit with a dark theme. Spin, zoom, and tilt to discover live radio pins across every continent. Genre-colored markers let you spot Jazz, Rock, Electronic, and more at a glance.",
  },
  {
    icon: Radio,
    title: "30,000+ Live Stations",
    desc: "Backed by the Radio Browser API — a free, open-source community database. Every station has geo-coordinates, genre tags, language, bitrate, and codec info.",
  },
  {
    icon: Search,
    title: "Smart Filter Bar",
    desc: "Filter by 19 genre categories, 14 languages, or audio quality (128/192/320 kbps+). Live search by station name, country, or tag. All filters combine and update the globe instantly.",
  },
  {
    icon: Volume2,
    title: "Now Playing Bar",
    desc: "Bottom bar shows current station with live indicator, country, and bitrate. Play/Pause/Stop controls with animated audio wave visualization and volume slider.",
  },
  {
    icon: Heart,
    title: "Favorites & iCloud Sync",
    desc: "Heart any station to save it. Favorites sync across all your Macs via iCloud — no account or sign-in required. Recently played carousel for quick switching.",
  },
  {
    icon: Monitor,
    title: "Menu Bar Mini-Player",
    desc: "Shrink to a tiny globe icon in your menu bar. Popover shows current station, playback controls, volume, and recently played — keeps running in background.",
  },
  {
    icon: Headphones,
    title: "macOS Media Integration",
    desc: "Full Now Playing Info Center support — see station name and artwork in Control Center. Media keys and Touch Bar work for play/pause/stop.",
  },
];

function Features() {
  return (
    <section id="features" className="relative py-28 lg:py-40">
      <div className="container">
        <FadeIn>
          <div className="relative mb-20 lg:mb-28">
            <SectionNum num="01" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-[#0EA5E9] mb-4 relative">Features</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Tune into anywhere.<br />
              <span className="text-white/30">From everywhere.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 lg:gap-y-20">
          {FEATURES.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.08}>
              <div className="flex flex-col gap-5">
                <f.icon className="w-7 h-7 text-[#0EA5E9]" />
                <div>
                  <h3 className="font-semibold text-white/90 mb-2 text-lg">{f.title}</h3>
                  <p className="text-white/40 leading-relaxed text-sm">{f.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Screenshots ─── */
function Screenshots() {
  return (
    <section id="screenshots" className="relative py-28 lg:py-40">
      <div className="container">
        <FadeIn>
          <div className="relative mb-20 lg:mb-28 text-center">
            <SectionNum num="02" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-[#0EA5E9] mb-4 relative">Screenshots</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg mx-auto relative">
              Desktop-class,<br />
              <span className="text-white/30">pixel-perfect.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="space-y-16 lg:space-y-24">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="lg:order-2">
                <h3 className="font-serif text-2xl font-bold text-white/90 mb-3">Station Details</h3>
                <p className="text-white/40 leading-relaxed max-w-md">
                  Click a station pin to see its name, genre, country, and audio quality. Add to favorites, share, or start listening instantly. The globe smoothly animates to center on your selection.
                </p>
              </div>
              <AppScreenshot src={ASSETS.screenshotStation} alt="SonicAtlas station detail view" showTitlebar />
            </div>
          </FadeIn>
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white/90 mb-3">Menu Bar Player</h3>
                <p className="text-white/40 leading-relaxed max-w-md">
                  The app shrinks to a convenient popover in your menu bar for quick access. Control playback, adjust volume, and see what's playing without switching windows.
                </p>
              </div>
              <AppScreenshot src={ASSETS.screenshotMiniPlayer} alt="SonicAtlas mini-player in menu bar" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Tech Specs ─── */
const SPECS = [
  { icon: Command, label: "Platform", value: "macOS 14+ (Sonoma)" },
  { icon: Music, label: "Audio Engine", value: "AVFoundation" },
  { icon: Globe, label: "MapKit", value: "3D Globe View" },
  { icon: Languages, label: "UI Framework", value: "SwiftUI" },
  { icon: Gauge, label: "Performance", value: "Native Apple Silicon & Intel" },
  { icon: Cloud, label: "Sync", value: "iCloud (Favorites)" },
  { icon: Keyboard, label: "Shortcuts", value: "Media Keys, Command+F" },
  { icon: Monitor, label: "Display", value: "Multi-monitor support" },
];

function Specs() {
  return (
    <section id="specs" className="relative py-28 lg:py-40">
      <div className="container">
        <FadeIn>
          <div className="relative mb-20 lg:mb-28">
            <SectionNum num="03" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-[#0EA5E9] mb-4 relative">Tech Specs</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Built for the Mac.<br />
              <span className="text-white/30">By a Mac user.</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 lg:gap-12">
            {SPECS.map((s) => (
              <div key={s.label} className="flex flex-col gap-3">
                <s.icon className="w-6 h-6 text-[#0EA5E9]" />
                <div>
                  <p className="text-sm text-white/40 mb-0.5">{s.label}</p>
                  <p className="font-semibold text-white/80">{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Install Guide ─── */
function InstallGuide() {
  return (
    <section id="install" className="relative py-28 lg:py-40">
      <div className="container">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="04" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-[#0EA5E9] mb-4 relative">Get Started</p>
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
                { step: "1", title: "Download", desc: "Grab the DMG file — it's about 5 MB." },
                { step: "2", title: "Install", desc: "Open the DMG and drag SonicAtlas to your Applications folder." },
                { step: "3", title: "Explore", desc: "Launch and start spinning the globe. Tap any pin to listen live." },
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

          {/* How it works */}
          <FadeIn delay={0.1}>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-5 h-5 text-[#0EA5E9]" />
                <h3 className="font-serif text-lg font-semibold text-white/90">How It Works</h3>
              </div>
              <div className="space-y-4 text-sm text-white/40 leading-relaxed">
                <p>
                  SonicAtlas connects to the <a href="https://www.radio-browser.info/" target="_blank" rel="noopener" className="text-[#0EA5E9] hover:text-[#38BDF8] transition-colors">Radio Browser API</a>, a free community-maintained database of internet radio stations with geographic coordinates.
                </p>
                <p>
                  Each station appears as a colored pin on the globe — <span className="text-orange-400">orange for Jazz</span>, <span className="text-red-400">red for Rock</span>, <span className="text-cyan-400">cyan for Electronic</span>, and more. Smart clustering groups nearby stations at wider zoom levels.
                </p>
                <p>
                  No API key required. No rate limits. No backend. Everything runs locally on your Mac with zero configuration.
                </p>
              </div>
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
                Since SonicAtlas is distributed outside the App Store, macOS may quarantine it. Open Terminal and run:
              </p>
              <div className="bg-black/40 border border-white/[0.06] rounded-lg p-4 font-mono text-sm text-white/60">
                <span className="text-white/30">$</span> xattr -cr /Applications/SonicAtlas.app
              </div>
              <p>Then launch SonicAtlas again. This removes the quarantine flag and is safe to do.</p>
            </div>
          </div>
        </FadeIn>
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
            src={ASSETS.icon}
            alt="SonicAtlas"
            className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl mx-auto mb-8 shadow-2xl"
          />
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-bold leading-[1] text-white mb-4">
            Ready to explore?
          </h2>
          <p className="text-lg text-white/40 mb-10 max-w-md mx-auto">
            Independent, native, and no account required. 30,000+ stations await.
          </p>
          <DownloadButton
            url={ASSETS.dmgDownload}
            filename="SonicAtlas.dmg"
            className="inline-flex items-center gap-3 px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 active:scale-95 shadow-lg shadow-[#0EA5E9]/20 text-lg cursor-pointer"
            style={{ backgroundColor: ACCENT }}
          >
            <Download className="w-5 h-5" />
            Download SonicAtlas
          </DownloadButton>
          <p className="text-xs text-white/25 mt-4 font-mono">
            v1.0 &middot; macOS 14+ &middot; ~5 MB DMG
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function SonicAtlas() {
  useSEO({
    title: "SonicAtlas — Independent macOS Internet Radio Globe Explorer",
    description: "SonicAtlas is an independent macOS app that lets you explore 30,000+ live radio stations on an interactive 3D globe. Discover music from every country, filter by genre and language, and listen instantly.",
    keywords: "SonicAtlas, internet radio mac, radio globe explorer, indie radio app macOS, live radio stations, world radio player, macOS radio browser",
    ogUrl: "https://melodiq.sbs/sonicatlas",
    canonical: "https://melodiq.sbs/sonicatlas",
  });

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E8E4DF]">
      <AppNav currentApp="SonicAtlas" />
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
      <DownloadCTA />
      <FeedbackSection appName="SonicAtlas" accent="#0EA5E9" />
      <AppFooter currentApp="SonicAtlas" accent="#0EA5E9" />
    </div>
  );
}
