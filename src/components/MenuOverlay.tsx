import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { Wordmark, Sparkle } from "./Logo";

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

const menuLinks = ["Work", "Studio", "News", "Contact"];

export default function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (open) {
        gsap.set(root, { pointerEvents: "auto" });
        gsap.to(root, { autoAlpha: 1, duration: 0.5, ease: "power2.out" });
        gsap.fromTo(
          ".menu-link",
          { yPercent: 100, rotate: 6 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 0.9,
            stagger: 0.08,
            delay: 0.15,
            ease: "power4.out",
          },
        );
        gsap.fromTo(
          ".menu-fade",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power2.out" },
        );
      } else {
        gsap.to(root, {
          autoAlpha: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => gsap.set(root, { pointerEvents: "none" }),
        });
      }
    }, root);

    return () => ctx.revert();
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-1000 bg-ink text-white opacity-0 invisible pointer-events-none"
    >
      <div className="max-w-screen-2xl mx-auto h-full px-5 sm:px-10 flex flex-col">
        <div className="flex items-center justify-between pt-5 sm:pt-10">
          <Wordmark className="w-20" />
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            Close
            <svg
              className="size-3"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="13.788"
                y1="1.28816"
                x2="1.06011"
                y2="14.0161"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <line
                x1="1.06049"
                y1="1.43963"
                x2="13.7884"
                y2="14.1675"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex items-center gap-10 sm:gap-20">
          <div className="menu-fade hidden sm:block w-55 h-75 shrink-0 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://a.storyblok.com/f/133769/2400x2990/b66359da25/rino-pelle-hero.jpg/m/660x900/filters:quality(80)"
              alt=""
            />
          </div>
          <nav className="flex flex-col gap-1 sm:gap-2">
            {menuLinks.map((item) => (
              <div className="overflow-hidden" key={item}>
                <a
                  href="#"
                  onClick={onClose}
                  className="menu-link block text-6xl sm:text-8xl tracking-tight text-white/70 hover:text-white transition-colors"
                >
                  {item}
                </a>
              </div>
            ))}
          </nav>
        </div>

        <div className="menu-fade flex items-center justify-between pb-8 sm:pb-10 text-sm opacity-80">
          <a href="#" className="cursor-pointer">
            Play Reel
          </a>
          <a href="#" className="cursor-pointer">
            Our Story
          </a>
          <a
            href="#"
            className="flex items-center gap-2 underline underline-offset-4 cursor-pointer"
          >
            <Sparkle className="size-3" />
            Now Hiring!
          </a>
        </div>
      </div>
    </div>
  );
}
