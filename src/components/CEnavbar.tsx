import { useMemo } from "react";
import CEIcon from "../assets/CEicon.svg";
import type { NavId } from "../types/nav";

type NavbarProps = {
  logoSrc?: string;
  onNav?: (id: NavId) => void;
};

export default function Navbar({
  logoSrc = CEIcon,
  onNav,
}: NavbarProps) {
  const links = useMemo(
    () => [
      { id: "home" as const, label: "Home" },
      { id: "about" as const, label: "Program Overview" },
      { id: "peo" as const, label: "PEO" },
      { id: "so" as const, label: "SO" },
      { id: "curriculum" as const, label: "Curriculum" },
      { id: "laboratories" as const, label: "Laboratories" },
      { id: "faculty" as const, label: "Faculty" },
      { id: "careers" as const, label: "Careers" },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-50 ce-bg-navy shadow-md">
      <div className="relative h-20 max-w-6xl mx-auto px-6 flex items-center">
        {/* Left: logo + text */}
        <button
          type="button"
          onClick={() => onNav?.("home")}
          className="flex items-center gap-4 group"
          aria-label="Home"
        >
          <img src={logoSrc} alt="Logo" className="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-110" />
          <div className="text-white font-black tracking-tighter text-2xl">
            BULSU <span className="ce-text-gold">CE</span>
          </div>
        </button>

        {/* Center nav */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-white/70">
          {links.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => onNav?.(l.id)}
              className="hover:text-white transition-colors duration-200 ce-nav-link"
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Right contact - REMOVED */}
        <div className="ml-auto" />
      </div>
    </header>
  );
}
