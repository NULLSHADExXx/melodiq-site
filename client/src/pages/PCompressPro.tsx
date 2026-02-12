/*
  DESIGN: "Vinyl Noir" variant — pCompress Pro uses cyan/teal (#06B6D4) accent.
  pCompress Pro is an IMAGE COMPRESSION menu bar app:
  - Compresses PNG/JPG/JPEG images to JPEG at 75% quality
  - Drag-and-drop workflow onto the drop zone
  - Saves to Desktop/Compressed_Assets/
  - Real-time progress bar, recent files list with stats
  - File management: rename, delete, duplicate, share via context menu
  - Batch processing support
  - Menu bar only (photo.stack icon), macOS 13+, Swift 6.0
  - Translucent "Liquid Glass" popover, HUD material background
  - Fully offline, no network access
*/

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Download,
  Image,
  Zap,
  ArrowDownToLine,
  Layers,
  FolderOutput,
  GripVertical,
  BarChart3,
  FileImage,
} from "lucide-react";
import { AppNav, AppFooter } from "@/components/AppNav";
import { FeedbackSection } from "@/components/FeedbackSection";
import { DownloadButton } from "@/components/DownloadButton";
import { useSEO } from "@/hooks/useSEO";

const ACCENT = "#06B6D4";
const ACCENT_HOVER = "#22D3EE";

