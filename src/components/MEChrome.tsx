import { Link } from "react-router-dom";

type ScrollNavItem = {
  label: string;
  kind: "scroll";
  target: string;
};

type RouteNavItem = {
  label: string;
  kind: "route";
  to: string;
};

type NavItem = ScrollNavItem | RouteNavItem;

type NavCallToAction = {
  label: string;
  to: string;
};

type ContactInfo = {
  address: string;
  phone: string;
  email: string;
  website: string;
};

type FooterInfo = {
  copyright: string;
};

type ChromeDept = {
  code: string;
  shortTitle: string;
  contact: ContactInfo;
  excellencePage: {
    path: string;
  };
  footer: FooterInfo;
};

export function MENavbar({
  dept,
  items,
  onNav,
  cta,
}: {
  dept: ChromeDept;
  items: NavItem[];
  onNav?: (id: string) => void;
  cta?: NavCallToAction;
}) {
  return (
    <header className="me-nav">
      <div className="me-nav__inner">
        <Link to={`/dept/${dept.code}`} className="me-nav__brand">
          <span className="me-nav__seal">BULSU</span>
          <span>
            <span className="me-nav__title">{dept.shortTitle}</span>
            <span className="me-nav__subtitle">College of Engineering</span>
          </span>
        </Link>

        <nav className="me-nav__links" aria-label={`${dept.shortTitle} navigation`}>
          {items.map((item) =>
            item.kind === "scroll" ? (
              <button
                key={item.label}
                type="button"
                className="me-nav__link"
                onClick={() => onNav?.(item.target)}
              >
                {item.label}
              </button>
            ) : (
              <Link key={item.label} to={item.to} className="me-nav__link">
                {item.label}
              </Link>
            )
          )}
        </nav>

        {cta ? (
          <Link to={cta.to} className="me-button me-button--nav">
            {cta.label}
          </Link>
        ) : null}
      </div>
    </header>
  );
}

export function MEFooter({ dept }: { dept: ChromeDept }) {
  return (
    <footer className="me-footer">
      <div className="me-footer__inner">
        <div>
          <p className="me-footer__eyebrow">Bulacan State University</p>
          <h2 className="me-footer__title">{dept.shortTitle}</h2>
          <p className="me-footer__copy">{dept.contact.address}</p>
        </div>

        <div>
          <p className="me-footer__eyebrow">Quick Links</p>
          <div className="me-footer__links">
            <Link to={`/dept/${dept.code}`}>Program Page</Link>
            <Link to={dept.excellencePage.path}>Performance and Extension</Link>
            <Link to={`/dept/${dept.code}/admin`}>ME Admin</Link>
          </div>
        </div>

        <div>
          <p className="me-footer__eyebrow">Contact</p>
          <div className="me-footer__links">
            <span>{dept.contact.phone}</span>
            <a href={`mailto:${dept.contact.email}`}>{dept.contact.email}</a>
            <a href={`https://${dept.contact.website}`} target="_blank" rel="noreferrer">
              {dept.contact.website}
            </a>
          </div>
        </div>
      </div>

      <div className="me-footer__bar">{dept.footer.copyright}</div>
    </footer>
  );
}

export function MESectionHeading({
  eyebrow,
  title,
  text,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "me-section-heading me-section-heading--center" : "me-section-heading"}>
      <p className="me-eyebrow">{eyebrow}</p>
      <h2 className="me-section-title">{title}</h2>
      <p className="me-section-copy">{text}</p>
    </div>
  );
}

export function MEMediaSlot({
  src,
  alt,
  title,
  text,
  className = "",
}: {
  src: string;
  alt: string;
  title: string;
  text: string;
  className?: string;
}) {
  if (src.trim()) {
    return (
      <div className={`me-media-slot ${className}`}>
        <img src={src} alt={alt} className="me-media-slot__image" />
      </div>
    );
  }

  return (
    <div className={`me-media-slot me-media-slot--placeholder ${className}`}>
      <div className="me-media-slot__placeholder">
        <p className="me-media-slot__label">Image Placeholder</p>
        <h3 className="me-media-slot__title">{title}</h3>
        <p className="me-media-slot__text">{text}</p>
      </div>
    </div>
  );
}
