"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Sparkles, ArrowRight, Play, Star, Droplets, Award } from "lucide-react";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);

  // Counter refs
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);

  // The client's two world-class culinary creations generated specifically for Cream House
  const heroVisuals = [
    {
      id: "cones-royale",
      title: "Signature Cones Royale Quartet",
      subtitle: "Bourbon Vanilla • Belgian Noir 70% • Wild Raspberry • Sicilian Pistachio",
      image: "/images/luxury-hero-cones.jpg",
      alt: "Cream House Artisanal Cones Royale Quartet",
      badge: "Chef's Signature Stand",
      highlight: "★ 4.98 Gourmet Award",
      tag: "Hand-Pressed Butter Waffles",
    },
    {
      id: "gelato-tubs",
      title: "Artisanal Gelato Pints Collection",
      subtitle: "Salted Caramel • Dark Espresso • Wild Berry Swirl • Fresh A2 Cream",
      image: "/images/luxury-hero-pints.jpg",
      alt: "Cream House Handcrafted Gelato Pints Collection",
      badge: "Micro-Batch Reserve",
      highlight: "100% Raw A2 Farm Milk",
      tag: "Slow-Churned at -4°C",
    },
  ];

  const [activeVisualIndex, setActiveVisualIndex] = useState(0);
  const [activeMood, setActiveMood] = useState<"raspberry" | "cocoa" | "pistachio" | "mango">("raspberry");
  const activeVisual = heroVisuals[activeVisualIndex];

  // Smooth cinematic crossfade between hero creations
  const switchVisual = useCallback((nextIdx: number) => {
    if (nextIdx === activeVisualIndex) return;
    const currentEl = visualWrapperRef.current?.querySelector(".active-hero-img");

    if (currentEl) {
      gsap.to(currentEl, {
        scale: 0.95,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.45,
        ease: "power2.inOut",
        onComplete: () => {
          setActiveVisualIndex(nextIdx);
        },
      });
    } else {
      setActiveVisualIndex(nextIdx);
    }
  }, [activeVisualIndex]);

  // Entrance animation whenever active visual changes
  useEffect(() => {
    const incomingEl = visualWrapperRef.current?.querySelector(".active-hero-img");
    if (incomingEl) {
      gsap.fromTo(
        incomingEl,
        {
          scale: 1.06,
          opacity: 0,
          filter: "blur(8px)",
        },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
        }
      );
    }
    gsap.fromTo(
      ".hero-caption-fade",
      { y: 8, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: "power2.out" }
    );
  }, [activeVisualIndex]);

  // Auto-glide timer
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIdx = (activeVisualIndex + 1) % heroVisuals.length;
      switchVisual(nextIdx);
    }, 6000);

    return () => clearInterval(timer);
  }, [activeVisualIndex, switchVisual, heroVisuals.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Reveal Timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-badge-pill", {
        y: -30,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".hero-title-line",
          {
            yPercent: 120,
            skewY: 4,
            stagger: 0.12,
            duration: 1.1,
          },
          "-=0.5"
        )
        .from(
          subtitleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.7"
        )
        .from(
          ctaRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.7"
        )
        .from(
          stageRef.current,
          {
            scale: 0.9,
            opacity: 0,
            y: 40,
            duration: 1.2,
            ease: "back.out(1.2)",
          },
          "-=0.9"
        );

      // 2. Animated Counter Numbers
      const counterObj = { v1: 0, v2: 0, v3: 0 };
      gsap.to(counterObj, {
        v1: 30,
        v2: 100,
        v3: 500,
        duration: 2.2,
        ease: "power2.out",
        delay: 0.5,
        onUpdate: () => {
          if (stat1Ref.current) stat1Ref.current.innerText = `${Math.round(counterObj.v1)}+`;
          if (stat2Ref.current) stat2Ref.current.innerText = `${Math.round(counterObj.v2)}+`;
          if (stat3Ref.current) stat3Ref.current.innerText = `${Math.round(counterObj.v3)}K+`;
        },
      });

      // 3. Gentle Floating Levitation on the Showcase Frame
      gsap.to(stageRef.current, {
        y: -10,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 4. Background Floating Cream Particles
      gsap.utils.toArray<HTMLElement>(".floating-cream-particle").forEach((particle, idx) => {
        gsap.to(particle, {
          y: "-=50",
          x: idx % 2 === 0 ? "+=25" : "-=25",
          rotation: 360,
          duration: 10 + idx * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // 5. Mouse 3D Parallax on the Stage
      const stage = stageRef.current;
      const hero = heroRef.current;
      if (!stage || !hero) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(stage, {
          rotationY: x * 14,
          rotationX: -y * 14,
          transformPerspective: 1200,
          duration: 0.6,
          ease: "power2.out",
        });

        gsap.to(".hero-glow-sphere", {
          x: x * 60,
          y: y * 60,
          duration: 1.1,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(stage, {
          rotationY: 0,
          rotationX: 0,
          duration: 1.1,
          ease: "elastic.out(1, 0.4)",
        });
        gsap.to(".hero-glow-sphere", {
          x: 0,
          y: 0,
          duration: 1.0,
        });
      };

      hero.addEventListener("mousemove", handleMouseMove);
      hero.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        hero.removeEventListener("mousemove", handleMouseMove);
        hero.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const moodGlows = {
    raspberry: "radial-gradient(circle, rgba(216, 40, 85, 0.28) 0%, rgba(249, 231, 200, 0.3) 60%, transparent 80%)",
    cocoa: "radial-gradient(circle, rgba(74, 51, 40, 0.32) 0%, rgba(212, 143, 55, 0.25) 60%, transparent 80%)",
    pistachio: "radial-gradient(circle, rgba(60, 112, 83, 0.28) 0%, rgba(237, 247, 241, 0.5) 60%, transparent 80%)",
    mango: "radial-gradient(circle, rgba(229, 168, 75, 0.32) 0%, rgba(255, 235, 180, 0.4) 60%, transparent 80%)",
  };

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingTop: "140px",
        paddingBottom: "80px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "linear-gradient(180deg, #FAF7F2 0%, #FFFDF9 60%, #F5EFE6 100%)",
      }}
    >
      {/* Background Floating Cream Particles */}
      {[
        { top: "15%", left: "8%", size: 14, opacity: 0.4, color: "#D82855" },
        { top: "65%", left: "12%", size: 20, opacity: 0.3, color: "#D48F37" },
        { top: "25%", right: "12%", size: 16, opacity: 0.35, color: "#3C7053" },
        { top: "75%", right: "8%", size: 24, opacity: 0.25, color: "#D82855" },
        { top: "45%", left: "48%", size: 12, opacity: 0.3, color: "#BF6A2D" },
      ].map((p, i) => (
        <div
          key={i}
          className="floating-cream-particle"
          style={{
            position: "absolute",
            top: p.top,
            left: (p as any).left,
            right: (p as any).right,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: p.color,
            opacity: p.opacity,
            filter: "blur(1px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      {/* Dynamic Ambient Sphere */}
      <div
        className="hero-glow-sphere"
        style={{
          position: "absolute",
          top: "10%",
          right: "6%",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: moodGlows[activeMood],
          filter: "blur(90px)",
          pointerEvents: "none",
          zIndex: 0,
          transition: "background 0.8s ease",
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
          className="hero-grid"
        >
          {/* Left Column: Editorial Typography with masked text reveals */}
          <div>
            {/* Tagline Badge */}
            <div
              className="hero-badge-pill"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 18px",
                borderRadius: "9999px",
                background: "rgba(255, 255, 255, 0.9)",
                border: "1px solid rgba(216, 40, 85, 0.15)",
                boxShadow: "0 6px 20px rgba(46, 27, 19, 0.05)",
                marginBottom: "28px",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "var(--berry-soft)",
                  color: "var(--berry-velvet)",
                }}
              >
                <Sparkles size={13} />
              </span>
              <span
                className="display-badge"
                style={{
                  fontSize: "12px",
                  color: "var(--cocoa-rich)",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
              >
                ARTISANAL GELATERIA • EST. 1995
              </span>
            </div>

            {/* Masked Headline for High-End Motion Entrance */}
            <div ref={titleWrapRef} style={{ overflow: "hidden", marginBottom: "22px" }}>
              <div style={{ overflow: "hidden" }}>
                <h1
                  className="serif-heading hero-title-line"
                  style={{
                    fontSize: "clamp(42px, 5.2vw, 76px)",
                    lineHeight: 1.08,
                    color: "var(--cocoa-dark)",
                  }}
                >
                  Where Pure Cream
                </h1>
              </div>
              <div style={{ overflow: "hidden" }}>
                <h1
                  className="serif-heading hero-title-line"
                  style={{
                    fontSize: "clamp(42px, 5.2vw, 76px)",
                    lineHeight: 1.08,
                  }}
                >
                  Becomes <span className="italic-accent">Pure Art.</span>
                </h1>
              </div>
            </div>

            {/* Description */}
            <p
              ref={subtitleRef}
              style={{
                fontSize: "clamp(16px, 1.3vw, 19px)",
                lineHeight: 1.7,
                color: "var(--cocoa-muted)",
                maxWidth: "540px",
                marginBottom: "38px",
              }}
            >
              Crafted in micro-batches with rich A2 farm milk, slow-churned at
              -4°C to lock in velvety density. No artificial thickeners—just pure,
              unapologetic indulgence in every spoon.
            </p>

            {/* CTAs with Magnetic Attraction */}
            <div
              ref={ctaRef}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                alignItems: "center",
                marginBottom: "46px",
              }}
            >
              <a
                href="#products"
                className="btn-primary"
                data-magnetic="true"
                style={{ fontSize: "16px", padding: "16px 36px" }}
              >
                <span>Explore Tasting Menu</span>
                <ArrowRight size={18} />
              </a>

              <a
                href="#heritage"
                className="btn-secondary"
                data-magnetic="true"
                style={{ fontSize: "15px", padding: "15px 28px" }}
              >
                <Play size={15} fill="var(--cocoa-rich)" />
                <span>Our Churning Story</span>
              </a>
            </div>

            {/* Flavor Mood Selector */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "12px 18px",
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.75)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(46, 27, 19, 0.08)",
                width: "fit-content",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--cocoa-muted)",
                }}
              >
                Ambient Aura:
              </span>
              <div style={{ display: "flex", gap: "8px" }}>
                {[
                  { id: "raspberry", label: "Velvet Berry", color: "#D82855" },
                  { id: "cocoa", label: "Belgian Cocoa", color: "#4A3328" },
                  { id: "pistachio", label: "Pistachio", color: "#3C7053" },
                  { id: "mango", label: "Alphonso", color: "#D48F37" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveMood(item.id as any)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 12px",
                      borderRadius: "9999px",
                      border: activeMood === item.id ? `2px solid ${item.color}` : "1px solid rgba(46, 27, 19, 0.1)",
                      background: activeMood === item.id ? "#FFFFFF" : "transparent",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: activeMood === item.id ? item.color : "var(--cocoa-muted)",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: item.color,
                      }}
                    />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Counter Stats Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
                marginTop: "38px",
                paddingTop: "32px",
                borderTop: "1px solid rgba(46, 27, 19, 0.08)",
                maxWidth: "520px",
              }}
            >
              <div>
                <div
                  className="serif-heading"
                  style={{ fontSize: "32px", color: "var(--berry-velvet)" }}
                >
                  <span ref={stat1Ref}>0+</span>
                </div>
                <div style={{ fontSize: "13px", color: "var(--cocoa-muted)", fontWeight: 500 }}>
                  Years of Artisanal Craft
                </div>
              </div>
              <div>
                <div
                  className="serif-heading"
                  style={{ fontSize: "32px", color: "var(--gold-honey)" }}
                >
                  <span ref={stat2Ref}>0+</span>
                </div>
                <div style={{ fontSize: "13px", color: "var(--cocoa-muted)", fontWeight: 500 }}>
                  Custom Churned Flavours
                </div>
              </div>
              <div>
                <div
                  className="serif-heading"
                  style={{ fontSize: "32px", color: "var(--cocoa-dark)" }}
                >
                  <span ref={stat3Ref}>0K+</span>
                </div>
                <div style={{ fontSize: "13px", color: "var(--cocoa-muted)", fontWeight: 500 }}>
                  Sweet Memories Created
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: ARCHITECTURAL LUXURY SHOWCASE (Breathtaking Michelin-star food photography in an organic luxury frame) */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              perspective: "1200px",
              width: "100%",
            }}
          >
            {/* The Architectural Luxury Showcase Container */}
            <div
              ref={stageRef}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "540px",
                height: "560px",
                borderRadius: "44px",
                overflow: "hidden",
                border: "2px solid rgba(255, 255, 255, 0.95)",
                boxShadow:
                  "0 35px 80px -15px rgba(74, 51, 40, 0.18), 0 0 0 1px rgba(212, 143, 55, 0.15)",
                background: "#FAF4EB",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Central Full-Bleed Food Photography Canvas with Smooth Crossfade */}
              <div
                ref={visualWrapperRef}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <div
                  className="active-hero-img"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    willChange: "transform, opacity, filter",
                  }}
                >
                  <Image
                    src={activeVisual.image}
                    alt={activeVisual.alt}
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center center",
                    }}
                    priority
                  />
                </div>
              </div>

              {/* Top Luxury Accents Overlay */}
              <div
                style={{
                  position: "absolute",
                  top: "22px",
                  left: "22px",
                  right: "22px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              >
                {/* Left Badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    borderRadius: "999px",
                    background: "rgba(255, 255, 255, 0.88)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(46, 27, 19, 0.08)",
                    boxShadow: "0 6px 18px rgba(46, 27, 19, 0.08)",
                  }}
                >
                  <Sparkles size={13} color="var(--berry-velvet)" />
                  <span
                    className="hero-caption-fade"
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "var(--cocoa-dark)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {activeVisual.badge}
                  </span>
                </div>

                {/* Right Badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    borderRadius: "999px",
                    background: "rgba(255, 248, 230, 0.92)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(212, 143, 55, 0.3)",
                    boxShadow: "0 6px 18px rgba(46, 27, 19, 0.08)",
                  }}
                >
                  <Award size={14} color="var(--gold-honey)" />
                  <span
                    className="hero-caption-fade"
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "var(--gold-honey)",
                    }}
                  >
                    {activeVisual.highlight}
                  </span>
                </div>
              </div>

              {/* Bottom Frosted Glass Caption & Switcher Controls */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "24px 26px",
                  background:
                    "linear-gradient(180deg, rgba(30, 18, 13, 0) 0%, rgba(30, 18, 13, 0.72) 35%, rgba(30, 18, 13, 0.92) 100%)",
                  backdropFilter: "blur(10px)",
                  zIndex: 10,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: "18px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    className="hero-caption-fade"
                    style={{
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      fontWeight: 800,
                      color: "var(--gold-light)",
                      marginBottom: "4px",
                    }}
                  >
                    {activeVisual.tag}
                  </div>
                  <h3
                    className="serif-heading hero-caption-fade"
                    style={{
                      fontSize: "21px",
                      color: "#FFFFFF",
                      lineHeight: 1.25,
                      marginBottom: "4px",
                    }}
                  >
                    {activeVisual.title}
                  </h3>
                  <p
                    className="hero-caption-fade"
                    style={{
                      fontSize: "12.5px",
                      color: "rgba(255, 255, 255, 0.8)",
                      lineHeight: 1.5,
                      maxWidth: "380px",
                    }}
                  >
                    {activeVisual.subtitle}
                  </p>
                </div>

                {/* Minimalist Switch Pills */}
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    background: "rgba(255, 255, 255, 0.18)",
                    backdropFilter: "blur(14px)",
                    padding: "4px 6px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                  }}
                >
                  {heroVisuals.map((vis, idx) => (
                    <button
                      key={vis.id}
                      onClick={() => switchVisual(idx)}
                      aria-label={vis.title}
                      style={{
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "999px",
                        fontSize: "11px",
                        fontWeight: 700,
                        cursor: "pointer",
                        background: activeVisualIndex === idx ? "#FFFFFF" : "transparent",
                        color: activeVisualIndex === idx ? "var(--cocoa-dark)" : "#FFFFFF",
                        transition: "all 0.25s ease",
                      }}
                    >
                      0{idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 991px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }
          .hero-grid p {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-badge-pill {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-grid div[ref="ctaRef"] {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
