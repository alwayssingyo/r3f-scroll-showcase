import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const floatingItems = [
  {
    name: "WASP-18b",
    speedX: 24,
    speedY: 20,
    size: "clamp(132px, 15vw, 210px)",
    top: "8%",
    left: "10%",
    glow: "rgba(144, 171, 255, 0.22)",
    rotate: "-12deg",
    depth: "front",
    image: "/images/PIA22087.jpg",
    position: "56% 48%",
    ringed: false,
  },
  {
    name: "55 Cancri e",
    speedX: -28,
    speedY: 22,
    size: "clamp(118px, 13vw, 188px)",
    top: "16%",
    left: "76%",
    glow: "rgba(255, 124, 84, 0.24)",
    rotate: "14deg",
    depth: "mid",
    image: "/images/PIA22069.jpg",
    position: "62% 44%",
    ringed: false,
  },
  {
    name: "GJ 436b",
    speedX: 16,
    speedY: -24,
    size: "clamp(158px, 19vw, 248px)",
    top: "54%",
    left: "8%",
    glow: "rgba(110, 197, 255, 0.18)",
    rotate: "-10deg",
    depth: "back",
    image: "/images/PIA13054.jpg",
    position: "58% 48%",
    ringed: false,
  },
  {
    name: "Kepler-69c",
    speedX: -20,
    speedY: -18,
    size: "clamp(186px, 23vw, 290px)",
    top: "56%",
    left: "69%",
    glow: "rgba(255, 213, 164, 0.18)",
    rotate: "10deg",
    depth: "front",
    image: "/images/PIA17003.jpg",
    position: "54% 46%",
    ringed: true,
  },
  {
    name: "K2-33b",
    speedX: -18,
    speedY: 20,
    size: "clamp(68px, 7vw, 96px)",
    top: "72%",
    left: "46%",
    glow: "rgba(255, 124, 84, 0.18)",
    rotate: "-14deg",
    depth: "back",
    image: "/images/PIA20690.jpg",
    position: "20% 50%",
    ringed: false,
  },
];

export const FloatingScene = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const layers = gsap.utils.toArray(".floating_scene_item");

      const animations = layers.map((layer, index) =>
        gsap.to(layer, {
          yPercent: index % 2 === 0 ? -7 : 7,
          xPercent: index % 3 === 0 ? 4 : -4,
          rotation: `+=${index % 2 === 0 ? 8 : -8}`,
          duration: 5.2 + index * 0.45,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        })
      );

      const xSetters = layers.map((layer) =>
        gsap.quickTo(layer, "x", { duration: 0.55, ease: "power3.out" })
      );
      const ySetters = layers.map((layer) =>
        gsap.quickTo(layer, "y", { duration: 0.55, ease: "power3.out" })
      );
      const rotationSetters = layers.map((layer) =>
        gsap.quickTo(layer, "rotation", { duration: 0.7, ease: "power3.out" })
      );

      const handleMove = (event) => {
        const rect = section.getBoundingClientRect();
        const relX = (event.clientX - rect.left) / rect.width - 0.5;
        const relY = (event.clientY - rect.top) / rect.height - 0.5;

        layers.forEach((layer, index) => {
          const speedX = Number(layer.dataset.speedx || 0);
          const speedY = Number(layer.dataset.speedy || 0);
          const baseRotation = Number(layer.dataset.rotation || 0);

          xSetters[index](relX * speedX);
          ySetters[index](relY * speedY);
          rotationSetters[index](baseRotation + relX * 8);
        });

        gsap.to(".floating_scene_dots", {
          x: relX * 18,
          y: relY * 18,
          duration: 0.6,
          ease: "power3.out",
        });

        gsap.to(".floating_scene_copy", {
          x: relX * -12,
          y: relY * -12,
          duration: 0.6,
          ease: "power3.out",
        });
      };

      const handleLeave = () => {
        layers.forEach((layer, index) => {
          const baseRotation = Number(layer.dataset.rotation || 0);

          xSetters[index](0);
          ySetters[index](0);
          rotationSetters[index](baseRotation);
        });

        gsap.to(".floating_scene_dots, .floating_scene_copy", {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      };

      section.addEventListener("mousemove", handleMove);
      section.addEventListener("mouseleave", handleLeave);

      return () => {
        section.removeEventListener("mousemove", handleMove);
        section.removeEventListener("mouseleave", handleLeave);
        animations.forEach((animation) => animation.kill());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="floating_scene">
      <div className="floating_scene_background"></div>

      <div className="floating_scene_stage">
        {floatingItems.map((item) => (
          <div
            key={item.name}
            className={`floating_scene_item floating_scene_item_${item.depth}${item.ringed ? " floating_scene_item_ringed" : ""}`}
            data-speedx={item.speedX}
            data-speedy={item.speedY}
            data-rotation={parseFloat(item.rotate)}
            style={{
              "--item-size": item.size,
              "--item-top": item.top,
              "--item-left": item.left,
              "--item-glow": item.glow,
              "--item-rotate": item.rotate,
              "--item-image": `url(${item.image})`,
              "--item-position": item.position,
            }}
            aria-hidden="true"
          >
            <div className="floating_scene_item_inner"></div>
          </div>
        ))}

        <div className="floating_scene_center">
          <h2 className="floating_scene_dots">STRANGE WORLDS</h2>

          <div className="floating_scene_copy">
            <p>
              NASA-style planet renders drift across the frame at different depths, while the cursor gently
              pulls each orbit off-center.
            </p>

            <div className="floating_scene_tags">
              <span>Exoplanet Atlas</span>
              <span>Mouse Parallax</span>
              <span>Floating Orbits</span>
              <span>Dot Matrix Type</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
