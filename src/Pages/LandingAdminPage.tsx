import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import AdminAccessGate from "../components/AdminAccessGate";
import ResizablePagePreview from "../components/ResizablePagePreview";
import { type LandingSectionData } from "../data/landing";
import {
  clearLandingOverrides,
  getLandingDefaults,
  loadLandingOverrides,
  saveLandingOverrides,
  type LandingEditableContent,
} from "../lib/landingAdmin";

export default function LandingAdminPage() {
  const defaults = getLandingDefaults();
  const cloneDefaults = () =>
    JSON.parse(JSON.stringify(defaults)) as LandingEditableContent;
  const [form, setForm] = useState<LandingEditableContent>(
    () => loadLandingOverrides() ?? cloneDefaults()
  );
  const [status, setStatus] = useState("");

  const handleSave = () => {
    saveLandingOverrides(form);
    setStatus("Saved local landing override for this browser.");
  };

  const handleReset = () => {
    clearLandingOverrides();
    setForm(cloneDefaults());
    setStatus("Reset complete. Landing override removed.");
  };

  const jsonText = JSON.stringify(form, null, 2);

  const handleDownload = () => {
    const blob = new Blob([jsonText], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "landing.override.json";
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("Downloaded landing.override.json");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonText);
      setStatus("Copied landing override JSON.");
    } catch {
      setStatus("Clipboard access failed. Use Download instead.");
    }
  };

  return (
    <AdminAccessGate scopeKey="landing" title="Landing Page Admin">
      {({ logout }) => (
        <div className="min-h-screen bg-gray-100">
          <div className="max-w-[1500px] mx-auto px-6 py-10">
            <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6">
              <div className="rounded-2xl border bg-white p-6 md:p-8">
                <p className="text-xs font-semibold tracking-[0.14em] text-gray-500">
                  LANDING ADMIN
                </p>
                <h1 className="mt-2 text-3xl font-black text-gray-900">Landing Editor</h1>
                <p className="mt-3 text-sm text-gray-600">
                  Edit landing content blocks. This saves browser-local override.
                </p>

                <section className="mt-8 rounded-xl border p-5">
                  <h2 className="text-lg font-bold text-gray-900">Hero Section</h2>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Eyebrow">
                      <input
                        value={form.hero.eyebrow}
                        onChange={(e) =>
                          setForm({ ...form, hero: { ...form.hero, eyebrow: e.target.value } })
                        }
                        className="w-full rounded-lg border px-3 py-2"
                      />
                    </Field>
                    <Field label="Primary Button Label">
                      <input
                        value={form.hero.primaryButtonLabel}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            hero: { ...form.hero, primaryButtonLabel: e.target.value },
                          })
                        }
                        className="w-full rounded-lg border px-3 py-2"
                      />
                    </Field>
                    <Field label="Title" className="md:col-span-2">
                      <textarea
                        value={form.hero.title}
                        onChange={(e) =>
                          setForm({ ...form, hero: { ...form.hero, title: e.target.value } })
                        }
                        className="h-20 w-full rounded-lg border px-3 py-2"
                      />
                    </Field>
                    <Field label="Description" className="md:col-span-2">
                      <textarea
                        value={form.hero.description}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            hero: { ...form.hero, description: e.target.value },
                          })
                        }
                        className="h-24 w-full rounded-lg border px-3 py-2"
                      />
                    </Field>
                    <Field label="Primary Button Href" className="md:col-span-2">
                      <input
                        value={form.hero.primaryButtonHref}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            hero: { ...form.hero, primaryButtonHref: e.target.value },
                          })
                        }
                        className="w-full rounded-lg border px-3 py-2"
                      />
                    </Field>
                  </div>
                </section>

                <SectionEditor
                  title="Mission & Vision"
                  data={form.sections.missionVision}
                  onChange={(next) =>
                    setForm({
                      ...form,
                      sections: { ...form.sections, missionVision: next },
                    })
                  }
                />
                <SectionEditor
                  title="Department Grid"
                  data={form.sections.departmentGrid}
                  onChange={(next) =>
                    setForm({
                      ...form,
                      sections: { ...form.sections, departmentGrid: next },
                    })
                  }
                />
                <SectionEditor
                  title="News"
                  data={form.sections.news}
                  onChange={(next) =>
                    setForm({ ...form, sections: { ...form.sections, news: next } })
                  }
                />
                <SectionEditor
                  title="Facilities"
                  data={form.sections.facilities}
                  onChange={(next) =>
                    setForm({ ...form, sections: { ...form.sections, facilities: next } })
                  }
                />
                <SectionEditor
                  title="Statistics"
                  data={form.sections.statistics}
                  onChange={(next) =>
                    setForm({ ...form, sections: { ...form.sections, statistics: next } })
                  }
                />
                <SectionEditor
                  title="Contact"
                  data={form.sections.contact}
                  onChange={(next) =>
                    setForm({ ...form, sections: { ...form.sections, contact: next } })
                  }
                />
                <SectionEditor
                  title="Footer"
                  data={form.sections.footer}
                  onChange={(next) =>
                    setForm({ ...form, sections: { ...form.sections, footer: next } })
                  }
                />

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="rounded-full bg-[#a90000] px-5 py-2 text-sm font-semibold text-white hover:bg-[#8f0000]"
                  >
                    Save Local Override
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="rounded-full border border-gray-400 px-5 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                  >
                    Download Override JSON
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="rounded-full border border-gray-400 px-5 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                  >
                    Copy JSON
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-full border border-gray-400 px-5 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                  >
                    Reset Local Override
                  </button>
                  <button
                    type="button"
                    onClick={logout}
                    className="rounded-full border border-gray-400 px-5 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                  <Link
                    to="/"
                    className="rounded-full border border-gray-400 px-5 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                  >
                    View Landing Page
                  </Link>
                </div>

                {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
              </div>

              <ResizablePagePreview
                title="Live Preview"
                description="This is the actual landing page rendered in an iframe. Save and reload preview to apply changes."
                previewUrl="/"
              />
            </div>
          </div>
        </div>
      )}
    </AdminAccessGate>
  );
}

function SectionEditor({
  title,
  data,
  onChange,
}: {
  title: string;
  data: LandingSectionData;
  onChange: (next: LandingSectionData) => void;
}) {
  return (
    <section className="mt-6 rounded-xl border p-5">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Section ID">
          <input
            value={data.id}
            onChange={(e) => onChange({ ...data, id: e.target.value })}
            className="w-full rounded-lg border px-3 py-2"
          />
        </Field>
        <Field label="Section Title">
          <input
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            className="w-full rounded-lg border px-3 py-2"
          />
        </Field>
        <Field label="Assigned Group">
          <input
            value={data.assignedGroup}
            onChange={(e) => onChange({ ...data, assignedGroup: e.target.value })}
            className="w-full rounded-lg border px-3 py-2"
          />
        </Field>
        <Field label="Status Label">
          <input
            value={data.statusLabel}
            onChange={(e) => onChange({ ...data, statusLabel: e.target.value })}
            className="w-full rounded-lg border px-3 py-2"
          />
        </Field>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1 block text-sm font-semibold text-gray-800">{label}</span>
      {children}
    </label>
  );
}
