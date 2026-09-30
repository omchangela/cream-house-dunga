"use client";
import { useState, useEffect } from "react";

export default function Hero() {
  const [stats, setStats] = useState({ years: 0, flavours: 0, customers: 0 });

  useEffect(() => {
    const duration = 1600;
    const steps = 40;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      // easeOutQuad
      const factor = 1 - (1 - progress) * (1 - progress);
      setStats({
        years: Math.round(30 * factor),
        flavours: Math.round(100 * factor),
        customers: Math.round(500 * factor),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16"
      style={{
        background: "linear-gradient(150deg, #FFF9F0 0%, #FAF0E0 50%, #F5E5D0 100%)",
      }}
    >
      {/* Decorative Warm Ambient Glows */}
      <div
        className="animate-blob absolute w-[650px] h-[650px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(212,134,58,0.2) 0%, transparent 70%)",
          top: "-120px",
          right: "-100px",
          filter: "blur(80px)",
        }}
      />
      <div
        className="animate-blob2 absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(192,76,42,0.16) 0%, transparent 70%)",
          bottom: "-80px",
          left: "-100px",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full relative z-10">
        {/* Left Column: Text & Content (lg:col-span-6) */}
        <div className="lg:col-span-6 flex flex-col items-start pt-2">
          {/* Badge */}
          <div
            id="hero-badge"
            className="inline-flex items-center gap-2.5 mb-6 px-5 py-2 rounded-full text-sm font-black shadow-sm"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              border: "1.5px solid rgba(192, 76, 42, 0.35)",
              color: "#8B2E15",
              boxShadow: "0 4px 16px rgba(192, 76, 42, 0.08)",
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: "#C04C2A" }} />
            🍦 Handcrafted Luxury Since 1995
          </div>

          {/* Headline */}
          <h1
            className="font-black leading-[1.06] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.3rem, 5.2vw, 4.8rem)", color: "#2A0E00" }}
          >
            <span className="block">Crafting</span>
            <span
              className="block"
              style={{
                fontStyle: "italic",
                fontFamily: "'Playfair Display', serif",
                background: "linear-gradient(135deg, #C04C2A 0%, #D4863A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "#C04C2A",
              }}
            >
              Happiness
            </span>
            <span className="block">One Scoop at a Time</span>
          </h1>

          {/* Description */}
          <p
            id="hero-desc"
            className="text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mb-8 sm:mb-9 font-bold"
            style={{ color: "#4A2000" }}
          >
            Enjoy handcrafted premium ice creams made with fresh farm milk, 100% natural ingredients,
            and unforgettable artisan flavours. Every single scoop is prepared with pure devotion.
          </p>

          {/* Action Buttons */}
          <div id="hero-btns" className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 sm:mb-12">
            <button
              onClick={() => scrollTo("products")}
              className="inline-flex items-center gap-2.5 sm:gap-3 text-white px-7 sm:px-9 py-3.5 sm:py-4 rounded-full font-black text-base sm:text-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #C04C2A 0%, #D4863A 100%)",
                boxShadow: "0 12px 32px rgba(192, 76, 42, 0.45)",
              }}
            >
              <span>Explore Menu</span>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={() => scrollTo("about")}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-black text-base sm:text-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{
                border: "2px solid rgba(42, 14, 0, 0.22)",
                color: "#2A0E00",
                background: "#FFFFFF",
                boxShadow: "0 4px 16px rgba(42, 14, 0, 0.05)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#C04C2A">
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
              <span>Our Story</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div
            id="hero-stats"
            className="grid grid-cols-3 sm:flex sm:items-center gap-2 sm:gap-10 pt-4"
          >
            {/* Stat 1: 30+ Years */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3.5 text-center sm:text-left">
              <div
                className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "1.5px solid rgba(192, 76, 42, 0.25)",
                  boxShadow: "0 4px 12px rgba(42, 14, 0, 0.04)",
                }}
              >
                <svg width="20" height="20" fill="none" stroke="#C04C2A" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black leading-none" style={{ color: "#C04C2A" }}>
                  {stats.years}+
                </span>
                <span className="text-[10px] sm:text-xs font-black mt-0.5 sm:mt-1 tracking-wider uppercase" style={{ color: "#5C2E08" }}>
                  Years Heritage
                </span>
              </div>
            </div>

            {/* Stat 2: 100+ Flavours */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3.5 text-center sm:text-left">
              <div
                className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 text-lg sm:text-xl"
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "1.5px solid rgba(192, 76, 42, 0.25)",
                  boxShadow: "0 4px 12px rgba(42, 14, 0, 0.04)",
                }}
              >
                🍦
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black leading-none" style={{ color: "#C04C2A" }}>
                  {stats.flavours}+
                </span>
                <span className="text-[10px] sm:text-xs font-black mt-0.5 sm:mt-1 tracking-wider uppercase" style={{ color: "#5C2E08" }}>
                  Flavours
                </span>
              </div>
            </div>

            {/* Stat 3: 500K Customers */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3.5 text-center sm:text-left">
              <div
                className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "1.5px solid rgba(192, 76, 42, 0.25)",
                  boxShadow: "0 4px 12px rgba(42, 14, 0, 0.04)",
                }}
              >
                <svg width="20" height="20" fill="none" stroke="#C04C2A" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black leading-none" style={{ color: "#C04C2A" }}>
                  {stats.customers}K
                </span>
                <span className="text-[10px] sm:text-xs font-black mt-0.5 sm:mt-1 tracking-wider uppercase" style={{ color: "#5C2E08" }}>
                  Happy Customers
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Visual Showcase matching Demo Image 2 (lg:col-span-6) */}
        <div className="lg:col-span-6 flex justify-center items-center relative">
          <div
            className="relative w-full max-w-[580px] rounded-3xl overflow-hidden shadow-[0_32px_90px_rgba(42,14,0,0.18)] transition-transform duration-500 hover:scale-[1.01]"
            style={{
              border: "3px solid rgba(255, 255, 255, 0.9)",
              background: "#F4E8D4",
            }}
          >
            <img
              id="hero-img"
              src="/images/hero_visual_clean.jpg"
              alt="Cream House Artisan Ice Cream 3D Collection"
              className="w-full h-auto object-cover block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
