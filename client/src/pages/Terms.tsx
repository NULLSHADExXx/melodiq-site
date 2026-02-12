/*
  Terms of Use page — general terms for all MelodiQ apps,
  with StreamFlix-specific content/liability disclaimers.
  Matching the site's dark editorial aesthetic.
*/

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, FileText } from "lucide-react";
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

export default function Terms() {
  useSEO({
    title: "Terms of Use — MelodiQ",
    description: "Terms of use for MelodiQ applications including StreamFlix, TeleTurbo, SonicAtlas, and all other apps.",
    keywords: "MelodiQ terms, terms of use, terms of service",
    ogUrl: "https://melodiq.sbs/terms",
    canonical: "https://melodiq.sbs/terms",
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
              <FileText className="w-5 h-5 text-white/40" />
            </div>
            <div>
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-white">Terms of Use</h1>
              <p className="text-sm text-white/25 mt-1">Last updated: February 10, 2026</p>
            </div>
          </div>
        </FadeIn>

        <div className="space-y-10">
          <FadeIn delay={0.05}>
            <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
              <h2 className="font-serif text-xl font-semibold text-white/80 mb-4">1. Acceptance of Terms</h2>
              <p className="text-sm text-white/40 leading-relaxed">
                By downloading, installing, or using any application developed under the MelodiQ brand
                ("Applications"), you agree to be bound by these Terms of Use. If you do not agree to
                these terms, do not download, install, or use our Applications. These terms apply to all
                MelodiQ applications including but not limited to MelodiQ, StreamFlix, TeleTurbo,
                SonicAtlas, DropDock, CleanSlate, DevSnips, pCompressPro, QuickRes, and UnzipperPro.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={0.1}>
            <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
              <h2 className="font-serif text-xl font-semibold text-white/80 mb-4">2. License</h2>
              <p className="text-sm text-white/40 leading-relaxed mb-4">
                We grant you a limited, non-exclusive, non-transferable, revocable license to download
                and use our Applications on macOS devices that you own or control, solely for your
                personal, non-commercial purposes, subject to these Terms.
              </p>
              <p className="text-sm text-white/40 leading-relaxed">
                You may not: (a) copy, modify, or distribute the Applications; (b) reverse engineer,
                decompile, or disassemble the Applications; (c) sell, rent, lease, or sublicense the
                Applications; (d) use the Applications for any unlawful purpose.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={0.15}>
            <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
              <h2 className="font-serif text-xl font-semibold text-white/80 mb-4">3. User Conduct</h2>
              <p className="text-sm text-white/40 leading-relaxed mb-4">
                You agree to use our Applications only for lawful purposes and in accordance with these
                Terms. You agree not to:
              </p>
              <ul className="text-sm text-white/40 leading-relaxed space-y-2 list-disc list-inside">
                <li>Use the Applications in any manner that violates applicable local, state, national, or international law</li>
                <li>Reverse engineer, decompile, or redistribute any Application</li>
                <li>Use the Applications for any commercial purpose without authorization</li>
              </ul>
              <p className="text-sm text-white/40 leading-relaxed mt-4">
                <span className="text-white/60 font-medium">StreamFlix users specifically:</span> StreamFlix
                is a media browser that aggregates third-party streaming links. You are solely responsible
                for ensuring that any content you access through StreamFlix complies with copyright laws
                in your jurisdiction. Do not use StreamFlix to access, download, or distribute copyrighted
                material without proper authorization.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={0.2}>
            <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
              <h2 className="font-serif text-xl font-semibold text-white/80 mb-4">4. Third-Party Content (StreamFlix)</h2>
              <p className="text-sm text-white/40 leading-relaxed mb-4">
                This section applies specifically to <span className="text-white/60 font-medium">StreamFlix</span>.
                StreamFlix aggregates publicly available metadata and streaming links from third-party
                sources across the internet. We do not host, upload, store, or distribute any media
                content on our own servers. All content accessed through StreamFlix is provided by and
                hosted on external third-party services over which we have no control.
              </p>
              <p className="text-sm text-white/40 leading-relaxed">
                We do not endorse, verify, or assume responsibility for any content accessed through
                StreamFlix. We are not responsible for the availability, accuracy, legality, or quality
                of any third-party content. Your interactions with third-party content and services are
                governed by the respective third party's terms and policies.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={0.25}>
            <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
              <h2 className="font-serif text-xl font-semibold text-white/80 mb-4">5. Disclaimer of Warranties</h2>
              <p className="text-sm text-white/40 leading-relaxed">
                Our Applications are provided "as is" without warranties of any kind. We do not
                warrant that any Application will be uninterrupted or error-free. For StreamFlix
                specifically: we make no representations regarding the legality, accuracy, or
                availability of any third-party content accessible through the application.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={0.3}>
            <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
              <h2 className="font-serif text-xl font-semibold text-white/80 mb-4">6. Limitation of Liability</h2>
              <p className="text-sm text-white/40 leading-relaxed">
                To the maximum extent permitted by applicable law, we shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages resulting from your
                use of our Applications. With respect to StreamFlix specifically: we shall not be liable
                for any damages arising from (a) third-party content accessed through the application;
                (b) the conduct or content of any third party whose streams or links appear in the
                application; (c) any copyright claims related to content you access through StreamFlix.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={0.35}>
            <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
              <h2 className="font-serif text-xl font-semibold text-white/80 mb-4">7. Privacy</h2>
              <p className="text-sm text-white/40 leading-relaxed">
                Our Applications do not collect, store, or transmit any personal information. We do not
                use analytics, tracking, or advertising frameworks. No account creation is required to
                use any of our Applications. Your usage data stays on your device.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={0.4}>
            <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
              <h2 className="font-serif text-xl font-semibold text-white/80 mb-4">8. Termination</h2>
              <p className="text-sm text-white/40 leading-relaxed">
                We reserve the right to discontinue or modify any Application at any time without notice.
                We may also terminate or suspend your access to the Applications at our sole discretion,
                without prior notice, for conduct that we believe violates these Terms or is harmful to
                other users, us, or third parties.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={0.45}>
            <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
              <h2 className="font-serif text-xl font-semibold text-white/80 mb-4">9. Changes to Terms</h2>
              <p className="text-sm text-white/40 leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes will be effective
                immediately upon posting to this page. Your continued use of our Applications after
                any changes constitutes your acceptance of the updated Terms.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={0.5}>
            <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
              <h2 className="font-serif text-xl font-semibold text-white/80 mb-4">10. Contact</h2>
              <p className="text-sm text-white/40 leading-relaxed">
                If you have any questions about these Terms, please contact us at{" "}
                <a href="mailto:contact@melodiq.sbs" className="text-white/60 hover:text-white/80 transition-colors underline underline-offset-2">
                  contact@melodiq.sbs
                </a>.
              </p>
            </section>
          </FadeIn>
        </div>

        <FadeIn delay={0.55}>
          <div className="mt-12 text-center">
            <p className="text-xs text-white/20">
              See also:{" "}
              <a href="/legal" className="text-white/30 hover:text-white/50 transition-colors underline underline-offset-2">Legal Disclaimer</a>
            </p>
          </div>
        </FadeIn>
      </main>
    </div>
  );
}
