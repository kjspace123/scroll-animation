import { useEffect } from "react";
import { ScrollSmoother } from "./lib/gsap";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Playreel from "./components/Playreel";
import Images from "./components/Images";
import Spread from "./components/Spread";
import Story from "./components/Story";

function App() {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
    });

    return () => smoother.kill();
  }, []);

  return (
    <>
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Hero />
          <Work />
          <Playreel />
          <Images />
          <Spread />
          <Story />
        </div>
      </div>
    </>
  );
}

export default App;
