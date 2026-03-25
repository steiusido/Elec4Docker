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
    <section id="mission-vision" className="max-w-6xl mx-auto px-6 py-10">
      <SectionCard data={data}>
        <p className="mt-3 text-sm text-gray-600">Mission: {data.missionText}</p>
        <p className="mt-1 text-sm text-gray-600">Vision: {data.visionText}</p>
      </SectionCard>
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
  const sortedItems = useMemo(() => {
    if (!data.items) return [];
    return [...data.items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [data.items]);

  const featuredList = sortedItems.slice(0, 4) || [];
  const [current, setCurrent] = useState(0);

  const currentItem = featuredList[current];

  const goTo = (index: number) => {
    if (index >= 0 && index < featuredList.length) {
      setCurrent(index);
    }
  };

  return (
    <section id="news" className="bg-[#FCFCFD]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Hero */}
        <div className="relative bg-[#F4F5F6] rounded-t-[24px] overflow-hidden">
          {/* Background Image */}
          {data?.backgroundImage && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${data.backgroundImage})` }}
            />
          )}

          {/* Gradient Overlay */}
          {data?.overlayImage && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-80"
              style={{ backgroundImage: `url(${data.overlayImage})` }}
            />
          )}

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center gap-8 px-4 py-10 sm:py-12">
            {/* Frame */}
            <div className="flex flex-col items-center gap-4">
              {/* Hero Title */}
              <h1
                className="
                  font-bold text-white tracking-[-0.02em]
                  text-4xl leading-tight
                  sm:text-5xl sm:leading-[1.1]
                  md:text-6xl md:leading-[1.1]
                  lg:text-[72px] lg:leading-20
                "
              >
                {data?.title || "COE NEWS"}
              </h1>
            </div>
          </div>
        </div>
        {/* Featured News Card with Pagination */}
        {currentItem && (
          <div className="mt-8">
            {/* CARD */}
            <div className="relative w-full h-55 sm:h-80 md:h-105 lg:h-129.5 rounded-t-[6px] overflow-hidden">
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${currentItem.image})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60" />

              <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4">
                {/* Badge */}
                <div>
                  <span className="inline-flex border border-[#EBEEF3] rounded-[3px] px-4 py-1 sm:mx-8 sm:my-4 text-[#EBEEF3] text-xs sm:text-sm md:text-base font-medium">
                    {"RECENT"}
                  </span>
                </div>

                {/* Text */}
                <div className="text-white flex flex-col gap-2 sm:gap-3 max-w-3xl sm:px-8 overflow-hidden">
                  {currentItem.date && (
                    <p className="text-[#F9FAFC] text-xs sm:text-sm md:text-base">
                      {currentItem.date}
                    </p>
                  )}

                  {currentItem.title && (
                    <h2
                      className="font-bold uppercase text-[#F9FAFC]
                      text-lg sm:text-xl md:text-2xl lg:text-[36px]
                      md:leading-10.75 line-clamp-2"
                    >
                      {currentItem.title}
                    </h2>
                  )}

                  {currentItem.description && (
                    <p
                      className="font-medium text-white
                      text-sm sm:text-base md:text-lg lg:text-[20px]
                      md:leading-7 line-clamp-3"
                    >
                      {currentItem.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* PAGINATION */}
            {featuredList.length > 1 && (
              <div className="flex items-center justify-center sm:justify-end sm:pr-8 gap-3 sm:gap-4 mt-6">
                {/* PREV */}
                <button
                  onClick={() => goTo(current - 1)}
                  disabled={current === 0}
                  className={`
                    w-12.5 h-10 sm:w-17.5 sm:h-12.5
                    flex items-center justify-center rounded-[3px]
                    ${current === 0 ? "bg-[#BAB8B8]" : "bg-[#262626] cursor-pointer hover:scale-110 transition duration-300"}
                  `}
                >
                  <span className="border-2 border-[#EBEEF3] w-3 h-3 border-t-0 border-r-0 rotate-45" />
                </button>

                {/* NUMBERS */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {featuredList.map((_, index) => {
                    const isActive = index === current;

                    return (
                      <button
                        key={index}
                        onClick={() => goTo(index)}
                        className={`
                          flex items-center justify-center
                          w-7.5 h-7.5 sm:w-8.75 sm:h-8.75
                          text-sm sm:text-base md:text-[24px]
                          ${
                            isActive
                              ? "bg-[#262626] text-white rounded-full"
                              : "text-[rgba(38,38,38,0.61)] cursor-pointer hover:scale-120"
                          }
                        `}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>

                {/* NEXT */}
                <button
                  onClick={() => goTo(current + 1)}
                  disabled={current === featuredList.length - 1}
                  className={`
                    w-12.5 h-10 sm:w-17.5 sm:h-12.5
                    flex items-center justify-center rounded-[3px]
                    ${
                      current === featuredList.length - 1
                        ? "bg-[#BAB8B8]"
                        : "bg-[#262626] cursor-pointer hover:scale-110 transition duration-300"
                    }
                  `}
                >
                  <span className="border-2 border-[#EBEEF3] w-3 h-3 border-b-0 border-l-0 rotate-45" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* NEWS GRID SECTION */}
        {sortedItems && (
          <div className="mt-12">
            {/* Heading */}
            <h2
              className="
                font-bold text-[#262626]
                text-xl sm:text-2xl md:text-[28px]
                mb-6
              "
            >
              COE NEWS
            </h2>

            {/* Grid */}
            <div
              className="
                grid gap-6
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {sortedItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 hover:scale-105 transition-all duration-300 ease-out hover:shadow-lg p-3 rounded-lg"
                >
                  {/* Image Card */}
                  <div className="relative w-full h-50 sm:h-55 md:h-62 rounded-[6px] overflow-hidden">
                    {/* Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />

                    {/* Optional dark overlay for readability */}
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Label */}
                    {item.label && (
                      <div className="absolute top-2 right-2 border border-[#EBEEF3] rounded-lg px-2 py-0.5 bg-black/40">
                        <span className="text-[#EBEEF3] text-[10px] sm:text-[12px] font-normal capitalize">
                          {item.label}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ✅ Avatar + Name */}
                  {item.author && (
                    <div className="flex items-center gap-3 mt-1">
                      {/* Avatar */}
                      <div
                        className="w-11 h-11 rounded-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${item.author.avatar})`,
                        }}
                      />

                      {/* Name */}
                      <span className="text-black text-sm font-medium tracking-[0.1px]">
                        {item.author.name}
                      </span>
                    </div>
                  )}

                  {/* ✅ TEXT CONTENT */}
                  <div className="flex flex-col gap-1">
                    {/* Date */}
                    {item.date && (
                      <p className="text-[rgba(38,38,38,0.6)] text-xs sm:text-sm font-medium">
                        {item.date}
                      </p>
                    )}

                    {/* Title */}
                    {item.title && (
                      <h3
                        className="
                          text-[#262626]
                          font-semibold
                          text-base sm:text-lg md:text-[22px]
                          leading-snug
                          line-clamp-2
                        "
                      >
                        {item.title}
                      </h3>
                    )}

                    {/* Description */}
                    {item.description && (
                      <p
                        className="
                          text-[#696868]
                          font-medium
                          text-sm sm:text-base
                          leading-relaxed
                          line-clamp-3
                        "
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
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
