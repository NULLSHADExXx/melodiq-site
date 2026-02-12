/*
  DESIGN: "Vinyl Noir" variant — UnzipperPro uses steel blue (#3B82F6) accent.
  UnzipperPro 2.0 is a PROFESSIONAL ARCHIVE EXTRACTION TOOL built with C++ and Qt6.
  Extracts ZIP, 7Z, RAR, CBR, TAR, TAR.GZ, TAR.BZ2, TAR.XZ archives.
  Batch processing, parallel extraction (1-8), per-archive passwords, streaming decompression.
  Cross-platform: Windows 7+, macOS 10.13+, Linux (Ubuntu 18.04+).
  Uses libarchive. Dark theme UI. Independent & open source.
*/

import { useEffect, useRef } from "react";
import { DownloadButton } from "@/components/DownloadButton";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Download,
  Archive,
  Lock,
  Zap,
  Layers,
  HardDrive,
  Trash2,
  ShieldCheck,
  GripVertical,
  Gauge,
  Settings,
  FolderOpen,
  Github,
  ExternalLink,
} from "lucide-react";
import { AppNav, AppFooter } from "@/components/AppNav";
import { FeedbackSection } from "@/components/FeedbackSection";
import { useSEO } from "@/hooks/useSEO";

const ACCENT = "#3B82F6";
const ACCENT_HOVER = "#60A5FA";

