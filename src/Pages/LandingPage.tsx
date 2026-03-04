import { Link } from "react-router-dom";

type PlaceholderSectionProps = {
  id: string;
  title: string;
  assignedGroup: string;
};

function PlaceholderSection({
  id,
  title,
  assignedGroup,
}: PlaceholderSectionProps) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-6 py-10">
      <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
        <p className="text-xs font-semibold tracking-[0.14em] text-gray-500">
          RESERVED SECTION
        </p>
        <h2 className="mt-3 text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mt-2 text-sm text-gray-600">{assignedGroup}</p>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="font-extrabold tracking-wide text-lg">BULSU COE</h1>
          <Link
            to="/departments"
            className="rounded-full bg-[#a90000] px-5 py-2 text-sm font-semibold text-white hover:bg-[#8f0000]"
          >
            Department Pages
          </Link>
        </div>
      </header>

      <main>
        <section id="hero" className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="rounded-3xl bg-gradient-to-r from-[#f4efe3] via-[#ead9b5] to-[#d6b26f] p-8 md:p-12">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#6f4d12]">
              LANDING PAGE • HERO SECTION
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-black leading-tight text-[#2a1d0b]">
              Bulacan State University
              <br />
              College of Engineering
            </h2>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-[#4a3721]">
              This hero block is active for your group. Other landing sections are
              placeholders and should be implemented by their assigned groups.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/departments"
                className="rounded-full bg-[#2a1d0b] px-5 py-2 text-sm font-semibold text-white hover:bg-black"
              >
                Enter Department Pages
              </Link>
            </div>
          </div>
        </section>

        <PlaceholderSection
          id="mission-vision"
          title="Mission & Vision"
          assignedGroup="Roxas, Aiam Airron L"
        />
        <PlaceholderSection
          id="department-grid"
          title="Department Grid"
          assignedGroup="Pagdanganan, Arviella S"
        />
        <PlaceholderSection
          id="news"
          title="News"
          assignedGroup="Dela Cruz, Richter Vhon C"
        />
        <PlaceholderSection
          id="facilities"
          title="Facilities"
          assignedGroup="Jones, Colleen Iris P"
        />
        <PlaceholderSection
          id="statistics"
          title="Statistics"
          assignedGroup="Pascual, Alyssa S."
        />
        <PlaceholderSection
          id="contact"
          title="Contact"
          assignedGroup="Pagayunan, Lhara Mei R"
        />
      </main>

      <footer id="footer" className="border-t bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-500">
          Footer placeholder. Assigned group: Villareal, Trisha Mae
        </div>
      </footer>
    </div>
  );
}
