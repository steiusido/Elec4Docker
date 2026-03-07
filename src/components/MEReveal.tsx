import { useEffect, type RefObject } from "react";

export function useMEReveal(scopeRef: RefObject<HTMLElement | null>, effectKey: string) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const items = Array.from(scope.querySelectorAll<HTMLElement>("[data-me-reveal]"));
    if (items.length === 0) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [effectKey, scopeRef]);
}
