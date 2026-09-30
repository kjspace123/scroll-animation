import { useEffect } from "react";
import { gsap } from "../lib/gsap";
import { Sparkle } from "./Logo";

export default function Playreel() {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        pin: ".play-reel",
        start: "top 0",
        end: "top -150%",
        scrub: true,
      },
    });

    tl.to(".video-div", {
      height: "110vh",
      width: "110vw",
    })
      .to("h2", { gap: "0" }, "<")
      .to(".play-pill", { opacity: 0 }, "<");

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div className="play-reel relative w-full h-screen overflow-hidden bg-black">
      <div className="video-div w-48 sm:w-80 sm:h-44 h-28 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="play-pill absolute inset-0 z-2 flex items-center justify-center">
          <span className="size-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-sm">
            Play
          </span>
        </div>
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="https://player.vimeo.com/progressive_redirect/playback/914803778/rendition/1080p/file.mp4?loc=external&log_user=0&signature=5344c0e4fea63ca54bb433621ca0be7b9470b475583fa68b26de2b6e380a390a"
        />
      </div>

      <div className="overlay absolute flex flex-col justify-between w-full h-full text-white py-20">
        <div className="flex items-center justify-center gap-2">
          <Sparkle className="size-3" />
          <h2 className="text-sm">Work in motion</h2>
        </div>

        <h2 className="w-full flex items-center justify-center gap-32 sm:gap-[42%]">
          <div className="text-6xl sm:text-9xl">Play</div>
          <div className="text-6xl sm:text-9xl">Reel</div>
        </h2>

        <p className="text-center text-sm">
          Our work is best experienced in motion. Don't <br /> forget to put
          on your headphones.
        </p>
      </div>
    </div>
  );
}
