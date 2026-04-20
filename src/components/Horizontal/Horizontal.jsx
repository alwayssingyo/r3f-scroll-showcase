import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const cards = [
  {
    index: "01",
    eyebrow: "Velocity",
    title: "Frames drift past like city lights after dark.",
    copy:
      "The section stays pinned while oversized cards slide sideways, so the scroll still feels physical instead of turning into a plain slider.",
    note: "Pinned motion with a steady lateral pull.",
    word: "DRIFT",
    metric: "Pinned / Scrub",
    tags: ["Wide panels", "Glass surface", "Night glow"],
    accent: "rgba(235, 252, 217, 0.92)",
    glow: "rgba(174, 255, 127, 0.24)",
  },
  {
    index: "02",
    eyebrow: "Depth",
    title: "Soft reflections keep the hero's glass language alive.",
    copy:
      "Translucent layers, thin borders, and moving highlights keep the lower section in the same family as the transmission torus above.",
    note: "A controlled bloom keeps the surface clean.",
    word: "GLASS",
    metric: "Layered Light",
    tags: ["Bloom edge", "Fine grid", "Low contrast"],
    accent: "rgba(255, 255, 255, 0.94)",
    glow: "rgba(255, 255, 255, 0.14)",
  },
  {
    index: "03",
    eyebrow: "Rhythm",
    title: "Typography lands big, then the motion carries it away.",
    copy:
      "Short words, dense spacing, and long cards make the section feel more like a motion poster than a standard content rail.",
    note: "Big type gives each panel a clear beat.",
    word: "PULSE",
    metric: "Type First",
    tags: ["Poster scale", "Clean contrast", "Slow drift"],
    accent: "rgba(150, 193, 255, 0.9)",
    glow: "rgba(84, 136, 255, 0.22)",
  },
  {
    index: "04",
    eyebrow: "Afterglow",
    title: "It resolves with a brighter card instead of a hard stop.",
    copy:
      "The final panel leans warmer and a little more luminous, so the horizontal sequence ends with energy before the page releases.",
    note: "A clean finish frame for the last stretch.",
    word: "ECHO",
    metric: "Release",
    tags: ["Finish frame", "Warm accent", "Ambient tail"],
    accent: "rgba(255, 202, 138, 0.92)",
    glow: "rgba(255, 173, 102, 0.24)",
  },
];

export const Horizontal = () => {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;

      if (!section || !viewport || !track) {
        return;
      }

      const getScrollAmount = () =>
        Math.max(0, track.scrollWidth - viewport.offsetWidth);

      const scrollTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.to(".horizontal_progress_bar", {
        scaleX: 1,
        ease: "none",
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray(".horizontal_card").forEach((card) => {
        const inner = card.querySelector(".horizontal_card_inner");
        const orb = card.querySelector(".horizontal_card_orb");

        if (inner) {
          gsap.fromTo(
            inner,
            {
              yPercent: 10,
              rotateY: -14,
            },
            {
              yPercent: 0,
              rotateY: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left 88%",
                end: "center center",
                scrub: true,
              },
            }
          );
        }

        if (orb) {
          gsap.fromTo(
            orb,
            {
              xPercent: -12,
              yPercent: 12,
              scale: 0.92,
            },
            {
              xPercent: 12,
              yPercent: -10,
              scale: 1.08,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="horizontal">
      <div className="horizontal_shell">
        <div className="horizontal_intro">
          <div>
            <span className="horizontal_kicker">Horizontal Scrub</span>
            <h2>Scroll becomes sideways motion.</h2>
            <p>
              Same black stage, same oversized type, just translated into a
              pinned gallery that makes the second act feel wider.
            </p>
          </div>

          <div className="horizontal_intro_bottom">
            <div className="horizontal_progress">
              <span>Start</span>
              <div className="horizontal_progress_track">
                <div className="horizontal_progress_bar"></div>
              </div>
              <span>End</span>
            </div>

            <ul className="horizontal_intro_points">
              <li>Pin the section</li>
              <li>Scrub the track</li>
              <li>Let the cards breathe</li>
            </ul>
          </div>
        </div>

        <div ref={viewportRef} className="horizontal_viewport">
          <div ref={trackRef} className="horizontal_track">
            {cards.map((card) => (
              <article
                key={card.index}
                className="horizontal_card"
                style={{
                  "--card-accent": card.accent,
                  "--card-glow": card.glow,
                }}
              >
                <div className="horizontal_card_inner">
                  <div className="horizontal_card_visual" aria-hidden="true">
                    <div className="horizontal_card_grid"></div>
                    <div className="horizontal_card_orb"></div>
                    <div className="horizontal_card_line horizontal_card_line_one"></div>
                    <div className="horizontal_card_line horizontal_card_line_two"></div>
                    <span className="horizontal_card_word">{card.word}</span>
                  </div>

                  <div className="horizontal_card_top">
                    <span className="horizontal_card_index">{card.index}</span>
                    <span className="horizontal_card_metric">{card.metric}</span>
                  </div>

                  <div className="horizontal_card_content">
                    <span className="horizontal_card_eyebrow">
                      {card.eyebrow}
                    </span>
                    <h3>{card.title}</h3>
                    <p>{card.copy}</p>
                  </div>

                  <div className="horizontal_card_footer">
                    <ul className="horizontal_card_tags">
                      {card.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <p className="horizontal_card_note">{card.note}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
