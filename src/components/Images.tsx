import { useEffect } from "react";
import { gsap } from "../lib/gsap";

interface Tile {
  image?: string;
  video?: string;
  right: string;
  top: string;
  height: string;
  width: string;
}

const tiles: Tile[] = [
  {
    video:
      "https://a.storyblok.com/f/133769/x/9c433c7aac/home-news-diesel-be-a-follower.mp4",
    right: "right-[80%]",
    top: "top-[30%]",
    height: "h-[30%]",
    width: "w-full",
  },
  {
    image:
      "https://a.storyblok.com/f/133769/348x494/21becfd449/home-news-3.jpg/m/550x781/filters:format(webp):quality(70)",
    right: "-right-[40%]",
    top: "top-[10%]",
    height: "h-[35%]",
    width: "w-1/2",
  },
  {
    image:
      "https://a.storyblok.com/f/133769/1440x966/8fe83b498c/home-news-7.jpg/m/550x369/filters:format(webp):quality(70)",
    right: "right-[90%]",
    top: "top-[90%]",
    height: "h-[40%]",
    width: "w-[120%]",
  },
  {
    video: "https://a.storyblok.com/f/133769/x/88b4bf7989/news-rino-pelle.mp4",
    right: "-right-[90%]",
    top: "top-[86%]",
    height: "h-1/2",
    width: "w-full",
  },
];

export default function Images() {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".images-section",
        start: "top 30%",
        end: "top -200%",
        scrub: true,
      },
      defaults: {
        ease: "expo.inOut",
      },
    });

    tl.to(".images:nth-child(1) video", { x: "-50%", y: "-100%" }, "a")
      .to(".images:nth-child(2) img", { x: "90%", y: "-50%" }, "a")
      .to(".images:nth-child(3) img", { x: "-50%", y: "-50%" }, "a")
      .to(".images:nth-child(4) video", { x: "50%", y: "-50%" }, "a");

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div className="images-section w-full h-[70vh] sm:h-[180vh] overflow-hidden flex items-center justify-center">
      <div className="relative w-1/3 sm:w-1/4 h-1/2">
        {tiles.map((item, index) => (
          <div
            className={`images absolute ${item.height} ${item.width} ${item.top} ${item.right}`}
            key={index}
          >
            {item.image ? (
              <img
                className="h-full w-full object-cover"
                src={item.image}
                alt=""
              />
            ) : (
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                src={item.video}
              />
            )}
          </div>
        ))}

        <img
          className="h-full w-full object-cover"
          src="https://a.storyblok.com/f/133769/748x1278/5784aa7150/home-news-1.jpg/m/550x940/filters:format(webp):quality(70)"
          alt=""
        />
      </div>
    </div>
  );
}
