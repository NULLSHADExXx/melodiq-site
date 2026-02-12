/*
  FeedbackSection — Reusable community feedback component.
  Shows 3 pre-made templates (Bug Report, Feature Request, General Feedback)
  with copy-to-clipboard + link to Telegram group.
  Designed to sit above AppFooter on every app page.
*/

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Bug, Lightbulb, MessageCircle, Copy, Check, Send } from "lucide-react";

const TELEGRAM_GROUP = "https://t.me/+cBRxjXXh-51kNjY1";

interface FeedbackSectionProps {
  appName: string;
  accent: string;
}

interface TemplateCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  template: string;
  color: string;
}

function getTemplates(appName: string): TemplateCard[] {
  return [
    {
      id: "bug",
      icon: <Bug className="w-5 h-5" />,
      title: "Report a Bug",
      description: "Found something broken? Let us know so we can fix it.",
      template: `🐛 Bug Report — ${appName}\n\nmacOS Version: \nApp Version: \n\nWhat happened:\n\n\nSteps to reproduce:\n1. \n2. \n3. \n\nExpected behavior:\n\n\nAdditional info (screenshots, logs, etc.):\n`,
      color: "#EF4444",
    },
    {
      id: "feature",
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Request a Feature",
      description: "Have an idea that would make the app better? We're listening.",
      template: `💡 Feature Request — ${appName}\n\nDescribe the feature:\n\n\nWhy would this be useful:\n\n\nAny examples or references:\n`,
      color: "#F59E0B",
    },
    {
      id: "feedback",
      icon: <MessageCircle className="w-5 h-5" />,
      title: "General Feedback",
      description: "Share your thoughts, suggestions, or just say hello.",
      template: `💬 Feedback — ${appName}\n\nYour message:\n\n`,
      color: "#3B82F6",
    },
  ];
}

function TemplateCardComponent({ card, accent }: { card: TemplateCard; accent: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(card.template);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = card.template;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 lg:p-6 hover:bg-white/[0.04] transition-all duration-300">
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
        style={{ backgroundColor: `${card.color}15`, color: card.color }}
      >
        {card.icon}
      </div>

      {/* Content */}
      <h3 className="font-semibold text-white/80 text-sm mb-1">{card.title}</h3>
      <p className="text-xs text-white/30 leading-relaxed mb-4">{card.description}</p>

      {/* Template preview */}
      <div className="rounded-lg bg-black/30 border border-white/[0.04] p-3 mb-4 max-h-28 overflow-hidden relative">
        <pre className="text-[10px] text-white/25 font-mono whitespace-pre-wrap leading-relaxed">
          {card.template.slice(0, 160)}...
        </pre>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-medium transition-all duration-200"
        style={{
          backgroundColor: copied ? `${card.color}20` : "rgba(255,255,255,0.04)",
          color: copied ? card.color : "rgba(255,255,255,0.5)",
          border: `1px solid ${copied ? `${card.color}30` : "rgba(255,255,255,0.06)"}`,
        }}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" />
            Copied to clipboard
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            Copy Template
          </>
        )}
      </button>
    </div>
  );
}

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

export function FeedbackSection({ appName, accent }: FeedbackSectionProps) {
  const templates = getTemplates(appName);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-[0.03]"
        style={{ background: accent }}
      />

      <div className="container max-w-5xl relative z-10">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-[10px] uppercase tracking-[0.2em] text-white/30 mb-6">
              <Send className="w-3 h-3" />
              Community
            </div>
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white/90 mb-3">
              Help Us Improve {appName}
            </h2>
            <p className="text-sm text-white/30 max-w-lg mx-auto leading-relaxed">
              Found a bug? Have a feature idea? We'd love to hear from you.
              Copy a template below, then drop it in our Telegram group.
            </p>
          </div>
        </FadeIn>

        {/* Template cards */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 mb-8">
            {templates.map((card) => (
              <TemplateCardComponent key={card.id} card={card} accent={accent} />
            ))}
          </div>
        </FadeIn>

        {/* Telegram CTA */}
        <FadeIn delay={0.2}>
          <div className="text-center">
            <a
              href={TELEGRAM_GROUP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #0088cc, #0099dd)",
                color: "#fff",
                boxShadow: "0 4px 20px rgba(0,136,204,0.25)",
              }}
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Join Our Telegram Community
            </a>
            <p className="text-[11px] text-white/20 mt-3">
              Copy a template above, then paste it in the group — it's that easy.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
