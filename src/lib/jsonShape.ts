function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function mergeWithShape<T>(defaults: T, incoming: unknown): T {
  if (Array.isArray(defaults)) {
    if (!Array.isArray(incoming)) return cloneValue(defaults);

    if (defaults.length === 0) {
      return cloneValue(incoming as T);
    }

    const sample = defaults[0];
    return incoming.map((item) => mergeWithShape(sample, item)) as T;
  }

  if (isRecord(defaults)) {
    if (!isRecord(incoming)) return cloneValue(defaults);

    const next: Record<string, unknown> = {};
    for (const key of Object.keys(defaults)) {
      next[key] = mergeWithShape(
        (defaults as Record<string, unknown>)[key],
        incoming[key]
      );
    }
    return next as T;
  }

  if (defaults === null) {
    return (incoming ?? defaults) as T;
  }

  if (typeof incoming === typeof defaults) {
    return incoming as T;
  }

  return defaults;
}

