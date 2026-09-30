import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

/** Sticks an element to the cursor (with a slight trailing ease) while the
 * cursor is within a container's bounds, fading in/out as it crosses them.
 * Bounds are rechecked on scroll too, since the container can move under a
 * stationary cursor without a native mouse event firing. */
export function useCursorFollow<T extends HTMLElement>(
  containerSelector: string,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    const container = document.querySelector<HTMLElement>(containerSelector);
    if (!el || !container) return;

    gsap.set(el, { xPercent: 10, yPercent: 10, autoAlpha: 0 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });

    let lastClientX = 0;
    let lastClientY = 0;
    let isVisible = false;

    const isInsideContainer = (x: number, y: number) => {
      const rect = container.getBoundingClientRect();
      return (
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
      );
    };

    const refresh = () => {
      const inside = isInsideContainer(lastClientX, lastClientY);
      const rect = container.getBoundingClientRect();
      const x = lastClientX - rect.left;
      const y = lastClientY - rect.top;

      if (inside && !isVisible) {
        gsap.set(el, { x, y });
        gsap.to(el, { autoAlpha: 1, duration: 0.3 });
        isVisible = true;
      } else if (!inside && isVisible) {
        gsap.to(el, { autoAlpha: 0, duration: 0.3 });
        isVisible = false;
      } else if (inside) {
        xTo(x);
        yTo(y);
      }
    };

    const handleMove = (e: MouseEvent) => {
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      refresh();
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("scroll", refresh, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", refresh);
    };
  }, [containerSelector]);

  return ref;
}
