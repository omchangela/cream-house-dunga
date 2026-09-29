"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, CheckCircle2, ShieldCheck, HeartHandshake, Flame, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StoryProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageCardRef = useRef<HTMLDivElement>(null);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Two client hero images for the animated transition showcase
  const storySlides = [
    {
      id: "pints-lineup",
      tabTitle: "🍨 Handcrafted Pints",
      title: "Artisanal Gelato Pints Collection",
      subtitle: "Micro-Batch Churning • Raw A2 Farm Milk",
      desc: "Slow-churned at -4°C in 10-liter barrels with under 18% overrun for an unforgettable, lingering silkiness.",
      image: "/images/luxury-hero-pints.jpg",
      alt: "Cream House Artisanal Gelato Pints Collection",
      badge: "Micro-Batch Reserve",
      highlight: "100% Raw A2 Milk",
    },
    {
      id: "cones-royale",
      tabTitle: "🍦 Cones Royale Quartet",
      title: "Signature Cones Royale Quartet",
      subtitle: "Hand-Rolled Waffles • Callebaut Ganache Drizzle",
      desc: "Belgian Noir, Brownie Truffle, Wild Berry, and Bourbon Vanilla nestled in butter-crisped artisan cones.",
      image: "/images/luxury-hero-cones.jpg",
      alt: "Cream House Cones Royale Quartet",
      badge: "Signature Quartet",
      highlight: "Crisp Butter Waffle",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeSlide = storySlides[activeIndex];

  // Steps for the right column
  const steps = [
    {
      num: "01",
      title: "Morning Farm Milk Harvest",
      desc: "Delivered raw and fresh from certified local farms within 3 hours of milking. Never homogenized into powder.",
      icon: <CheckCircle2 size={20} color="var(--berry-velvet)" />,
    },
    {
      num: "02",
      title: "Botanical & Pod Infusions",
      desc: "Madagascar bourbon vanilla beans, stone-ground Iranian pistachios, and 70% Callebaut cocoa slow-steeped in cream.",
      icon: <Sparkles size={20} color="var(--gold-honey)" />,
    },
    {
      num: "03",
      title: "24-Hour Cold Aging",
      desc: "A patient overnight rest at 2°C allows milk proteins and natural dairy fats to bind into a velvet silk emulsion.",
      icon: <ShieldCheck size={20} color="var(--pistachio-leaf)" />,
    },
    {
      num: "04",
      title: "Slow Micro-Churn at -4°C",
      desc: "Handcrafted in small 10-liter barrels with gentle paddles, locking in dense texture with minimum air whip.",
      icon: <Flame size={20} color="var(--berry-velvet)" />,
    },
  ];

  // Animated slide transition: "One image goes and another comes"
  const changeSlide = useCallback((nextIdx: number, direction: 1 | -1 = 1) => {
    if (nextIdx === activeIndex) return;

    const currentImg = slideContainerRef.current?.querySelector(".active-slide-img");
    
    // Outgoing animation: slides and scales away gracefully
    if (currentImg) {
      gsap.to(currentImg, {
        xPercent: -40 * direction,
        scale: 0.92,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.45,
        ease: "power2.in",
        onComplete: () => {
          setActiveIndex(nextIdx);
        },
      });
    } else {
      setActiveIndex(nextIdx);
    }
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    const next = (activeIndex + 1) % storySlides.length;
    changeSlide(next, 1);
  }, [activeIndex, changeSlide, storySlides.length]);

  const handlePrev = useCallback(() => {
    const prev = (activeIndex - 1 + storySlides.length) % storySlides.length;
    changeSlide(prev, -1);
  }, [activeIndex, changeSlide, storySlides.length]);

  // Entrance animation whenever activeIndex changes
  useEffect(() => {
    const incomingImg = slideContainerRef.current?.querySelector(".active-slide-img");
    if (incomingImg) {
      gsap.fromTo(
        incomingImg,
        {
          xPercent: 35,
          scale: 1.08,
          opacity: 0,
          filter: "blur(8px)",
        },
        {
          xPercent: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.65,
          ease: "back.out(1.4)",
        }
      );
    }

    // Animate the text caption inside the single container
    gsap.fromTo(
      ".slide-caption-anim",
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }
    );
  }, [activeIndex]);

  // Autoplay timer with visual animated progress bar
  useEffect(() => {
    if (isPaused) return;

    if (progressBarRef.current) {
      gsap.fromTo(
        progressBarRef.current,
        { width: "0%" },
        {
          width: "100%",
          duration: 4.5,
          ease: "none",
          onComplete: () => {
            handleNext();
          },
        }
      );
    }

    return () => {
      if (progressBarRef.current) {
        gsap.killTweensOf(progressBarRef.current);
      }
    };
  }, [activeIndex, isPaused, handleNext]);

  // GSAP scroll trigger and 3D mouse parallax on the single container
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // 1. Scrubbed Entrance for the single stage card
      if (stageCardRef.current) {
        gsap.from(stageCardRef.current, {
          y: 60,
          opacity: 0,
          scale: 0.94,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stageCardRef.current,
            start: "top 85%",
          },
        });
      }

      // 2. Staggered reveal of process steps
      gsap.from(".story-step-card", {
        scrollTrigger: {
          trigger: ".story-steps-container",
          start: "top 80%",
        },
        x: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });

      // 3. Mouse 3D tilt on the single frame
      const card = stageCardRef.current;
      if (!card) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
          rotationY: x * 12,
          rotationX: -y * 12,
          transformPerspective: 1000,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="heritage"
      ref={sectionRef}
      style={{
        padding: "130px 0",
        background: "linear-gradient(180deg, #FFFFFF 0%, #FFFDF9 50%, #FAF6EE 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Soft Ambient Background Orbs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(216, 40, 85, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "40%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212, 143, 55, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.08fr 0.92fr",
            gap: "60px",
            alignItems: "center",
          }}
          className="story-grid"
        >
          {/* Left Column: ONLY ONE SINGLE LUXURY IMAGE CONTAINER with Animated Transitions */}
          <div>
            {/* Top Interactive Selector Tabs */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 8px",
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(14px)",
                borderRadius: "999px",
                border: "1px solid rgba(216, 40, 85, 0.15)",
                boxShadow: "0 8px 24px rgba(46, 27, 19, 0.05)",
                marginBottom: "18px",
              }}
            >
              {storySlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => changeSlide(idx, idx > activeIndex ? 1 : -1)}
                  style={{
                    border: "none",
                    padding: "8px 18px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    background: activeIndex === idx ? "var(--berry-velvet)" : "transparent",
                    color: activeIndex === idx ? "#FFFFFF" : "var(--cocoa-rich)",
                    boxShadow: activeIndex === idx ? "0 4px 14px rgba(216, 40, 85, 0.35)" : "none",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {slide.tabTitle}
                </button>
              ))}
            </div>

            {/* SINGLE IMAGE CONTAINER */}
            <div
              ref={stageCardRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{
                position: "relative",
                width: "100%",
                height: "540px",
                borderRadius: "40px",
                overflow: "hidden",
                background: "#FAF4EB",
                border: "2px solid rgba(255, 255, 255, 0.95)",
                boxShadow: "0 35px 80px -15px rgba(46, 27, 19, 0.16)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Floating Heritage Badge at Top-Left */}
              <div
                style={{
                  position: "absolute",
                  top: "22px",
                  left: "22px",
                  zIndex: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 16px",
                  borderRadius: "999px",
                  background: "rgba(255, 255, 255, 0.88)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(46, 27, 19, 0.08)",
                  boxShadow: "0 6px 20px rgba(46, 27, 19, 0.08)",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "var(--berry-soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--berry-velvet)",
                  }}
                >
                  <HeartHandshake size={14} />
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--cocoa-dark)",
                    letterSpacing: "0.02em",
                  }}
                >
                  Since 1995 • Pure Craft
                </span>
              </div>

              {/* Top-Right Highlight Pill */}
              <div
                style={{
                  position: "absolute",
                  top: "22px",
                  right: "22px",
                  zIndex: 20,
                  padding: "8px 16px",
                  borderRadius: "999px",
                  background: "rgba(255, 248, 230, 0.92)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(212, 143, 55, 0.3)",
                  color: "var(--gold-honey)",
                  fontSize: "12px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 6px 18px rgba(46, 27, 19, 0.08)",
                }}
              >
                <Sparkles size={13} />
                <span>{activeSlide.highlight}</span>
              </div>

              {/* Main Image Stage: Full-Bleed Luxury Visual with Animated Slide In/Out */}
              <div
                ref={slideContainerRef}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <div
                  className="active-slide-img"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    willChange: "transform, opacity, filter",
                  }}
                >
                  <Image
                    src={activeSlide.image}
                    alt={activeSlide.alt}
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center center",
                    }}
                    priority
                  />
                </div>
              </div>

              {/* Glass Nav Chevrons (Prev / Next) */}
              <button
                onClick={handlePrev}
                aria-label="Previous Creation"
                style={{
                  position: "absolute",
                  top: "45%",
                  left: "16px",
                  transform: "translateY(-50%)",
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255, 255, 255, 0.9)",
                  background: "rgba(255, 255, 255, 0.85)",
                  backdropFilter: "blur(12px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--cocoa-rich)",
                  cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(46, 27, 19, 0.1)",
                  zIndex: 25,
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#FFFFFF";
                  e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(216, 40, 85, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.85)";
                  e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                  e.currentTarget.style.boxShadow = "0 6px 18px rgba(46, 27, 19, 0.1)";
                }}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next Creation"
                style={{
                  position: "absolute",
                  top: "45%",
                  right: "16px",
                  transform: "translateY(-50%)",
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255, 255, 255, 0.9)",
                  background: "rgba(255, 255, 255, 0.85)",
                  backdropFilter: "blur(12px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--cocoa-rich)",
                  cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(46, 27, 19, 0.1)",
                  zIndex: 25,
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#FFFFFF";
                  e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(216, 40, 85, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.85)";
                  e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                  e.currentTarget.style.boxShadow = "0 6px 18px rgba(46, 27, 19, 0.1)";
                }}
              >
                <ChevronRight size={20} />
              </button>

              {/* Bottom Frosted Glass Caption & Progress Bar */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "20px 28px",
                  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.96) 100%)",
                  backdropFilter: "blur(18px)",
                  borderTop: "1px solid rgba(46, 27, 19, 0.08)",
                  zIndex: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "20px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    className="slide-caption-anim"
                    style={{
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      fontWeight: 800,
                      color: "var(--berry-velvet)",
                      marginBottom: "4px",
                    }}
                  >
                    {activeSlide.badge}
                  </div>
                  <h3
                    className="serif-heading slide-caption-anim"
                    style={{
                      fontSize: "20px",
                      color: "var(--cocoa-dark)",
                      lineHeight: 1.25,
                      marginBottom: "4px",
                    }}
                  >
                    {activeSlide.title}
                  </h3>
                  <p
                    className="slide-caption-anim"
                    style={{
                      fontSize: "13px",
                      color: "var(--cocoa-muted)",
                      lineHeight: 1.5,
                      maxWidth: "420px",
                    }}
                  >
                    {activeSlide.desc}
                  </p>
                </div>

                {/* Slide Indicator & Autoplay Status */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 800,
                      color: "var(--cocoa-dark)",
                      fontFamily: "var(--font-display)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    0{activeIndex + 1} / 0{storySlides.length}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--cocoa-muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => setIsPaused(!isPaused)}
                  >
                    {isPaused ? <Play size={10} fill="currentColor" /> : <Pause size={10} fill="currentColor" />}
                    <span>{isPaused ? "Paused" : "Auto-glide"}</span>
                  </div>
                </div>
              </div>

              {/* Animated Bottom Timer Bar */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "rgba(46, 27, 19, 0.08)",
                  zIndex: 30,
                }}
              >
                <div
                  ref={progressBarRef}
                  style={{
                    height: "100%",
                    width: "0%",
                    background: "linear-gradient(90deg, var(--berry-velvet), var(--gold-honey))",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Process Steps */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 18px",
                borderRadius: "9999px",
                background: "var(--bg-cream-warm)",
                border: "1px solid rgba(46, 27, 19, 0.08)",
                marginBottom: "18px",
              }}
            >
              <Sparkles size={14} color="var(--berry-velvet)" />
              <span
                className="display-badge"
                style={{ fontSize: "11px", color: "var(--cocoa-rich)" }}
              >
                Artisanal Methodology
              </span>
            </div>

            <h2
              className="serif-heading"
              style={{
                fontSize: "clamp(32px, 3.8vw, 48px)",
                lineHeight: 1.15,
                color: "var(--cocoa-dark)",
                marginBottom: "18px",
              }}
            >
              We Don&#39;t Make Fast Ice Cream.{" "}
              <span className="italic-accent">We Craft Gelato.</span>
            </h2>

            <p
              style={{
                fontSize: "16px",
                color: "var(--cocoa-muted)",
                lineHeight: 1.7,
                marginBottom: "36px",
              }}
            >
              Industrial ice cream pumps in up to 50% compressed air and vegetable
              emulsifiers to fill cheap tubs. At Cream House, we churn at high
              density with under 18% air, giving every scoop a rich, lingering silkiness.
            </p>

            {/* 4 Process Steps */}
            <div
              className="story-steps-container"
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              {steps.map((st) => (
                <div
                  key={st.num}
                  className="story-step-card"
                  style={{
                    display: "flex",
                    gap: "18px",
                    padding: "16px 20px",
                    borderRadius: "20px",
                    background: "#FFFFFF",
                    border: "1px solid rgba(46, 27, 19, 0.06)",
                    boxShadow: "0 4px 15px rgba(46, 27, 19, 0.03)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#FFFFFF";
                    e.currentTarget.style.boxShadow = "var(--shadow-md)";
                    e.currentTarget.style.borderColor = "var(--berry-glow)";
                    e.currentTarget.style.transform = "translateX(6px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#FFFFFF";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(46, 27, 19, 0.03)";
                    e.currentTarget.style.borderColor = "rgba(46, 27, 19, 0.06)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "var(--berry-velvet)",
                      fontFamily: "var(--font-display)",
                      letterSpacing: "0.05em",
                      paddingTop: "2px",
                    }}
                  >
                    {st.num}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "var(--cocoa-dark)",
                        marginBottom: "4px",
                      }}
                    >
                      {st.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "13.5px",
                        color: "var(--cocoa-muted)",
                        lineHeight: 1.6,
                      }}
                    >
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 991px) {
          .story-grid {
            grid-template-columns: 1fr !important;
            gap: 50px !important;
          }
        }
      `}</style>
    </section>
  );
}
