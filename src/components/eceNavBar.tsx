import { useMemo, useState } from "react";
import { Menu } from "lucide-react"; 
import type { NavId } from "../types/nav";

type NavbarProps = {
  logoSrc?: string;
  onNav?: (id: NavId) => void;
};

export default function ECENavbar({
  logoSrc = "/departments/ECE/ece_logo.png",
  onNav,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = useMemo(
    () => [
      { id: "home" as const, label: "Home" },
      { id: "about" as const, label: "Overview" },
      { id: "peo" as const, label: "PEO" },
      { id: "so" as const, label: "SO" },
      { id: "curriculum" as const, label: "Curriculum" },
      { id: "laboratories" as const, label: "Labs" },
      { id: "faculty" as const, label: "Faculty" },
      { id: "careers" as const, label: "Careers" },
    ],
    []
  );

  const handleNav = (id: NavId) => {
    onNav?.(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-50">
        <div className="relative h-16 max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          <button
            type="button"
            onClick={() => handleNav("home")}
            className="flex items-center gap-3 group relative z-[60]"
          >
            <img src={logoSrc} alt="ECE Logo" className="w-9 h-9 object-contain" />
            <div className="hidden sm:block leading-tight text-left">
              <span className="block text-sm font-bold text-[#2B1C50]">ECE Department</span>
              <span className="block text-[10px] uppercase tracking-widest text-purple-400 font-semibold">BulSU Engineering</span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-full border border-gray-200/50">
            {links.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => handleNav(l.id)}
                className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:text-[#2B1C50] hover:bg-white hover:shadow-sm transition-all duration-300"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNav("contact")}
              className="hidden md:inline-flex items-center justify-center px-6 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#2B1C50] to-[#8B65CF] shadow-md hover:shadow-purple-200 transition-all"
            >
              Contact
            </button>
            
            <button 
              className="md:hidden p-2 text-[#2B1C50] relative z-[60]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      <div 
        className={`fixed inset-0 z-[55] transition-all duration-500 md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)} 
      >
        <div className="absolute inset-0 bg-[#2B1C50]/60 backdrop-blur-sm" />

        <nav 
          className={`absolute top-0 right-0 w-[80%] h-full bg-white shadow-2xl flex flex-col items-center justify-center gap-6 transition-transform duration-500 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()} 
        >
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              className="text-xl font-bold text-[#2B1C50] hover:text-[#8B65CF] transition-colors py-2 uppercase tracking-tighter"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("contact")}
            className="mt-4 px-8 py-3 rounded-full text-white font-bold bg-gradient-to-r from-[#2B1C50] to-[#8B65CF]"
          >
            Contact Us
          </button>
        </nav>
      </div>
    </>
  );
}