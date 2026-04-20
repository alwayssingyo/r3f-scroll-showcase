import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export const FirstText = () => {
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.to(textRef.current, {
      scrollTrigger: {
        trigger: ".first_text_cont",
        scrub: true,
        start: "top bottom",
        end: `+=${window.innerHeight / 1.5}px`,
      },
      opacity: 1,
    });
  });

  return (
    <div className="first_text">
      <div ref={textRef} className="first_text_cont">
        <p>
          In the world of out of home advertising, brands <br />
          don't just shine; they come alive.
        </p>
        <button>Find out more</button>
      </div>
    </div>
  );
};
