"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScrollAndCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // 1. Lenis Smooth Inertia Scroll
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 2. Custom Cursor Movement & Magnetic Pull
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.08,
        ease: "none",
      });

      // Magnetic Attraction on magnetic elements
      const magneticTarget = (e.target as HTMLElement)?.closest(".btn-primary, .btn-secondary, [data-magnetic]") as HTMLElement | null;
      if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.28;
        const deltaY = (e.clientY - centerY) * 0.28;

        gsap.to(magneticTarget, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // Reset magnetic elements on mouseleave
    const handleMouseLeaveTarget = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(".btn-primary, .btn-secondary, [data-magnetic]") as HTMLElement | null;
      if (target) {
        gsap.to(target, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
      }
    };
    document.addEventListener("mouseout", handleMouseLeaveTarget);

    // Smooth follower ticker
    const followerTicker = () => {
      followerX += (mouseX - followerX) * 0.16;
      followerY += (mouseY - followerY) * 0.16;
      follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
    };
    gsap.ticker.add(followerTicker);

    // Hover states for links, scoops, cards
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement);
      const button = target.closest("button, a, .clickable");
      const card = target.closest(".product-card-wrap, .card-3d");
      const scoop = target.closest("#flavours img");

      if (button) {
        gsap.to(cursor, { scale: 0.3, opacity: 0.4, duration: 0.25 });
        gsap.to(follower, {
          scale: 1.8,
          borderColor: "rgba(216, 40, 85, 0.8)",
          backgroundColor: "rgba(216, 40, 85, 0.08)",
          duration: 0.3,
        });
        setCursorText("");
      } else if (card) {
        gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.2 });
        gsap.to(follower, {
          scale: 2.2,
          borderColor: "rgba(212, 143, 55, 0.8)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          duration: 0.3,
        });
        setCursorText("TASTE");
      } else if (scoop) {
        gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.2 });
        gsap.to(follower, {
          scale: 2.4,
          borderColor: "rgba(216, 40, 85, 0.9)",
          backgroundColor: "rgba(216, 40, 85, 0.15)",
          duration: 0.3,
        });
        setCursorText("SCOOP");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement);
      if (target.closest("button, a, .clickable, .product-card-wrap, .card-3d, #flavours img")) {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.to(follower, {
          scale: 1,
          borderColor: "rgba(216, 40, 85, 0.4)",
          backgroundColor: "transparent",
          duration: 0.3,
        });
        setCursorText("");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      lenis.destroy();
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseout", handleMouseLeaveTarget);
      gsap.ticker.remove(tickerCallback);
      gsap.ticker.remove(followerTicker);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{ left: 0, top: 0, pointerEvents: "none" }}
      />
      <div
        ref={followerRef}
        className="custom-cursor-follower"
        style={{
          left: 0,
          top: 0,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "9px",
          fontWeight: 800,
          letterSpacing: "0.1em",
          color: "var(--berry-velvet)",
        }}
      >
        {cursorText}
      </div>
    </>
  );
}
