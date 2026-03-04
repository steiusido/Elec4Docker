import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { departments, type DeptCode } from "../data/department";
import {
  clearDeptOverrides,
  extractEditableContent,
  loadDeptOverrides,
  parseEditableContent,
  saveDeptOverrides,
} from "../lib/departmentAdmin";

export default function DepartmentAdminPage() {
  const { deptCode } = useParams();

  const code = (deptCode?.toUpperCase() || "") as DeptCode;
  const dept = departments[code];

  const defaultEditable = useMemo(
    () => (dept ? extractEditableContent(dept) : null),
    [dept]
  );

  const [jsonText, setJsonText] = useState(() => {
    if (!dept || !defaultEditable) return "";
    const current = loadDeptOverrides(code) ?? defaultEditable;
    return JSON.stringify(current, null, 2);
  });
  const [status, setStatus] = useState<string>("");

  if (!dept || !defaultEditable) return <Navigate to="/departments" replace />;

  const handleSave = () => {
    try {
      const parsed = parseEditableContent(jsonText);
      saveDeptOverrides(code, parsed);
      setStatus("Saved. Department page now uses your local admin content.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Invalid JSON.");
    }
  };

  const handleReset = () => {
    clearDeptOverrides(code);
    setJsonText(JSON.stringify(defaultEditable, null, 2));
    setStatus("Reset complete. Local admin overrides removed.");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="rounded-2xl border bg-white p-6 md:p-8">
          <p className="text-xs font-semibold tracking-[0.14em] text-gray-500">
            DEPARTMENT ADMIN
          </p>
          <h1 className="mt-2 text-3xl font-black text-gray-900">
            {dept.title} Admin Editor
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Edit JSON content for Program Overview, PEO, SO, Curriculum,
            Laboratories, Faculty, and Career Opportunities.
          </p>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-800">
              Editable Content JSON
            </label>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              spellCheck={false}
              className="mt-2 h-[520px] w-full rounded-xl border bg-gray-950 p-4 font-mono text-xs text-gray-100"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-full bg-[#a90000] px-5 py-2 text-sm font-semibold text-white hover:bg-[#8f0000]"
            >
              Save Content
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-gray-400 px-5 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
            >
              Reset to Department Defaults
            </button>
            <Link
              to={`/dept/${dept.code}`}
              className="rounded-full border border-gray-400 px-5 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
            >
              View Department Page
            </Link>
          </div>

          {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
        </div>
      </div>
    </div>
  );
}