const ASSETS = {
  icon: "https://private-us-east-1.manuscdn.com/sessionFile/8P7TK5wMX27jvm9wWAs1vD/sandbox/Jg3WcaNeb6NkbaVe3IbzN1-img-2_1770587536000_na1fn_dW56aXBwZXItaWNvbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOFA3VEs1d01YMjdqdm05d1dBczF2RC9zYW5kYm94L0pnM1djYU5lYjZOa2JhVmUzSWJ6TjEtaW1nLTJfMTc3MDU4NzUzNjAwMF9uYTFmbl9kVzU2YVhCd1pYSXRhV052YmcucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=cbw6xT2aTI1EuNT~22MLxSQBnfn-r9oh9uL66ZwcuIStuvGoRY9FU54bK~RrRen1NdG44kJjf~tIZZPwKFp2PJ6Ar0~LUgl~D63MIvkhfay0gn3jTR16bUiY4r~mXogl04oDXBy4vCss25ZmRk0VtgeMieUt~jYmAvJmDcSu9Tdmm2CK7IjK0JYOxlynFIQi~7iQZmTNPMxMCjdNRLrPkOjqdnQxd7YdTWGPwhnM-E-QE0UWAYU3vK2G0XpOmVyokUH-dEBUUM8oMN6u~CwINfmGXSGOHIXDuhT4h7qTkpHYJSM-CO~jPYGrZzxr0xwxMykg1~QyAxXDj2AWCMBgIQ__",
  heroBg: "https://private-us-east-1.manuscdn.com/sessionFile/8P7TK5wMX27jvm9wWAs1vD/sandbox/Jg3WcaNeb6NkbaVe3IbzN1-img-1_1770587533000_na1fn_dW56aXBwZXItaGVybw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOFA3VEs1d01YMjdqdm05d1dBczF2RC9zYW5kYm94L0pnM1djYU5lYjZOa2JhVmUzSWJ6TjEtaW1nLTFfMTc3MDU4NzUzMzAwMF9uYTFmbl9kVzU2YVhCd1pYSXRhR1Z5YncuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=YhmV88-cpqC99h7Q8y~yHGTHPMIjEE5a59XcqvE7i3MN1yFgQr9YFxDmCEJtNk2LBvEnMn9JlDa5elvOYYtvhZziWeh4y8YI7qZ1tduzg4pXqAUUG383KU9L78iwBI5u0HG0j~oNOletL2KdlZl8ci5-2LC63sWhv85uoQ5OjNUWPYz7zf2R09uD7dqFODQFK3LN0Zk2nAzrdb1SdAxsbClnUiLFy7YZjyAJdKZqZSJeMeJgNyfQy~YsCdI6en45EeSljhzzrMX-HaUamkM-Uu8oaijrO~9B32V4hOiVu2y6KkUZt6TXW7ei6Fa9ciQuPfCE54MqsFbNY2QXRIjMHg__",
  dmgDownload: "https://github.com/NULLSHADExXx/unzipper-pro/releases/download/v2.0.0/UnzipperPro.dmg",
  screenshot: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/kEVBYcHhGskVjQzk.png",
  github: "https://github.com/NULLSHADExXx/unzipper-pro",
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
        <img src={ASSETS.heroBg} alt="UnzipperPro hero background" className="w-full h-[120%] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/60 to-transparent" />
      </motion.div>

      <motion.div className="container relative z-10" style={{ opacity }}>
        <div className="grid lg:grid-cols-2 gap-12 items-end">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <img src={ASSETS.icon} alt="UnzipperPro icon" className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl shadow-lg" />
              <p className="text-sm font-mono uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
                Independent &amp; Open Source
              </p>
            </div>

            <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] mb-6">
              <span className="text-white">Extract everything.</span><br />
              <span className="text-white/30">Every format.</span>
            </h1>

            <p className="text-lg lg:text-xl text-white/50 leading-relaxed max-w-xl mb-10">
              A professional native desktop app for extracting archives. Built with C++ and Qt6, it handles ZIP, 7Z, RAR, TAR, and more — with batch processing, parallel extraction, per-archive passwords, and streaming decompression for 100GB+ files.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <DownloadButton
                url={ASSETS.dmgDownload}
                filename="UnzipperPro_2.0.dmg"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 active:scale-95 cursor-pointer"
                style={{ backgroundColor: ACCENT, color: "#fff" }}
              >
                <Download className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                Download for Mac
              </DownloadButton>
              <a
                href={ASSETS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold border border-white/10 text-white/70 hover:text-white hover:border-white/25 transition-all duration-300 active:scale-95"
              >
                <Github className="w-4 h-4" />
                Source Code
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
              <span className="text-xs font-mono text-white/25 tracking-wide">
                v2.0 · Cross-platform · C++ &amp; Qt6
              </span>
            </div>
          </motion.div>
        </div>

        {/* App Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl opacity-20 blur-2xl" style={{ background: `radial-gradient(ellipse, ${ACCENT}40, transparent 70%)` }} />
            <div className="relative rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl">
              <img
                src={ASSETS.screenshot}
                alt="Unzipper Pro 2.0 — dark theme UI showing archive list, options panel, progress bar, and extraction logs"
                className="w-full h-auto"
              />
            </div>
          </div>
        </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Supported Formats ─── */
function Formats() {
  const formats = [
    { ext: ".zip", name: "ZIP", color: "#3B82F6" },
    { ext: ".7z", name: "7-Zip", color: "#8B5CF6" },
    { ext: ".rar / .cbr", name: "RAR", color: "#EF4444" },
    { ext: ".tar", name: "TAR", color: "#F59E0B" },
    { ext: ".tar.gz / .tgz", name: "TAR GZIP", color: "#10B981" },
    { ext: ".tar.bz2", name: "TAR BZIP2", color: "#06B6D4" },
    { ext: ".tar.xz", name: "TAR XZ", color: "#F97316" },
  ];

  return (
    <section id="features" className="relative py-28 lg:py-40 overflow-hidden">
      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="01" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>Supported Formats</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Every archive format<br />
              <span className="text-white/30">you'll ever need.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {formats.map((fmt, i) => (
            <FadeIn key={fmt.name} delay={i * 0.06}>
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 group">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${fmt.color}15`, border: `1px solid ${fmt.color}25` }}
                >
                  <Archive className="w-5 h-5" style={{ color: fmt.color }} />
                </div>
                <h3 className="text-white/90 font-semibold text-sm mb-1">{fmt.name}</h3>
                <p className="text-xs font-mono text-white/30">{fmt.ext}</p>
              </div>
            </FadeIn>
          ))}

          {/* Full extraction callout */}
          <FadeIn delay={0.42}>
            <div
              className="bg-white/[0.02] border rounded-xl p-5 flex flex-col justify-center"
              style={{ borderColor: `${ACCENT}20` }}
            >
              <p className="text-xs font-mono uppercase tracking-[0.15em] mb-2" style={{ color: ACCENT }}>Complete</p>
              <p className="text-sm text-white/50 leading-relaxed">
                Extracts every file, folder, symlink, and empty file. Nothing is skipped.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Features ─── */
function Features() {
  const features = [
    {
      icon: Layers,
      title: "Batch Processing",
      desc: "Add multiple archives and extract them all in one run. Queue as many as you need — no limit on the number of archives.",
    },
    {
      icon: Zap,
      title: "Parallel Extraction",
      desc: "Extract 1–8 archives simultaneously. Configurable in Settings — defaults to your CPU core count, capped at 8.",
    },
    {
      icon: Lock,
      title: "Per-Archive Passwords",
      desc: "Each archive gets its own password field. Show/Hide toggle lets you verify before extracting. Different passwords for different archives.",
    },
    {
      icon: HardDrive,
      title: "100GB+ Streaming",
      desc: "Streaming decompression handles massive archives without loading them into memory. No file size limit.",
    },
    {
      icon: GripVertical,
      title: "Drag & Drop",
      desc: "Drop archives directly onto the window to add them to the queue. Or use the '+ Add' button to browse.",
    },
    {
      icon: Gauge,
      title: "Real-Time Progress",
      desc: "Live speed (MB/s) and ETA during extraction. Follow progress for each archive as it's being unpacked.",
    },
    {
      icon: Trash2,
      title: "Delete After Extract",
      desc: "Optionally remove archive files after successful extraction. Keeps your workspace clean automatically.",
    },
    {
      icon: ShieldCheck,
      title: "Verify Before Delete",
      desc: "Optional integrity check re-reads archives after extraction before deleting. Enable in Settings for extra safety.",
    },
    {
      icon: FolderOpen,
      title: "Organized Output",
      desc: "Each archive extracts into its own subfolder under your chosen output path. No file collisions between archives.",
    },
  ];

  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="02" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>Features</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Professional extraction<br />
              <span className="text-white/30">without the complexity.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.05}>
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 group h-full">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${ACCENT}12`, border: `1px solid ${ACCENT}20` }}
                >
                  <f.icon className="w-5 h-5" style={{ color: ACCENT }} />
                </div>
                <h3 className="text-white/90 font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Settings ─── */
function SettingsSection() {
  const settings = [
    { name: "Default output folder", desc: "Initial extraction destination" },
    { name: "Delete archives after extraction", desc: "Default for the main checkbox" },
    { name: "Overwrite existing files", desc: "Default for the main checkbox" },
    { name: "Max parallel extractions", desc: "1–8 archives at a time (default: CPU cores, capped at 8)" },
    { name: "Clear list after extraction", desc: "Empties the archive list when all extractions complete" },
    { name: "Play completion sound", desc: "System notification sound when extraction finishes" },
    { name: "Verify before deleting", desc: "Re-reads archives after extraction before delete" },
  ];

  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="03" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>Settings</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Configurable to<br />
              <span className="text-white/30">your workflow.</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-3">
              <Settings className="w-4 h-4" style={{ color: ACCENT }} />
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/40">File → Settings</p>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {settings.map((s) => (
                <div key={s.name} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="text-sm text-white/70 font-medium">{s.name}</span>
                  <span className="text-xs text-white/30">{s.desc}</span>
                </div>
              ))}
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
    <section id="specs" className="relative py-28 lg:py-40 overflow-hidden">
      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="04" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>Technical Details</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Built with C++ &amp; Qt6.<br />
              <span className="text-white/30">Powered by libarchive.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {[
            { label: "macOS", value: "10.13+" },
            { label: "Windows", value: "7+" },
            { label: "Linux", value: "Ubuntu 18.04+" },
            { label: "Engine", value: "libarchive" },
          ].map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08}>
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">{s.label}</p>
                <p className="text-lg font-semibold text-white/80">{s.value}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 lg:p-8">
            <h3 className="text-white/80 font-semibold mb-4">Architecture</h3>
            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-white/50 font-medium mb-1">mainwindow_pro.cpp</p>
                <p className="text-white/30 leading-relaxed">Main UI — archive list, options panel, progress display, and extraction logs.</p>
              </div>
              <div>
                <p className="text-white/50 font-medium mb-1">extractionworker.cpp</p>
                <p className="text-white/30 leading-relaxed">Extraction engine — libarchive integration, streaming decompression, parallel job management.</p>
              </div>
              <div>
                <p className="text-white/50 font-medium mb-1">settingsdialog.cpp</p>
                <p className="text-white/30 leading-relaxed">Settings dialog — all configurable options for extraction behavior.</p>
              </div>
              <div>
                <p className="text-white/50 font-medium mb-1">libarchive</p>
                <p className="text-white/30 leading-relaxed">Handles all archive formats via archive_read and archive_write_disk APIs.</p>
              </div>
            </div>
            <p className="text-xs text-white/20 mt-6">Extraction runs in background threads so the UI stays responsive. Progress updates are throttled to ~150ms.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Usage / Get Started ─── */