const ASSETS = {
  icon: "https://private-us-east-1.manuscdn.com/sessionFile/8P7TK5wMX27jvm9wWAs1vD/sandbox/v3F2dPaf7M7wDPEb2Mnlff_1770584072645_na1fn_cGNvbXByZXNzLWljb24.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOFA3VEs1d01YMjdqdm05d1dBczF2RC9zYW5kYm94L3YzRjJkUGFmN003d0RQRWIyTW5sZmZfMTc3MDU4NDA3MjY0NV9uYTFmbl9jR052YlhCeVpYTnpMV2xqYjI0LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=OB5ge~ZhiYx3Gt3VrQnHLqq6filRYNzWUpkNswh3IxQA2jfutRJla6lqsEHudM86Y9N289n5GBdmlqxrQYke6xOTdwqY9~kP24CGXnEZuVAaNDS2IOxqm2mCpE06Re9DYghzO3PfAQ7ANWyQ28~Z5rjreOrZKgnepd4LgddRVqgJV7akMST~NhfECwzhzswYbebverAWjxCnxxLAhosmCgoesWdcThalcUN13BEOyNZnJJO8f8L~v8s8txcyfnNdIl0gKWmr-GT~yaTaKAlnxUeS-Br~bjs1KQ1Jms3NuvZ8PXaO-A57SzOu7Vr~qsRQ0FX5wOHb8Oj95xTYGeAmbg__",
  heroBg: "https://private-us-east-1.manuscdn.com/sessionFile/8P7TK5wMX27jvm9wWAs1vD/sandbox/eCAp2DdBooAT8X8Xm933r3-img-3_1770584156000_na1fn_cGNvbXByZXNzLWhlcm8.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOFA3VEs1d01YMjdqdm05d1dBczF2RC9zYW5kYm94L2VDQXAyRGRCb29BVDhYOFhtOTMzcjMtaW1nLTNfMTc3MDU4NDE1NjAwMF9uYTFmbl9jR052YlhCeVpYTnpMV2hsY204LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=blT~BeKdVnUStkkBwBcUcMfYP~Zks9eIafVUv9sgDAR-WjxY35Y-LcXX754WfZRBPDHldPYRjV50QauRbYqp-GdoevWC4E~bi-a2NcjGrPOGyfPQPYS63zMGY2vFKm2xISPt9iGlMSWDPpjdXNGAmt3Ib0DeY8r4V5pK5R5j2bvFUvzsERBKwn0zQR8hGdHQLbCL8xAltwHikDJXPWvc-XRuLW3JYPt-C6Je46j~7sX~7640Su7wBaLHfKZVVrdalRgWC0MJXBSi6qDzvpzynJrZER0D8ChoEbUiT0gpLiLaJMxRrrSYYDguF1G8FXdThBjTC8pky8fy667XkGSWLw__",
  demoVideo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/UpYnbTcxDnXOxIiA.mov",
  dmgDownload: "https://github.com/NULLSHADExXx/pcompress-pro/releases/download/v1.0.0/pCompressPro.dmg",
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
              <img src={ASSETS.icon} alt="pCompress Pro icon" className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl shadow-2xl" />
              <div>
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-white/40 mb-1">Independent macOS App</p>
              </div>
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-white mb-6">
              Drag. Drop.<br />
              <span className="text-white/30">Compress.</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/50 leading-relaxed max-w-xl mb-10">
              A native macOS menu bar app for compressing images. Drag PNG or JPG files onto the drop zone, and pCompress Pro converts them to optimized JPEG at 75% quality — saving 30–80% file size. Batch processing, real-time progress, and a beautiful Liquid Glass interface.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <DownloadButton
                url={ASSETS.dmgDownload}
                filename="pCompressPro.dmg"
                className="inline-flex items-center gap-3 px-7 py-3.5 text-black font-semibold rounded-full transition-all duration-300 active:scale-95 shadow-lg text-base cursor-pointer"
                style={{ backgroundColor: ACCENT, boxShadow: `0 10px 30px ${ACCENT}30` }}
              >
                <Download className="w-5 h-5" />
                Download for Mac
              </DownloadButton>
              <span className="text-sm text-white/25 font-mono">macOS 13+ &middot; Apple Silicon &amp; Intel</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── How It Works ─── */
function HowItWorks() {
  const steps = [
    {
      icon: <GripVertical className="w-6 h-6" />,
      title: "Drag & Drop",
      desc: "Drag PNG, JPG, or JPEG images directly onto the drop zone in the popover. Multiple files supported for batch processing.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Compression",
      desc: "Images are converted to JPEG at 75% quality using native macOS APIs. Each image processes in ~50–200ms. A real-time progress bar shows the status.",
    },
    {
      icon: <FolderOutput className="w-6 h-6" />,
      title: "Auto-Saved to Desktop",
      desc: "Compressed files are automatically saved to Desktop/Compressed_Assets/ with their original filenames. No manual save dialogs.",
    },
  ];

  return (
    <section id="features" className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-[#081A1D] via-[#0A0A0B] to-[#0A0A0B]" />
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#06B6D4]/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="01" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>How It Works</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Three steps to<br />
              <span className="text-white/30">smaller images.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.08}>
              <div className="group p-8 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-500 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}
                  >
                    {step.icon}
                  </div>
                  <span className="font-mono text-sm text-white/20">Step {i + 1}</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-white/85 mb-3">{step.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Features ─── */
function Features() {
  const features = [
    {
      icon: <Layers className="w-5 h-5" />,
      title: "Batch Processing",
      desc: "Drop multiple images at once. pCompress Pro handles them all with a real-time progress bar showing overall completion.",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Compression Statistics",
      desc: "See the original size, compressed size, and percentage saved for each file in the recent files list.",
    },
    {
      icon: <FileImage className="w-5 h-5" />,
      title: "Recent Files List",
      desc: "View your recently compressed files with full context menu support — rename, delete, duplicate, or share via macOS share sheet.",
    },
    {
      icon: <Image className="w-5 h-5" />,
      title: "PNG & JPG Support",
      desc: "Handles both PNG and JPG/JPEG files. All images are converted to optimized JPEG files.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Native & Fast",
      desc: "Built with Swift & SwiftUI for maximum performance and a native macOS look and feel. No Electron, no Catalyst.",
    },
    {
      icon: <ArrowDownToLine className="w-5 h-5" />,
      title: "Fully Offline",
      desc: "pCompress Pro never connects to the internet. All processing is done locally on your machine.",
    },
  ];

  return (
    <section id="details" className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-tr from-[#081A1D] via-[#0A0A0B] to-[#0A0A0B]" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-[#06B6D4]/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="02" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>Features</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Everything you need,<br />
              <span className="text-white/30">nothing you don't.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.08}>
              <div className="group p-6 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-500 h-full">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mb-4"
                  style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}
                >
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-white/85 mb-2 text-base">{feature.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Performance ─── */
function Performance() {
  const stats = [
    { value: "30–80%", label: "File Size Reduction" },
    { value: "~100ms", label: "Per Image" },
    { value: "100%", label: "Offline" },
  ];

  return (
    <section className="py-28 lg:py-40">
      <div className="container">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="font-serif text-5xl lg:text-6xl font-bold" style={{ color: ACCENT }}>{stat.value}</p>
                <p className="text-sm text-white/30 font-mono mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Demo Video ─── */
function DemoVideo() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24 text-center">
            <SectionNum num="03" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>See It In Action</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-2xl mx-auto relative">
              Liquid Glass Interface
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ boxShadow: `0 20px 50px #00000040` }}>
            <video src={ASSETS.demoVideo} className="w-full h-full object-cover" autoPlay loop muted playsInline />
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Specs ─── */
function Specs() {
  const specs = [
    { label: "Compatibility", value: "macOS 13+ (Ventura or later)" },
    { label: "Architecture", value: "Apple Silicon & Intel" },
    { label: "Input Formats", value: "PNG, JPG, JPEG" },
    { label: "Output Format", value: "JPEG (75% quality)" },
    { label: "Dependencies", value: "None" },
    { label: "Network", value: "Fully offline" },
  ];

  return (
    <section className="py-28 lg:py-40">
      <div className="container max-w-3xl">
        <FadeIn>
          <div className="relative mb-12">
            <SectionNum num="04" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>Technical Specs</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white relative">
              Built for macOS.
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {specs.map((spec) => (
              <div key={spec.label} className="flex items-center justify-between py-4">
                <dt className="text-sm text-white/40 font-mono">{spec.label}</dt>
                <dd className="text-sm text-white/80 font-semibold">{spec.value}</dd>
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
  const steps = [
    "Download the DMG file.",
    "Double-click to open it.",
    "Drag pCompress Pro into your Applications folder.",
    "Launch from Applications. You may need to right-click > Open the first time.",
  ];

  return (
    <section className="py-28 lg:py-40 bg-white/[0.02] border-y border-white/5">
      <div className="container max-w-3xl">
        <FadeIn>
          <div className="relative mb-12">
            <SectionNum num="05" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>Installation</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white relative">
              Easy Setup
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <ol className="list-decimal list-inside space-y-3 text-white/50 pl-4">
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Download CTA ─── */
function DownloadCTA() {
  return (
    <section className="py-28 lg:py-40">
      <div className="container text-center">
        <FadeIn>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-6">Get pCompress Pro</h2>
          <p className="text-lg text-white/50 max-w-md mx-auto mb-10">Start compressing your images with a drag-and-drop native app.</p>
          <DownloadButton
            url={ASSETS.dmgDownload}
            filename="pCompressPro.dmg"
            className="inline-flex items-center gap-3 px-8 py-4 text-black font-semibold rounded-full transition-all duration-300 active:scale-95 shadow-lg text-lg cursor-pointer"
            style={{ backgroundColor: ACCENT, boxShadow: `0 10px 30px ${ACCENT}30` }}
          >
            <Download className="w-5 h-5" />
            Download for Mac
          </DownloadButton>
          <p className="text-xs text-white/20 font-mono mt-4">macOS 13+ &middot; Apple Silicon & Intel</p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function PCompressPro() {
  useSEO({
    title: "pCompress Pro — Independent macOS Image Compression Utility",
    description: "pCompress Pro is an independent macOS image compression tool. Drag-and-drop PNG and JPG files, compress to JPEG at 75% quality with batch processing. Built with Swift and SwiftUI.",
    keywords: "pCompress Pro, macOS image compression, compress images mac, PNG to JPEG mac, batch image compression, drag drop compress, indie image compressor mac, reduce image size macOS, SwiftUI image tool",
    ogUrl: "https://melodiq.sbs/pcompresspro",
    canonical: "https://melodiq.sbs/pcompresspro",
  });

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E8E4DF]">
      <AppNav currentApp="pCompress Pro" />
      <Hero />
      <div className="editorial-rule" />
      <HowItWorks />
      <div className="editorial-rule" />
      <Features />
      <div className="editorial-rule" />
      <Performance />
      <div className="editorial-rule" />
      <DemoVideo />
      <div className="editorial-rule" />
      <Specs />
      <div className="editorial-rule" />
      <InstallGuide />
      <div className="editorial-rule" />
      <DownloadCTA />
      <FeedbackSection appName="pCompress Pro" accent={ACCENT} />
      <AppFooter currentApp="pCompress Pro" accent={ACCENT} />
    </div>
  );
}
