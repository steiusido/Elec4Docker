import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  clearDeptDraft,
  clearDeptOverrides,
  extractEditableContent,
  getDeptDefaults,
  loadDeptDraft,
  loadDeptOverrides,
  saveDeptDraft,
  saveDeptOverrides,
} from "../../lib/departmentAdmin";
import { mergeWithShape } from "../../lib/jsonShape";
import { ME } from "../../data/department/ME";
import AdminAccessGate from "../../components/AdminAccessGate";
import JsonValueEditor from "../../components/JsonValueEditor";
import ResizablePagePreview from "../../components/ResizablePagePreview";
import "../../styles/admin/MEAdmin.css";

const code = "ME" as const;
const imageKeys = [
  "heroLeft",
  "heroBig",
  "heroSmall1",
  "heroSmall2",
  "peo",
  "watermark",
] as const;

const previewPages = {
  program: {
    label: "Program Page",
    route: `/dept/${code}`,
    previewUrl: `/dept/${code}?preview=dept`,
    description: "Main Mechanical Engineering page with hero, overview, outcomes, curriculum, and careers.",
  },
  excellence: {
    label: "Performance Page",
    route: `/dept/${code}/excellence`,
    previewUrl: `/dept/${code}/excellence?preview=dept`,
    description: "Secondary ME page for licensure, research, community engineering, and alumni highlights.",
  },
} as const;

const sectionGuides = [
  {
    title: "Main Page Content",
    description: "These sections drive /dept/ME.",
    keys: [
      "hero",
      "programOverview",
      "accreditation",
      "peo",
      "so",
      "curriculum",
      "industryPanel",
      "laboratories",
      "careers",
    ],
  },
  {
    title: "Performance Page Content",
    description: "These sections drive /dept/ME/excellence.",
    keys: ["licensure", "research", "extension", "alumni", "excellencePage"],
  },
  {
    title: "Shared Content",
    description: "These appear across both ME routes.",
    keys: ["title", "shortTitle", "subtitle", "contact", "images", "imagePlaceholders", "footer"],
  },
] as const;

type ImageKey = (typeof imageKeys)[number];
type PreviewPage = keyof typeof previewPages;
type EditorMode = "guided" | "json";

