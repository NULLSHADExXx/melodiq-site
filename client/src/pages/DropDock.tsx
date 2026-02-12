/*
  DESIGN: "Vinyl Noir" variant — DropDock uses steel-blue (#3B82C4) accent
  instead of MelodiQ's magenta, matching the app's blue UI.
  Same dark editorial foundation, same typography system.
*/

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, LayoutGroup } from "framer-motion";
import {
  Download,
  FolderOpen,
  Zap,
  Timer,
  Palette,
  Command,
  ArrowRight,
  Apple,
  ChevronDown,
  Settings,
  Layers,
  FileText,
  Archive,
  Keyboard,
  Send,
  Mail,
  MousePointerClick,
} from "lucide-react";
import { Link } from "wouter";
import { AppNav, AppFooter } from "@/components/AppNav";
import { FeedbackSection } from "@/components/FeedbackSection";
import { DownloadButton } from "@/components/DownloadButton";
import { useSEO } from "@/hooks/useSEO";

const ACCENT = "#3B82C4";
const ACCENT_HOVER = "#4A93D5";

const ASSETS = {
  icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/hpOSiIBOuZEPvhPo.png",
  screenshotSettings: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/VyAUnOYlXzvJuhPH.png",
  screenshotShelf: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/ELuuCUfYqPmLOtyk.png",
  screenshotMenu: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/YMJHltxSCeulHXbe.png",
  dmgDownload: "https://github.com/NULLSHADExXx/DropDock/releases/download/v1.0.0/DropDock.dmg",
  melodiqIcon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/TFLbzLpsIxnxNhCK.png",
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
    <div className={`dropdock-window ${className}`}>
      {showTitlebar && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2A2A2D] border-b border-white/[0.06]">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          <span className="text-[11px] text-white/30 ml-2 font-sans">DropDock</span>
        </div>
      )}
      <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
    </div>
  );
}

/* ─── Nav ─── */
/* Nav is now handled by shared AppNav component */

