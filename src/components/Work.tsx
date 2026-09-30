import { useRef } from "react";
import { motion } from "framer-motion";
import { Sparkle } from "./Logo";
import { useParallax } from "../hooks/useParallax";

interface Project {
  heading: string;
  subHeading: string;
  image: string;
  video: string;
}

const projects: Project[] = [
  {
    heading: "Ottografie",
    subHeading: "Seamless Photographic Journey",
    image:
      "https://a.storyblok.com/f/133769/2400x2990/729680ed7f/ottografie-2025-hero.jpg/m/1300x1620/filters:quality(90)",
    video:
      "https://player.vimeo.com/progressive_redirect/playback/1047169994/rendition/720p/file.mp4?loc=external&log_user=0&signature=780c70237c241a1fe7a4b3837cad974ed7fb98f38cd2e6f912752ff9e44107ee",
  },
  {
    heading: "Amaterasu",
    subHeading: "Frontier Health Innovation",
    image:
      "https://a.storyblok.com/f/133769/2409x3000/c155d3e27e/amaterasu-hero.jpg/m/1300x1619/filters:quality(90)",
    video:
      "https://player.vimeo.com/progressive_redirect/playback/1020697798/rendition/720p/file.mp4?loc=external&log_user=0&signature=cd45f23683db91c40f08a3f4a31ba153f1e93eac3d4f98cb3ca4b651b8830d04",
  },
  {
    heading: "Columbia Pictures",
    subHeading: "Celebrating a Century of Cinema",
    image:
      "https://a.storyblok.com/f/133769/2400x2990/540fb12941/columbia-pictures-thumbnail.jpg/m/1300x1620/filters:quality(90)",
    video:
      "https://player.vimeo.com/progressive_redirect/playback/927016456/rendition/720p/file.mp4?loc=external&log_user=0&signature=270ce5ba6bf44a717c74cf85de5f3de1d33a36ba5205b660e5e23b873199d71a",
  },
  {
    heading: "Cambium",
    subHeading: "Pioneering Sustainable Solutions",
    image:
      "https://a.storyblok.com/f/133769/2409x3000/cfd16e1a58/cambium-carbon-hero.jpg/m/1300x1619/filters:quality(90)",
    video:
      "https://player.vimeo.com/progressive_redirect/playback/1001982172/rendition/720p/file.mp4?loc=external&log_user=0&signature=b92eb1ab8119f2ffaaa03f075ef271714f5ee63065ee8d29f4e188ce30202de0",
  },
];

// Alternating drift per card so the grid staggers gently as it scrolls by,
// mirroring the original site's per-card scroll-linked offset.
const parallaxSpeeds = [0.1, -0.15, 0.15, -0.25];

function ProjectCard({ item, index }: { item: Project; index: number }) {
  const parallaxRef = useParallax<HTMLAnchorElement>(parallaxSpeeds[index]);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <a
      ref={parallaxRef}
      href="#"
      className="project group block w-full overflow-hidden"
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        videoRef.current?.pause();
        if (videoRef.current) videoRef.current.currentTime = 0;
      }}
    >
      <div className="block relative w-full overflow-hidden bg-ink">
        <img
          className="w-full h-auto object-cover"
          src={item.image}
          alt={item.heading}
        />
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <source src={item.video} type="video/mp4" />
        </video>
      </div>

      <p className="info mt-3 overflow-hidden">
        <motion.span
          initial={{ opacity: 0, y: "-100%", rotate: -7 }}
          whileInView={{ opacity: 1, y: "0%", rotate: 0 }}
          viewport={{ once: true }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          className="inline-block sm:flex sm:items-center sm:gap-1"
        >
          <strong className="capitalize font-medium sm:text-sm">
            {item.heading}
          </strong>
          <span className="hidden sm:block font-extrabold">–</span>
          <span className="capitalize text-sm opacity-60 sm:opacity-80 sm:text-xs">
            {item.subHeading}
          </span>
        </motion.span>
      </p>
    </a>
  );
}

export default function Work() {
  return (
    <div className="max-w-screen-2xl mx-auto px-5 sm:px-52 py-20">
      <div className="text">
        <div className="label flex items-center gap-3">
          <Sparkle className="h-2.75 w-2.75" />
          <h2 className="capitalize font-semibold text-sm sm:text-3xl">
            featured projects
          </h2>
        </div>

        <h3 className="title text-7xl sm:text-[14rem] tracking-tight my-5 overflow-hidden">
          <motion.span
            initial={{ y: "90%", rotate: 30 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.13, 0, 0.05, 1], duration: 0.5 }}
            className="inline-block origin-left"
          >
            Work
          </motion.span>
        </h3>

        <p className="text-lg leading-6 sm:text-xl sm:w-2/3 sm:opacity-40">
          Highlights of cases that we passionately built with forward-thinking
          clients and friends over the years.
        </p>
      </div>

      <div className="projects grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 mt-8">
        {projects.map((item, index) => (
          <ProjectCard key={item.heading} item={item} index={index} />
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <a
          href="#"
          className="flex items-center gap-2 text-sm underline underline-offset-4 cursor-pointer"
        >
          <span className="size-1.5 rounded-full border border-ink/50" />
          Browse all work
        </a>
      </div>
    </div>
  );
}