export default function MEAdminPage() {
  const [baseDept, setBaseDept] = useState<typeof ME | null>(null);
  const [form, setForm] = useState<typeof ME | null>(null);
  const [status, setStatus] = useState("");
  const [loadError, setLoadError] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [editorMode, setEditorMode] = useState<EditorMode>("guided");
  const [previewPage, setPreviewPage] = useState<PreviewPage>("program");
  const [jsonDraft, setJsonDraft] = useState("");

  useEffect(() => {
    try {
      const data = getDeptDefaults(code) as typeof ME;
      const defaults = extractEditableContent(data) as typeof ME;
      const draft = loadDeptDraft(code);
      const overrides = loadDeptOverrides(code);

      setBaseDept(data);
      setForm(mergeWithShape(defaults, draft ?? overrides) as typeof ME);
      setLoadError("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load department admin data.";
      setLoadError(message);
    }
  }, []);

  useEffect(() => {
    if (!form) return;
    saveDeptDraft(code, form);
    setJsonDraft(JSON.stringify(form, null, 2));
  }, [form]);

  if (loadError) {
    return (
      <div className="min-h-screen grid place-items-center px-6 text-center">
        <p className="text-sm text-red-700">{loadError}</p>
      </div>
    );
  }

  if (!baseDept || !form) {
    return (
      <div className="min-h-screen grid place-items-center px-6 text-center">
        <p className="text-sm text-gray-600">Loading department admin...</p>
      </div>
    );
  }

  const fullJsonText = JSON.stringify(form, null, 2);
  const currentPreview = previewPages[previewPage];

  const handleSave = () => {
    saveDeptOverrides(code, form);
    setStatus(`Saved local override for ${currentPreview.label.toLowerCase()} content.`);
    setJsonError("");
  };

  const handleReset = () => {
    const defaults = extractEditableContent(baseDept) as typeof ME;
    clearDeptOverrides(code);
    clearDeptDraft(code);
    setForm(defaults);
    setStatus("Reset complete. Local override removed.");
    setJsonError("");
  };

  const handleDownloadJson = () => {
    const blob = new Blob([fullJsonText], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${code}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus(`Downloaded ${code}.json. Commit it to public/data/departments/${code}.json`);
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(fullJsonText);
      setStatus(`Copied full JSON. Paste into public/data/departments/${code}.json and commit.`);
    } catch {
      setStatus("Clipboard access failed. Use Download JSON instead.");
    }
  };

  const updateImage = (key: ImageKey, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        images: {
          ...prev.images,
          [key]: value,
        },
      };
    });
    setStatus(`Updated images.${key}`);
    setJsonError("");
  };

  const handleImageUpload = (key: ImageKey, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (!result) {
        setStatus(`Upload failed for images.${key}`);
        return;
      }
      updateImage(key, result);
    };
    reader.onerror = () => setStatus(`Upload failed for images.${key}`);
    reader.readAsDataURL(file);
  };

  const handleApplyJson = () => {
    try {
      const parsed = JSON.parse(jsonDraft) as unknown;
      const defaults = extractEditableContent(baseDept) as typeof ME;
      const next = mergeWithShape(defaults, parsed) as typeof ME;

      setForm(next);
      setJsonError("");
      setStatus("Applied raw JSON draft to the ME editor.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid JSON.";
      setJsonError(message);
      setStatus("");
    }
  };

  return (
    <AdminAccessGate scopeKey={`department-${code}`} title={`${code} Department Admin`}>
      {({ logout }) => (
        <div className="me-admin">
          <div className="me-admin__layout">
            <div className="me-admin__workspace">
              <section className="me-admin__panel">
                <p className="me-admin__eyebrow">Department Admin</p>
                <h1 className="me-admin__title">{baseDept.title} Editor</h1>
                <p className="me-admin__copy">
                  This admin now supports both ME routes. Use the page switcher to preview either the
                  main program page or the performance page while editing the same ME data object.
                </p>

                <div className="me-admin__toolbar">
                  <div className="me-admin__toggle-group" aria-label="Preview page selection">
                    {Object.entries(previewPages).map(([key, value]) => (
                      <button
                        key={key}
                        type="button"
                        className={previewPage === key ? "me-admin__pill me-admin__pill--active" : "me-admin__pill"}
                        onClick={() => setPreviewPage(key as PreviewPage)}
                      >
                        {value.label}
                      </button>
                    ))}
                  </div>

                  <div className="me-admin__toggle-group" aria-label="Editor mode selection">
                    <button
                      type="button"
                      className={editorMode === "guided" ? "me-admin__pill me-admin__pill--active" : "me-admin__pill"}
                      onClick={() => setEditorMode("guided")}
                    >
                      Guided Editor
                    </button>
                    <button
                      type="button"
                      className={editorMode === "json" ? "me-admin__pill me-admin__pill--active" : "me-admin__pill"}
                      onClick={() => setEditorMode("json")}
                    >
                      Raw JSON
                    </button>
                  </div>
                </div>

                <div className="me-admin__links">
                  <Link to={previewPages.program.route} className="me-admin__link">
                    Open program page
                  </Link>
                  <Link to={previewPages.excellence.route} className="me-admin__link">
                    Open performance page
                  </Link>
                  <Link to={`/dept/${baseDept.code}`} className="me-admin__link">
                    Open live department page
                  </Link>
                </div>
              </section>

              <section className="me-admin__panel">
                <p className="me-admin__section-label">Content Map</p>
                <div className="me-admin__guide-grid">
                  {sectionGuides.map((guide) => (
                    <article key={guide.title} className="me-admin__guide-card">
                      <h2 className="me-admin__guide-title">{guide.title}</h2>
                      <p className="me-admin__guide-copy">{guide.description}</p>
                      <div className="me-admin__chip-row">
                        {guide.keys.map((key) => (
                          <span key={key} className="me-admin__chip">
                            {key}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="me-admin__panel">
                <div className="me-admin__section-head">
                  <div>
                    <p className="me-admin__section-label">Image Slots</p>
                    <h2 className="me-admin__section-title">Upload actual images or keep placeholders</h2>
                  </div>
                  <p className="me-admin__section-copy">
                    If an image value is blank, the page shows the gray placeholder with the guide text.
                  </p>
                </div>

                <div className="me-admin__image-grid">
                  {imageKeys.map((key) => {
                    const currentValue = form.images[key];
                    const meta = baseDept.imagePlaceholders[key];
                    const filename = currentValue.startsWith("data:") ? "Local upload (data URL)" : currentValue;

                    return (
                      <article key={key} className="me-admin__image-card">
                        <p className="me-admin__image-key">images.{key}</p>
                        <h3 className="me-admin__image-title">{meta.title}</h3>
                        <p className="me-admin__image-copy">{meta.text}</p>
                        <p className="me-admin__image-value">{filename || "Blank value - placeholder is active"}</p>

                        <div className="me-admin__image-actions">
                          <label className="me-admin__button me-admin__button--ghost">
                            Upload
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(event) => {
                                const file = event.target.files?.[0];
                                if (file) handleImageUpload(key, file);
                                event.currentTarget.value = "";
                              }}
                            />
                          </label>

                          <button
                            type="button"
                            className="me-admin__button me-admin__button--ghost"
                            onClick={() => updateImage(key, "")}
                          >
                            Use Placeholder
                          </button>

                          <button
                            type="button"
                            className="me-admin__button me-admin__button--ghost"
                            onClick={() => updateImage(key, baseDept.images[key])}
                          >
                            Reset Default
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>

              <section className="me-admin__panel">
                <div className="me-admin__section-head">
                  <div>
                    <p className="me-admin__section-label">Editor</p>
                    <h2 className="me-admin__section-title">
                      {editorMode === "guided" ? "Structured field editor" : "Full ME JSON editor"}
                    </h2>
                  </div>
                  <p className="me-admin__section-copy">
                    {editorMode === "guided"
                      ? "Use the tree editor for field-by-field changes."
                      : "Edit the entire ME data object directly and apply it back into the preview."}
                  </p>
                </div>

                {editorMode === "guided" ? (
                  <div className="me-admin__editor-shell">
                    <JsonValueEditor value={form} onChange={(next) => setForm(next as typeof ME)} />
                  </div>
                ) : (
                  <div className="me-admin__json-editor">
                    <textarea
                      value={jsonDraft}
                      onChange={(event) => setJsonDraft(event.target.value)}
                      className="me-admin__textarea"
                      spellCheck={false}
                    />

                    <div className="me-admin__json-actions">
                      <button
                        type="button"
                        onClick={handleApplyJson}
                        className="me-admin__button me-admin__button--primary"
                      >
                        Apply JSON Draft
                      </button>
                      <button
                        type="button"
                        onClick={() => setJsonDraft(fullJsonText)}
                        className="me-admin__button me-admin__button--ghost"
                      >
                        Reset JSON Draft
                      </button>
                    </div>
                  </div>
                )}

                {jsonError ? <p className="me-admin__error">JSON error: {jsonError}</p> : null}
              </section>

              <section className="me-admin__panel">
                <div className="me-admin__actions">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="me-admin__button me-admin__button--primary"
                  >
                    Save Local Override
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadJson}
                    className="me-admin__button me-admin__button--ghost"
                  >
                    Download {code}.json
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyJson}
                    className="me-admin__button me-admin__button--ghost"
                  >
                    Copy JSON
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="me-admin__button me-admin__button--ghost"
                  >
                    Reset Local Override
                  </button>
                  <button
                    type="button"
                    onClick={logout}
                    className="me-admin__button me-admin__button--ghost"
                  >
                    Logout
                  </button>
                </div>

                {status ? <p className="me-admin__status">{status}</p> : null}
              </section>
            </div>

            <div className="me-admin__preview">
              <ResizablePagePreview
                title={`${currentPreview.label} Preview`}
                description={currentPreview.description}
                previewUrl={currentPreview.previewUrl}
                liveToken={fullJsonText}
              />
            </div>
          </div>
        </div>
      )}
    </AdminAccessGate>
  );
}
