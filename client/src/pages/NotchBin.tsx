/*
  DESIGN: "Vinyl Noir" variant — NotchBin uses a warm amber/gold (#F59E0B) accent
  to evoke the MacBook notch's warm glow. Premium landing page with video demo,
  feature showcase, screenshot gallery, and .pkg installation guide.
*/

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, LayoutGroup } from "framer-motion";
import {
  Download,
  ArrowRight,
  ChevronDown,
  Play,
  Pause,
  Clipboard,
  Monitor,
  Layers,
  Shield,
  Zap,
  FolderOpen,
  Volume2,
  Sun,
  Camera,
  GitBranch,
  Coffee,
  Cpu,
  Lock,
  Keyboard,
  Settings,
  Package,
  AlertTriangle,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { AppNav, AppFooter } from "@/components/AppNav";
import { FeedbackSection } from "@/components/FeedbackSection";
import { DownloadButton } from "@/components/DownloadButton";
import { useSEO } from "@/hooks/useSEO";

const ACCENT = "#F59E0B";
const ACCENT_HOVER = "#FBBF24";

const ASSETS = {
  icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/mLcRsRCOFrazGyxT.png",
  video: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/TvfFxSxCQXwqFDWL.mp4",
  ssVolumeHUD: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/RpAEJtJuLBuHuvKk.png",
  ssBrightnessHUD: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/bbbVOayXpvgwlGns.png",
  ssNotchBar: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/ZvrSHEvlybxpecTK.png",
  ssShelfMenu: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/ahQZqStoqFzDgmmU.png",
  pkgDownload: "https://github.com/NULLSHADExXx/notchbin/releases/download/v1.0.0-beta/NotchBin-Beta-Installer.pkg",
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

/* ─── Hero ─── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-end pb-20 lg:pb-28 pt-24 lg:pt-32 overflow-hidden grain-overlay">
      {/* Background — deep warm dark with amber glows */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-[#0A0805] via-[#141008] to-[#0A0A0B]" />
        {/* Notch-shaped glow at top center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[60px] bg-[#F59E0B]/[0.08] rounded-b-3xl blur-[40px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[40px] bg-[#F59E0B]/[0.12] rounded-b-2xl blur-[20px]" />
        {/* Warm ambient glows */}
        <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-[#F59E0B]/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[30%] h-[30%] bg-[#D97706]/[0.03] rounded-full blur-[100px]" />
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
                alt="NotchBin icon"
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl shadow-2xl"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border border-[#F59E0B]/30 text-[#F59E0B]/80">
                    Beta
                  </span>
                  <p className="text-sm font-mono uppercase tracking-[0.2em] text-white/40">
                    Independent macOS App
                  </p>
                </div>
              </div>
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-white mb-6">
              Your notch,<br />
              <span className="text-white/40">supercharged.</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/55 leading-relaxed max-w-xl mb-10 font-light">
              NotchBin transforms the MacBook notch into a productivity hub. Drop files, control media, manage your clipboard, capture screens, and monitor your system — all from the top of your display.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <DownloadButton
              url={ASSETS.pkgDownload}
              filename="NotchBin-Beta-Installer.pkg"
              className="group flex items-center gap-3 px-7 py-4 text-white font-semibold rounded-full transition-all duration-300 active:scale-95 shadow-lg shadow-[#F59E0B]/20 cursor-pointer"
              style={{ backgroundColor: ACCENT }}
            >
              <Download className="w-5 h-5" />
              Download for macOS
              <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </DownloadButton>
            <span className="text-sm text-white/30 font-mono">
              v1.0.0-beta &middot; .pkg installer &middot; macOS 14+
            </span>
          </motion.div>
        </div>

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

/* ─── Video Demo ─── */
function VideoDemo() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  const handleVideoEnd = () => {
    setPlaying(false);
  };

  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-[#0A0A0B] via-[#0F0D08] to-[#0A0A0B] opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#F59E0B]/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-20">
            <SectionNum num="01" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-[#F59E0B] mb-4 relative">Demo</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              See it in action.
            </h2>
            <p className="text-sm text-white/30 mt-3 max-w-md relative">
              Two-minute walkthrough at 2&times; speed — watch NotchBin handle files, media, clipboard, and more.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative max-w-4xl mx-auto">
            {/* Video container with macOS-style window frame */}
            <div className="rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/60 bg-black">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1C1C1E] border-b border-white/[0.06]">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                <span className="text-[11px] text-white/30 ml-2 font-sans">NotchBin Demo</span>
              </div>

              {/* Video */}
              <div className="relative aspect-video bg-black cursor-pointer" onClick={togglePlay}>
                <video
                  ref={videoRef}
                  src={ASSETS.video}
                  className="w-full h-full object-contain"
                  playsInline
                  onEnded={handleVideoEnd}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                />

                {/* Play overlay */}
                {!playing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300">
                    <div className="w-20 h-20 rounded-full bg-[#F59E0B]/90 flex items-center justify-center shadow-2xl shadow-[#F59E0B]/30 hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Glow behind video */}
            <div className="absolute -inset-20 bg-[#F59E0B]/[0.03] rounded-full blur-3xl -z-10 pointer-events-none" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Features ─── */
const FEATURES = [
  {
    icon: FolderOpen,
    title: "Notch Shelf",
    desc: "Drop any file onto the notch to temporarily store it. Drag it back out whenever you need it. Compress, convert, rename, Quick Look, AirDrop — all from a right-click menu.",
  },
  {
    icon: Volume2,
    title: "Media Controls",
    desc: "Full Now Playing controls right in the notch. Album art, track info, progress scrubbing, and playback controls. Works with Apple Music, Spotify, and any macOS media app.",
  },
  {
    icon: Clipboard,
    title: "Clipboard Manager",
    desc: "Searchable clipboard history that lives in your notch. Pin favorites, tag clips, and auto-paste with a single click. Every text, image, and file you copy is saved.",
  },
  {
    icon: Monitor,
    title: "Custom HUDs",
    desc: "Beautiful replacements for the default macOS volume, brightness, and keyboard backlight overlays. Plus indicators for Caps Lock, battery, AirPods, and Do Not Disturb.",
  },
  {
    icon: Camera,
    title: "Screen Capture",
    desc: "Capture your screen directly from the notch — full screen, selection, or window. Choose to save to file or clipboard. No extra apps needed.",
  },
  {
    icon: Layers,
    title: "Workspace Manager",
    desc: "Create app workspaces and switch between them with one click. Define which apps to launch and quit, customize with names, icons, colors, and Do Not Disturb per workspace.",
  },
  {
    icon: GitBranch,
    title: "Live Git Status",
    desc: "See your repository status at a glance — branch name, modified/added/deleted/untracked file counts. Auto-refreshes every few seconds without opening Terminal.",
  },
  {
    icon: Coffee,
    title: "Caffeine",
    desc: "Prevent your Mac from sleeping with one click. Timer options for system sleep, display sleep, and screen saver prevention. Toggle directly from the notch.",
  },
  {
    icon: Cpu,
    title: "System Monitor",
    desc: "Quick glance at CPU and memory usage from the notch. Lightweight and always accessible without opening Activity Monitor.",
  },
  {
    icon: Lock,
    title: "Password Generator",
    desc: "Generate secure passwords instantly from the notch. Configurable length and character sets. Copy to clipboard with one click.",
  },
];

function Features() {
  return (
    <section id="features" className="relative py-28 lg:py-40">
      <div className="container">
        <FadeIn>
          <div className="relative mb-20 lg:mb-28">
            <SectionNum num="02" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-[#F59E0B] mb-4 relative">Features</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Ten tools.<br />
              <span className="text-white/30">One notch.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 lg:gap-y-20">
          {FEATURES.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.06}>
              <div className="group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-[#F59E0B]/30 group-hover:bg-[#F59E0B]/[0.06] transition-all duration-500">
                    <f.icon className="w-5 h-5 text-white/40 group-hover:text-[#F59E0B] transition-colors duration-500" />
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
  { src: ASSETS.ssShelfMenu, label: "Notch Shelf", desc: "Files stored in the shelf with full context menu." },
  { src: ASSETS.ssVolumeHUD, label: "Volume HUD", desc: "Custom volume overlay with AirPods integration." },
  { src: ASSETS.ssBrightnessHUD, label: "Brightness HUD", desc: "Sleek brightness control replacing the default overlay." },
  { src: ASSETS.ssNotchBar, label: "Notch Bar", desc: "The notch area with device status and notifications." },
];

function Screenshots() {
  const [active, setActive] = useState(0);

  return (
    <section id="screenshots" className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-[#0A0805] via-[#0F0D08] to-[#0A0A0B] opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F59E0B]/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="03" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-[#F59E0B] mb-4 relative">Screenshots</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Every pixel,<br />
              <span className="text-white/30">considered.</span>
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
                        layoutId="notchbin-screenshot-indicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#F59E0B] rounded-full hidden lg:block"
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
                <div className="rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/60">
                  <img src={SCREENSHOTS[active].src} alt={SCREENSHOTS[active].label} className="w-full h-auto block" loading="lazy" />
                </div>
              </motion.div>
              {/* Glow behind screenshot */}
              <div className="absolute -inset-20 bg-[#F59E0B]/[0.04] rounded-full blur-3xl -z-10 pointer-events-none" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Extensions Grid ─── */
const EXTENSIONS = [
  { name: "Screen Capture", desc: "Screenshots from the notch", icon: Camera },
  { name: "Workspace Manager", desc: "App workspace switching", icon: Layers },
  { name: "Git Status", desc: "Live repository status", icon: GitBranch },
  { name: "Caffeine", desc: "Keep your Mac awake", icon: Coffee },
  { name: "System Monitor", desc: "CPU & memory at a glance", icon: Cpu },
  { name: "Password Generator", desc: "Secure password creation", icon: Lock },
  { name: "Spotify", desc: "Enhanced Spotify controls", icon: Volume2 },
  { name: "Apple Music", desc: "Enhanced Apple Music controls", icon: Volume2 },
  { name: "Camera", desc: "Camera preview in the notch", icon: Camera },
  { name: "Notification HUD", desc: "Notifications in the notch", icon: Monitor },
];

function ExtensionsSection() {
  return (
    <section id="specs" className="relative py-28 lg:py-40">
      <div className="container">
        <FadeIn>
          <div className="relative mb-20 lg:mb-28">
            <SectionNum num="04" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-[#F59E0B] mb-4 relative">Modular</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Extensions.<br />
              <span className="text-white/30">Your notch, your rules.</span>
            </h2>
            <p className="text-sm text-white/30 mt-4 max-w-md relative">
              Enable or disable features from Settings. Each extension is independent — use only what you need.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {EXTENSIONS.map((ext, i) => (
            <FadeIn key={ext.name} delay={i * 0.04}>
              <div className="group p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#F59E0B]/20 transition-all duration-300">
                <ext.icon className="w-5 h-5 text-white/30 group-hover:text-[#F59E0B] transition-colors duration-300 mb-3" />
                <h4 className="text-sm font-semibold text-white/80 mb-1">{ext.name}</h4>
                <p className="text-xs text-white/30 leading-relaxed">{ext.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* System requirements */}
        <FadeIn delay={0.15}>
          <div className="mt-20 lg:mt-28 pt-16 border-t border-white/[0.06]">
            <h3 className="font-serif text-xl font-semibold text-white/90 mb-8">System Requirements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">Operating System</p>
                <p className="text-sm text-white/60">macOS 14.0 (Sonoma) or later</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">Compatibility</p>
                <p className="text-sm text-white/60">All Macs — notch or Dynamic Island mode</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">Installer</p>
                <p className="text-sm text-white/60">.pkg package (~7 MB)</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">Status</p>
                <p className="text-sm text-white/60">Beta — early access build</p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Permissions & Privacy */}
        <FadeIn delay={0.2}>
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-[#F59E0B]" />
                <h3 className="font-serif text-lg font-semibold text-white/90">Permissions</h3>
              </div>
              <div className="space-y-3 text-sm text-white/40 leading-relaxed">
                <p><strong className="text-white/60">Accessibility</strong> — for window snapping and element capture</p>
                <p><strong className="text-white/60">Screen Recording</strong> — for the screen capture extension</p>
                <p><strong className="text-white/60">Full Disk Access</strong> — for Focus/DND status detection</p>
                <p><strong className="text-white/60">Automation</strong> — for controlling Spotify, Music, etc.</p>
              </div>
              <p className="text-xs text-white/25 mt-4">
                Grant these during first launch or later in System Settings &gt; Privacy &amp; Security.
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-5 h-5 text-[#F59E0B]" />
                <h3 className="font-serif text-lg font-semibold text-white/90">Customization</h3>
              </div>
              <div className="space-y-3 text-sm text-white/40 leading-relaxed">
                <p><strong className="text-white/60">Notch or Dynamic Island</strong> — choose your display mode</p>
                <p><strong className="text-white/60">Glass theme</strong> — optional transparent background</p>
                <p><strong className="text-white/60">HUD replacements</strong> — toggle each system overlay</p>
                <p><strong className="text-white/60">Keyboard shortcuts</strong> — customize key bindings</p>
                <p><strong className="text-white/60">Appearance</strong> — fine-tune colors and behavior</p>
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
        <div className="w-full h-full bg-gradient-to-b from-[#0A0A0B] via-[#0F0D08] to-[#0A0A0B] opacity-50" />
        <div className="absolute top-[30%] right-[20%] w-[40%] h-[40%] bg-[#F59E0B]/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="05" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-[#F59E0B] mb-4 relative">Get Started</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Installation<br />
              <span className="text-white/30">guide.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Install steps */}
          <FadeIn>
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Download the .pkg installer",
                  desc: "Click the download button above — the installer is about 7 MB.",
                  icon: Download,
                },
                {
                  step: "2",
                  title: "Run the installer",
                  desc: "Double-click NotchBin-Beta-Installer.pkg. If macOS blocks it, see the Gatekeeper section below.",
                  icon: Package,
                },
                {
                  step: "3",
                  title: "Find NotchBin in your menu bar",
                  desc: "After installation, look for the NotchBin icon at the top of your screen. Hover over the notch to see it come alive.",
                  icon: Monitor,
                },
                {
                  step: "4",
                  title: "Start using it",
                  desc: "Drag files to the notch, play music to see media controls, copy text to build clipboard history. Right-click the notch for Settings.",
                  icon: Zap,
                },
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

          {/* Gatekeeper bypass */}
          <FadeIn delay={0.1}>
            <div className="space-y-6">
              <div className="bg-[#F59E0B]/[0.05] border border-[#F59E0B]/20 rounded-xl p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
                  <h3 className="font-serif text-lg font-semibold text-white/90">Gatekeeper Notice</h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed mb-5">
                  NotchBin is distributed outside the Mac App Store, so macOS Gatekeeper may block the installer. This is normal for independently distributed apps. Here's how to open it:
                </p>

                <div className="space-y-5">
                  <div>
                    <h4 className="text-sm font-semibold text-white/70 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      Method 1: Right-click to Open
                    </h4>
                    <ol className="text-sm text-white/40 leading-relaxed space-y-1 pl-6">
                      <li>1. Right-click (or Control-click) the .pkg file</li>
                      <li>2. Select <strong className="text-white/60">"Open"</strong> from the context menu</li>
                      <li>3. Click <strong className="text-white/60">"Open"</strong> in the dialog that appears</li>
                    </ol>
                  </div>

                  <div className="border-t border-[#F59E0B]/10 pt-5">
                    <h4 className="text-sm font-semibold text-white/70 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      Method 2: System Settings
                    </h4>
                    <ol className="text-sm text-white/40 leading-relaxed space-y-1 pl-6">
                      <li>1. Try opening the .pkg normally (it will be blocked)</li>
                      <li>2. Go to <strong className="text-white/60">System Settings &gt; Privacy &amp; Security</strong></li>
                      <li>3. Scroll down to find the blocked app message</li>
                      <li>4. Click <strong className="text-white/60">"Open Anyway"</strong></li>
                    </ol>
                  </div>

                  <div className="border-t border-[#F59E0B]/10 pt-5">
                    <h4 className="text-sm font-semibold text-white/70 mb-2 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      Method 3: Terminal (advanced)
                    </h4>
                    <div className="bg-black/40 border border-white/[0.06] rounded-lg p-4 font-mono text-sm text-white/60">
                      <span className="text-white/30">$</span> sudo xattr -rd com.apple.quarantine /path/to/NotchBin-Beta-Installer.pkg
                    </div>
                    <p className="text-xs text-white/30 mt-2">
                      This removes the quarantine flag. Replace the path with the actual location of the downloaded file.
                    </p>
                  </div>
                </div>
              </div>

              {/* Beta notice */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-5 h-5 text-[#F59E0B]" />
                  <h3 className="font-serif text-lg font-semibold text-white/90">Beta Notice</h3>
                </div>
                <p className="text-sm text-white/40 leading-relaxed">
                  This is an early access build. You may encounter occasional visual glitches, features still being refined, and performance optimizations in progress. Your feedback helps us improve — use the community section below to report issues or suggest features.
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
          <img
            src={ASSETS.icon}
            alt="NotchBin"
            className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl mx-auto mb-8 shadow-2xl"
          />
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-bold leading-[1] text-white mb-4">
            Ready to supercharge<br />your notch?
          </h2>
          <p className="text-lg text-white/40 mb-10 max-w-md mx-auto">
            Independent, native, and packed with features. Your notch was always meant to do more.
          </p>
          <DownloadButton
            url={ASSETS.pkgDownload}
            filename="NotchBin-Beta-Installer.pkg"
            className="inline-flex items-center gap-3 px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 active:scale-95 shadow-lg shadow-[#F59E0B]/20 text-lg cursor-pointer"
            style={{ backgroundColor: ACCENT }}
          >
            <Download className="w-5 h-5" />
            Download NotchBin
          </DownloadButton>
          <p className="text-xs text-white/25 mt-4 font-mono">
            v1.0.0-beta &middot; macOS 14+ &middot; .pkg installer (~7 MB)
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function NotchBin() {
  useSEO({
    title: "NotchBin — Your Notch, Supercharged | Independent macOS Utility",
    description: "NotchBin transforms the MacBook notch into a productivity hub. Drop files, control media, manage clipboard, capture screens, monitor system — all from the top of your display. An independent macOS app.",
    keywords: "NotchBin, macOS notch utility, MacBook notch app, notch shelf, clipboard manager mac, custom HUD macOS, notch productivity, indie macOS utility",
    ogUrl: "https://melodiq.sbs/notchbin",
    canonical: "https://melodiq.sbs/notchbin",
  });

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E8E4DF]">
      <AppNav currentApp="NotchBin" />
      <Hero />
      <div className="editorial-rule" />
      <VideoDemo />
      <div className="editorial-rule" />
      <Features />
      <div className="editorial-rule" />
      <Screenshots />
      <div className="editorial-rule" />
      <ExtensionsSection />
      <div className="editorial-rule" />
      <InstallGuide />
      <div className="editorial-rule" />
      <DownloadCTA />
      <FeedbackSection appName="NotchBin" accent="#F59E0B" />
      <AppFooter currentApp="NotchBin" accent="#F59E0B" />
    </div>
  );
}
