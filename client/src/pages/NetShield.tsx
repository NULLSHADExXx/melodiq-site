import { useSEO } from "@/hooks/useSEO";
import { DownloadButton } from "@/components/DownloadButton";
import { AppFooter } from "@/components/AppNav";
import { motion } from "framer-motion";
import { Activity, Shield, Eye, Zap, BarChart3, Lock, Wifi, Gauge } from "lucide-react";

export default function NetShield() {
  useSEO({
    title: "NetShield — Independent macOS Network Monitor",
    description: "Real-time network monitoring in your menu bar. See your IP, speed, ping, and security status instantly. Auto-hides sensitive data on screenshots.",
    keywords: "network monitor, macOS, menu bar, privacy shield, network speed, IP monitor",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-950">
      {/* Hero Section — Data Dashboard Visual */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text + CTA */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <p className="text-sm font-mono text-cyan-400 uppercase tracking-widest">
                  Network Intelligence
                </p>
                <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight">
                  Your network,{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    at a glance
                  </span>
                </h1>
              </div>

              <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                NetShield brings real-time network intelligence to your macOS menu bar. Monitor your IP, download/upload speeds, ping, Wi-Fi signal, and security status — all without leaving your workflow. And when you take a screenshot, it automatically masks sensitive data.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <DownloadButton
                  url="https://github.com/NULLSHADExXx/netshield/releases/download/v1.0.0/NetShield.dmg"
                  filename="NetShield.dmg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <span>Download for macOS</span>
                </DownloadButton>
              </div>

              <div className="pt-4 space-y-2 text-sm text-slate-400">
                <p>✓ macOS 13.0 (Ventura) or later</p>
                <p>✓ Zero third-party dependencies</p>
                <p>✓ No telemetry or data collection</p>
              </div>
            </motion.div>

            {/* Right: Screenshot with Data Visualization Aesthetic */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/20 bg-slate-900/50 backdrop-blur">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/eClBUReUmCsSXqwy.png"
                  alt="NetShield dashboard showing network data"
                  className="w-full h-auto"
                />
              </div>

              {/* Floating Data Cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl p-4 shadow-xl border border-cyan-400/30 max-w-xs"
              >
                <div className="flex items-center gap-3">
                  <Gauge className="w-5 h-5 text-cyan-200" />
                  <div>
                    <p className="text-xs text-cyan-200 font-mono">PING</p>
                    <p className="text-lg font-bold text-white">16ms</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-6 -right-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-4 shadow-xl border border-blue-400/30 max-w-xs"
              >
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-blue-200" />
                  <div>
                    <p className="text-xs text-blue-200 font-mono">SPEED</p>
                    <p className="text-lg font-bold text-white">850 Mbps ↓</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid — Data-Centric */}
      <section className="px-4 py-20 bg-slate-900/30">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to Know
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              NetShield displays comprehensive network, system, and security data in a single, uncluttered view. No scrolling. No complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Activity,
                title: "Network Data",
                desc: "Public IP, local IP, ISP, download/upload speed, ping, Wi-Fi signal",
                color: "from-cyan-500 to-blue-500",
              },
              {
                icon: Shield,
                title: "Security Status",
                desc: "Firewall, SIP, FileVault status at a glance",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Eye,
                title: "Privacy Shield",
                desc: "Auto-detects screenshots and masks sensitive data instantly",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: BarChart3,
                title: "Live Graphs",
                desc: "Speed and ping history with real-time sparkline visualization",
                color: "from-orange-500 to-red-500",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div
                  className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color} text-white mb-4`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sections Breakdown */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl space-y-12">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Four Data Sections
          </h2>

          {[
            {
              title: "Network",
              icon: Wifi,
              items: [
                "Public IP & ISP",
                "Local IP & MAC",
                "Download/Upload Speed",
                "Ping & Signal Strength",
                "SSID & DNS",
                "VPN Status",
              ],
              color: "cyan",
            },
            {
              title: "Location",
              icon: BarChart3,
              items: [
                "Country & City (IP-based)",
                "Coordinates",
                "Timezone",
                "IP Change Notifications",
              ],
              color: "blue",
            },
            {
              title: "System",
              icon: Gauge,
              items: [
                "CPU, RAM, Disk Gauges",
                "Battery Status & Uptime",
                "macOS Version",
                "Hostname & Username",
              ],
              color: "purple",
            },
            {
              title: "Security",
              icon: Lock,
              items: [
                "Firewall Status",
                "System Integrity Protection",
                "FileVault Encryption",
                "Visual Status Pills",
              ],
              color: "green",
            },
          ].map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-lg bg-${section.color}-500/20 text-${section.color}-400`}
                    >
                      <section.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                      {section.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className={`relative h-64 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center ${
                  idx % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <div className="text-center">
                  <section.icon className={`w-16 h-16 mx-auto mb-4 text-${section.color}-400 opacity-50`} />
                  <p className="text-slate-500 font-mono text-sm">
                    {section.title} Data
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Performance & Battery */}
      <section className="px-4 py-20 bg-slate-900/30">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Built for Performance
            </h2>
            <p className="text-slate-400">
              Intelligent refresh rates minimize battery impact while keeping your data current.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tier: "Fast",
                interval: "2 seconds",
                what: "Speed, Graph",
                method: "Pure C (getifaddrs)",
                impact: "Negligible",
              },
              {
                tier: "Medium",
                interval: "10 seconds",
                what: "CPU, RAM, Disk, Battery, Wi-Fi",
                method: "Mach + IOKit",
                impact: "Very Low",
              },
              {
                tier: "Slow",
                interval: "60 seconds",
                what: "IP, VPN, DNS, Ping, Security",
                method: "Shell Commands",
                impact: "Low",
              },
            ].map((tier, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
              >
                <p className="text-cyan-400 font-mono text-sm font-bold mb-2">
                  {tier.tier} Tier
                </p>
                <p className="text-2xl font-bold text-white mb-4">{tier.interval}</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-slate-500">What Refreshes</p>
                    <p className="text-slate-300">{tier.what}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Method</p>
                    <p className="text-slate-300 font-mono text-xs">{tier.method}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Battery Impact</p>
                    <p className="text-green-400 font-semibold">{tier.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Settings & Customization */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Fully Customizable
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Refresh Intervals
              </h3>
              <p className="text-slate-400">
                Choose your preferred refresh rate: 1s, 2s, 3s, 5s, or 10s. Balance between real-time data and battery life.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                Privacy Shield
              </h3>
              <p className="text-slate-400">
                Configure auto-restore delay: 3s, 5s, 10s, 30s, or never. Manually toggle anytime.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                Section Visibility
              </h3>
              <p className="text-slate-400">
                Show/hide Network, Location, System, or Security sections based on your needs.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                Global Hotkey
              </h3>
              <p className="text-slate-400">
                Press ⌘⇧N to toggle the popover. Customizable in settings.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                Appearance
              </h3>
              <p className="text-slate-400">
                Choose Auto, Dark, or Light mode. Follows system settings or your preference.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-400" />
                Notifications
              </h3>
              <p className="text-slate-400">
                Get notified when your public IP changes. Launch at login option available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plugin System */}
      <section className="px-4 py-20 bg-gradient-to-r from-slate-900 to-slate-950">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Extensible by Design
          </h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            NetShield includes a plugin system for future extensibility. Add custom data sections, integrate with third-party services, or build your own monitoring tools.
          </p>
          <p className="text-sm text-slate-500 font-mono">
            NetShieldPlugin protocol • PluginManager registry • Zero breaking changes
          </p>
        </div>
      </section>

      {/* Install Guide */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Get Started
          </h2>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Download</h3>
                  <p className="text-slate-400">
                    Click the download button above to get NetShield.dmg (2.1 MB).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Open & Install</h3>
                  <p className="text-slate-400">
                    Open the DMG file and drag NetShield to your Applications folder.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Grant Permissions</h3>
                  <p className="text-slate-400">
                    Launch NetShield. macOS will ask for Screen Recording permission (required for screenshot detection and privacy shield). Grant it in System Settings → Privacy & Security.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Done!</h3>
                  <p className="text-slate-400">
                    NetShield will appear in your menu bar. Click to open the dashboard. Customize in Settings.
                  </p>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-4 py-20 bg-slate-900/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Built with Native Technologies
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
            {[
              "Swift 5.9",
              "SwiftUI",
              "AppKit",
              "SystemConfiguration",
              "CoreWLAN",
              "IOKit",
            ].map((tech) => (
              <div
                key={tech}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 border border-slate-700"
              >
                <p className="text-slate-300 font-mono text-sm">{tech}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center space-y-3">
            <p className="text-slate-400">
              ✓ Zero third-party dependencies
            </p>
            <p className="text-slate-400">
              ✓ No telemetry or data collection
            </p>
            <p className="text-slate-400">
              ✓ Hardened runtime enabled
            </p>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="px-4 py-20 bg-gradient-to-r from-cyan-950 to-blue-950">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Monitor Your Network?
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            NetShield brings clarity to your network. See everything that matters, instantly.
          </p>
          <DownloadButton
            url="https://github.com/NULLSHADExXx/netshield/releases/download/v1.0.0/NetShield.dmg"
            filename="NetShield.dmg"
            className="bg-white hover:bg-slate-100 text-slate-900 font-bold py-3 px-8 rounded-lg shadow-lg transition-all inline-block"
          >
            Download NetShield
          </DownloadButton>
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section className="px-4 py-20 bg-slate-900/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Troubleshooting
          </h2>

          <div className="space-y-8">
            {/* Quarantine/Gatekeeper */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-yellow-400">⚠️</span>
                "NetShield is damaged" or Gatekeeper Warning
              </h3>
              <p className="text-slate-300 mb-4">
                When you download NetShield from the internet, macOS may quarantine it as an unverified app. This is normal and easy to fix.
              </p>
              <div className="space-y-3 text-slate-300">
                <p><strong>Method 1: System Settings (Easiest)</strong></p>
                <ol className="list-decimal list-inside space-y-2 ml-4 text-sm">
                  <li>Open <strong>System Settings → Privacy & Security</strong></li>
                  <li>Scroll down to find: <em>"NetShield was blocked from use because it is not from an identified developer"</em></li>
                  <li>Click <strong>"Open Anyway"</strong></li>
                  <li>Enter your password if prompted</li>
                  <li>NetShield will now launch normally</li>
                </ol>
              </div>
              <div className="mt-4 space-y-3 text-slate-300">
                <p><strong>Method 2: Right-Click Open</strong></p>
                <ol className="list-decimal list-inside space-y-2 ml-4 text-sm">
                  <li>Right-click the NetShield app in Finder</li>
                  <li>Select <strong>"Open"</strong> (not just click)</li>
                  <li>Click <strong>"Open"</strong> in the dialog</li>
                  <li>App will launch and be remembered as trusted</li>
                </ol>
              </div>
              <div className="mt-4 space-y-3 text-slate-300">
                <p><strong>Method 3: Terminal (Advanced)</strong></p>
                <div className="bg-slate-950 rounded p-3 font-mono text-sm text-cyan-400 overflow-x-auto">
                  xattr -d com.apple.quarantine /Applications/NetShield.app
                </div>
              </div>
            </div>

            {/* Permission Issues */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-blue-400">🔐</span>
                Permission Denied or "Screen Recording" Prompt
              </h3>
              <p className="text-slate-300 mb-4">
                NetShield needs Screen Recording permission to detect when you take screenshots and auto-hide sensitive data.
              </p>
              <div className="space-y-3 text-slate-300">
                <p><strong>Grant Permission:</strong></p>
                <ol className="list-decimal list-inside space-y-2 ml-4 text-sm">
                  <li>Launch NetShield</li>
                  <li>macOS will ask: <em>"NetShield would like to record your screen"</em></li>
                  <li>Click <strong>"Allow"</strong></li>
                  <li>If you missed it, go to <strong>System Settings → Privacy & Security → Screen Recording</strong></li>
                  <li>Make sure <strong>NetShield is enabled</strong> in the list</li>
                </ol>
              </div>
            </div>

            {/* File Corruption */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-red-400">❌</span>
                "File is Corrupted" or Won't Open
              </h3>
              <p className="text-slate-300 mb-4">
                If the download was interrupted or corrupted, try these steps:
              </p>
              <div className="space-y-3 text-slate-300">
                <ol className="list-decimal list-inside space-y-2 ml-4 text-sm">
                  <li>Delete the NetShield.dmg file from your Downloads folder</li>
                  <li>Empty the Trash (Cmd+Delete)</li>
                  <li>Download NetShield again from this page</li>
                  <li>Make sure the download completes fully (check file size: ~2.1 MB)</li>
                  <li>Try opening again</li>
                </ol>
              </div>
            </div>

            {/* First Launch */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-green-400">✓</span>
                First Launch Checklist
              </h3>
              <div className="space-y-3 text-slate-300">
                <ul className="space-y-2 ml-4 text-sm">
                  <li>✓ NetShield appears in your menu bar (top-right of screen)</li>
                  <li>✓ Click the icon to open the dashboard</li>
                  <li>✓ You'll see Network, Location, System, and Security data</li>
                  <li>✓ Go to Settings (⚙️) to customize refresh rates and visibility</li>
                  <li>✓ Press ⌘⇧N to toggle the popover (customizable)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <AppFooter currentApp="NetShield" accent="#06b6d4" />
    </div>
  );
}