function InstallGuide() {
  const steps = [
    { num: "1", title: "Add archives", desc: "Click '+ Add' or drag and drop files onto the window." },
    { num: "2", title: "Set passwords", desc: "Enter passwords in the Password column if needed. Use Show/Hide to verify." },
    { num: "3", title: "Choose output folder", desc: "Click 'Browse...' next to the path to set your destination." },
    { num: "4", title: "Options", desc: "Enable 'Delete archives after extraction' and/or 'Overwrite existing' as needed." },
    { num: "5", title: "Extract", desc: "Click the green 'Extract' button. Follow progress, speed, and ETA in the Progress section." },
  ];

  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-[#0A0F1A] via-[#0A0A0B] to-[#0A0A0B]" />
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="05" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>How to Use</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Five steps to<br />
              <span className="text-white/30">extracted files.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="space-y-4 max-w-2xl">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.08}>
              <div className="flex gap-5 items-start bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:bg-white/[0.04] transition-all duration-300">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold"
                  style={{ backgroundColor: `${ACCENT}15`, color: ACCENT, border: `1px solid ${ACCENT}25` }}
                >
                  {step.num}
                </div>
                <div>
                  <h4 className="text-white/80 font-semibold mb-1">{step.title}</h4>
                  <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Troubleshooting */}
        <FadeIn delay={0.5}>
          <div className="mt-16 bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 lg:p-8 max-w-2xl">
            <h3 className="text-white/80 font-semibold mb-4">Troubleshooting</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-white/50 font-medium">Wrong password</p>
                <p className="text-white/30">Recheck the password; each archive can use a different one.</p>
              </div>
              <div>
                <p className="text-white/50 font-medium">Cannot open / corrupted</p>
                <p className="text-white/30">Ensure the file isn't corrupted; try downloading again.</p>
              </div>
              <div>
                <p className="text-white/50 font-medium">Permission denied</p>
                <p className="text-white/30">Verify output folder permissions.</p>
              </div>
              <div>
                <p className="text-white/50 font-medium">No space left</p>
                <p className="text-white/30">Free disk space in the output folder.</p>
              </div>
              <div>
                <p className="text-white/50 font-medium">Slow extraction</p>
                <p className="text-white/30">Check disk health; use a different output drive if needed.</p>
              </div>
              <div>
                <p className="text-white/50 font-medium">macOS says the app is damaged?</p>
                <p className="text-white/30">Open Terminal and run:</p>
                <code className="block mt-1 px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg text-xs text-white/50 font-mono">
                  $ xattr -cr /Applications/UnzipperPro.app
                </code>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Download CTA ─── */
