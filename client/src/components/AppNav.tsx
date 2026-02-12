/*
  Shared Navigation — Dropdown app switcher for all app pages.
  Touch-friendly: click/tap to open, tap outside to close.
  Works on phones, tablets, and desktop.
*/

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ChevronDown, Apple, Menu, X } from "lucide-react";

export interface AppInfo {
  name: string;
  path: string;
  icon: string;
  accent: string;
  dmg: string;
  dmgFilename: string;
  tagline: string;
  category: string;
}

export const ALL_APPS: AppInfo[] = [
  {
    name: "MelodiQ",
    path: "/",
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/TFLbzLpsIxnxNhCK.png",
    accent: "#C42D78",
    dmg: "https://github.com/NULLSHADExXx/MelodiQ/releases/download/v1.0.0/MelodiQ.dmg",
    dmgFilename: "MelodiQ.dmg",
    tagline: "Play local. Stream YouTube. Listen to audiobooks.",
    category: "Media",
  },
  {
    name: "DropDock",
    path: "/dropdock",
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/hpOSiIBOuZEPvhPo.png",
    accent: "#3B82C4",
    dmg: "https://github.com/NULLSHADExXx/DropDock/releases/download/v1.0.0/DropDock.dmg",
    dmgFilename: "DropDock.dmg",
    tagline: "Floating shelf & file organizer for your desktop.",
    category: "Productivity",
  },
  {
    name: "CleanSlate",
    path: "/cleanslate",
    icon: "https://private-us-east-1.manuscdn.com/sessionFile/8P7TK5wMX27jvm9wWAs1vD/sandbox/v3F2dPaf7M7wDPEb2Mnlff_1770584072644_na1fn_Y2xlYW5zbGF0ZS1pY29u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOFA3VEs1d01YMjdqdm05d1dBczF2RC9zYW5kYm94L3YzRjJkUGFmN003d0RQRWIyTW5sZmZfMTc3MDU4NDA3MjY0NF9uYTFmbl9ZMnhsWVc1emJHRjBaUzFwWTI5dS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=PY~9d7J3vdyW8BZkcQI6lW-2igUf-4dD4C7T1gxSByMtS5GlTXHOFqWAHdUdelmFBpbdTLUP5tbIQIrS6BK0JAZlTCq3c7K2EG5HkdG~F~m~VXUsWDzuFm3MxpvgdI8Sa3Uo7ZoWtXT416lRbzxqZZgw~uQUZDRktVuCRAcnwSLytrza9R5Yd14txIByvdV6xQdhTIrqwh321xfjVQDXZBgQduKBxmg0gDiG1O3KYbcJEJ2QwqBDNDx10deDeZA~H4dHGTu304Z8CoR52qQx8geLCIXZ~9UW8AbDxzNoMK0KfycbAv-hDRA7Zpty8pL6rEggMnlxJBIkdMn39uYsPA__",
    accent: "#10B981",
    dmg: "https://github.com/NULLSHADExXx/cleanslate/releases/download/v1.0.0/CleanSlate.dmg",
    dmgFilename: "CleanSlate.dmg",
    tagline: "Clipboard manager with intelligent privacy protection.",
    category: "Privacy",
  },
  {
    name: "DevSnips",
    path: "/devsnips",
    icon: "https://private-us-east-1.manuscdn.com/sessionFile/8P7TK5wMX27jvm9wWAs1vD/sandbox/v3F2dPaf7M7wDPEb2Mnlff_1770584072645_na1fn_ZGV2c25pcHMtaWNvbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOFA3VEs1d01YMjdqdm05d1dBczF2RC9zYW5kYm94L3YzRjJkUGFmN003d0RQRWIyTW5sZmZfMTc3MDU4NDA3MjY0NV9uYTFmbl9aR1YyYzI1cGNITXRhV052YmcucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=qvLk8KYFwCH7BFKnuBNkgVBYP4l82UID3U7zaIo~jTq7-fQU4T8H2zgb5mKs3GCJH1J8nnaJEBgzH3cr52ANOI6WAOtApW6k~EVZ-ZzWjSQGKtbbx2rfc6xAMLfst3~p-nbVgxwds4Ge-uN0aMm1tr1VJGaDwuRo9rVLLNC5TFkhyIQxh9eP1qkdQzwR1SuC~1VDXprqQt6Mf~xh3ahsFqYMRrzvllOWPGcWbvI0PzY7NpvRgHvu33KjrL1GuNlcj~mWfBu0Z4-gHEwliIF-UBsA25JzRZfysyc1C2KsiSz6OckUxAkCGByXQQxuZzkF59PaDMzowG54cgbRXEpJIQ__",
    accent: "#F59E0B",
    dmg: "https://github.com/NULLSHADExXx/devsnips/releases/download/v1.0.0/DevSnips.dmg",
    dmgFilename: "DevSnips.dmg",
    tagline: "Caffeine, Color Picker & Network Monitor in one.",
    category: "Developer",
  },
  {
    name: "pCompress Pro",
    path: "/pcompresspro",
    icon: "https://private-us-east-1.manuscdn.com/sessionFile/8P7TK5wMX27jvm9wWAs1vD/sandbox/v3F2dPaf7M7wDPEb2Mnlff_1770584072645_na1fn_cGNvbXByZXNzLWljb24.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOFA3VEs1d01YMjdqdm05d1dBczF2RC9zYW5kYm94L3YzRjJkUGFmN003d0RQRWIyTW5sZmZfMTc3MDU4NDA3MjY0NV9uYTFmbl9jR052YlhCeVpYTnpMV2xqYjI0LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=OB5ge~ZhiYx3Gt3VrQnHLqq6filRYNzWUpkNswh3IxQA2jfutRJla6lqsEHudM86Y9N289n5GBdmlqxrQYke6xOTdwqY9~kP24CGXnEZuVAaNDS2IOxqm2mCpE06Re9DYghzO3PfAQ7ANWyQ28~Z5rjreOrZKgnepd4LgddRVqgJV7akMST~NhfECwzhzswYbebverAWjxCnxxLAhosmCgoesWdcThalcUN13BEOyNZnJJO8f8L~v8s8txcyfnNdIl0gKWmr-GT~yaTaKAlnxUeS-Br~bjs1KQ1Jms3NuvZ8PXaO-A57SzOu7Vr~qsRQ0FX5wOHb8Oj95xTYGeAmbg__",
    accent: "#06B6D4",
    dmg: "https://github.com/NULLSHADExXx/pcompress-pro/releases/download/v1.0.0/pCompressPro.dmg",
    dmgFilename: "pCompressPro.dmg",
    tagline: "Drag-and-drop image compression for PNG & JPG.",
    category: "Utility",
  },
  {
    name: "Unzipper Pro",
    path: "/unzipperpro",
    icon: "https://private-us-east-1.manuscdn.com/sessionFile/8P7TK5wMX27jvm9wWAs1vD/sandbox/Jg3WcaNeb6NkbaVe3IbzN1-img-2_1770587536000_na1fn_dW56aXBwZXItaWNvbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOFA3VEs1d01YMjdqdm05d1dBczF2RC9zYW5kYm94L0pnM1djYU5lYjZOa2JhVmUzSWJ6TjEtaW1nLTJfMTc3MDU4NzUzNjAwMF9uYTFmbl9kVzU2YVhCd1pYSXRhV052YmcucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=cbw6xT2aTI1EuNT~22MLxSQBnfn-r9oh9uL66ZwcuIStuvGoRY9FU54bK~RrRen1NdG44kJjf~tIZZPwKFp2PJ6Ar0~LUgl~D63MIvkhfay0gn3jTR16bUiY4r~mXogl04oDXBy4vCss25ZmRk0VtgeMieUt~jYmAvJmDcSu9Tdmm2CK7IjK0JYOxlynFIQi~7iQZmTNPMxMCjdNRLrPkOjqdnQxd7YdTWGPwhnM-E-QE0UWAYU3vK2G0XpOmVyokUH-dEBUUM8oMN6u~CwINfmGXSGOHIXDuhT4h7qTkpHYJSM-CO~jPYGrZzxr0xwxMykg1~QyAxXDj2AWCMBgIQ__",
    accent: "#3B82F6",
    dmg: "https://github.com/NULLSHADExXx/unzipper-pro/releases/download/v2.0.0/UnzipperPro.dmg",
    dmgFilename: "UnzipperPro.dmg",
    tagline: "Extract ZIP, 7Z, RAR, TAR & more with batch processing.",
    category: "Utility",
  },
  {
    name: "TeleTurbo",
    path: "/teleturbo",
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/rbphDyswkXDexgoS.png",
    accent: "#0088CC",
    dmg: "https://github.com/NULLSHADExXx/TeleTurbo/releases/download/v1.0.0/TeleTurbo.dmg",
    dmgFilename: "TeleTurbo.dmg",
    tagline: "High-speed Telegram file downloader with parallel chunks.",
    category: "Networking",
  },
  {
    name: "StreamFlix",
    path: "/streamflix",
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/sHmAeHIDXUrgaMFh.png",
    accent: "#8B5CF6",
    dmg: "https://github.com/NULLSHADExXx/StreamFlix/releases/download/v1.0.0/StreamFlix.dmg",
    dmgFilename: "StreamFlix.dmg",
    tagline: "Browse & stream movies and TV shows natively.",
    category: "Media",
  },
  {
    name: "QuickRes",
    path: "/quickres",
    icon: "https://private-us-east-1.manuscdn.com/sessionFile/8P7TK5wMX27jvm9wWAs1vD/sandbox/v3F2dPaf7M7wDPEb2Mnlff_1770584072646_na1fn_cXVpY2tyZXMtaWNvbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOFA3VEs1d01YMjdqdm05d1dBczF2RC9zYW5kYm94L3YzRjJkUGFmN003d0RQRWIyTW5sZmZfMTc3MDU4NDA3MjY0Nl9uYTFmbl9jWFZwWTJ0eVpYTXRhV052YmcucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=W0ubhF7e5lWVURGGdBGpY4h4Qv6J8kldNTaOszGJtNS5TVGvMZnr8HYikAYtzdvhUPf-Ua-6ciw8OBKTPzetQNYZFnDC3xUK9goS057ls4Qr1RhohAtw19fFlhxTQeKxbNaAiCpuuwAbScUAWufbHMusffyOldQomQKU2lNWYj66FJtFj6ceEVaCdmYp-Om0V34qr0EgU72TKUD3tTh6RHh9fn4FFyEjWrE1ouEQFJIFsQcTRsRIaNsHLeC2Hnp0GvSL0QPeUJbQUkpjzCsb6~W3p8H41Ho1raQ6-ThsIfbD9vPdlWWk8oEemzQxng4Jtu2SXUW8TNyIUtjtDcRrfQ__",
    accent: "#F97316",
    dmg: "https://github.com/NULLSHADExXx/quickres/releases/download/v1.0.0/QuickRes.dmg",
    dmgFilename: "QuickRes.dmg",
    tagline: "Resolution info, dark mode & desktop icons toggle.",
    category: "Utility",
  },
  {
    name: "SonicAtlas",
    path: "/sonicatlas",
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/uFCWKtaBZQqKoqCi.png",
    accent: "#0EA5E9",
    dmg: "https://github.com/NULLSHADExXx/SonicAtlas/releases/download/v1.0.0/SonicAtlas.dmg",
    dmgFilename: "SonicAtlas.dmg",
    tagline: "Explore 30,000+ live radio stations on a 3D globe.",
    category: "Media",
  },
  {
    name: "NotchBin",
    path: "/notchbin",
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/mLcRsRCOFrazGyxT.png",
    accent: "#F59E0B",
    dmg: "https://github.com/NULLSHADExXx/notchbin/releases/download/v1.0.0-beta/NotchBin-Beta-Installer.pkg",
    dmgFilename: "NotchBin-Beta-Installer.pkg",
    tagline: "Transform your MacBook notch into a productivity hub.",
    category: "Utility",
  },
  {
    name: "NetShield",
    path: "/netshield",
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663253409814/hiRgdZnLjoyFXEtB.png",
    accent: "#06B6D4",
    dmg: "https://github.com/NULLSHADExXx/netshield/releases/download/v1.0.0-beta/NetShield.dmg",
    dmgFilename: "NetShield.dmg",
    tagline: "Real-time network monitoring in your menu bar.",
    category: "Utility",
  },
];

