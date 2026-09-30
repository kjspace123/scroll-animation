import { useParallax } from "../hooks/useParallax";

const addressLines = [
  "Willem II Singel 8",
  "6041 HS, Roermond",
  "The Netherlands",
  "hello@exoape.com",
];

const footerLinks = ["Work", "Studio", "News", "Contact"];
const socialLinks = ["Behance", "Dribbble", "LinkedIn", "Instagram"];

export default function Story() {
  const parallaxRef = useParallax<HTMLDivElement>(-0.5);

  return (
    <div className="overflow-hidden h-[85vh] sm:h-screen">
      <div
        ref={parallaxRef}
        className="relative w-full flex items-center overflow-hidden h-[85vh] sm:h-screen bg-ink text-[#e0ccbb]"
      >
        <div className="video-container absolute top-0 right-0 h-1/2 w-2/3 sm:w-3/5 flex items-center">
          <video
            className="w-full scale-125"
            autoPlay
            muted
            loop
            playsInline
            src="https://www.exoape.com/video/video-6.mp4"
          />
        </div>
        <div className="absolute w-full max-w-screen-2xl mx-auto px-7 sm:px-28">
          <div className="space-y-7 sm:space-y-10">
            <div>
              <h1 className="text-6xl sm:text-[9rem] sm:tracking-tighter">
                Our
              </h1>
              <h1 className="text-6xl sm:text-[9rem] sm:tracking-tighter">
                Story
              </h1>
            </div>
            <p className="text-lg sm:opacity-90 sm:text-2xl sm:w-1/2 leading-6">
              The story behind Exo Ape is one of exploration, creativity and
              curiosity.
            </p>
            <a
              className="border-b-2 inline-block sm:hidden border-[#e0ccbb] cursor-pointer"
              href="#"
            >
              Our Story
            </a>
            <span className="inline-block w-full h-px opacity-50 bg-[#e0ccbb]" />
            <div className="flex justify-between items-end">
              <div className="flex gap-28 sm:gap-32">
                <ul className="space-y-2 max-sm:hidden">
                  {addressLines.map((item) => (
                    <a
                      key={item}
                      className="block text-sm opacity-85 cursor-pointer"
                      href="#"
                    >
                      {item}
                    </a>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {footerLinks.map((item) => (
                    <a
                      key={item}
                      className="block text-sm opacity-85 capitalize cursor-pointer"
                      href="#"
                    >
                      {item}
                    </a>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {socialLinks.map((item) => (
                    <a
                      key={item}
                      className="block text-sm opacity-85 capitalize cursor-pointer"
                      href="#"
                    >
                      {item}
                    </a>
                  ))}
                </ul>
              </div>

              <a
                className="border-b inline-block max-sm:hidden border-[#e0ccbb] cursor-pointer"
                href="#"
              >
                Our Story
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
