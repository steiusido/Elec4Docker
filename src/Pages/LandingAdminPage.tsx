import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminAccessGate from "../components/AdminAccessGate";
import JsonValueEditor from "../components/JsonValueEditor";
import ResizablePagePreview from "../components/ResizablePagePreview";
import {
  clearLandingDraft,
  clearLandingOverrides,
  getLandingDefaults,
  loadLandingDraft,
  loadLandingOverrides,
  saveLandingDraft,
  saveLandingOverrides,
  type LandingEditableContent,
} from "../lib/landingAdmin";
import { mergeWithShape } from "../lib/jsonShape";

export default function LandingAdminPage() {
  const defaults = getLandingDefaults();
  const cloneDefaults = () =>
    JSON.parse(JSON.stringify(defaults)) as LandingEditableContent;

  const [form, setForm] = useState<LandingEditableContent>(() => {
    const base = cloneDefaults();
    const draft = loadLandingDraft();
    const overrides = loadLandingOverrides();
    return mergeWithShape(base, draft ?? overrides);
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    saveLandingDraft(form);
  }, [form]);

  const handleSave = () => {
    saveLandingOverrides(form);
    setStatus("Saved local landing override for this browser.");
  };

  const handleReset = () => {
    clearLandingOverrides();
    clearLandingDraft();
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
          <div className="grid min-h-screen grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6">
            <div className="border bg-white p-6 md:p-8">
              <p className="text-xs font-semibold tracking-[0.14em] text-gray-500">
                LANDING ADMIN
              </p>
              <h1 className="mt-2 text-3xl font-black text-gray-900">Landing Editor</h1>
              <p className="mt-3 text-sm text-gray-600">
                Fields are generated from landing JSON structure.
              </p>

              <section className="mt-8 rounded-xl border p-5">
                <h2 className="text-lg font-bold text-gray-900">Editable Content</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Add/remove keys in JSON and this form updates automatically.
                </p>
                <div className="mt-4">
                  <JsonValueEditor
                    value={form}
                    onChange={(next) => setForm(next as LandingEditableContent)}
                  />
                </div>
              </section>

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
              description="This is the actual landing page rendered in an iframe. It refreshes automatically while you type."
              previewUrl="/?preview=landing"
              liveToken={jsonText}
            />
          </div>
        </div>
      )}
    </AdminAccessGate>
  );
}
