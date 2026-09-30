import { useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { useReveal } from "../hooks/useReveal";
import { Wordmark, Icon } from "./Logo";
import MenuOverlay from "./MenuOverlay";

const navLinks = ["Work", "Studio", "News", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useReveal(".logo svg, .links div", 0.5);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 80,
      end: 99999,
      onToggle: (self) => setScrolled(self.isActive),
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (scrolled) return;
    gsap.fromTo(
      ".nav-compact-icon",
      { autoAlpha: 0, scale: 0.8 },
      { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power2.out" },
    );
  }, [scrolled]);

  return (
    <>
      <div className="w-full fixed z-900 text-white">
        <div className="max-w-screen-2xl mx-auto p-5 sm:p-10 relative">
          {/* Top state: wordmark + text nav */}
          <div
            className={`flex justify-between items-center transition-opacity duration-300 ${
              scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <div className="logo overflow-hidden">
              <Wordmark className="w-20" />
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="toggler sm:hidden space-y-0.75 cursor-pointer"
              aria-label="Open menu"
            >
              <div className="line w-5 h-[1.5px] bg-white" />
              <div className="line w-5 h-[1.5px] bg-white" />
              <div className="line w-5 h-[1.5px] bg-white" />
            </button>

            <div className="links overflow-hidden hidden sm:flex items-center gap-10">
              <div className="sm:flex items-center gap-10">
                {navLinks.map((item) => (
                  <a className="text-lg font-medium cursor-pointer" key={item}>
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Scrolled state: icon + hamburger (blend-mode gives automatic
              black/white contrast against the light/dark sections it sits over) */}
          <div
            className={`absolute inset-5 sm:inset-10 flex justify-between items-center mix-blend-difference transition-opacity duration-300 ${
              scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="nav-compact-icon">
              <Icon className="w-8" />
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              Menu
              <svg
                className="w-4.5 h-3"
                viewBox="0 0 18 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="18" y1="0.6" y2="0.6" stroke="currentColor" strokeWidth="1.2" />
                <line x1="18" y1="5.7167" y2="5.7167" stroke="currentColor" strokeWidth="1.2" />
                <line x1="18" y1="10.8334" y2="10.8334" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