export function AppNav({ currentApp }: { currentApp: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const current = ALL_APPS.find((a) => a.name === currentApp) || ALL_APPS[0];
  const otherApps = ALL_APPS.filter((a) => a.name !== currentApp);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close dropdown/mobile menu when tapping outside */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [currentApp]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? "bg-[#0A0A0B]/90 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 lg:h-20">
        {/* Left: App branding + desktop dropdown */}
        <div className="flex items-center gap-4">
          <a href={current.path} className="flex items-center gap-3 group">
            <img
              src={current.icon}
              alt={current.name}
              className="w-8 h-8 lg:w-9 lg:h-9 rounded-lg transition-transform duration-300 group-hover:scale-110"
            />
            <span className="font-serif text-lg lg:text-xl font-semibold tracking-tight text-white/90">
              {current.name}
            </span>
          </a>

          {/* Desktop dropdown */}
          <div className="hidden md:block relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onTouchEnd={(e) => {
                e.preventDefault();
                setDropdownOpen(!dropdownOpen);
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg text-xs text-white/40 hover:text-white/60 hover:bg-white/[0.05] transition-all duration-300 select-none"
            >
              <span className="font-medium">Our Apps</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-[#151517]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2.5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <img src={current.icon} alt={current.name} className="w-5 h-5 rounded-md" />
                    <span className="text-xs font-medium text-white/70">{current.name}</span>
                    <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.06] text-white/30">Current</span>
                  </div>
                </div>
                <div className="py-1.5 max-h-[60vh] overflow-y-auto">
                  {otherApps.map((app) => (
                    <Link
                      key={app.name}
                      href={app.path}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 mx-1.5 rounded-lg text-xs text-white/40 hover:text-white/70 hover:bg-white/[0.05] transition-all duration-200 active:bg-white/[0.08]"
                    >
                      <img src={app.icon} alt={app.name} className="w-5 h-5 rounded-md" />
                      <span className="font-medium">{app.name}</span>
                      <div
                        className="ml-auto w-2 h-2 rounded-full opacity-40"
                        style={{ backgroundColor: app.accent }}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Page anchors (desktop only) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/50">
          <a href="#features" className="hover:text-white/90 transition-colors duration-300">Features</a>
          <a href="#specs" className="hover:text-white/90 transition-colors duration-300">Specs</a>
        </div>

        {/* Right: Download + Mobile hamburger */}
        <div className="flex items-center gap-3">
          <NavDownloadButton dmgUrl={current.dmg} dmgFilename={current.dmgFilename} />

          {/* Mobile hamburger button */}
          <div className="md:hidden" ref={mobileMenuRef}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onTouchEnd={(e) => {
                e.preventDefault();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 text-white/50 hover:text-white/80 transition-colors select-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mobile dropdown panel */}
            {mobileMenuOpen && (
              <div className="absolute top-full right-4 mt-2 w-64 bg-[#151517]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Page links */}
                <div className="px-4 py-3 border-b border-white/[0.06] space-y-2">
                  <a
                    href="#features"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm text-white/50 hover:text-white/80 transition-colors py-1"
                  >
                    Features
                  </a>
                  <a
                    href="#specs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm text-white/50 hover:text-white/80 transition-colors py-1"
                  >
                    Specs
                  </a>
                </div>

                {/* Current app */}
                <div className="px-4 py-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <img src={current.icon} alt={current.name} className="w-5 h-5 rounded-md" />
                    <span className="text-xs font-medium text-white/70">{current.name}</span>
                    <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.06] text-white/30">Current</span>
                  </div>
                </div>

                {/* Other apps */}
                <div className="py-2 max-h-[50vh] overflow-y-auto">
                  <p className="px-4 py-1 text-[10px] uppercase tracking-widest text-white/20 font-medium">Switch App</p>
                  {otherApps.map((app) => (
                    <Link
                      key={app.name}
                      href={app.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/40 hover:text-white/70 hover:bg-white/[0.05] transition-all duration-200 active:bg-white/[0.08]"
                    >
                      <img src={app.icon} alt={app.name} className="w-5 h-5 rounded-md" />
                      <span className="font-medium text-xs">{app.name}</span>
                      <div
                        className="ml-auto w-2 h-2 rounded-full opacity-40"
                        style={{ backgroundColor: app.accent }}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ─── Nav Download Button (blob download with correct filename) ─── */
function NavDownloadButton({ dmgUrl, dmgFilename }: { dmgUrl: string; dmgFilename: string }) {
  return (
    <a
      href={dmgUrl}
      download={dmgFilename}
      className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-white/[0.08] border border-white/[0.1] rounded-full hover:bg-white/[0.14] hover:border-white/[0.18] transition-all duration-300 active:scale-95"
    >
      <Apple className="w-4 h-4" />
      <span className="hidden sm:inline">Download</span>
    </a>
  );
}

/* ─── Shared Footer ─── */
export function AppFooter({ currentApp, accent }: { currentApp: string; accent: string }) {
  const current = ALL_APPS.find((a) => a.name === currentApp) || ALL_APPS[0];
  const otherApps = ALL_APPS.filter((a) => a.name !== currentApp);

  return (
    <footer className="border-t border-white/[0.05] py-12 lg:py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <img src={current.icon} alt={current.name} className="w-7 h-7 rounded-lg" />
            <div>
              <span className="font-serif text-base font-semibold text-white/70">{current.name}</span>
              <p className="text-xs text-white/25 mt-0.5">Independent macOS utility by NULLSHADExXx</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href="mailto:NULLSHADExXx@proton.me"
              className="group flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-lg transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${accent}30`;
                e.currentTarget.style.backgroundColor = `${accent}08`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.backgroundColor = "";
              }}
            >
              <svg className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300">NULLSHADExXx@proton.me</span>
            </a>
            <a
              href="https://t.me/NULLSHADExXx"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-lg transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${accent}30`;
                e.currentTarget.style.backgroundColor = `${accent}08`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.backgroundColor = "";
              }}
            >
              <svg className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
              <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300">@NULLSHADExXx</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-white/20">&copy; 2026 {current.name}</span>
          <div className="flex items-center gap-4 flex-wrap">
            {otherApps.map((app) => (
              <Link
                key={app.name}
                href={app.path}
                className="text-[11px] text-white/20 hover:text-white/40 transition-colors"
              >
                {app.name}
              </Link>
            ))}
            <span className="text-white/10">|</span>
            <Link href="/terms" className="text-[11px] text-white/20 hover:text-white/40 transition-colors">Terms</Link>
            <Link href="/legal" className="text-[11px] text-white/20 hover:text-white/40 transition-colors">Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
