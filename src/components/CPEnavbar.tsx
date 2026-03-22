import { useMemo } from "react";
import COELogo from "../assets/COE.svg";
import type { NavId } from "../types/nav";

/**
 * Renered as CPEnavbarProps to avoid conflicts with 
 * global or generic Navbar types in your project.
 */
type CPEnavbarProps = {
  logoSrc?: string;
  onNav?: (id: NavId) => void;
};

export default function CPEnavbar({
  logoSrc = COELogo,
  onNav,
}: CPEnavbarProps) {
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
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="relative h-16 max-w-6xl mx-auto px-6 flex items-center">
        
        {/* Logo / Home Button */}
        <button
          type="button"
          onClick={() => onNav?.("home")}
          className="flex items-center gap-3 transition hover:opacity-80"
          aria-label="Home"
        >
          <img src={logoSrc} alt="BulSU COE Logo" className="w-10 h-10 object-contain" />
          <div className="leading-tight text-left hidden sm:block">
            <span className="block font-bold text-[#A90000] text-sm">BulSU</span>
            <span className="block text-gray-600 text-[10px] uppercase tracking-widest">Computer Engineering</span>
          </div>
        </button>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 text-xs font-medium text-gray-500">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => onNav?.(link.id)}
              className="hover:text-[#A90000] transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Side: Contact Action */}
        <div className="ml-auto">
          <button
            type="button"
            onClick={() => onNav?.("contact")}
            className="hidden md:inline-flex items-center justify-center px-5 py-2 rounded-full text-white text-sm font-semibold bg-[#A90000] hover:bg-[#8f0000] shadow-sm transition-all active:scale-95"
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}