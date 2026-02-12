/*
  DESIGN: "Vinyl Noir" variant — QuickRes uses coral/orange (#F97316) accent.
  Menu bar resolution & system utility — compact, sleek, modern personality.
*/

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Download,
  Monitor,
  Moon,
  Eye,
  EyeOff,
  Gauge,
  Sparkles,
  Laptop,
  LayoutGrid,
} from "lucide-react";
import { AppNav, AppFooter } from "@/components/AppNav";
import { FeedbackSection } from "@/components/FeedbackSection";
import { DownloadButton } from "@/components/DownloadButton";
import { useSEO } from "@/hooks/useSEO";

const ACCENT = "#F97316";
const ACCENT_HOVER = "#FB923C";

const ASSETS = {
  icon: "https://private-us-east-1.manuscdn.com/sessionFile/8P7TK5wMX27jvm9wWAs1vD/sandbox/v3F2dPaf7M7wDPEb2Mnlff_1770584072646_na1fn_cXVpY2tyZXMtaWNvbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOFA3VEs1d01YMjdqdm05d1dBczF2RC9zYW5kYm94L3YzRjJkUGFmN003d0RQRWIyTW5sZmZfMTc3MDU4NDA3MjY0Nl9uYTFmbl9jWFZwWTJ0eVpYTXRhV052YmcucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=W0ubhF7e5lWVURGGdBGpY4h4Qv6J8kldNTaOszGJtNS5TVGvMZnr8HYikAYtzdvhUPf-Ua-6ciw8OBKTPzetQNYZFnDC3xUK9goS057ls4Qr1RhohAtw19fFlhxTQeKxbNaAiCpuuwAbScUAWufbHMusffyOldQomQKU2lNWYj66FJtFj6ceEVaCdmYp-Om0V34qr0EgU72TKUD3tTh6RHh9fn4FFyEjWrE1ouEQFJIFsQcTRsRIaNsHLeC2Hnp0GvSL0QPeUJbQUkpjzCsb6~W3p8H41Ho1raQ6-ThsIfbD9vPdlWWk8oEemzQxng4Jtu2SXUW8TNyIUtjtDcRrfQ__",
  heroBg: "https://private-us-east-1.manuscdn.com/sessionFile/8P7TK5wMX27jvm9wWAs1vD/sandbox/eCAp2DdBooAT8X8Xm933r3-img-4_1770584161000_na1fn_cXVpY2tyZXMtaGVybw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOFA3VEs1d01YMjdqdm05d1dBczF2RC9zYW5kYm94L2VDQXAyRGRCb29BVDhYOFhtOTMzcjMtaW1nLTRfMTc3MDU4NDE2MTAwMF9uYTFmbl9jWFZwWTJ0eVpYTXRhR1Z5YncuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=iYjHvrHW8Otw0bgyVrdjT3po9Pkfy021OOKT5LRQefeMnh~6oMrNEUBI1OcOlClzvDNqYGAlnqIvwPq08wtabJ-jWJuoKlsdpwWhMSRBNENahQLsjFTfXsDcE0Ulb0bhnA8wmtX6h-vAc1wvfeKDqaVMZ~lSqHWE0~wSInQdqrTV8i7qKrb1zglVlbcPGPNo9ic0oASwEO5eEc0mx-yNUA1--Ure7PU26BD~kB5Mz157ME2UDrN27PsPDJJMDjKwPfivuj8bfC7Ppr1d1VyoZKsW80I99J~V~eSvIpXZULy3b6w5nEhhMYsm5AFCZGDThqyUUsTRFxEdjMZIxffMug__",
  screenshot1: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/maEMOSLZuQgdNCNi.png",
  screenshot2: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/tXuPHDjuzmqcxAMs.png",
  demoVideo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/PxRmQzIzWKTobEnv.mov",
  dmgDownload: "https://github.com/NULLSHADExXx/quickres/releases/download/v1.0.0/QuickRes.dmg",
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

function AppScreenshot({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`quickres-window ${className}`}>
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2A2A2D] border-b border-white/[0.06]">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="text-[11px] text-white/30 ml-2 font-sans">QuickRes</span>
      </div>
      <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
    </div>
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
        <img src={ASSETS.heroBg} alt="QuickRes hero background" className="w-full h-[120%] object-cover" />
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
              <img src={ASSETS.icon} alt="QuickRes icon" className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl shadow-2xl" />
              <div>
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-white/40 mb-1">Independent macOS App</p>
              </div>
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-white mb-6">
              Your display.<br />
              <span className="text-white/30">Your control.</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/50 leading-relaxed max-w-xl mb-10">
              A lightweight menu bar utility that shows your display resolution, toggles dark mode, and hides desktop icons — all from a sleek glass popover. Built with Apple's Liquid Glass design system.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <DownloadButton
                url={ASSETS.dmgDownload}
                filename="QuickRes.dmg"
                className="inline-flex items-center gap-3 px-7 py-3.5 text-white font-semibold rounded-full transition-all duration-300 active:scale-95 shadow-lg text-base cursor-pointer"
                style={{ backgroundColor: ACCENT, boxShadow: `0 10px 30px ${ACCENT}30` }}
              >
                <Download className="w-5 h-5" />
                Download for Mac
              </DownloadButton>
              <span className="text-sm text-white/25 font-mono">macOS 26+ &middot; ~2 MB</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Features ─── */
function Features() {
  const features = [
    { icon: <Monitor className="w-5 h-5" />, title: "Resolution Display", desc: "See your current display resolution at a glance, right from the menu bar. Width, height, and scale factor." },
    { icon: <Moon className="w-5 h-5" />, title: "Dark Mode Toggle", desc: "Switch between light and dark mode instantly. No digging through System Settings." },
    { icon: <EyeOff className="w-5 h-5" />, title: "Hide Desktop Icons", desc: "One click to hide all desktop icons for a clean workspace. Perfect for presentations and screen recordings." },
    { icon: <Sparkles className="w-5 h-5" />, title: "Liquid Glass UI", desc: "Built with Apple's latest Liquid Glass design system. Ultra-thin materials with beautiful glass effects." },
    { icon: <Gauge className="w-5 h-5" />, title: "Lightweight", desc: "Under 2 MB. Lives in your menu bar with minimal memory footprint. No background processes." },
    { icon: <Laptop className="w-5 h-5" />, title: "Menu Bar Native", desc: "Appears as a floating popover from the menu bar. Click the display icon and you're in control." },
  ];

  return (
    <section id="features" className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-[#1A100A] via-[#0A0A0B] to-[#0A0A0B]" />
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#F97316]/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="01" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>Features</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              System control<br />
              <span className="text-white/30">reimagined.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feat, i) => (
            <FadeIn key={feat.title} delay={i * 0.06}>
              <div className="group p-6 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-500">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300"
                  style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}
                >
                  {feat.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold text-white/85 mb-2">{feat.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{feat.desc}</p>
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
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: "Menu Bar Popover", src: ASSETS.screenshot1, alt: "QuickRes menu bar popover showing display resolution" },
    { label: "System Controls", src: ASSETS.screenshot2, alt: "QuickRes system controls — dark mode and desktop icon toggles" },
  ];

  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="02" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>Screenshots</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Clean and<br />
              <span className="text-white/30">compact.</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-10">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === i
                    ? "text-white"
                    : "text-white/40 bg-white/[0.03] border border-white/[0.06] hover:text-white/60"
                }`}
                style={activeTab === i ? { backgroundColor: ACCENT } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="max-w-lg">
            <AppScreenshot
              src={tabs[activeTab].src}
              alt={tabs[activeTab].alt}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Demo Video ─── */
function DemoVideo() {
  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-[#1A100A] via-[#0A0A0B] to-[#0A0A0B]" />
      </div>
      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="03" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>See It In Action</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Watch the<br />
              <span className="text-white/30">demo.</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 lg:p-8">
            <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-4">Demo Video</p>
            <video
              src={ASSETS.demoVideo}
              controls
              playsInline
              className="w-full rounded-lg shadow-2xl"
            />
            <p className="text-xs text-white/30 mt-3">Watch QuickRes toggle dark mode, display resolution info, and hide desktop icons — all from the menu bar.</p>
          </div>
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
            <SectionNum num="04" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>Technical Details</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Minimal footprint.<br />
              <span className="text-white/30">Maximum utility.</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-8 lg:p-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">Operating System</p>
                <p className="text-sm text-white/60">macOS 26.0 or later</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">App Size</p>
                <p className="text-sm text-white/60">~2 MB</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">Design System</p>
                <p className="text-sm text-white/60">Apple Liquid Glass</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">Dependencies</p>
                <p className="text-sm text-white/60">Zero — 100% native Swift</p>
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
        <div className="w-full h-full bg-gradient-to-br from-[#1A100A] via-[#0A0A0B] to-[#0A0A0B]" />
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="05" />
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
                { step: "1", title: "Download", desc: "Grab the DMG from this page." },
                { step: "2", title: "Install", desc: "Open the DMG and drag QuickRes to Applications." },
                { step: "3", title: "Launch", desc: "Open QuickRes. It appears as a display icon in your menu bar." },
                { step: "4", title: "Use it", desc: "Click the icon to see resolution, toggle dark mode, or hide desktop icons." },
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
            <div className="space-y-6">
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-8">
                <h3 className="font-serif text-lg font-semibold text-white/80 mb-4">Troubleshooting</h3>
                <div className="space-y-4 text-sm text-white/40 leading-relaxed">
                  <p>
                    <strong className="text-white/60">macOS says the app is damaged?</strong>{" "}
                    Open Terminal and run:
                  </p>
                  <div className="bg-black/40 border border-white/[0.06] rounded-lg p-4 font-mono text-sm text-white/60">
                    <span className="text-white/30">$</span> xattr -cr /Applications/QuickRes.app
                  </div>
                  <p>Then launch QuickRes again.</p>
                  <p>
                    <strong className="text-white/60">Dark Mode toggle not working?</strong>{" "}
                    Grant Automation permissions when prompted. Go to System Settings → Privacy &amp; Security → Automation and enable QuickRes.
                  </p>
                </div>
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
          <img src={ASSETS.icon} alt="QuickRes" className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl mx-auto mb-8 shadow-2xl" />
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-bold leading-[1] text-white mb-4">
            Take control of your display.
          </h2>
          <p className="text-lg text-white/40 mb-10 max-w-md mx-auto">
            Independent, native, and under 2 MB. Lives in your menu bar.
          </p>
          <DownloadButton
            url={ASSETS.dmgDownload}
            filename="QuickRes.dmg"
            className="inline-flex items-center gap-3 px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 active:scale-95 shadow-lg text-lg cursor-pointer"
            style={{ backgroundColor: ACCENT, boxShadow: `0 10px 30px ${ACCENT}20` }}
          >
            <Download className="w-5 h-5" />
            Download QuickRes
          </DownloadButton>
          <p className="text-xs text-white/25 mt-4 font-mono">
            v1.0 &middot; macOS 26+ &middot; ~2 MB DMG
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function QuickRes() {
  useSEO({
    title: "QuickRes — Independent macOS Menu Bar Resolution & System Utility",
    description: "QuickRes is an independent macOS menu bar utility for display resolution info, dark mode toggle, and desktop icons toggle. One-click system controls from your menu bar.",
    keywords: "QuickRes, macOS resolution utility, display resolution mac, dark mode toggle mac, desktop icons toggle, menu bar utility macOS, screen resolution info, indie mac system utility, one-click dark mode",
    ogUrl: "https://melodiq.sbs/quickres",
    canonical: "https://melodiq.sbs/quickres",
  });

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E8E4DF]">
      <AppNav currentApp="QuickRes" />
      <Hero />
      <div className="editorial-rule" />
      <Features />
      <div className="editorial-rule" />
      <Screenshots />
      <div className="editorial-rule" />
      <DemoVideo />
      <div className="editorial-rule" />
      <Specs />
      <div className="editorial-rule" />
      <InstallGuide />
      <div className="editorial-rule" />
      <DownloadCTA />
      <FeedbackSection appName="QuickRes" accent={ACCENT} />
      <AppFooter currentApp="QuickRes" accent={ACCENT} />
    </div>
  );
}
