/*
  DESIGN: "Vinyl Noir" variant — DevSnips uses amber (#F59E0B) accent.
  DevSnips is a MENU BAR DEVELOPER UTILITY with 3 tools:
  1. Caffeine — prevent display sleep
  2. Color Picker — native eyedropper, hex to clipboard
  3. Network Monitor — real-time connectivity status
  Menu bar only (scissors icon), macOS 14+, Swift 5+, SwiftUI, Glass-morphism UI.
*/

import { useEffect, useRef, useState } from "react";
import { DownloadButton } from "@/components/DownloadButton";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Download,
  Coffee,
  Pipette,
  Wifi,
  Scissors,
  Zap,
} from "lucide-react";
import { AppNav, AppFooter } from "@/components/AppNav";
import { FeedbackSection } from "@/components/FeedbackSection";
import { useSEO } from "@/hooks/useSEO";

const ACCENT = "#F59E0B";
const ACCENT_HOVER = "#FBBF24";

const ASSETS = {
  icon: "https://private-us-east-1.manuscdn.com/sessionFile/8P7TK5wMX27jvm9wWAs1vD/sandbox/v3F2dPaf7M7wDPEb2Mnlff_1770584072645_na1fn_ZGV2c25pcHMtaWNvbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOFA3VEs1d01YMjdqdm05d1dBczF2RC9zYW5kYm94L3YzRjJkUGFmN003d0RQRWIyTW5sZmZfMTc3MDU4NDA3MjY0NV9uYTFmbl9aR1YyYzI1cGNITXRhV052YmcucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=qvLk8KYFwCH7BFKnuBNkgVBYP4l82UID3U7zaIo~jTq7-fQU4T8H2zgb5mKs3GCJH1J8nnaJEBgzH3cr52ANOI6WAOtApW6k~EVZ-ZzWjSQGKtbbx2rfc6xAMLfst3~p-nbVgxwds4Ge-uN0aMm1tr1VJGaDwuRo9rVLLNC5TFkhyIQxh9eP1qkdQzwR1SuC~1VDXprqQt6Mf~xh3ahsFqYMRrzvllOWPGcWbvI0PzY7NpvRgHvu33KjrL1GuNlcj~mWfBu0Z4-gHEwliIF-UBsA25JzRZfysyc1C2KsiSz6OckUxAkCGByXQQxuZzkF59PaDMzowG54cgbRXEpJIQ__",
  heroBg: "https://private-us-east-1.manuscdn.com/sessionFile/8P7TK5wMX27jvm9wWAs1vD/sandbox/eCAp2DdBooAT8X8Xm933r3-img-2_1770584158000_na1fn_ZGV2c25pcHMtaGVybw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOFA3VEs1d01YMjdqdm05d1dBczF2RC9zYW5kYm94L2VDQXAyRGRCb29BVDhYOFhtOTMzcjMtaW1nLTJfMTc3MDU4NDE1ODAwMF9uYTFmbl9aR1YyYzI1cGNITXRhR1Z5YncuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=OASsqHbX8omvWte~tcFclFODh7UfHqpiKZ2mPuHAkpv-U5r-ArR8dBK5iTaM2S2~72QUMjiwBo2EucXpagvQ6ouRijmYfhG2Vv20l088HHtraRkaOR70KMUYXutPv3wT-zlnEcMMgM7znKk8vKUImYl12xu9C7mqX1vToaa7AOvFF8mXzutrBcNNy1LzizNejwWeZTLmqGGadpmU7ImafQtZTEWmvoLklZcfn0NkLri~Na38PsywN581bf4FtyHfGa0qeRiN4t2t8Bgd14oYCiox920gd~ogrSrKSOlmjPT1j78CZgUR5mZji~ZgxKwfNiZVMZRnfC9EgFiABhoZ3Q__",
  screenshot1: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/fyHeRAckfUkectcf.png",
  screenshot2: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/sXYcStyTwgTdJozy.png",
  demoVideo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/lGgOLQaalqYqjwYk.mov",
  dmgDownload: "https://github.com/NULLSHADExXx/devsnips/releases/download/v1.0.0/DevSnips.dmg",
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
        <img src={ASSETS.heroBg} alt="" className="w-full h-[120%] object-cover" />
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
              <img src={ASSETS.icon} alt="DevSnips icon" className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl shadow-2xl" />
              <div>
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-white/40 mb-1">Independent macOS App</p>
              </div>
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-white mb-6">
              Three tools.<br />
              <span className="text-white/30">One menu bar.</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/50 leading-relaxed max-w-xl mb-10">
              Keep your display awake, pick colors with the native eyedropper, and monitor network status — all from a beautiful glass-morphism popover in your menu bar. No Dock icon, no clutter.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <DownloadButton
                url={ASSETS.dmgDownload}
                filename="DevSnips.dmg"
                className="inline-flex items-center gap-3 px-7 py-3.5 text-black font-semibold rounded-full transition-all duration-300 active:scale-95 shadow-lg text-base cursor-pointer"
                style={{ backgroundColor: ACCENT, boxShadow: `0 10px 30px ${ACCENT}30` }}
              >
                <Download className="w-5 h-5" />
                Download for Mac
              </DownloadButton>
              <span className="text-sm text-white/25 font-mono">macOS 14+ &middot; Apple Silicon &amp; Intel</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Features ─── */
function Features() {
  const tools = [
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Caffeine",
      desc: "Prevent your Mac's display from sleeping during long-running tasks. Uses IOPMAssertionCreateWithName with the PreventUserIdleDisplaySleep assertion type. The assertion is automatically released when toggled off or when the app quits.",
      detail: "Toggle on → display stays awake. Toggle off → normal sleep behavior resumes.",
    },
    {
      icon: <Pipette className="w-6 h-6" />,
      title: "Color Picker",
      desc: "Opens macOS's native color sampler (eyedropper tool). After selecting a color, it converts it to sRGB hex format (#RRGGBB) and automatically copies the hex code to your clipboard.",
      detail: "Click 'Pick' → eyedropper appears → click any pixel → hex code copied.",
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "Network Monitor",
      desc: "Continuously monitors network connectivity using NWPathMonitor. Shows real-time status: Active (connected), Offline (disconnected), or Checking (requires connection).",
      detail: "Runs as a singleton service, persisting throughout the app's lifetime.",
    },
  ];

  return (
    <section id="features" className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-[#1A1408] via-[#0A0A0B] to-[#0A0A0B]" />
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#F59E0B]/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="01" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>The Three Tools</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Essential utilities<br />
              <span className="text-white/30">for developers.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="space-y-8">
          {tools.map((tool, i) => (
            <FadeIn key={tool.title} delay={i * 0.08}>
              <div className="group p-8 lg:p-10 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-500">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
                    style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}
                  >
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-semibold text-white/85 mb-3">{tool.title}</h3>
                    <p className="text-sm text-white/45 leading-relaxed mb-3">{tool.desc}</p>
                    <p className="text-xs text-white/30 font-mono leading-relaxed">{tool.detail}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Screenshots & Demo ─── */
function Screenshots() {
  const [activeTab, setActiveTab] = useState<"screenshots" | "video">("screenshots");

  return (
    <section id="screenshots" className="relative py-28 lg:py-40 overflow-hidden">
      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="02" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>See It In Action</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Glass-morphism<br />
              <span className="text-white/30">meets function.</span>
            </h2>
          </div>
        </FadeIn>

        {/* Tab switcher */}
        <FadeIn delay={0.05}>
          <div className="flex gap-2 mb-10">
            <button
              onClick={() => setActiveTab("screenshots")}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "screenshots"
                  ? "text-black"
                  : "text-white/40 bg-white/[0.04] hover:text-white/60"
              }`}
              style={activeTab === "screenshots" ? { backgroundColor: ACCENT } : {}}
            >
              Screenshots
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "video"
                  ? "text-black"
                  : "text-white/40 bg-white/[0.04] hover:text-white/60"
              }`}
              style={activeTab === "video" ? { backgroundColor: ACCENT } : {}}
            >
              Demo Video
            </button>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          {activeTab === "screenshots" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 lg:p-8">
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-4">Popover Panel</p>
                <img
                  src={ASSETS.screenshot1}
                  alt="DevSnips popover showing Caffeine toggle, Color Picker with hex code, and Network status"
                  className="w-full rounded-lg shadow-2xl"
                />
                <p className="text-xs text-white/30 mt-3">Caffeine toggle, Color Picker with hex value, and Network status — all in one glass panel.</p>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 lg:p-8">
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-4">Menu Bar Integration</p>
                <img
                  src={ASSETS.screenshot2}
                  alt="DevSnips scissors icon in macOS menu bar with popover open"
                  className="w-full rounded-lg shadow-2xl"
                />
                <p className="text-xs text-white/30 mt-3">The scissors icon sits in your menu bar. Click it to reveal the glass-morphism popover.</p>
              </div>
            </div>
          ) : (
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 lg:p-8">
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-4">Demo Video</p>
              <video
                src={ASSETS.demoVideo}
                controls
                playsInline
                className="w-full rounded-lg shadow-2xl"
                poster={ASSETS.screenshot1}
              />
              <p className="text-xs text-white/30 mt-3">Watch DevSnips in action — toggling Caffeine, picking colors, and monitoring network status.</p>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Specs ─── */
function Specs() {
  return (
    <section id="specs" className="relative py-28 lg:py-40 overflow-hidden">
      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="03" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>Technical Details</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Native &amp; lightweight.<br />
              <span className="text-white/30">Zero dependencies.</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-8 lg:p-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">Operating System</p>
                <p className="text-sm text-white/60">macOS 14.0 (Sonoma) or later</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">Built With</p>
                <p className="text-sm text-white/60">Swift 5.0+ &amp; SwiftUI</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">Glass Effect</p>
                <p className="text-sm text-white/60">macOS 26+ (graceful fallback)</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">Interface</p>
                <p className="text-sm text-white/60">Menu bar only — no Dock icon</p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-8 bg-white/[0.02] border border-white/[0.06] rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-5 h-5" style={{ color: ACCENT }} />
              <h3 className="font-serif text-lg font-semibold text-white/90">Under the Hood</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-white/40 leading-relaxed">
              <div>
                <h4 className="text-white/60 font-semibold mb-2 flex items-center gap-2">
                  <Coffee className="w-4 h-4" style={{ color: ACCENT }} /> Caffeine
                </h4>
                <p>Uses <span className="font-mono text-white/50">IOPMAssertionCreateWithName</span> from IOKit for display sleep prevention. Assertion auto-released on toggle off or quit.</p>
              </div>
              <div>
                <h4 className="text-white/60 font-semibold mb-2 flex items-center gap-2">
                  <Pipette className="w-4 h-4" style={{ color: ACCENT }} /> Color Picker
                </h4>
                <p>Uses <span className="font-mono text-white/50">NSColorSampler</span> from AppKit for native eyedropper. Converts to sRGB hex and copies to clipboard automatically.</p>
              </div>
              <div>
                <h4 className="text-white/60 font-semibold mb-2 flex items-center gap-2">
                  <Wifi className="w-4 h-4" style={{ color: ACCENT }} /> Network Monitor
                </h4>
                <p>Uses <span className="font-mono text-white/50">NWPathMonitor</span> from the Network framework. Runs as a singleton for persistent monitoring throughout the app's lifetime.</p>
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
        <div className="w-full h-full bg-gradient-to-br from-[#1A1408] via-[#0A0A0B] to-[#0A0A0B]" />
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="04" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>Get Started</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Up and running<br />
              <span className="text-white/30">in seconds.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <FadeIn>
            <div className="space-y-8">
              {[
                { step: "1", title: "Download", desc: "Grab the DMG file from this page." },
                { step: "2", title: "Install", desc: "Open the DMG and drag DevSnips to Applications." },
                { step: "3", title: "Launch", desc: "Open DevSnips. Look for the scissors icon (✂️) in your menu bar. Click it to open the glass panel." },
                { step: "4", title: "Use", desc: "Toggle Caffeine to keep your display awake, pick any color from your screen, and check your network status — all from one popover." },
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

          <FadeIn delay={0.1}>
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-8">
              <h3 className="font-serif text-lg font-semibold text-white/80 mb-4">Troubleshooting</h3>
              <div className="space-y-4 text-sm text-white/40 leading-relaxed">
                <p>
                  <strong className="text-white/60">macOS says the app is damaged?</strong>{" "}
                  Since DevSnips is distributed outside the App Store, macOS may quarantine it. Open Terminal and run:
                </p>
                <div className="bg-black/40 border border-white/[0.06] rounded-lg p-4 font-mono text-sm text-white/60">
                  <span className="text-white/30">$</span> xattr -cr /Applications/DevSnips.app
                </div>
                <p>Then launch DevSnips again. This removes the quarantine flag and is safe to do.</p>
                <p>
                  <strong className="text-white/60">Menu bar icon not visible?</strong>{" "}
                  DevSnips runs as a menu bar-only application (no Dock icon). If you can't see the scissors icon, check System Settings to make sure your menu bar isn't hiding icons.
                </p>
              </div>
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
          <img src={ASSETS.icon} alt="DevSnips" className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl mx-auto mb-8 shadow-2xl" />
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-bold leading-[1] text-white mb-4">
            Your dev toolkit, one click away.
          </h2>
          <p className="text-lg text-white/40 mb-10 max-w-md mx-auto">
            Independent, native, and lives in your menu bar. No account required.
          </p>
          <DownloadButton
            url={ASSETS.dmgDownload}
            filename="DevSnips.dmg"
            className="inline-flex items-center gap-3 px-8 py-4 text-black font-semibold rounded-full transition-all duration-300 active:scale-95 shadow-lg text-lg cursor-pointer"
            style={{ backgroundColor: ACCENT, boxShadow: `0 10px 30px ${ACCENT}20` }}
          >
            <Download className="w-5 h-5" />
            Download DevSnips
          </DownloadButton>
          <p className="text-xs text-white/25 mt-4 font-mono">
            v1.0 &middot; macOS 14+ &middot; Apple Silicon &amp; Intel
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function DevSnips() {
  useSEO({
    title: "DevSnips — Independent macOS Menu Bar Developer Utility",
    description: "DevSnips is an independent macOS menu bar utility with 3 developer tools: Caffeine (prevent sleep), Color Picker (hex/RGB/HSL), and Network Monitor (real-time bandwidth). Built with Swift and SwiftUI.",
    keywords: "DevSnips, macOS developer tools, menu bar utility mac, caffeine mac, color picker mac, network monitor mac, prevent sleep mac, hex color picker, bandwidth monitor macOS, indie developer tools",
    ogUrl: "https://melodiq.sbs/devsnips",
    canonical: "https://melodiq.sbs/devsnips",
  });

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E8E4DF]">
      <AppNav currentApp="DevSnips" />
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
      <FeedbackSection appName="DevSnips" accent={ACCENT} />
      <AppFooter currentApp="DevSnips" accent={ACCENT} />
    </div>
  );
}