/* ─── Hero ─── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-end pb-20 lg:pb-28 pt-24 lg:pt-32 overflow-hidden grain-overlay">
      {/* Background — deep blue gradient to match DropDock's UI */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-[#0A1628] via-[#0E1A2E] to-[#0A0A0B]" />
        {/* Subtle blue glow */}
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[#3B82C4]/[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[#3B82C4]/[0.04] rounded-full blur-[100px]" />
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
                alt="DropDock icon"
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl shadow-2xl"
              />
              <div>
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-white/40 mb-1">
                  Independent macOS App
                </p>
              </div>
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-white mb-6">
              Drop it.<br />
              <span className="text-white/40">Sort it later.</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/55 leading-relaxed max-w-xl mb-10 font-light">
              A floating shelf for your Mac — drag files anywhere, decide where they go when you're ready. Rules-based sorting, batch operations, and auto-cleanup built in.
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
              filename="DropDock.dmg"
              className="group flex items-center gap-3 px-7 py-4 text-white font-semibold rounded-full transition-all duration-300 active:scale-95 shadow-lg shadow-[#3B82C4]/20 cursor-pointer"
              style={{ backgroundColor: ACCENT }}
            >
              <Download className="w-5 h-5" />
              Download for macOS
              <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </DownloadButton>
            <span className="text-sm text-white/30 font-mono">
              v1.0 &middot; ~800 KB &middot; macOS 13+
            </span>
          </motion.div>
        </div>

        {/* Hero screenshot — the shelf */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block absolute -right-8 bottom-16 w-[50%] max-w-[650px]"
        >
          <AppScreenshot src={ASSETS.screenshotShelf} alt="DropDock floating shelf" />
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
    icon: Layers,
    title: "Floating Shelf",
    desc: "Press \u2318\u21E7D to summon a floating drop zone. Drag files from anywhere — Desktop, Downloads, email, browser. Stays visible across all Spaces.",
  },
  {
    icon: Palette,
    title: "Color-Coded Files",
    desc: "Documents get blue, images green, archives red, misc yellow. Instant visual scanning without reading filenames.",
  },
  {
    icon: Zap,
    title: "Rules-Based Sorting",
    desc: "Create rules like \"PDFs with 'invoice' go to ~/Documents/Invoices\". Set once, runs forever. Priority-ordered execution.",
  },
  {
    icon: FolderOpen,
    title: "Batch Operations",
    desc: "Multi-select with \u2318+click. Move, rename with patterns, create ZIP archives, or convert images between formats — all at once.",
  },
  {
    icon: Timer,
    title: "Auto-Cleanup",
    desc: "Files automatically move to an Unsorted folder after a configurable time. Session persistence survives reboots.",
  },
  {
    icon: Settings,
    title: "Fully Customizable",
    desc: "Editable shortcuts, adjustable shelf opacity and position, configurable file limits, toggle previews and badge counts.",
  },
];

function Features() {
  return (
    <section id="features" className="relative py-28 lg:py-40">
      <div className="container">
        <FadeIn>
          <div className="relative mb-20 lg:mb-28">
            <SectionNum num="01" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>Features</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              The inbox between<br />
              <span className="text-white/30">"where files land"<br />and "where files live."</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 lg:gap-y-20">
          {FEATURES.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.08}>
              <div className="group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-[#3B82C4]/30 group-hover:bg-[#3B82C4]/[0.06] transition-all duration-500">
                    <f.icon className="w-5 h-5 text-white/40 group-hover:text-[#3B82C4] transition-colors duration-500" />
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
  { src: ASSETS.screenshotShelf, label: "Shelf", desc: "The floating drop zone — drag files here from anywhere." },
  { src: ASSETS.screenshotSettings, label: "Settings", desc: "Shelf behavior, auto-cleanup, and appearance options." },
  { src: ASSETS.screenshotMenu, label: "Menu Bar", desc: "Quick access from the menu bar with keyboard shortcut." },
];

function Screenshots() {
  const [active, setActive] = useState(0);

  return (
    <section id="screenshots" className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-[#0A0A0B] via-[#0C1420] to-[#0A0A0B] opacity-60" />
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="02" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>Screenshots</p>
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
                        layoutId="dd-screenshot-indicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#3B82C4] rounded-full hidden lg:block"
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
              <div className="absolute -inset-20 bg-[#3B82C4]/[0.04] rounded-full blur-3xl -z-10 pointer-events-none" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Specs ─── */
function Specs() {
  return (
    <section id="specs" className="relative py-28 lg:py-40">
      <div className="container">
        <FadeIn>
          <div className="relative mb-20 lg:mb-28">
            <SectionNum num="03" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>Technical</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Under the hood.
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Supported file types */}
          <FadeIn>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-5 h-5" style={{ color: ACCENT }} />
                <h3 className="font-serif text-xl font-semibold text-white/90">Supported File Types</h3>
              </div>
              <div className="space-y-6">
                {[
                  { label: "Documents", types: ["PDF", "DOC", "DOCX", "TXT", "RTF", "Pages", "Numbers", "Keynote"] },
                  { label: "Images", types: ["JPG", "PNG", "GIF", "HEIC", "WebP", "BMP", "TIFF"] },
                  { label: "Media", types: ["MP4", "MOV", "MKV", "MP3", "WAV", "FLAC", "M4A"] },
                  { label: "Archives", types: ["ZIP", "RAR", "7Z", "TAR", "GZ"] },
                  { label: "Code", types: ["Swift", "JS", "Python", "HTML", "CSS", "JSON", "C++"] },
                ].map((group) => (
                  <div key={group.label}>
                    <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">{group.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.types.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1.5 text-xs font-mono font-medium text-white/50 bg-white/[0.04] border border-white/[0.06] rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Keyboard shortcuts */}
          <FadeIn delay={0.1}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Keyboard className="w-5 h-5" style={{ color: ACCENT }} />
                <h3 className="font-serif text-xl font-semibold text-white/90">Keyboard Shortcuts</h3>
              </div>
              <div className="space-y-0 border border-white/[0.06] rounded-lg overflow-hidden">
                {[
                  ["\u2318\u21E7D", "Toggle Shelf"],
                  ["\u2318\u21E7A", "Quick Add from Clipboard"],
                  ["\u2318\u21E7R", "Show Sort Rules"],
                  ["\u2318,", "Open Settings"],
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
              <p className="text-xs text-white/25 mt-3 font-mono">All shortcuts fully customizable in Settings</p>

              {/* Comparison */}
              <div className="mt-10">
                <div className="flex items-center gap-3 mb-6">
                  <Archive className="w-5 h-5" style={{ color: ACCENT }} />
                  <h3 className="font-serif text-xl font-semibold text-white/90">vs. Alternatives</h3>
                </div>
                <div className="space-y-0 border border-white/[0.06] rounded-lg overflow-hidden text-sm">
                  {[
                    ["Finder", "Single-pane, no holding area"],
                    ["Path Finder", "Overkill dual-pane"],
                    ["Yoink / Dropover", "No sorting rules, no persistence"],
                    ["Desktop folders", "Manual, no visual feedback"],
                  ].map(([tool, diff], i) => (
                    <div
                      key={tool}
                      className={`flex items-center justify-between px-5 py-3 ${
                        i > 0 ? "border-t border-white/[0.04]" : ""
                      }`}
                    >
                      <span className="text-white/50 font-medium">{tool}</span>
                      <span className="text-white/30 text-xs text-right">{diff}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* System requirements */}
        <FadeIn delay={0.15}>
          <div className="mt-20 lg:mt-28 pt-16 border-t border-white/[0.06]">
            <h3 className="font-serif text-xl font-semibold text-white/90 mb-8">System Requirements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">Operating System</p>
                <p className="text-sm text-white/60">macOS 13.0 (Ventura) or later</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">Architecture</p>
                <p className="text-sm text-white/60">Apple Silicon &amp; Intel</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">Download Size</p>
                <p className="text-sm text-white/60">~800 KB</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">Permissions</p>
                <p className="text-sm text-white/60">File access (user-selected only)</p>
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
        <div className="w-full h-full bg-gradient-to-br from-[#0C1420] via-[#0A0A0B] to-[#0A0A0B]" />
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
          {/* Install steps */}
          <FadeIn>
            <div className="space-y-8">
              {[
                { step: "1", title: "Download", desc: "Grab the DMG file — it's under 1 MB." },
                { step: "2", title: "Install", desc: "Open the DMG and drag DropDock to your Applications folder." },
                { step: "3", title: "Launch", desc: "Open from Applications. Grant file access when prompted." },
                { step: "4", title: "Use it", desc: "Press \u2318\u21E7D to show the shelf. Start dragging files." },
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

          {/* Security & Privacy */}
          <FadeIn delay={0.1}>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <MousePointerClick className="w-5 h-5" style={{ color: ACCENT }} />
                <h3 className="font-serif text-lg font-semibold text-white/90">Security &amp; Privacy</h3>
              </div>
              <div className="space-y-4 text-sm text-white/40 leading-relaxed">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82C4] mt-2 shrink-0" />
                  <p><strong className="text-white/60">100% Native</strong> — No external dependencies, no Electron</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82C4] mt-2 shrink-0" />
                  <p><strong className="text-white/60">No Internet</strong> — Never connects to external servers</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82C4] mt-2 shrink-0" />
                  <p><strong className="text-white/60">Local Storage</strong> — All data stays on your Mac</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82C4] mt-2 shrink-0" />
                  <p><strong className="text-white/60">No Telemetry</strong> — Zero data collection or tracking</p>
                </div>
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
                Since DropDock is distributed outside the App Store, macOS may quarantine it. Open Terminal and run:
              </p>
              <div className="bg-black/40 border border-white/[0.06] rounded-lg p-4 font-mono text-sm text-white/60">
                <span className="text-white/30">$</span> xattr -cr /Applications/DropDock.app
              </div>
              <p>Then launch DropDock again. This removes the quarantine flag and is safe to do.</p>
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
            alt="DropDock"
            className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl mx-auto mb-8 shadow-2xl"
          />
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-bold leading-[1] text-white mb-4">
            Ready to organize?
          </h2>
          <p className="text-lg text-white/40 mb-10 max-w-md mx-auto">
            Independent, native, and under 1 MB. No account required.
          </p>
          <DownloadButton
            url={ASSETS.dmgDownload}
            filename="DropDock.dmg"
            className="inline-flex items-center gap-3 px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 active:scale-95 shadow-lg shadow-[#3B82C4]/20 text-lg cursor-pointer"
            style={{ backgroundColor: ACCENT }}
          >
            <Download className="w-5 h-5" />
            Download DropDock
          </DownloadButton>
          <p className="text-xs text-white/25 mt-4 font-mono">
            v1.0 &middot; macOS 13+ &middot; ~800 KB DMG
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
            <img src={ASSETS.icon} alt="DropDock" className="w-7 h-7 rounded-lg" />
            <div>
              <span className="font-serif text-base font-semibold text-white/70">DropDock</span>
              <p className="text-xs text-white/25 mt-0.5">The missing inbox between "where files land" and "where files live."</p>
            </div>
          </div>

          {/* Right: Contact */}
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="mailto:NULLSHADExXx@proton.me"
              className="group flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-lg hover:border-[#3B82C4]/30 hover:bg-[#3B82C4]/[0.04] transition-all duration-300"
            >
              <Mail className="w-4 h-4 text-white/30 group-hover:text-[#3B82C4] transition-colors duration-300" />
              <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300">NULLSHADExXx@proton.me</span>
            </a>
            <a
              href="https://t.me/NULLSHADExXx"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-lg hover:border-[#3B82C4]/30 hover:bg-[#3B82C4]/[0.04] transition-all duration-300"
            >
              <Send className="w-4 h-4 text-white/30 group-hover:text-[#3B82C4] transition-colors duration-300" />
              <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300">@NULLSHADExXx</span>
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-white/20">&copy; 2026 DropDock</span>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[11px] text-white/20 hover:text-white/40 transition-colors">
              MelodiQ
            </Link>
            <span className="text-[11px] text-white/15 font-mono">Bug reports &amp; feedback welcome</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function DropDock() {
  useSEO({
    title: "DropDock — Independent macOS Drop Zone & File Organizer",
    description: "DropDock is an independent macOS floating shelf and file organizer. Drag files anywhere, sort them later with rules-based automation, batch operations, and auto-cleanup.",
    keywords: "DropDock, macOS drop zone, file organizer mac, drag and drop mac, floating dock mac, file management macOS, indie mac utility, batch file operations, rules-based sorting",
    ogUrl: "https://melodiq.sbs/dropdock",
    canonical: "https://melodiq.sbs/dropdock",
  });

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E8E4DF]">
      <AppNav currentApp="DropDock" />
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
      <FeedbackSection appName="DropDock" accent="#3B82C4" />
      <AppFooter currentApp="DropDock" accent="#3B82C4" />
    </div>
  );
}
