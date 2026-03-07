import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { mergeDeptWithOverrides } from "../../lib/departmentAdmin";
import { ME } from "../../data/department/ME";
import {
  MEFooter,
  MENavbar,
  MESectionHeading,
} from "../../components/MEChrome";
import "../../styles/departments/ME.css";

export default function MEExcellencePage() {
  const [baseDept] = useState<typeof ME>(ME);

  const dept = useMemo(() => mergeDeptWithOverrides(baseDept), [baseDept]);

  useEffect(() => {
    document.title = `${dept.code} Performance | BULSU COE`;

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
          { label: "Program", kind: "route", to: `/dept/${dept.code}` },
          { label: "Licensure", kind: "scroll", target: "licensure" },
          { label: "Research", kind: "scroll", target: "research" },
          { label: "Community", kind: "scroll", target: "community" },
        ]}
        cta={{ label: "Back to Program", to: `/dept/${dept.code}` }}
      />

      <main className="me-shell">
        <section className="me-hero">
          <div className="me-hero__copy">
            <p className="me-eyebrow">Mechanical Engineering Beyond The Overview</p>
            <h1 className="me-display-title">{dept.excellencePage.title}</h1>
            <p className="me-hero__kicker">
              Licensure performance, research culture, and community engineering.
            </p>
            <p className="me-hero__copy-text">
              This page expands the main ME profile with evidence-backed sections from the
              department file. The next commit will turn these summary blocks into the full detail
              layout.
            </p>

            <div className="me-action-row">
              <button
                type="button"
                className="me-button me-button--primary"
                onClick={() => onNav("licensure")}
              >
                View highlights
              </button>
              <Link to={`/dept/${dept.code}`} className="me-button me-button--secondary">
                Return to main page
              </Link>
            </div>
          </div>

          <div className="me-card-grid">
            <article className="me-panel">
              <p className="me-panel__tag">Licensure</p>
              <h3 className="me-panel__title">{dept.licensure.title}</h3>
              <p className="me-panel__body">{dept.licensure.intro}</p>
            </article>

            <article className="me-panel">
              <p className="me-panel__tag">Research</p>
              <h3 className="me-panel__title">{dept.research.title}</h3>
              <p className="me-panel__body">{dept.research.intro}</p>
            </article>

            <article className="me-panel">
              <p className="me-panel__tag">Extension</p>
              <h3 className="me-panel__title">{dept.extension.title}</h3>
              <p className="me-panel__body">{dept.extension.intro}</p>
            </article>
          </div>
        </section>

        <section id="licensure" className="me-section">
          <MESectionHeading
            eyebrow="Performance Page"
            title="Detail Sections Are Ready To Expand"
            text="The page route is now in place. The next pass will render the full licensure, research, community, and alumni blocks from the ME data file."
          />
        </section>

        <section id="research" className="me-section">
          <article className="me-cta-panel">
            <div>
              <p className="me-panel__tag">Next Section Batch</p>
              <h3 className="me-cta-panel__title">Research, extension, and alumni are next</h3>
              <p className="me-cta-panel__text">
                The supporting content is already in `ME.ts`; this page shell just needs the deeper
                card and grid layout wired in.
              </p>
            </div>

            <button
              type="button"
              className="me-button me-button--primary"
              onClick={() => onNav("community")}
            >
              Continue to community
            </button>
          </article>
        </section>

        <section id="community" className="me-section" />
      </main>

      <MEFooter dept={dept} />
    </div>
  );
}
