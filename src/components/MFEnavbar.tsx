import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { mergeDeptWithOverrides } from "../lib/departmentAdmin";
import { MFE } from "../data/department/MFE";

interface NavProps {
  onNav: (id: string) => void;
  activeId: string;
}

export default function MFEnavbar({ onNav, activeId }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const dept = useMemo(() => mergeDeptWithOverrides(MFE), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "peo", label: "Objectives" },
    { id: "so", label: "Outcomes" },
    { id: "curriculum", label: "Curriculum" },
    { id: "laboratories", label: "Labs" },
    { id: "faculty", label: "Faculty" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[50] transition-all duration-500 ${
        isScrolled 
        ? "py-3 bg-white/90 backdrop-blur-xl shadow-[0_2px_20px_-10px_rgba(0,0,0,0.1)] border-b border-zinc-100" 
        : "py-6 bg-transparent"
      }`}
    >
      <div 
        className="absolute top-0 left-0 h-[3px] bg-[#26bac8] transition-all duration-150 ease-out shadow-[0_0_10px_#26bac866]" 
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNav("home")}
        >
          <div className="relative w-9 h-9 bg-white flex items-center justify-center rounded-sm overflow-hidden transition-transform group-hover:rotate-[10deg] border border-zinc-100 shadow-sm">
            <img 
                src={dept.images.watermark} 
                alt="MFE Logo"
                className="relative z-10 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 saturate-[1.2] brightness-110" 
                onError={(e) => {
                e.currentTarget.style.display = 'none';
                const container = e.currentTarget.parentElement;
                if (container) {
                    container.style.backgroundColor = '#09090b'; 
                    container.innerHTML += '<span class="relative z-10 text-[#26bac8] font-black italic text-sm">M</span>';
                }
                }}
            />

  {/* Technical Slide-up Overlay - Changed to light version */}
  <div className="absolute inset-0 bg-[#26bac8] translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-10" />
  
  {/* Decorative Corner Pixel */}
  <div className="absolute top-0 right-0 w-1 h-1 bg-[#26bac8] opacity-0 group-hover:opacity-100 transition-opacity" />
</div>
          
          <div className="flex flex-col">
            <span className="text-[11px] font-black text-zinc-950 uppercase tracking-tighter leading-none">
              BulSU MFE
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-1 bg-zinc-100/50 p-1 rounded-full border border-zinc-200/50">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              className={`relative px-4 py-2 text-[9px] font-black uppercase tracking-widest transition-all duration-300 rounded-full ${
                activeId === item.id 
                ? "text-white bg-zinc-950 shadow-md scale-105" 
                : "text-zinc-500 hover:text-zinc-950 hover:bg-white"
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              {activeId === item.id && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#26bac8] rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link 
            to="/dept/mfe/admin"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-zinc-950 text-white text-[9px] font-black uppercase tracking-widest rounded-sm hover:bg-[#26bac8] transition-all group overflow-hidden relative shadow-lg active:scale-95"
          >
            <span className="relative z-10">Admin Access</span>
            <svg viewBox="0 0 24 24" className="w-3 h-3 relative z-10 fill-none stroke-current stroke-[3] group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          
          <button className="lg:hidden p-2 text-zinc-950 hover:bg-zinc-100 rounded-full transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M4 7h16M4 12h16M4 17h12" strokeLinecap="square" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}