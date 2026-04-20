import { useEffect, useRef } from "react";
import "./App.scss";
import { Canvas } from "@react-three/fiber";
import { Model } from "./components/Model/Model";
import { Environment } from "@react-three/drei";
import { FirstText } from "./components/FirstText/FirstText";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import lenis from "./utils/lenis";
import { Horizontal } from "./components/Horizontal/Horizontal";
import { FloatingScene } from "./components/FloatingScene/FloatingScene";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
  const textRef = useRef(null);

  useEffect(() => {
    lenis();
  }, []);

  useGSAP(() => {
    gsap.to(textRef.current, {
      scrollTrigger: {
        trigger: ".main",
        scrub: true,
        start: "top top",
        end: `+=150`,
      },
      opacity: 0,
    });

    gsap.to(".scroll_wrap", {
      scrollTrigger: {
        trigger: ".horizontal",
        scrub: true,
        start: "top bottom",
        end: "top top",
      },
      opacity: 0,
      ease: "none",
    });
  });

  return (
    <div className="main">
      <div className="scroll_wrap">
        <Canvas flat>
          <Model />
          <directionalLight intensity={2} position={[0, 2, 3]} />
          <Environment preset="park" />
        </Canvas>
      </div>

      <div ref={textRef} className="scroll_text">
        <span>Scroll to explore</span>
      </div>

      {/* Empty Section */}
      <div className="empty_sec"></div>

      {/* First Text */}
      <FirstText />

      {/* Horizontal Section */}
      <Horizontal />

      {/* Floating Scene */}
      <FloatingScene />
    </div>
  );
}

export default App;