function DownloadCTA() {
  return (
    <section className="relative py-28 lg:py-40 text-center overflow-hidden">
      <div className="container relative z-10">
        <FadeIn>
          <img src={ASSETS.icon} alt="UnzipperPro" className="w-16 h-16 rounded-2xl mx-auto mb-6 shadow-lg" />
          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold text-white mb-4">
            Extract everything. Every format.
          </h2>
          <p className="text-white/40 mb-10 max-w-md mx-auto">
            Independent, open source, and cross-platform. Built with C++ for maximum performance.
          </p>
          <DownloadButton
            url={ASSETS.dmgDownload}
            filename="UnzipperPro_2.0.dmg"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 active:scale-95 cursor-pointer"
            style={{ backgroundColor: ACCENT, color: "#fff" }}
          >
            <Download className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            Download Unzipper Pro
          </DownloadButton>
          <p className="text-xs font-mono text-white/20 mt-4">v2.0 · macOS 10.13+ · Windows 7+ · Linux</p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function UnzipperPro() {
  useSEO({
    title: "Unzipper Pro 2.0 — Independent Cross-Platform Archive Extraction Tool",
    description: "Unzipper Pro 2.0 is an independent, open-source archive extraction tool. Supports ZIP, 7Z, RAR, TAR, and more. Batch processing, parallel extraction, per-archive passwords, and 100GB+ streaming. Built with C++ and Qt6.",
    keywords: "Unzipper Pro, archive extractor, unzip mac, extract RAR mac, 7Z extractor, TAR extraction, batch unzip, parallel extraction, indie archive tool, open source unzipper, Qt6 archive, cross-platform extractor",
    ogUrl: "https://melodiq.sbs/unzipperpro",
    canonical: "https://melodiq.sbs/unzipperpro",
  });

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E8E4DF]">
      <AppNav currentApp="Unzipper Pro" />
      <Hero />
      <div className="editorial-rule" />
      <Formats />
      <div className="editorial-rule" />
      <Features />
      <div className="editorial-rule" />
      <SettingsSection />
      <div className="editorial-rule" />
      <Specs />
      <div className="editorial-rule" />
      <InstallGuide />
      <div className="editorial-rule" />
      <DownloadCTA />
      <FeedbackSection appName="Unzipper Pro" accent={ACCENT} />
      <AppFooter currentApp="Unzipper Pro" accent={ACCENT} />
    </div>
  );
}
