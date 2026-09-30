import { useEffect } from "react";
import { gsap } from "../lib/gsap";

/** Reveals matching elements with a rotated slide-up entrance, mirroring the
 * original site's text/logo intro animation. */
export function useReveal(selector: string, delay = 0) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { yPercent: 100, rotate: 30, transformOrigin: "left" },
        {
          yPercent: 0,
          rotate: 0,
          duration: 2,
          delay,
          ease: "power4.out",
          stagger: 0.1,
        },
      );
    });

    return () => ctx.revert();
  }, [selector, delay]);
}
