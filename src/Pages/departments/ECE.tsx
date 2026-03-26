import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/eceNavBar";
import SectionTitle from "../../components/eceSectionTitle";
import Footer from "../../components/Footer";
import { mergeDeptWithOverrides } from "../../lib/departmentAdmin";
import { ECE } from "../../data/department/ECE";
import "../../styles/departments/ECE.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ECEPage() {
  const [baseDept] = useState<typeof ECE>(ECE);
  const [activeIdx, setActiveIdx] = useState(0);

  const [selectedYearId, setSelectedYearId] = useState<string | null>(null);

  const dept = useMemo(() => mergeDeptWithOverrides(baseDept), [baseDept]);

  const currentYearData = useMemo(() => {
    return dept.curriculum.years.find((y) => y.id === selectedYearId);
  }, [selectedYearId, dept]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const timerSORef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev < dept.so.outcomes.length - 1 ? prev + 1 : 0,
    );
  }, [dept.so.outcomes.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : dept.so.outcomes.length - 1,
    );
  };

  const startSOAutoSlide = useCallback(() => {
    if (timerSORef.current) window.clearInterval(timerSORef.current);
    timerSORef.current = window.setInterval(() => {
      nextSlide();
    }, 5000);
  }, [nextSlide]);

  useEffect(() => {
    startSOAutoSlide();
    return () => {
      if (timerSORef.current) window.clearInterval(timerSORef.current);
    };
  }, [startSOAutoSlide]);

  const timerRef = useRef<number | null>(null);

  const startAutoSlide = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setActiveIdx((prev) =>
        prev < dept.faculty.members.length - 1 ? prev + 1 : 0,
      );
    }, 5000);
  }, [dept.faculty.members.length]);

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoSlide]);

  const [careerIdx, setCareerIdx] = useState(0);
  const timerCareerRef = useRef<number | null>(null);
  const careerCards = dept?.careers?.cards || [];

  const nextCareer = useCallback(() => {
    setCareerIdx((prev) => (prev < careerCards.length - 1 ? prev + 1 : 0));
  }, [careerCards.length]);

  const prevCareer = () => {
    setCareerIdx((prev) => (prev > 0 ? prev - 1 : careerCards.length - 1));
  };

  const startCareerAutoSlide = useCallback(() => {
    if (timerCareerRef.current) window.clearInterval(timerCareerRef.current);
    timerCareerRef.current = window.setInterval(nextCareer, 6000);
  }, [nextCareer]);

  useEffect(() => {
    startCareerAutoSlide();
    return () => {
      if (timerCareerRef.current) window.clearInterval(timerCareerRef.current);
    };
  }, [startCareerAutoSlide]);

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
    <div className="bg-white">
      <Navbar onNav={onNav} />

      <section id="home" className="max-w-6xl mx-auto px-6 pt-10">
        <div className="text-center">
          <h1 className="mt-2 text-3xl md:text-4xl font-black uppercase italic bg-gradient-to-r from-[#2B1C50] via-[#5A418E] to-[#8B65CF] bg-clip-text text-transparent leading-tight">
            {dept.title}
          </h1>
          <p className="mt-2 text-sm text-gray-500">{dept.subtitle}</p>
          <div className="mt-5">
            <Link
              to={`/dept/${dept.code}/admin`}
              className="inline-flex items-center rounded-full border border-[#2B1C50] px-5 py-2 text-sm font-semibold text-[#2B1C50] hover:bg-[#2B1C50] hover:text-white"
            >
              Open Department Admin
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-12 gap-3 md:gap-5">
          <div className="col-span-12 md:col-span-4 order-1">
            <div className="group relative h-[350px] md:h-[460px] p-[2px] rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(139,101,207,0.3)] bg-gray-200">
              <div className="absolute inset-[-150%] bg-[conic-gradient(transparent,transparent,#8B65CF,#2B1C50,transparent)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 w-full h-full rounded-[14px] overflow-hidden">
                <img
                  src={dept.images.heroLeft}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 order-2 grid grid-cols-12 gap-3 md:gap-5">
            <div className="col-span-12">
              <div className="group relative h-[200px] md:h-[240px] p-[2px] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-12px_#8B65CF] bg-gray-200">
                <div className="absolute inset-[-150%] bg-[conic-gradient(transparent,transparent,#8B65CF,#2B1C50,transparent)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 w-full h-full rounded-[14px] overflow-hidden">
                  <img
                    src={dept.images.heroBig}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-6">
              <div className="group relative h-[150px] md:h-[200px] p-[2px] rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(139,101,207,0.3)] bg-gray-200">
                <div className="absolute inset-[-150%] bg-[conic-gradient(transparent,transparent,#8B65CF,#2B1C50,transparent)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 w-full h-full rounded-[14px] overflow-hidden">
                  <img
                    src={dept.images.heroSmall1}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-6">
              <div className="group relative h-[150px] md:h-[200px] p-[2px] rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(139,101,207,0.3)] bg-gray-200">
                <div className="absolute inset-[-150%] bg-[conic-gradient(transparent,transparent,#8B65CF,#2B1C50,transparent)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 w-full h-full rounded-[14px] overflow-hidden">
                  <img
                    src={dept.images.heroSmall2}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="max-w-6xl mx-auto px-6 pt-10">
        <div className="text-left">
          <div className="mt-2 text-xl md:text-3xl font-black uppercase italic bg-gradient-to-r from-[#2B1C50] via-[#5A418E] to-[#8B65CF] bg-clip-text text-transparent leading-tight">
            {dept.programOverview.heading}
          </div>
          <p className="mt-2 text-[10px] md:text-base text-gray-500 leading-relaxed max-w-5xl text-justify">
            {dept.programOverview.text}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 text-center">
          {[
            {
              value: dept.programOverview.stats.nonTeaching,
              label: "NON-TEACHING PERSONNEL",
            },
            {
              value: dept.programOverview.stats.faculty,
              label: "FACULTY",
              isLink: true,
            },
            {
              value: dept.programOverview.stats.students,
              label: "ENROLLED STUDENTS",
            },
          ].map((stat, i) => {
            const CardContent = (
              <div className="group relative h-[100px] md:h-[160px] p-[2px] rounded-xl border border-gray-200 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-transparent hover:shadow-[0_0_20px_rgba(139,101,207,0.2)]">
                <div className="absolute inset-[-150%] bg-[conic-gradient(transparent,transparent,#8B65CF,#2B1C50,transparent)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 h-full w-full rounded-[10px] bg-white flex flex-col justify-center items-center p-2 md:p-6">
                  <div className="scale-75 md:scale-100 origin-center">
                    <Stat value={stat.value} label={stat.label} />
                  </div>
                  <div className="absolute bottom-2 h-1 w-0 rounded-full bg-[#8B65CF] transition-all duration-500 group-hover:w-8 opacity-50" />
                </div>
              </div>
            );

            return stat.isLink ? (
              <button
                key={i}
                onClick={() =>
                  document
                    .getElementById("faculty")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full text-center focus:outline-none"
              >
                {CardContent}
              </button>
            ) : (
              <div key={i}>{CardContent}</div>
            );
          })}
        </div>
      </section>

      <section id="peo" className="max-w-6xl mx-auto px-6 pt-10 md:pt-16">
        <SectionTitle
          center
          eyebrow={dept.title}
          title={dept.peo.title}
          subtitle={dept.peo.subtitle}
        />

        <div className="mt-8 flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-8 items-center">
          <div className="w-full md:col-span-6 flex justify-center items-center">
            <div className="w-full max-w-[200px] md:max-w-none h-auto md:h-[420px] flex items-center justify-center overflow-visible">
              <img
                src={dept.images.ece_logo}
                alt="Department Logo"
                className="w-full h-auto max-h-[180px] md:max-h-full object-contain select-none scale-100 md:scale-90"
              />
            </div>
          </div>

          <div className="w-full md:col-span-6">
            <div className="space-y-4 md:space-y-5">
              {dept.peo.bullets.map((b, idx) => (
                <div key={idx} className="scale-95 md:scale-100 origin-left">
                  <Bullet title={`PEO ${idx + 1}`} text={b} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="so"
        className="max-w-4xl mx-auto px-6 pt-10 md:pt-16 overflow-hidden"
      >
        <SectionTitle
          center
          eyebrow={dept.title}
          title={dept.so.title}
          subtitle={dept.so.subtitle}
        />

        <div className="relative mt-8 md:mt-12 h-[220px] md:h-[260px] overflow-hidden">
          <div className="relative h-full flex flex-col items-center">
            {dept.so.outcomes.map((o, idx) => {
              const position = idx - currentIndex;
              const isVisible = position === 0 || position === 1;

              if (!isVisible) return null;

              return (
                <div
                  key={idx}
                  className={`
              absolute w-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${
                position === 0
                  ? "z-20 opacity-100 translate-y-0 scale-100"
                  : "z-10 opacity-30 translate-y-[100px] md:translate-y-[120px] scale-95"
              }
            `}
                >
                  <div
                    onClick={() => {
                      if (position === 1) {
                        nextSlide();
                        startSOAutoSlide();
                      }
                    }}
                    className={`origin-left transition-transform duration-500 ${position === 1 ? "cursor-pointer" : ""}`}
                  >
                    <OutcomeCard title={o.title} text={o.text} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => {
              prevSlide();
              startSOAutoSlide();
            }}
            className="p-2 md:p-3 rounded-full border border-gray-100 bg-white shadow-sm text-[#2B1C50] hover:bg-[#8B65CF] hover:text-white transition-all active:scale-90"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="text-[10px] md:text-xs font-bold text-gray-400 tracking-widest uppercase">
            <span className="text-[#2B1C50]">{currentIndex + 1}</span> /{" "}
            {dept.so.outcomes.length}
          </div>

          <button
            onClick={() => {
              nextSlide();
              startAutoSlide();
            }}
            className="p-2 md:p-3 rounded-full border border-gray-100 bg-white shadow-sm text-[#2B1C50] hover:bg-[#8B65CF] hover:text-white transition-all active:scale-90"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>
      <section
        id="curriculum"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16"
      >
        <div className="mb-6 md:mb-12 text-center">
          <div className="text-gray-400 tracking-[0.6em] text-[10px] md:text-[10px] font-bold mb-4 uppercase">
            {dept.title}
          </div>
          <h2 className="mt-2 text-3xl md:text-4xl font-black uppercase italic bg-gradient-to-r from-[#2B1C50] via-[#5A418E] to-[#8B65CF] bg-clip-text text-transparent leading-tight">
            {dept.curriculum.title}
          </h2>
          <p className="mt-6 text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed border-t border-gray-100 pt-6">
            {dept.curriculum.text}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8 w-full">
          {baseDept.curriculum.years.map((year) => (
            <button
              key={year.id}
              onClick={() =>
                setSelectedYearId(selectedYearId === year.id ? null : year.id)
              }
              className={`p-4 md:p-6 rounded-2xl border-2 transition-all duration-500 text-left relative overflow-hidden ${
                selectedYearId === year.id
                  ? "border-[#2B1C50] bg-[#2B1C50] text-white shadow-lg scale-105 z-10"
                  : "border-gray-100 bg-white hover:border-[#8B65CF] hover:scale-105 shadow-sm"
              }`}
            >
              <span
                className={`block text-[9px] font-bold uppercase mb-1 tracking-widest ${
                  selectedYearId === year.id
                    ? "text-[#8B65CF]"
                    : "text-gray-400"
                }`}
              >
                {year.id === "Mid-Year" ? "Special" : "Level"}
              </span>
              <span className="block text-xs md:text-sm font-extrabold leading-tight uppercase">
                {year.label}
              </span>
            </button>
          ))}
        </div>

        {selectedYearId && (
          <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-8 border border-gray-100 shadow-xl animate-fadeIn">
            {currentYearData?.terms.map((term, tIdx) => (
              <div key={tIdx} className={tIdx > 0 ? "mt-12 md:mt-16" : ""}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-6 w-1.5 bg-[#8B65CF] rounded-full"></div>
                  <h3 className="text-base md:text-lg font-bold text-[#2B1C50] uppercase tracking-tight">
                    {term.name}
                  </h3>
                </div>

                <div className="relative overflow-x-auto rounded-xl md:rounded-2xl border border-gray-100 shadow-sm">
                  <table className="w-full text-left border-separate border-spacing-0 min-w-[800px]">
                    <thead>
                      <tr className="bg-[#2B1C50] text-[10px] uppercase text-white">
                        <th className="py-4 px-4 font-bold sticky left-0 bg-[#2B1C50] z-20">
                          Code
                        </th>
                        <th className="py-4 px-4 font-bold">Course Title</th>
                        {selectedYearId === "Mid-Year" ? (
                          <th className="py-4 px-2 text-center font-bold">
                            Total Units
                          </th>
                        ) : (
                          <>
                            <th className="py-4 px-2 text-center font-bold">
                              Lec
                            </th>
                            <th className="py-4 px-2 text-center font-bold">
                              Lab
                            </th>
                          </>
                        )}
                        <th className="py-4 px-4 font-bold text-center">
                          Prerequisite
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-[11px] md:text-[12px] divide-y divide-gray-50">
                      {term.courses?.map(
                        (
                          course: {
                            code: string;
                            title: string;
                            lec_units?: number;
                            lab_units?: number;
                            units?: number;
                            prereq?: string;
                          },
                          cIdx,
                        ) => (
                          <tr
                            key={cIdx}
                            className="hover:bg-[#8B65CF]/5 transition-colors"
                          >
                            <td
                              className={`py-4 px-4 font-mono font-bold sticky left-0 z-10 border-r border-gray-50 ${
                                course.code === "TOTAL"
                                  ? "bg-gray-100 text-black"
                                  : "bg-white text-[#2B1C50]"
                              }`}
                            >
                              {course.code}
                            </td>
                            <td className="py-4 px-4 font-medium whitespace-normal leading-snug">
                              {course.title}
                            </td>
                            {selectedYearId === "Mid-Year" ? (
                              <td className="py-4 px-2 text-center font-bold text-[#8B65CF]">
                                {course.lab_units ||
                                  course.units ||
                                  course.lec_units}
                              </td>
                            ) : (
                              <>
                                <td className="py-4 px-2 text-center">
                                  {course.lec_units}
                                </td>
                                <td className="py-4 px-2 text-center">
                                  {course.lab_units}
                                </td>
                              </>
                            )}
                            <td className="py-4 px-4 text-[10px] text-center italic text-gray-400">
                              {course.prereq || "—"}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section
        id="laboratories"
        className="max-w-6xl mx-auto px-6 pt-10 md:pt-16"
      >
        <SectionTitle
          center
          eyebrow={dept.title}
          title={dept.laboratories.title}
          subtitle="Department laboratories and learning spaces"
        />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {dept.laboratories.items.map((lab, idx) => (
            <div
              key={idx}
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="relative aspect-video w-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img
                  src={lab.image || "/images/placeholder.jpg"}
                  alt={lab.name}
                  className="w-full h-full object-cover grayscale opacity-40 transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex flex-col items-center justify-center p-4">
                  <div className="bg-yellow-400 text-black text-[9px] font-black px-2 py-0.5 rounded mb-1.5 shadow-sm uppercase tracking-tighter">
                    Notice
                  </div>
                  <span className="text-white font-bold text-xs md:text-sm tracking-widest text-center px-2 drop-shadow-md">
                    UNDER RENOVATION
                  </span>
                  <div className="mt-2 flex gap-1">
                    <div className="h-0.5 w-6 bg-yellow-400/80 rounded-full animate-pulse" />
                    <div className="h-0.5 w-1.5 bg-yellow-400/80 rounded-full animate-pulse" />
                  </div>
                </div>

                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[9px] font-bold text-[#2B1C50] shadow-sm uppercase">
                    Lab {idx + 1}
                  </span>
                </div>
              </div>

              <div className="p-4 md:p-5 border-t border-gray-50 flex-1 flex flex-col justify-center">
                <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-[#8B65CF] transition-colors leading-tight">
                  {lab.name}
                </h3>
                <p className="text-[9px] md:text-[10px] text-gray-400 mt-1 uppercase font-semibold tracking-wider">
                  {dept.code} • BulSU Engineering
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="faculty"
        className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 md:pt-16 overflow-hidden"
      >
        <SectionTitle center eyebrow={dept.title} title={dept.faculty.title} />

        <div className="relative mt-8 md:mt-12 group h-[400px] md:h-[500px] max-w-4xl mx-auto">
          <button
            onClick={() => {
              setActiveIdx((prev) =>
                prev > 0 ? prev - 1 : dept.faculty.members.length - 1,
              );
              startAutoSlide();
            }}
            className="absolute left-0 md:left-5 top-1/2 -translate-y-1/2 z-50 bg-white/90 backdrop-blur-md p-2 md:p-3 rounded-full shadow-xl border border-gray-100 text-[#2B1C50] hover:bg-[#2B1C50] hover:text-white transition-all active:scale-90"
          >
            <span className="block transform rotate-180 text-[8px] md:text-[10px] font-bold">
              ➜
            </span>
          </button>

          <button
            onClick={() => {
              setActiveIdx((prev) =>
                prev < dept.faculty.members.length - 1 ? prev + 1 : 0,
              );
              startAutoSlide();
            }}
            className="absolute right-0 md:right-5 top-1/2 -translate-y-1/2 z-50 bg-white/90 backdrop-blur-md p-2 md:p-3 rounded-full shadow-xl border border-gray-100 text-[#2B1C50] hover:bg-[#2B1C50] hover:text-white transition-all active:scale-90"
          >
            <span className="text-[8px] md:text-[10px] font-bold">➜</span>
          </button>

          <div className="relative h-full flex items-center justify-center">
            {dept.faculty.members.map((member, idx) => {
              const position = idx - activeIdx;
              const isActive = idx === activeIdx;
              const isVisible = Math.abs(position) <= 1;

              if (!isVisible) return null;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveIdx(idx);
                    startAutoSlide();
                  }}
                  className={`
              absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer
              flex flex-col rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border group/card
              ${
                isActive
                  ? "z-30 w-[78%] sm:w-[85%] max-w-[260px] md:max-w-[320px] h-[350px] md:h-[420px] opacity-100 shadow-[0_20px_40px_-10px_rgba(43,28,80,0.2)] bg-white border-[#2B1C50]"
                  : "z-10 w-[60%] sm:w-[70%] max-w-[200px] md:max-w-[250px] h-[280px] md:h-[340px] opacity-30 bg-gray-50 border-gray-100"
              }
            `}
                  style={{
                    transform: `
                translateX(${position * (typeof window !== "undefined" && window.innerWidth < 640 ? 68 : 85)}%) 
                translateY(${isActive ? "-10px" : "0px"}) 
                scale(${isActive ? 1 : 0.85})
              `,
                  }}
                >
                  <div className="relative w-full h-[65%] md:h-[70%] overflow-hidden bg-gray-100">
                    <img
                      src={member.image}
                      className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover/card:scale-110"
                      alt={member.name}
                    />
                    {!isActive && (
                      <div className="absolute inset-0 bg-white/20" />
                    )}
                  </div>

                  <div className="px-3 md:px-4 py-3 md:py-4 text-center flex-1 flex flex-col justify-center items-center bg-white relative">
                    <h3
                      className={`font-bold text-[11px] md:text-[14px] uppercase tracking-tight leading-tight transition-colors duration-300
                ${isActive ? "text-[#2B1C50]" : "text-gray-400"}`}
                    >
                      {member.name}
                    </h3>

                    <div
                      className={`h-0.5 my-1.5 md:my-2 rounded-full transition-all duration-500
                ${isActive ? "w-10 md:w-12 bg-[#8B65CF]" : "w-4 bg-gray-200"}`}
                    />

                    <p
                      className={`text-[8px] md:text-[10px] font-bold uppercase tracking-[0.15em]
                ${isActive ? "text-gray-600" : "text-gray-300"}`}
                    >
                      {member.role}
                    </p>

                    <div
                      className={`absolute bottom-0 left-0 h-1 transition-all duration-700 origin-left z-20
                ${isActive ? "w-full bg-[#2B1C50] opacity-100" : "w-0 opacity-0"}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center flex-wrap gap-1.5 mt-4 md:mt-6 pb-10 px-4">
          {dept.faculty.members.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIdx(i);
                startAutoSlide();
              }}
              className={`h-1 rounded-full transition-all duration-500 ${
                activeIdx === i
                  ? "w-8 md:w-10 bg-[#2B1C50]"
                  : "w-1.5 md:w-2 bg-gray-200"
              }`}
            />
          ))}
        </div>
      </section>

      <section
        id="careers"
        className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 md:pt-16 pb-20 overflow-hidden"
      >
        <SectionTitle
          center
          eyebrow={dept.title}
          title={dept.careers.title}
          subtitle={dept.careers.subtitle}
        />

        <div className="relative mt-8 md:mt-12 group max-w-5xl mx-auto">
          {/* MAIN CONTAINER: Full Gradient Blend from Purple to White */}
          <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100 shadow-2xl min-h-[550px] md:min-h-[450px] bg-gradient-to-br md:bg-gradient-to-r from-[#2B1C50] via-[#4A3482] to-white">
            {careerCards.map((card, idx) => (
              <div
                key={idx}
                className={`flex flex-col md:flex-row w-full h-full absolute inset-0 transition-all duration-1000 ease-in-out ${
                  idx === careerIdx
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-12 pointer-events-none"
                }`}
              >
                <div className="w-full md:w-5/12 h-[250px] md:h-auto p-4 md:p-10 flex items-center justify-center relative">
                  <div className="relative z-20 w-full h-full rounded-[1rem] md:rounded-[2rem] bg-[#1A1135] shadow-2xl overflow-hidden border border-white/10 group-hover:scale-[1.02] transition-transform duration-500">
                    <img
                      src={card.photo}
                      alt={card.title}
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B1C50]/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                <div className="w-full md:w-7/12 p-6 md:p-12 lg:p-16 flex flex-col justify-center text-center md:text-left">
                  <div className="font-bold text-2xl md:text-4xl lg:text-5xl text-[#2B1C50] transition-colors duration-300 group-hover:text-[#8B65CF] leading-[1.1] mb-4 md:mb-6">
                    {card.title}
                  </div>
                  <div className="w-12 md:w-16 h-1 md:h-1.5 bg-gradient-to-r from-[#8B65CF] to-[#2B1C50] rounded-full mb-6 md:mb-8 mx-auto md:mx-0 shadow-sm" />
                  <p className="text-[#2B1C50]/80 text-sm md:text-lg lg:text-xl font-medium leading-relaxed max-w-md mx-auto md:mx-0">
                    {card.text}
                  </p>
                  <div className="absolute bottom-4 right-8 md:bottom-6 md:right-10 text-[80px] md:text-[100px] font-black text-[#2B1C50] select-none -z-10 opacity-5">
                    0{idx + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 z-30 hidden sm:block">
            <button
              onClick={() => {
                prevCareer();
                startCareerAutoSlide();
              }}
              className="p-3 md:p-4 rounded-full bg-white shadow-xl text-[#2B1C50] hover:scale-110 transition-all border border-gray-100 active:scale-95"
            >
              <ChevronLeft size={24} className="md:w-[28px] md:h-[28px]" />
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 z-30 hidden sm:block">
            <button
              onClick={() => {
                nextCareer();
                startCareerAutoSlide();
              }}
              className="p-3 md:p-4 rounded-full bg-white shadow-xl text-[#2B1C50] hover:scale-110 transition-all border border-gray-100 active:scale-95"
            >
              <ChevronRight size={24} className="md:w-[28px] md:h-[28px]" />
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-8 md:mt-12">
          {careerCards.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCareerIdx(i);
                startCareerAutoSlide();
              }}
              className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
                i === careerIdx
                  ? "w-8 md:w-12 bg-[#2B1C50]"
                  : "w-2 md:w-3 bg-gray-200"
              }`}
            />
          ))}
        </div>
      </section>
      <section
        id="contact"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-10"
      >
        <div className="relative group rounded-[2rem] md:rounded-[2.5rem] border border-[#8B65CF]/30 bg-gradient-to-br from-[#2B1C50]/5 via-white to-[#8B65CF]/10 p-6 md:p-12 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#8B65CF]/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-[#2B1C50]/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-12">
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 w-full md:w-auto">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-4">
                <img
                  src="/src/assets/bulsu.svg"
                  alt="BULSU"
                  className="w-12 h-12 md:w-16 md:h-16 object-contain"
                />
                <img
                  src="/public/COE.svg"
                  alt="COE"
                  className="w-12 h-12 md:w-16 md:h-16 object-contain"
                />
                <img
                  src="/public/departments/ECE/ece_logo.png"
                  alt="ECE"
                  className="w-12 h-12 md:w-16 md:h-16 object-contain"
                />
              </div>

              <div className="space-y-1 gap-1">
                <h2 className="mt-2 text-3xl md:text-4xl font-black uppercase italic bg-gradient-to-r from-[#2B1C50] via-[#5A418E] to-[#8B65CF] bg-clip-text text-transparent leading-tight">
                  College of Engineering
                </h2>
                <p className="text-[#2B1C50] font-bold text-md md:text-lg">
                  Electronics Engineering
                </p>
                <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                  Bulacan State University
                </p>
              </div>
            </div>

            <div className="hidden md:block w-px h-32 bg-gradient-to-b from-transparent via-[#8B65CF]/40 to-transparent"></div>
            <div className="block md:hidden w-20 h-px bg-[#8B65CF]/40"></div>

            <div className="flex flex-col items-center md:items-end text-center md:text-right w-full md:w-auto">
              <span className="inline-block text-[12px] md:text-[14px] font-black text-white uppercase tracking-[0.2em] mb-4 bg-gradient-to-r from-[#2B1C50] to-[#8B65CF] border border-[#8B65CF]/20 px-4 py-1.5 rounded-full shadow-lg">
                Program Chair
              </span>
              <h3 className="mt-2 text-xl md:text-xl font-black uppercase italic bg-gradient-to-r from-[#2B1C50] via-[#5A418E] to-[#8B65CF] bg-clip-text text-transparent leading-tight">
                Engr. Donald M. Lapiguera
              </h3>
              <a
                href="mailto:donald.lapiguera@ms.bulsu.edu.ph"
                className="text-gray-600 font-semibold text-sm md:text-base hover:text-[#8B65CF] transition-colors flex items-center gap-2 group break-all"
              >
                <span className="border-b border-transparent group-hover:border-[#8B65CF]">
                  donald.lapiguera@bulsu.edu.ph
                </span>
                <span className="group-hover:translate-x-1 transition-transform hidden md:inline text-[#8B65CF]">
                  →
                </span>
              </a>
              <a
                href="tel:09677709894"
                className="text-gray-600 font-semibold text-sm md:text-base hover:text-[#8B65CF] transition-colors flex items-center gap-2 group mt-2"
              >
                <span className="border-b border-transparent group-hover:border-[#8B65CF]">
                  0967 770 9894
                </span>
                <span className="group-hover:translate-x-1 transition-transform hidden md:inline text-[#8B65CF]">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-5xl font-extrabold text-[#2B1C50] transition-colors duration-300 group-hover:text-[#8B65CF]">
        {value}
      </div>
      <div className="text-[10px] tracking-widest font-bold text-gray-400 uppercase leading-tight">
        {label}
      </div>
    </div>
  );
}

function Bullet({ title, text }: { title: string; text: string }) {
  return (
    <div className="group relative flex flex-col justify-center p-5 bg-white rounded-xl border border-gray-100 border-l-4 border-l-[#2B1C50] transition-all duration-300 hover:shadow-[0_10px_30px_-15px_rgba(43,28,80,0.2)] hover:-translate-x-1">
      <div className="font-bold text-[#2B1C50] transition-colors duration-300 group-hover:text-[#8B65CF]">
        {title}
      </div>
      <div className="mt-1 text-sm text-gray-500 leading-relaxed italic">
        {text}
      </div>
    </div>
  );
}

function OutcomeCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="group relative w-full p-4 md:p-6 bg-white rounded-2xl border border-gray-100 border-l-4 border-l-[#2B1C50] transition-all duration-300 hover:shadow-[0_10px_30px_-15px_rgba(43,28,80,0.2)] hover:shadow-lg origin-left">
      <div className="flex flex-row items-start md:items-center gap-3 md:gap-4">
        <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#8B65CF]/10 backdrop-blur-md border border-[#8B65CF]/20 transition-all duration-500 group-hover:bg-[#2B1C50] group-hover:border-[#2B1C50] group-hover:shadow-[0_8px_20px_rgba(43,28,80,0.2)]">
          <span className="text-[10px] md:text-xs font-bold text-[#2B1C50] text-center leading-none transition-colors duration-500 group-hover:text-white">
            {title}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-gray-600 text-[11px] md:text-xl leading-relaxed italic break-words">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
