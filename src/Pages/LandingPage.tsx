import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { landingPageData, type LandingPageData } from "../data/landing";
import {
  loadLandingDraft,
  mergeLandingWithOverrides,
} from "../lib/landingAdmin";

type Sections = LandingPageData["sections"];

function MissionVisionSection({ data }: { data: Sections["missionVision"] }) {
  return (
    <section id="mission-vision" className="max-w-6xl mx-auto px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2">
        {/* Mission Card */}
        <div className="group relative rounded-[2rem] bg-gradient-to-br from-[#a90000] to-[#7a0000] p-[1px] transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl
      hover:shadow-[#a90000]/30">
          <div className="h-full w-full rounded-[2rem] bg-white p-10 transition-all duration-500 group-hover:bg-white/95">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#a90000]/10 text-[#a90000] transition-colors duration-500 group-hover:bg-[#a90000]
      group-hover:text-white group-hover:rotate-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                strokeLinejoin="round"><path d="M12 13V2l8 4-8 4Z" /><path d="M20.55 10.23A9 9 0 1 1 8 4.94" /><path d="M8 10.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0Z" /></svg>
            </div>
            <h3 className="mt-8 text-3xl font-black text-gray-900 tracking-tight">MISSION</h3>
            <div className="mt-4 h-1.5 w-16 bg-[#a90000] rounded-full transition-all duration-500 group-hover:w-32" />
            <p className="mt-8 text-xl text-gray-600 leading-relaxed font-medium">
              {data.missionText}
            </p>
          </div>
        </div>

        {/* Vision Card */}
        <div className="group relative rounded-[2rem] bg-gradient-to-br from-[#d6b26f] to-[#b8860b] p-[1px] transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl
      hover:shadow-[#d6b26f]/30">
          <div className="h-full w-full rounded-[2rem] bg-white p-10 transition-all duration-500 group-hover:bg-white/95">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d6b26f]/20 text-[#2a1d0b] transition-colors duration-500 group-hover:bg-[#d6b26f]
      group-hover:text-[#2a1d0b] group-hover:-rotate-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
            </div>
            <h3 className="mt-8 text-3xl font-black text-gray-900 tracking-tight">VISION</h3>
            <div className="mt-4 h-1.5 w-16 bg-[#d6b26f] rounded-full transition-all duration-500 group-hover:w-32" />
            <p className="mt-8 text-xl text-gray-600 leading-relaxed font-medium">
              {data.visionText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DepartmentGridSection({ data }: { data: Sections["departmentGrid"] }) {
  return (
    <section id="department-grid" className="max-w-6xl mx-auto px-6 py-10">
      <SectionCard data={data}>
        <p className="mt-3 text-sm text-gray-600">{data.introText}</p>
      </SectionCard>
    </section>
  );
}

function NewsSection({ data }: { data: Sections["news"] }) {
  return (
    <section id="news" className="max-w-6xl mx-auto px-6 py-10">
      <SectionCard data={data}>
        <div className="mt-3 space-y-1 text-sm text-gray-600">
          {data.items.map((item, idx) => (
            <p key={idx}>
              {item.date} - {item.title}
            </p>
          ))}
        </div>
      </SectionCard>
    </section>
  );
}

function FacilitiesSection({ data }: { data: Sections["facilities"] }) {
  return (
    <section id="facilities" className="max-w-6xl mx-auto px-6 py-10">
      <SectionCard data={data}>
        <div className="mt-3 space-y-1 text-sm text-gray-600">
          {data.highlights.map((item, idx) => (
            <p key={idx}>- {item}</p>
          ))}
        </div>
      </SectionCard>
    </section>
  );
}

function StatisticsSection({ data }: { data: Sections["statistics"] }) {
  return (
    <section id="statistics" className="max-w-6xl mx-auto px-6 py-10">
      <SectionCard data={data}>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-700">
          {data.stats.map((item, idx) => (
            <span key={idx}>
              <strong>{item.value}</strong> {item.label}
            </span>
          ))}
        </div>
      </SectionCard>
    </section>
  );
}

function ContactSection({ data }: { data: Sections["contact"] }) {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-10">
      <SectionCard data={data}>
        <p className="mt-3 text-sm text-gray-600">Email: {data.email}</p>
        <p className="text-sm text-gray-600">Phone: {data.phone}</p>
        <p className="text-sm text-gray-600">Address: {data.address}</p>
      </SectionCard>
    </section>
  );
}

function LandingFooterSection({ data }: { data: Sections["footer"] }) {
  return (
    <footer id="footer" className="border-t bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-500">
        <p>
          {data.statusLabel}: {data.assignedGroup}
        </p>
        <div className="mt-3 flex flex-wrap gap-4">
          {data.links.map((link, idx) => (
            <a key={idx} href={link.href} className="text-sm text-gray-700 underline">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function SectionCard({
  data,
  children,
}: { data: { id: string; title: string; assignedGroup: string; statusLabel: string }; children?: ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
      <p className="text-xs font-semibold tracking-[0.14em] text-gray-500">
        {data.statusLabel}
      </p>
      <h2 className="mt-3 text-2xl font-bold text-gray-900">{data.title}</h2>
      <p className="mt-2 text-sm text-gray-600">{data.assignedGroup}</p>
      {children}
    </div>
  );
}

export default function LandingPage() {
  const isPreviewMode = useMemo(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("preview") === "landing";
  }, []);

  const [data, setData] = useState(() => {
    if (isPreviewMode) {
      return loadLandingDraft() ?? mergeLandingWithOverrides(landingPageData);
    }

    return mergeLandingWithOverrides(landingPageData);
  });

  useEffect(() => {
    if (!isPreviewMode) return;

    const onStorage = (event: StorageEvent) => {
      if (event.key !== "landing-admin-draft") return;
      setData(loadLandingDraft() ?? mergeLandingWithOverrides(landingPageData));
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [isPreviewMode]);

  const { hero, sections } = data;

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="font-extrabold tracking-wide text-lg">BULSU COE</h1>
          <div className="flex items-center gap-2">
            <Link
              to="/admin"
              className="rounded-full border border-gray-400 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
            >
              Landing Admin
            </Link>
            <Link
              to="/departments"
              className="rounded-full bg-[#a90000] px-5 py-2 text-sm font-semibold text-white hover:bg-[#8f0000]"
            >
              Department Pages
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section id="hero" className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="rounded-3xl bg-gradient-to-r from-[#f4efe3] via-[#ead9b5] to-[#d6b26f] p-8 md:p-12">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#6f4d12]">
              {hero.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-black leading-tight text-[#2a1d0b] whitespace-pre-line">
              {hero.title}
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={hero.primaryButtonHref}
                className="rounded-full bg-[#2a1d0b] px-5 py-2 text-sm font-semibold text-white hover:bg-black"
              >
                {hero.primaryButtonLabel}
              </Link>
            </div>
          </div>
        </section>

        <MissionVisionSection data={sections.missionVision} />
        <DepartmentGridSection data={sections.departmentGrid} />
        <NewsSection data={sections.news} />
        <FacilitiesSection data={sections.facilities} />
        <StatisticsSection data={sections.statistics} />
        <ContactSection data={sections.contact} />
      </main>

      <LandingFooterSection data={sections.footer} />
    </div>
  );
}
