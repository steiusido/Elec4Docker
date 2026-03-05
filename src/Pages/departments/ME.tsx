import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { mergeDeptWithOverrides } from "../../lib/departmentAdmin";
import { ME } from "../../data/department/ME";
import "../../styles/departments/ME.css";

export default function MEPage() {
  const [baseDept] = useState<typeof ME>(ME);

  const dept = useMemo(
    () => mergeDeptWithOverrides(baseDept),
    [baseDept]
  );

  useEffect(() => {
    if (!dept) return;

    document.title = `${dept.code} | BULSU COE`;

    const link =
      (document.querySelector("link[rel='icon']") as HTMLLinkElement | null) ??
      (document.querySelector("link[rel~='icon']") as HTMLLinkElement | null);

    if (link) {
      link.href = `/icons/${dept.code.toLowerCase()}.svg`;
    }
  }, [dept]);

  const onNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-[#f7f7f8] text-[#1f2430]">
      <MENavbar onNav={onNav} />

      <main className="max-w-6xl mx-auto px-6 pb-16">
        <section id="home" className="pt-10 md:pt-14">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">{dept.title}</h1>
            <p className="mt-5 mx-auto max-w-2xl text-sm md:text-base text-[#767d8b]">
              {dept.subtitle}
            </p>
            <div className="mt-5">
              <Link
                to={`/dept/${dept.code}/admin`}
                className="inline-flex items-center rounded-full border border-[#1f2430] px-5 py-2 text-sm font-semibold hover:bg-[#1f2430] hover:text-white"
              >
                Open ME Admin
              </Link>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-4">
              <RoundedImage src={dept.images.heroLeft} alt={`${dept.title} hero left`} className="h-[520px]" />
            </div>
            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <RoundedImage src={dept.images.heroBig} alt={`${dept.title} hero highlight`} className="h-[270px]" />
              </div>
              <RoundedImage src={dept.images.heroSmall1} alt={`${dept.title} feature one`} className="h-[245px]" />
              <RoundedImage src={dept.images.heroSmall2} alt={`${dept.title} feature two`} className="h-[245px]" />
            </div>
          </div>
        </section>

        <section id="about" className="pt-16">
          <h2 className="text-3xl font-bold">{dept.programOverview.heading}</h2>
          <p className="mt-4 text-[#6f7786] leading-relaxed max-w-5xl">{dept.programOverview.text}</p>

          <div className="mt-8 h-px bg-[#dfe2e7]" />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <Stat value={dept.programOverview.stats.nonTeaching} label="Non-Teaching Personnel" accentHex={dept.theme.accentHex} />
            <Stat value={dept.programOverview.stats.faculty} label="Faculty" accentHex={dept.theme.accentHex} />
            <Stat value={dept.programOverview.stats.students} label="Enrolled Students" accentHex={dept.theme.accentHex} />
          </div>
        </section>

        <section id="peo" className="pt-20">
          <p className="text-center text-sm font-semibold text-[#61697a]">{dept.title}</p>
          <h2 className="mt-2 text-center text-4xl font-black">Program Educational Objectives</h2>
          <p className="mt-4 text-center mx-auto max-w-3xl text-[#6f7786]">{dept.peo.subtitle}</p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <RoundedImage src={dept.images.peo} alt={`${dept.title} PEO`} className="h-[560px]" />
            <div className="space-y-7 pt-4">
              {dept.peo.bullets.map((bullet, index) => (
                <div key={`${bullet}-${index}`}>
                  <h3 className="text-3xl font-extrabold">
                    PEO {index + 1}
                  </h3>
                  <p className="mt-2 text-[#6f7786] leading-relaxed">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="so" className="pt-20">
          <p className="text-center text-sm font-semibold text-[#61697a]">{dept.title}</p>
          <h2 className="mt-2 text-center text-4xl font-black">{dept.so.title}</h2>
          <p className="mt-4 text-center mx-auto max-w-3xl text-[#6f7786]">{dept.so.subtitle}</p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {dept.so.outcomes.map((outcome, index) => (
              <div key={`${outcome.title}-${index}`} className="rounded-3xl border border-[#e1e4ea] bg-white p-7 text-center">
                <div
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-black"
                  style={{
                    backgroundColor: index === 0 ? "#e8f8e3" : index === 1 ? "#e9efff" : "#f2e8ff",
                    color: index === 0 ? "#4ea94a" : index === 1 ? "#4670ff" : "#8459c7",
                  }}
                >
                  {index + 1}
                </div>
                <h3 className="mt-4 text-2xl font-bold">{outcome.title}</h3>
                <p className="mt-3 text-[#6f7786]">{outcome.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="curriculum" className="pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-xs font-bold tracking-[0.15em] text-[#7b8392]">TAKE A TOUR</p>
              <h2 className="mt-2 text-4xl font-black">{dept.curriculum.title}</h2>
              <p className="mt-4 text-[#6f7786] leading-relaxed">{dept.curriculum.text}</p>
              <div className="mt-8 space-y-4">
                {dept.curriculum.bullets.map((item, index) => (
                  <div key={`${item}-${index}`} className="flex items-center gap-3 text-[#4e5563]">
                    <span className="h-5 w-5 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: dept.theme.accentHex }}>
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-3xl border border-[#e1e4ea] bg-white/60 min-h-[360px] md:min-h-[420px] overflow-hidden">
              <img
                src={dept.images.watermark}
                alt={`${dept.title} watermark`}
                className="absolute inset-0 h-full w-full object-contain opacity-20"
              />
            </div>
          </div>
        </section>

        <section id="careers" className="pt-20">
          <p className="text-center text-xs font-bold tracking-[0.14em] text-[#7b8392]">{dept.title}</p>
          <h2 className="mt-2 text-center text-5xl font-black">{dept.careers.title}</h2>
          <p className="mt-4 text-center max-w-4xl mx-auto text-[#6f7786]">{dept.careers.subtitle}</p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {dept.careers.cards.map((card, index) => (
              <div key={`${card.title}-${index}`} className="rounded-3xl border border-[#e1e4ea] bg-white p-7">
                <div className={`h-16 w-16 rounded-3xl grid place-items-center text-3xl ${index === 0 ? "bg-[#fbe3e1]" : index === 1 ? "bg-[#fff1d4]" : "bg-[#ffe8cb]"}`}>
                  {card.icon}
                </div>
                <h3 className="mt-5 text-3xl font-black">{card.title}</h3>
                <p className="mt-4 text-[#6f7786] leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <MEFooter />
    </div>
  );
}

function MENavbar({ onNav }: { onNav: (id: string) => void }) {
  return (
    <header className="bg-white/95 backdrop-blur sticky top-0 z-20 border-b border-[#eceef3]">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        <button type="button" onClick={() => onNav("home")} className="flex items-center gap-3 text-left">
          <img src="/bulsu-coe.png" alt="BulSU COE" className="h-11 w-11 object-contain" />
          <div>
            <p className="text-sm font-black tracking-wide leading-none">BULSU COE</p>
            <p className="text-xs text-[#6f7786] leading-none mt-1">Mechanical Engineering</p>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#5f6777]">
          <button type="button" onClick={() => onNav("home")} className="hover:text-[#1f2430]">Home</button>
          <button type="button" onClick={() => onNav("about")} className="hover:text-[#1f2430]">About</button>
          <button type="button" onClick={() => onNav("peo")} className="hover:text-[#1f2430]">Facilities</button>
          <button type="button" onClick={() => onNav("curriculum")} className="hover:text-[#1f2430]">News</button>
        </nav>

        <button
          type="button"
          onClick={() => onNav("careers")}
          className="rounded-full bg-[#ab1d17] px-6 py-2 text-sm font-semibold text-white hover:bg-[#901712]"
        >
          Contact
        </button>
      </div>
    </header>
  );
}

function MEFooter() {
  const departments = ["Civil", "Computer", "Mechanical", "Industrial", "Electrical", "Electronics", "Mechatronics", "Manufacturing"];

  return (
    <footer className="bg-white border-t border-[#eceef3] mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src="/bulsu-coe.png" alt="BulSU COE" className="h-14 w-14 object-contain" />
            <p className="mt-3 text-3xl font-black">BULSU COE</p>
          </div>

          <div>
            <p className="text-sm font-black">HOME</p>
            <ul className="mt-4 space-y-3 text-[#6f7786]">
              <li>Department</li>
              <li>Facilities</li>
              <li>News</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm font-black">Department</p>
            <ul className="mt-4 grid grid-cols-2 gap-y-3 text-[#6f7786]">
              {departments.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-[#eceef3] pt-6 text-center text-sm text-[#6f7786]">
          Copyright © COE. All rights reserved
        </div>
      </div>
    </footer>
  );
}

function RoundedImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <div className={`rounded-3xl overflow-hidden bg-[#dce1ea] ${className}`}>
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}

function Stat({
  value,
  label,
  accentHex,
}: {
  value: number;
  label: string;
  accentHex: string;
}) {
  return (
    <div>
      <p className="text-6xl md:text-7xl font-black leading-none" style={{ color: accentHex }}>
        {value}
      </p>
      <p className="mt-3 text-xl font-bold">{label}</p>
    </div>
  );
}
