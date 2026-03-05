type JsonValueEditorProps = {
  label?: string;
  value: unknown;
  onChange: (next: unknown) => void;
  depth?: number;
};

function toTitleCase(path: string) {
  return path
    .replace(/\[(\d+)\]/g, " $1")
    .replace(/[._-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function makeEmptyLike(sample: unknown): unknown {
  if (Array.isArray(sample)) return [];
  if (sample && typeof sample === "object") {
    const next: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(sample as Record<string, unknown>)) {
      next[key] = makeEmptyLike(value);
    }
    return next;
  }
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  return "";
}

function FieldLabel({ text }: { text: string }) {
  return <p className="text-sm font-semibold text-gray-800">{toTitleCase(text)}</p>;
}

export default function JsonValueEditor({
  label = "root",
  value,
  onChange,
  depth = 0,
}: JsonValueEditorProps) {
  const childIndent = depth > 1 ? "ml-4" : "";

  if (Array.isArray(value)) {
    const addItem = () => {
      const sample = value[0] ?? "";
      onChange([...value, makeEmptyLike(sample)]);
    };

    return (
      <section className={`${depth === 0 ? "space-y-4" : "rounded-xl border p-4"} ${childIndent}`}>
        {depth > 0 && <FieldLabel text={label} />}

        <div className="space-y-3">
          {value.map((item, index) => (
            <div key={`${label}-${index}`} className="rounded-lg border p-3">
              <div className="mb-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => onChange(value.filter((_, idx) => idx !== index))}
                  className="rounded-lg border px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Remove
                </button>
              </div>
              <JsonValueEditor
                label={`${label}[${index}]`}
                value={item}
                onChange={(nextItem) =>
                  onChange(value.map((current, idx) => (idx === index ? nextItem : current)))
                }
                depth={depth + 1}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addItem}
          className="rounded-lg border px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
        >
          Add Item
        </button>
      </section>
    );
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    return (
      <section className={`${depth === 0 ? "space-y-4" : "rounded-xl border p-4"} ${childIndent}`}>
        {depth > 0 && <FieldLabel text={label} />}
        <div className="space-y-4">
          {entries.map(([key, current]) => (
            <JsonValueEditor
              key={key}
              label={key}
              value={current}
              onChange={(nextValue) =>
                onChange({
                  ...(value as Record<string, unknown>),
                  [key]: nextValue,
                })
              }
              depth={depth + 1}
            />
          ))}
        </div>
      </section>
    );
  }

  if (typeof value === "number") {
    return (
      <label className={`block ${childIndent}`}>
        <FieldLabel text={label} />
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value || 0))}
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </label>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className={`inline-flex items-center gap-2 ${childIndent}`}>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4"
        />
        <FieldLabel text={label} />
      </label>
    );
  }

  if (value === null) {
    return (
      <label className={`block ${childIndent}`}>
        <FieldLabel text={label} />
        <input
          value=""
          onChange={(e) => onChange(e.target.value)}
          placeholder="null"
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </label>
    );
  }

  const textValue = String(value ?? "");
  const multiline = textValue.includes("\n") || textValue.length > 100;

  if (multiline) {
    return (
      <label className={`block ${childIndent}`}>
        <FieldLabel text={label} />
        <textarea
          value={textValue}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 h-24 w-full rounded-lg border px-3 py-2"
        />
      </label>
    );
  }

  return (
    <label className={`block ${childIndent}`}>
      <FieldLabel text={label} />
      <input
        value={textValue}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border px-3 py-2"
      />
    </label>
  );
}

