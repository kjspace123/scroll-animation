import { useParallax } from "../hooks/useParallax";
import { Sparkle } from "./Logo";

export default function Spread() {
  const parallaxRef = useParallax<HTMLDivElement>(0.2);

  return (
    <div ref={parallaxRef} className="w-full">
      <div className="max-w-screen-2xl mx-auto flex flex-col items-center">
        <div className="flex items-center gap-3">
          <Sparkle className="size-4" />
          <h2 className="text-sm">In the media</h2>
        </div>

        <div className="text text-center mt-7 pb-24">
          <h1 className="text-6xl sm:text-[9rem] tracking-tighter">Spread</h1>
          <h1 className="text-6xl sm:text-[9rem] tracking-tighter">
            the News
          </h1>
          <p className="text-lg sm:text-2xl sm:mt-10 mt-6 leading-6 w-2/3 mx-auto">
            Find out more about our work on these leading design and
            technology platforms.
          </p>
          <a
            className="flex items-center justify-center gap-2 text-sm underline underline-offset-4 mt-5 sm:mt-10 cursor-pointer"
            href="#"
          >
            <span className="size-1.5 rounded-full border border-ink/50" />
            Browse all news
          </a>
        </div>
      </div>
    </div>
  );
}
