"use client";

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="#D4863A" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M8 2h8v4H8z" />
        <path d="M6 6h12v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6z" />
        <line x1="10" y1="11" x2="14" y2="11" />
      </svg>
    ),
    title: "100% Fresh Milk",
    desc: "Sourced daily from local dairy farms",
    bg: "rgba(212, 134, 58, 0.12)",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="#2E7D32" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M11 20A7 7 0 0 1 4 13C4 7 11 2 20 2c0 9-5 16-11 18Z" />
        <path d="M7 17l6.5-6.5" />
      </svg>
    ),
    title: "Natural Ingredients",
    desc: "No artificial colours or preservatives",
    bg: "rgba(46, 125, 50, 0.12)",
  },
  {
    icon: (
      <svg width="24" height="24" fill="#E53935" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    title: "Made With Love",
    desc: "Every single scoop crafted with care",
    bg: "rgba(229, 57, 53, 0.12)",
  },
  {
    icon: (
      <svg width="24" height="24" fill="#F59E0B" viewBox="0 0 24 24">
        <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1c1.94-.38 3.51-1.78 4.61-3.96C20.08 11.63 22 9.55 22 7V5c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
      </svg>
    ),
    title: "Award Winning",
    desc: "Voted Best Artisanal Ice Cream 2024",
    bg: "rgba(245, 158, 11, 0.12)",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFF9F0 0%, #FFF3E2 100%)" }}
    >
      {/* Decorative Blur Glows */}
      <div
        className="absolute bottom-0 right-[-100px] w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,134,58,0.12) 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <div
        className="absolute top-0 left-[-80px] w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(192,76,42,0.1) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: 3D Composition Image from Demo Image 1 (lg:col-span-6) */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div
              className="relative w-full max-w-[540px] rounded-3xl overflow-hidden shadow-[0_32px_90px_rgba(42,14,0,0.16)] transition-transform duration-500 hover:scale-[1.01]"
              style={{
                border: "3px solid rgba(255, 255, 255, 0.95)",
                background: "#F5E9D6",
              }}
            >
              <img
                src="/images/about_visual_3d.jpg"
                alt="Cream House Cones, Tubs, and 30+ Years Heritage Showcase"
                className="w-full h-auto object-cover block"
              />
            </div>
          </div>

          {/* Right Column: Story Text & 4 Feature Cards (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Tag with Line */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm"
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  border: "1.5px solid rgba(192, 76, 42, 0.3)",
                  color: "#8B2E15",
                }}
              >
                ✨ OUR STORY
              </div>
              <div className="w-14 h-[1.5px]" style={{ background: "rgba(192, 76, 42, 0.3)" }} />
            </div>

            {/* Heading */}
            <h2
              className="font-black leading-[1.12] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.1rem, 3.5vw, 3.3rem)", color: "#2A0E00" }}
            >
              <span className="block">
                A Legacy of{" "}
                <span
                  className="inline-block"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    background: "linear-gradient(135deg, #C04C2A, #D4863A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "#C04C2A",
                  }}
                >
                  Passion &amp;
                </span>
              </span>
              <span className="block">Pure Cream</span>
            </h2>

            {/* Paragraph 1 */}
            <p className="leading-relaxed text-base md:text-lg font-bold mb-4" style={{ color: "#4A2000" }}>
              Since 1995, Cream House has crafted India&apos;s most cherished premium ice creams. We source
              only pure whole milk from local family dairy farms and combine it with hand-selected natural ingredients.
            </p>

            {/* Paragraph 2 */}
            <p className="leading-relaxed text-base md:text-lg font-bold mb-8" style={{ color: "#5C2E08" }}>
              Our master confectioners preserve time-honored artisanal slow-churning techniques, guaranteeing
              every scoop delivers a decadent, velvety texture and unforgettable rich flavour.
            </p>

            {/* 4 Feature Cards in a 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="flex items-start gap-4 p-4.5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "#FFFFFF",
                    border: "1.5px solid rgba(192, 76, 42, 0.18)",
                    boxShadow: "0 6px 20px rgba(42, 14, 0, 0.05)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: f.bg }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-black mb-1" style={{ color: "#2A0E00" }}>
                      {f.title}
                    </h4>
                    <p className="text-xs font-bold leading-relaxed" style={{ color: "#6B3010" }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
