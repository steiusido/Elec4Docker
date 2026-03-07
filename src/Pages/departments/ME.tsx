import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { mergeDeptWithOverrides } from "../../lib/departmentAdmin";
import { ME } from "../../data/department/ME";
import {
  MEFooter,
  MEMediaSlot,
  MENavbar,
  MESectionHeading,
} from "../../components/MEChrome";
import "../../styles/departments/ME.css";

export default function MEPage() {
  const [baseDept] = useState<typeof ME>(ME);

  const dept = useMemo(() => mergeDeptWithOverrides(baseDept), [baseDept]);

  useEffect(() => {
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
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="me-page">
      <MENavbar
        dept={dept}
        onNav={onNav}
        items={[
          { label: "Home", kind: "scroll", target: "home" },
          { label: "Overview", kind: "scroll", target: "about" },
          { label: "PEO", kind: "scroll", target: "peo" },
          { label: "Outcomes", kind: "scroll", target: "so" },
          { label: "Curriculum", kind: "scroll", target: "curriculum" },
          { label: "Excellence", kind: "route", to: dept.excellencePage.path },
        ]}
        cta={{ label: "Open ME Admin", to: `/dept/${dept.code}/admin` }}
      />

      <main className="me-shell">
        <section id="home" className="me-hero">
          <div className="me-hero__copy">
            <p className="me-eyebrow">{dept.hero.eyebrow}</p>
            <h1 className="me-display-title">{dept.title}</h1>
            <p className="me-hero__kicker">{dept.hero.kicker}</p>
            <p className="me-hero__copy-text">{dept.hero.description}</p>

            <div className="me-action-row">
              <button
                type="button"
                className="me-button me-button--primary"
                onClick={() => onNav("about")}
              >
                Explore the Program
              </button>
              <Link to={dept.excellencePage.path} className="me-button me-button--secondary">
                {dept.excellencePage.title}
              </Link>
            </div>

            <div className="me-metric-grid">
              {dept.hero.metrics.map((metric) => (
                <article key={metric.label} className="me-metric-card">
                  <p className="me-metric-card__value">{metric.value}</p>
                  <p className="me-metric-card__label">{metric.label}</p>
                  <p className="me-metric-card__detail">{metric.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="me-media-grid">
            <MEMediaSlot
              src={dept.images.heroLeft}
              alt={`${dept.title} laboratory portrait`}
              title={dept.imagePlaceholders.heroLeft.title}
              text={dept.imagePlaceholders.heroLeft.text}
              className="me-media-slot--tall"
            />
            <MEMediaSlot
              src={dept.images.heroBig}
              alt={`${dept.title} department banner`}
              title={dept.imagePlaceholders.heroBig.title}
              text={dept.imagePlaceholders.heroBig.text}
              className="me-media-slot--wide"
            />
            <MEMediaSlot
              src={dept.images.heroSmall1}
              alt={`${dept.title} industry exposure`}
              title={dept.imagePlaceholders.heroSmall1.title}
              text={dept.imagePlaceholders.heroSmall1.text}
              className="me-media-slot--square"
            />
            <MEMediaSlot
              src={dept.images.heroSmall2}
              alt={`${dept.title} design and prototyping`}
              title={dept.imagePlaceholders.heroSmall2.title}
              text={dept.imagePlaceholders.heroSmall2.text}
              className="me-media-slot--square"
            />
          </div>
        </section>

        <section id="about" className="me-section">
          <MESectionHeading
            eyebrow="Program Profile"
            title={dept.programOverview.heading}
            text={dept.programOverview.text}
          />

          <div className="me-overview-grid">
            <article className="me-panel me-panel--prose">
              <p className="me-panel__lead">
                The current evidence package places Mechanical Engineering at the intersection of
                accreditation, curriculum review, research productivity, and service-oriented
                engineering work.
              </p>

              <div className="me-credential-list">
                {dept.accreditation.items.map((item) => (
                  <div key={item.label} className="me-credential-list__item">
                    <p className="me-credential-list__label">{item.label}</p>
                    <h3 className="me-credential-list__value">{item.value}</h3>
                    <p className="me-credential-list__detail">{item.detail}</p>
                  </div>
                ))}
              </div>
            </article>

            <div className="me-card-grid">
              {dept.programOverview.cards.map((card) => (
                <article key={card.title} className="me-panel">
                  <p className="me-panel__tag">ME Signal</p>
                  <h3 className="me-panel__title">{card.title}</h3>
                  <p className="me-panel__body">{card.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="me-stat-strip">
            {dept.programOverview.stats.map((stat) => (
              <article key={stat.label} className="me-stat-chip">
                <span className="me-stat-chip__value">{stat.value}</span>
                <span className="me-stat-chip__label">{stat.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="peo" className="me-section">
          <MESectionHeading
            eyebrow="Graduate Direction"
            title={dept.peo.title}
            text={dept.peo.subtitle}
          />

          <div className="me-split-grid">
            <MEMediaSlot
              src={dept.images.peo}
              alt={`${dept.title} graduate showcase`}
              title={dept.imagePlaceholders.peo.title}
              text={dept.imagePlaceholders.peo.text}
              className="me-media-slot--portrait"
            />

            <div className="me-stack-list">
              {dept.peo.bullets.map((bullet, index) => (
                <article key={bullet} className="me-list-card">
                  <p className="me-list-card__index">PEO {index + 1}</p>
                  <p className="me-list-card__text">{bullet}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="so" className="me-section">
          <MESectionHeading
            eyebrow="Graduate Capability"
            title={dept.so.title}
            text={dept.so.subtitle}
            centered
          />

          <div className="me-outcome-grid">
            {dept.so.outcomes.map((outcome, index) => (
              <article key={outcome.title} className="me-outcome-card">
                <span className="me-outcome-card__number">0{index + 1}</span>
                <h3 className="me-outcome-card__title">{outcome.title}</h3>
                <p className="me-outcome-card__text">{outcome.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="curriculum" className="me-section">
          <MESectionHeading
            eyebrow="How The Program Is Built"
            title={dept.curriculum.title}
            text={dept.curriculum.text}
          />

          <div className="me-curriculum-grid">
            <article className="me-panel me-panel--feature">
              <p className="me-panel__tag">Revision Notes</p>
              <div className="me-bullet-list">
                {dept.curriculum.bullets.map((item) => (
                  <div key={item} className="me-bullet-list__item">
                    <span className="me-bullet-list__dot" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>

            <div className="me-focus-grid">
              {dept.curriculum.focusAreas.map((item) => (
                <article key={item.title} className="me-panel">
                  <p className="me-panel__tag">Focus Area</p>
                  <h3 className="me-panel__title">{item.title}</h3>
                  <p className="me-panel__body">{item.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="me-detail-grid">
            <article className="me-panel me-panel--wide">
              <p className="me-panel__tag">Industry and Stakeholder Input</p>
              <h3 className="me-panel__title">{dept.industryPanel.title}</h3>
              <p className="me-panel__body">{dept.industryPanel.intro}</p>

              <div className="me-member-grid">
                {dept.industryPanel.members.map((member) => (
                  <article key={member.name} className="me-member-card">
                    <h4 className="me-member-card__name">{member.name}</h4>
                    <p className="me-member-card__role">{member.role}</p>
                    <p className="me-member-card__affiliation">{member.affiliation}</p>
                  </article>
                ))}
              </div>
            </article>

            <article className="me-panel me-panel--wide">
              <p className="me-panel__tag">Facilities To Document</p>
              <h3 className="me-panel__title">{dept.laboratories.title}</h3>
              <p className="me-panel__body">{dept.laboratories.intro}</p>

              <div className="me-lab-grid">
                <div className="me-lab-list">
                  {dept.laboratories.items.map((item) => (
                    <div key={item} className="me-bullet-list__item">
                      <span className="me-bullet-list__dot" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <MEMediaSlot
                  src={dept.images.watermark}
                  alt={`${dept.title} decorative placeholder`}
                  title={dept.imagePlaceholders.watermark.title}
                  text={dept.imagePlaceholders.watermark.text}
                  className="me-media-slot--compact"
                />
              </div>
            </article>
          </div>
        </section>

        <section id="careers" className="me-section">
          <MESectionHeading
            eyebrow="Where ME Leads"
            title={dept.careers.title}
            text={dept.careers.subtitle}
            centered
          />

          <div className="me-career-grid">
            {dept.careers.cards.map((card) => (
              <article key={card.title} className="me-career-card">
                <span className="me-career-card__code">{card.code}</span>
                <h3 className="me-career-card__title">{card.title}</h3>
                <p className="me-career-card__text">{card.text}</p>
              </article>
            ))}
          </div>

          <article className="me-cta-panel">
            <div>
              <p className="me-panel__tag">Secondary Page</p>
              <h3 className="me-cta-panel__title">{dept.excellencePage.title}</h3>
              <p className="me-cta-panel__text">{dept.excellencePage.description}</p>
            </div>

            <Link to={dept.excellencePage.path} className="me-button me-button--primary">
              Open performance page
            </Link>
          </article>
        </section>
      </main>

      <MEFooter dept={dept} />
    </div>
  );
}
