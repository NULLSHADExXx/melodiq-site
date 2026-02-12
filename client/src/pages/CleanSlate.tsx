/*
  DESIGN: "Vinyl Noir" variant — CleanSlate uses emerald green (#10B981) accent.
  CleanSlate is a CLIPBOARD MANAGER with intelligent privacy protection.
  Auto-detects and blurs sensitive data (SSN, API keys, credit cards, etc.)
  Menu bar app, macOS 15.0+, Swift 6, SwiftUI, Liquid Glass UI.
*/

import { useEffect, useRef } from "react";
import { DownloadButton } from "@/components/DownloadButton";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Download,
  Clipboard,
  ShieldCheck,
  Eye,
  EyeOff,
  Pin,
  Clock,
  CreditCard,
  Key,
  Fingerprint,
  Trash2,
  Star,
} from "lucide-react";
import { AppNav, AppFooter } from "@/components/AppNav";
import { FeedbackSection } from "@/components/FeedbackSection";
import { useSEO } from "@/hooks/useSEO";

const ACCENT = "#10B981";
const ACCENT_HOVER = "#34D399";

const ASSETS = {
  icon: "https://private-us-east-1.manuscdn.com/sessionFile/8P7TK5wMX27jvm9wWAs1vD/sandbox/v3F2dPaf7M7wDPEb2Mnlff_1770584072644_na1fn_Y2xlYW5zbGF0ZS1pY29u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOFA3VEs1d01YMjdqdm05d1dBczF2RC9zYW5kYm94L3YzRjJkUGFmN003d0RQRWIyTW5sZmZfMTc3MDU4NDA3MjY0NF9uYTFmbl9ZMnhsWVc1emJHRjBaUzFwWTI5dS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=PY~9d7J3vdyW8BZkcQI6lW-2igUf-4dD4C7T1gxSByMtS5GlTXHOFqWAHdUdelmFBpbdTLUP5tbIQIrS6BK0JAZlTCq3c7K2EG5HkdG~F~m~VXUsWDzuFm3MxpvgdI8Sa3Uo7ZoWtXT416lRbzxqZZgw~uQUZDRktVuCRAcnwSLytrza9R5Yd14txIByvdV6xQdhTIrqwh321xfjVQDXZBgQduKBxmg0gDiG1O3KYbcJEJ2QwqBDNDx10deDeZA~H4dHGTu304Z8CoR52qQx8geLCIXZ~9UW8AbDxzNoMK0KfycbAv-hDRA7Zpty8pL6rEggMnlxJBIkdMn39uYsPA__",
  heroBg: "https://private-us-east-1.manuscdn.com/sessionFile/8P7TK5wMX27jvm9wWAs1vD/sandbox/eCAp2DdBooAT8X8Xm933r3-img-1_1770584147000_na1fn_Y2xlYW5zbGF0ZS1oZXJv.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOFA3VEs1d01YMjdqdm05d1dBczF2RC9zYW5kYm94L2VDQXAyRGRCb29BVDhYOFhtOTMzcjMtaW1nLTFfMTc3MDU4NDE0NzAwMF9uYTFmbl9ZMnhsWVc1emJHRjBaUzFvWlhKdi5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=mZJmZQrpiDmrtSqsSDQLfG9taJ5RJx5ruzzGeY~NwThktiE4YehtdrwXN01Z3UJse97OnKNL8Wr34cpExXzjHlatmGfK2QUjJFTalzZDrp~WXhkcyRqbnjUYRS-KfKzcGCWjhHefj--e~oyVDoJTI~T15lABxN1fiDAtC0dZ-C~l23G3am6aiVImK6C2W1s-03eovaT72dde7K9h9c8colyHrwqCn6zhCRK9ef7TzE5luYFEH7SDgVseoIpvbGr7vfDeyKDr2gU97SyqfXhQ0BCe~KWes1hxwXDeA~AtIJ6dcPfId4vT7~x1X2ROZmfbcv1sb3Jiif7fwyF11vzuiA__",
  demoVideo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/ypeESFCWgUmmegnS.mov",
  dmgDownload: "https://github.com/NULLSHADExXx/cleanslate/releases/download/v1.0.0/CleanSlate.dmg",
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
        <img src={ASSETS.heroBg} alt="CleanSlate hero background" className="w-full h-[120%] object-cover" />
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
              <img src={ASSETS.icon} alt="CleanSlate icon" className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl shadow-2xl" />
              <div>
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-white/40 mb-1">Independent macOS App</p>
              </div>
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-white mb-6">
              Copy with confidence.<br />
              <span className="text-white/30">Paste without fear.</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/50 leading-relaxed max-w-xl mb-10">
              A privacy-focused clipboard manager that automatically detects and blurs sensitive data — SSNs, API keys, credit cards, tokens — before you accidentally expose them. Beautiful Liquid Glass UI, lives in your menu bar.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <DownloadButton
                url={ASSETS.dmgDownload}
                filename="CleanSlate.dmg"
                className="inline-flex items-center gap-3 px-7 py-3.5 text-white font-semibold rounded-full transition-all duration-300 active:scale-95 shadow-lg text-base cursor-pointer"
                style={{ backgroundColor: ACCENT, boxShadow: `0 10px 30px ${ACCENT}30` }}
              >
                <Download className="w-5 h-5" />
                Download for Mac
              </DownloadButton>
              <span className="text-sm text-white/25 font-mono">macOS 15+ &middot; Apple Silicon &amp; Intel</span>
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
    {
      icon: <Clipboard className="w-5 h-5" />,
      title: "Real-Time Clipboard Monitoring",
      desc: "Seamlessly tracks clipboard changes every 0.5 seconds. Your full copy history, organized and searchable, right from the menu bar.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Automatic Sensitive Data Detection",
      desc: "Advanced regex patterns identify SSNs, API keys (OpenAI, GitHub, Stripe, AWS), credit cards, JWT tokens, emails, and phone numbers — instantly.",
    },
    {
      icon: <EyeOff className="w-5 h-5" />,
      title: "Smart Blur Protection",
      desc: "SSN items get extra-thick blur (16px) with a red shield icon. Other sensitive items get standard blur with orange borders. One-click reveal/hide toggle.",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Self-Destruct Timers",
      desc: "Sensitive items auto-remove after 30 minutes. Non-sensitive items expire after 24 hours. Visual countdown shows time until expiration.",
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Pin Important Items",
      desc: "Pin items to prevent expiration and bypass the 100-item limit. Pinned items are unlimited and never auto-delete.",
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      title: "Clear on Exit",
      desc: "Toggle 'Clear on Exit' in Settings to automatically wipe your clipboard history when you quit. Full control over your data lifecycle.",
    },
  ];

  return (
    <section id="features" className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-[#0A1A14] via-[#0A0A0B] to-[#0A0A0B]" />
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#10B981]/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="01" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>Features</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Clipboard management<br />
              <span className="text-white/30">with privacy built in.</span>
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

/* ─── What It Detects ─── */
function DetectionGrid() {
  const detections = [
    { icon: <Fingerprint className="w-5 h-5" />, label: "Social Security Numbers", level: "Highest", color: "#EF4444", desc: "US SSN format with validation. Extra blur, red shield icon, red border." },
    { icon: <Key className="w-5 h-5" />, label: "API Keys & Tokens", level: "High", color: ACCENT, desc: "OpenAI (sk-*), GitHub (ghp_*), Stripe (rk_live_*), AWS (AKIA*)." },
    { icon: <CreditCard className="w-5 h-5" />, label: "Credit Card Numbers", level: "High", color: ACCENT, desc: "Visa, MasterCard, American Express patterns detected automatically." },
    { icon: <ShieldCheck className="w-5 h-5" />, label: "JWT Tokens", level: "Standard", color: "#F59E0B", desc: "JSON Web Tokens identified and blurred on copy." },
    { icon: <Eye className="w-5 h-5" />, label: "Email Addresses", level: "Standard", color: "#F59E0B", desc: "PII detection for email addresses copied to clipboard." },
    { icon: <Pin className="w-5 h-5" />, label: "Phone Numbers", level: "Standard", color: "#F59E0B", desc: "Phone number patterns detected and protected." },
  ];

  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="02" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>Privacy Engine</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              What it<br />
              <span className="text-white/30">automatically detects.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {detections.map((d, i) => (
            <FadeIn key={d.label} delay={i * 0.06}>
              <div className="p-6 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${d.color}15`, color: d.color }}>
                    {d.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-white/85">{d.label}</h3>
                    <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: d.color }}>{d.level} Protection</span>
                  </div>
                </div>
                <p className="text-sm text-white/40 leading-relaxed">{d.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Demo Video ─── */
function DemoVideo() {
  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
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
            <p className="text-xs text-white/30 mt-3">Watch CleanSlate automatically detect and blur sensitive data as you copy it to your clipboard.</p>
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
              Built for<br />
              <span className="text-white/30">privacy &amp; performance.</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-8 lg:p-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">Operating System</p>
                <p className="text-sm text-white/60">macOS 15.0 (Sequoia) or later</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">Built With</p>
                <p className="text-sm text-white/60">Swift 6.0 &amp; SwiftUI</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">Memory</p>
                <p className="text-sm text-white/60">~7 MB footprint</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/30 mb-2">Privacy</p>
                <p className="text-sm text-white/60">100% offline, zero telemetry</p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-8 bg-white/[0.02] border border-white/[0.06] rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-5 h-5" style={{ color: ACCENT }} />
              <h3 className="font-serif text-lg font-semibold text-white/90">Security &amp; Privacy</h3>
            </div>
            <div className="space-y-4 text-sm text-white/40 leading-relaxed">
              {[
                { bold: "No Network Access", desc: "CleanSlate never connects to the internet. All data stays in memory on your Mac." },
                { bold: "No Data Storage", desc: "All clipboard data is in-memory only — nothing written to disk." },
                { bold: "No Analytics", desc: "Zero tracking, telemetry, or crash reporting of any kind." },
                { bold: "App Sandbox", desc: "Runs in Apple's App Sandbox for additional security isolation." },
              ].map((item) => (
                <div key={item.bold} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: ACCENT }} />
                  <p><strong className="text-white/60">{item.bold}</strong> — {item.desc}</p>
                </div>
              ))}
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
        <div className="w-full h-full bg-gradient-to-br from-[#0A1A14] via-[#0A0A0B] to-[#0A0A0B]" />
      </div>

      <div className="container relative z-10">
        <FadeIn>
          <div className="relative mb-16 lg:mb-24">
            <SectionNum num="05" />
            <p className="text-sm font-mono uppercase tracking-[0.2em] mb-4 relative" style={{ color: ACCENT }}>Get Started</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-white max-w-lg relative">
              Protecting your clipboard<br />
              <span className="text-white/30">in under a minute.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <FadeIn>
            <div className="space-y-8">
              {[
                { step: "1", title: "Download", desc: "Grab the DMG file from this page." },
                { step: "2", title: "Install", desc: "Open the DMG and drag CleanSlate to Applications." },
                { step: "3", title: "Launch", desc: "Open CleanSlate. It appears as a clipboard icon in your menu bar — no Dock clutter." },
                { step: "4", title: "Copy anything", desc: "Start copying. CleanSlate automatically tracks your clipboard and blurs any sensitive data it detects." },
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
                  Since CleanSlate is distributed outside the App Store, macOS may quarantine it. Open Terminal and run:
                </p>
                <div className="bg-black/40 border border-white/[0.06] rounded-lg p-4 font-mono text-sm text-white/60">
                  <span className="text-white/30">$</span> xattr -cr /Applications/CleanSlate.app
                </div>
                <p>Then launch CleanSlate again. This removes the quarantine flag and is safe to do.</p>
                <p>
                  <strong className="text-white/60">Clipboard access?</strong>{" "}
                  Grant clipboard access if prompted via System Settings → Privacy &amp; Security.
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
          <img src={ASSETS.icon} alt="CleanSlate" className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl mx-auto mb-8 shadow-2xl" />
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-bold leading-[1] text-white mb-4">
            Your clipboard, protected.
          </h2>
          <p className="text-lg text-white/40 mb-10 max-w-md mx-auto">
            Independent, native, and completely private. No account required.
          </p>
          <DownloadButton
            url={ASSETS.dmgDownload}
            filename="CleanSlate.dmg"
            className="inline-flex items-center gap-3 px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 active:scale-95 shadow-lg text-lg cursor-pointer"
            style={{ backgroundColor: ACCENT, boxShadow: `0 10px 30px ${ACCENT}20` }}
          >
            <Download className="w-5 h-5" />
            Download CleanSlate
          </DownloadButton>
          <p className="text-xs text-white/25 mt-4 font-mono">
            v1.0 &middot; macOS 15+ &middot; Apple Silicon &amp; Intel
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function CleanSlate() {
  useSEO({
    title: "CleanSlate — Independent macOS Clipboard Manager with Privacy Protection",
    description: "CleanSlate is an independent macOS clipboard manager with intelligent privacy protection. Auto-detects and blurs sensitive data like SSN, API keys, and credit card numbers. Menu bar app built with Swift 6 and SwiftUI.",
    keywords: "CleanSlate, macOS clipboard manager, privacy clipboard mac, sensitive data protection, SSN blur clipboard, API key protection, indie mac clipboard, menu bar clipboard manager, SwiftUI clipboard",
    ogUrl: "https://melodiq.sbs/cleanslate",
    canonical: "https://melodiq.sbs/cleanslate",
  });

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E8E4DF]">
      <AppNav currentApp="CleanSlate" />
      <Hero />
      <div className="editorial-rule" />
      <Features />
      <div className="editorial-rule" />
      <DetectionGrid />
      <div className="editorial-rule" />
      <DemoVideo />
      <div className="editorial-rule" />
      <Specs />
      <div className="editorial-rule" />
      <InstallGuide />
      <div className="editorial-rule" />
      <DownloadCTA />
      <FeedbackSection appName="CleanSlate" accent={ACCENT} />
      <AppFooter currentApp="CleanSlate" accent={ACCENT} />
    </div>
  );
}
