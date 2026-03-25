import { useEffect, useMemo, useState, useRef, type ReactNode } from "react";
import Navbar from "../../components/CEnavbar";
import SectionTitle from "../../components/CEsectiontitle";
import Footer from "../../components/CEfooter";
import { mergeDeptWithOverrides } from "../../lib/departmentAdmin";
import { CE } from "../../data/department/CE";
import CEIcon from "../../assets/CEicon.svg";
import "../../styles/departments/CE.css";

function FadeInSection({ children, className = "", delay = "" }: { children: ReactNode, className?: string, delay?: string }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const current = domRef.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);

  return (
    <div
      className={`${className} ${isVisible ? 'ce-animate-fade-in' : 'opacity-0'} ${delay}`}
      ref={domRef}
    >
      {children}
    </div>
  );
}

function ImageStack({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 1500); // Switches every 1.5 seconds for a smooth but quick feel
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[600px] mt-16">
      {images.map((img, idx) => {
        // Calculate position relative to current index
        const position = (idx - currentIndex + images.length) % images.length;
        const isVisible = position < 3; // Show top 3 layers

        return (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
              !isVisible ? "opacity-0 scale-95 translate-y-8" : ""
            }`}
            style={{
              zIndex: images.length - position,
              transform: `translateY(${position * 20}px) scale(${1 - position * 0.05})`,
              opacity: isVisible ? 1 - position * 0.3 : 0,
            }}
          >
            <div className="w-full h-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white ce-border-gold">
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function CEPage() {
  const [baseDept] = useState<typeof CE>(CE);

  const dept = useMemo(
    () => mergeDeptWithOverrides(baseDept),
    [baseDept]
  );

  const heroImages = useMemo(() => dept.images.heroCarousel, [dept.images.heroCarousel]);

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
    <div className="bg-white ce-text-dark selection:bg-gold-200 overflow-x-hidden">
      <Navbar onNav={onNav} />

      {/* Hero Section - Initial Entrance */}
      <section id="home" className="max-w-6xl mx-auto px-6 pt-16">
        <div className="text-center">
          <div className="mb-8 flex justify-center group ce-animate-scale-in">
             <img src={CEIcon} alt="CE Logo" className="w-40 h-40 object-contain transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
          </div>
          <div className="text-sm font-black ce-text-gold tracking-[0.3em] uppercase mb-4 ce-animate-fade-in ce-delay-2">
            {dept.subtitle}
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight ce-text-navy uppercase ce-animate-fade-in ce-delay-4">
            {dept.title}
          </h1>
          {/* Explore Curriculum Button - REMOVED */}
        </div>

        <FadeInSection delay="ce-delay-8">
          <ImageStack images={heroImages} />
        </FadeInSection>
      </section>

      {/* 1. Program Overview */}
      <section id="about" className="ce-bg-light mt-32 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <FadeInSection delay="ce-delay-1">
              <div className="text-sm font-black ce-text-gold tracking-[0.3em] uppercase mb-6">
                {dept.programOverview.heading}
              </div>
              <h2 className="text-4xl md:text-5xl font-black ce-text-navy leading-tight">
                {dept.programOverview.subheading}
              </h2>
              <p className="mt-8 text-lg text-gray-600 leading-relaxed font-medium">
                {dept.programOverview.text}
              </p>
            </FadeInSection>
            <div className="grid grid-cols-1 gap-8">
              <FadeInSection delay="ce-delay-2" className="bg-white p-10 rounded-3xl shadow-sm border-l-8 ce-border-gold transition-transform hover:-translate-x-2">
                <Stat value={dept.programOverview.stats.students} label="Enrolled Students" color="var(--primary-navy)" />
              </FadeInSection>
              <div className="grid grid-cols-2 gap-8">
                <FadeInSection delay="ce-delay-3" className="bg-white p-10 rounded-3xl shadow-sm border-l-8 border-gray-200 transition-transform hover:-translate-y-2">
                  <Stat value={dept.programOverview.stats.faculty} label="Expert Faculty" color="var(--primary-navy)" />
                </FadeInSection>
                <FadeInSection delay="ce-delay-4" className="bg-white p-10 rounded-3xl shadow-sm border-l-8 border-gray-200 transition-transform hover:-translate-y-2">
                  <Stat value={dept.programOverview.stats.nonTeaching} label="Support Staff" color="var(--primary-navy)" />
                </FadeInSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Program Educational Objectives */}
      <section id="peo" className="max-w-6xl mx-auto px-6 py-32">
        <FadeInSection delay="ce-delay-1">
          <SectionTitle 
            center 
            eyebrow={dept.peo.eyebrow} 
            title={dept.peo.title} 
            subtitle={dept.peo.subtitle} 
          />
        </FadeInSection>

        <div className="mt-20 grid grid-cols-12 gap-16 items-center">
          <div className="col-span-12 md:col-span-5 order-2 md:order-1">
            <div className="space-y-10">
              {dept.peo.bullets.map((b, idx) => (
                <FadeInSection key={idx} delay={`ce-delay-${idx + 2}`} className="flex gap-8 group">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl ce-bg-navy flex items-center justify-center text-white font-black text-xl transition-all group-hover:ce-bg-gold group-hover:scale-110 shadow-lg">
                    {idx + 1}
                  </div>
                  <div className="pt-2">
                    <p className="text-lg text-gray-700 leading-relaxed font-semibold group-hover:ce-text-navy transition-colors">{b}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 order-1 md:order-2">
            <FadeInSection delay="ce-delay-3" className="relative group">
              <div className="absolute -top-6 -right-6 w-full h-full ce-bg-gold rounded-[3rem] -z-10 opacity-10 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
              <div className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                <img src={dept.images.peo} alt="PEO" className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 3. Student Outcomes */}
      <section id="so" className="ce-bg-navy py-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <FadeInSection delay="ce-delay-1">
            <div className="text-sm font-black ce-text-gold tracking-[0.3em] uppercase mb-6">{dept.so.eyebrow}</div>
            <h2 className="text-4xl md:text-6xl font-black mb-8">{dept.so.title}</h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-xl mb-20">{dept.so.subtitle}</p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dept.so.outcomes.map((o, idx) => (
              <FadeInSection key={idx} delay={`ce-delay-${(idx % 3) + 2}`} className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[2rem] text-left hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl ce-bg-gold flex items-center justify-center text-navy font-black text-2xl mb-8 group-hover:scale-110 transition-transform">
                  {o.title.split(" ")[1] || idx + 1}
                </div>
                <p className="text-gray-200 leading-relaxed font-medium text-lg">{o.text}</p>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Curriculum Overview */}
      <section id="curriculum" className="max-w-6xl mx-auto px-6 py-32">
        <div className="grid grid-cols-12 gap-20 items-center">
          <div className="col-span-12 md:col-span-6">
            <FadeInSection delay="ce-delay-1">
              <div className="text-sm font-black ce-text-gold tracking-[0.3em] uppercase mb-6">{dept.curriculumOverview.eyebrow}</div>
              <h2 className="text-4xl md:text-6xl font-black ce-text-navy leading-tight">{dept.curriculumOverview.title}</h2>
              <p className="mt-8 text-xl text-gray-600 leading-relaxed">{dept.curriculumOverview.text}</p>
            </FadeInSection>

            <ul className="mt-12 space-y-5">
              {dept.curriculumOverview.bullets.map((b, idx) => (
                <FadeInSection key={idx} delay={`ce-delay-${idx + 3}`} className="flex items-center gap-6 text-gray-700 font-bold group">
                  <div className="w-4 h-4 rounded-full ce-bg-gold transition-transform group-hover:scale-125" />
                  <span className="text-lg">{b}</span>
                </FadeInSection>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-6">
            <FadeInSection delay="ce-delay-4" className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37] to-[#1F3A4D] rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative h-[450px] md:h-[550px] rounded-[3rem] bg-white border border-gray-100 flex items-center justify-center overflow-hidden shadow-2xl">
                <img src={dept.images.watermark} alt="" className="w-[85%] opacity-5 select-none grayscale transition-all duration-1000 group-hover:scale-110 group-hover:rotate-6" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[12rem] font-black text-gray-100/30 tracking-tighter transition-all duration-700 group-hover:text-gray-200/50">CE</span>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 5. Program Curriculum */}
      <section id="program-curriculum" className="ce-bg-light py-32">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection delay="ce-delay-1">
            <SectionTitle 
              center 
              eyebrow={dept.programCurriculum.eyebrow} 
              title={dept.programCurriculum.title} 
              subtitle="Explore our comprehensive 4-year curriculum designed for future civil engineers." 
            />
          </FadeInSection>
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dept.programCurriculum.years.map((y, idx) => (
              <FadeInSection key={idx} delay={`ce-delay-${idx + 2}`} className="group bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 border-t-[10px] ce-border-gold hover:-translate-y-3">
                <h3 className="text-2xl font-black ce-text-navy mb-6 uppercase tracking-tight">{y.year}</h3>
                <div className="space-y-4">
                  {y.semesters.map((s, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-4 text-gray-500 font-bold group-hover:ce-text-gold transition-colors">
                      <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:ce-bg-gold transition-colors" />
                      <span className="text-sm">{s}</span>
                    </div>
                  ))}
                </div>
                  <button className="mt-10 text-xs font-black ce-text-gold hover:ce-text-navy transition-all uppercase tracking-widest flex items-center gap-2 group/btn">
                    Course Details 
                    <span className="transition-transform group-hover/btn:translate-x-1">&rarr;</span>
                  </button>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Career Opportunities */}
      <section id="careers" className="max-w-6xl mx-auto px-6 py-32">
        <FadeInSection delay="ce-delay-1">
          <SectionTitle 
            center 
            eyebrow={dept.careers.eyebrow} 
            title={dept.careers.title} 
            subtitle={dept.careers.subtitle} 
          />
        </FadeInSection>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {dept.careers.cards.map((card, idx) => (
            <FadeInSection key={idx} delay={`ce-delay-${idx + 2}`} className="group bg-white p-12 rounded-[2.5rem] border-2 border-gray-50 text-center hover:border-gold-300 ce-card-hover shadow-sm">
              <div className="w-24 h-24 ce-bg-light rounded-3xl flex items-center justify-center text-5xl mx-auto group-hover:ce-bg-gold transition-all duration-500 group-hover:rotate-6 shadow-sm" aria-hidden="true">
                {card.icon}
              </div>
              <h3 className="mt-10 text-2xl font-black ce-text-navy uppercase tracking-tight">{card.title}</h3>
              <p className="mt-6 text-gray-500 leading-relaxed font-medium text-lg">{card.text}</p>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Laboratories */}
      <section id="laboratories" className="ce-bg-light py-32">
         <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <FadeInSection delay="ce-delay-1" className="text-left">
                     <div className="text-sm font-black ce-text-gold tracking-[0.3em] uppercase mb-6">{dept.laboratories.eyebrow}</div>
                    <h2 className="text-4xl md:text-6xl font-black ce-text-navy uppercase tracking-tight">{dept.laboratories.title}</h2>
                </FadeInSection>
                <FadeInSection delay="ce-delay-2" className="text-gray-500 max-w-md text-lg font-medium italic">{dept.laboratories.description}</FadeInSection>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dept.laboratories.items.map((lab, idx) => (
                <FadeInSection key={idx} delay={`ce-delay-${idx + 2}`} className="bg-white p-8 rounded-3xl shadow-sm hover:ce-bg-navy group transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-50">
                <div className="text-[10px] font-black ce-text-gold group-hover:text-white/40 mb-4 tracking-[0.2em] uppercase">LABORATORY {idx + 1}</div>
                <h3 className="text-xl font-bold ce-text-navy group-hover:text-white transition-colors leading-snug">{lab}</h3>
                <div className="mt-6 w-8 h-1 ce-bg-gold group-hover:w-full transition-all duration-500"></div>
                </FadeInSection>
            ))}
            </div>
        </div>
      </section>

      {/* Faculty */}
      <section id="faculty" className="max-w-6xl mx-auto px-6 py-32">
        <FadeInSection delay="ce-delay-1">
          <SectionTitle center eyebrow={dept.faculty.eyebrow} title={dept.faculty.title} />
        </FadeInSection>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10">
          {dept.faculty.members.map((member, idx) => (
            <FadeInSection key={`${member.name}-${idx}`} delay={`ce-delay-${idx + 2}`} className="group flex items-center gap-8 bg-white p-10 rounded-[2.5rem] border-2 border-gray-50 hover:border-gold-300 transition-all hover:shadow-2xl hover:-translate-y-1">
                <div className="w-20 h-20 rounded-2xl ce-bg-navy flex items-center justify-center text-white font-black text-3xl transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-xl">
                    {member.name.split(" ").pop()?.charAt(0)}
                </div>
                <div>
                    <h3 className="font-black text-2xl ce-text-navy tracking-tight">{member.name}</h3>
                    <div className="mt-2 flex items-center gap-3">
                        <span className="w-6 h-0.5 ce-bg-gold"></span>
                        <p className="text-xs font-black ce-text-gold uppercase tracking-widest">{member.role}</p>
                    </div>
                </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Stat({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) {
  return (
    <div className="text-center md:text-left group">
      <div className="text-5xl font-black transition-transform group-hover:scale-110" style={{ color }}>
        {value}+
      </div>
      <div className="mt-3 text-xs font-black text-gray-400 uppercase tracking-[0.2em] group-hover:ce-text-gold transition-colors">{label}</div>
    </div>
  );
}
