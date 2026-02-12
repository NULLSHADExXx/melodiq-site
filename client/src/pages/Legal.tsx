/*
  Legal Disclaimer page — focused on StreamFlix content/liability.
  Other apps are straightforward utilities with no legal concerns.
  Matching the site's dark editorial aesthetic.
*/

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Shield } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

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

export default function Legal() {
  useSEO({
    title: "Legal Disclaimer — MelodiQ",
    description: "Legal disclaimer and liability information for StreamFlix media browser application by MelodiQ.",
    keywords: "MelodiQ legal, disclaimer, liability, DMCA",
    ogUrl: "https://melodiq.sbs/legal",
    canonical: "https://melodiq.sbs/legal",
  });

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      {/* Header */}
      <header className="border-b border-white/[0.06]">
        <div className="container py-6 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container max-w-3xl py-16 lg:py-24">
        <FadeIn>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
              <Shield className="w-5 h-5 text-white/40" />
            </div>
            <div>
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-white">Legal Disclaimer</h1>
              <p className="text-sm text-white/25 mt-1">Last updated: February 10, 2026</p>
            </div>
          </div>
        </FadeIn>

        <div className="space-y-10">
          <FadeIn delay={0.05}>
            <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
              <h2 className="font-serif text-xl font-semibold text-white/80 mb-4">About This Disclaimer</h2>
              <p className="text-sm text-white/40 leading-relaxed">
                This legal disclaimer applies specifically to <span className="text-white/60 font-medium">StreamFlix</span>,
                our media browsing application. Our other applications (MelodiQ, TeleTurbo, SonicAtlas,
                DropDock, CleanSlate, DevSnips, pCompressPro, QuickRes, and UnzipperPro) are standalone
                macOS utilities that do not access or aggregate third-party media content.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={0.1}>
            <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
              <h2 className="font-serif text-xl font-semibold text-white/80 mb-4">StreamFlix — Content Disclaimer</h2>
              <p className="text-sm text-white/40 leading-relaxed mb-4">
                StreamFlix is a media browsing and playback application. It aggregates publicly available
                metadata and streaming links from third-party sources across the internet. StreamFlix does
                not host, upload, store, or distribute any media content on its own servers. All content
                accessed through the application is provided by and hosted on external third-party services
                over which we have no control.
              </p>
              <p className="text-sm text-white/40 leading-relaxed">
                We do not endorse, verify, or assume responsibility for any content accessed through
                StreamFlix. The availability, accuracy, and legality of third-party content is the sole
                responsibility of the respective content providers and hosting services.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={0.15}>
            <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
              <h2 className="font-serif text-xl font-semibold text-white/80 mb-4">StreamFlix — Liability</h2>
              <p className="text-sm text-white/40 leading-relaxed">
                We shall not be liable for any direct, indirect, incidental, special, consequential, or
                exemplary damages resulting from your use of StreamFlix, including but not limited to
                damages arising from third-party content, copyright claims, or the conduct of any third
                party whose streams or links appear in the application. Your use of StreamFlix is at your
                sole risk.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={0.2}>
            <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
              <h2 className="font-serif text-xl font-semibold text-white/80 mb-4">User Responsibility</h2>
              <p className="text-sm text-white/40 leading-relaxed">
                StreamFlix users are solely responsible for ensuring that their use of the application
                complies with all applicable local, state, national, and international laws and regulations,
                including copyright law. We do not encourage, condone, or facilitate any illegal activity.
                By downloading and using StreamFlix, you acknowledge and agree that you will use it only
                for lawful purposes.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={0.25}>
            <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
              <h2 className="font-serif text-xl font-semibold text-white/80 mb-4">DMCA & Copyright Concerns</h2>
              <p className="text-sm text-white/40 leading-relaxed mb-4">
                We respect the intellectual property rights of others. If you are a copyright owner or
                authorized agent and believe that any content accessible through StreamFlix infringes
                upon your copyright, please contact us with the following information:
              </p>
              <ul className="text-sm text-white/40 leading-relaxed space-y-2 list-disc list-inside mb-4">
                <li>A description of the copyrighted work you claim has been infringed</li>
                <li>A description of where the allegedly infringing material is located</li>
                <li>Your contact information (name, address, email, phone number)</li>
                <li>A statement that you have a good faith belief that the use is not authorized</li>
                <li>A statement, under penalty of perjury, that the information is accurate and you are authorized to act on behalf of the copyright owner</li>
              </ul>
              <p className="text-sm text-white/40 leading-relaxed">
                Upon receipt of a valid notice, we will promptly investigate and take appropriate action,
                which may include removing access to the allegedly infringing content from StreamFlix.
              </p>
              <div className="mt-4 p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <p className="text-sm text-white/50">
                  Contact for DMCA notices:{" "}
                  <a href="mailto:contact@melodiq.sbs" className="text-white/60 hover:text-white/80 transition-colors underline underline-offset-2">
                    contact@melodiq.sbs
                  </a>
                </p>
              </div>
            </section>
          </FadeIn>

          <FadeIn delay={0.3}>
            <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
              <h2 className="font-serif text-xl font-semibold text-white/80 mb-4">Intellectual Property</h2>
              <p className="text-sm text-white/40 leading-relaxed">
                All trademarks, service marks, trade names, logos, and brand names mentioned in our
                applications or on this website belong to their respective owners. Their use does not
                imply any affiliation with or endorsement by those owners. MelodiQ and its app names
                (StreamFlix, TeleTurbo, SonicAtlas, DropDock, CleanSlate, DevSnips, pCompressPro,
                QuickRes, UnzipperPro) are our own product names and are not affiliated with any
                third-party brands.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={0.35}>
            <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
              <h2 className="font-serif text-xl font-semibold text-white/80 mb-4">Changes to This Disclaimer</h2>
              <p className="text-sm text-white/40 leading-relaxed">
                We reserve the right to modify this disclaimer at any time. Changes will be effective
                immediately upon posting to this page. Your continued use of our applications after any
                changes constitutes your acceptance of the updated disclaimer.
              </p>
            </section>
          </FadeIn>
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <p className="text-xs text-white/20">
              See also:{" "}
              <a href="/terms" className="text-white/30 hover:text-white/50 transition-colors underline underline-offset-2">Terms of Use</a>
            </p>
          </div>
        </FadeIn>
      </main>
    </div>
  );
}
