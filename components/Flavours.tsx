"use client";

const ORBS = [
  { emoji: "🍓", name: "Strawberry", bg: "#FFF0EE", border: "#E8503A", text: "#8B1A0A" },
  { emoji: "🥭", name: "Mango", bg: "#FFF8E8", border: "#D4863A", text: "#7A3E00" },
  { emoji: "🍌", name: "Banana", bg: "#FFFDE8", border: "#C8A020", text: "#5C4A00" },
  { emoji: "🍈", name: "Pista", bg: "#EDFFF8", border: "#007A64", text: "#003D30" },
  { emoji: "🍇", name: "Blueberry", bg: "#F5EEFF", border: "#7B2AC9", text: "#3D0A7A" },
  { emoji: "🍫", name: "Chocolate", bg: "#FFF5EE", border: "#8B4A00", text: "#4A2000" },
  { emoji: "🍪", name: "Oreo", bg: "#F5F5F5", border: "#3D2800", text: "#1A0E00" },
  { emoji: "🍒", name: "Cherry", bg: "#FFF0F0", border: "#C04C2A", text: "#6B1A0A" },
];

export default function Flavours() {
  return (
    <section
      id="flavours"
      className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFF8EE 0%, #FFE8C0 100%)" }}
    >
      <div className="absolute inset-0 dot-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="chip mb-5">🌈 Flavour Universe</div>
          <h2 className="section-title mb-4">
            Explore 100+{" "}
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                background: "linear-gradient(135deg, #D4863A, #C04C2A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "#C04C2A",
              }}
            >
              Magical
            </span>{" "}
            Flavours
          </h2>
          <p className="text-lg font-bold" style={{ color: "#4A2000" }}>
            From classic velvety vanilla to exotic tropical fruit infusions — there&apos;s a dream scoop for every palate.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {ORBS.map(o => (
            <div
              key={o.name}
              className="flavour-orb flex flex-col items-center gap-4 py-10 px-4 rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-2.5"
              style={{
                background: o.bg,
                border: `2px solid ${o.border}50`,
                boxShadow: "0 6px 20px rgba(42,14,0,0.06)",
                opacity: 1,
                visibility: "visible",
              }}
            >
              <span className="text-5xl block drop-shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:scale-115">
                {o.emoji}
              </span>
              <span className="text-base font-black tracking-wide" style={{ color: o.text }}>
                {o.name}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <button
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-black text-sm transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            style={{
              background: "#FFFFFF",
              border: "2px solid rgba(192,76,42,0.35)",
              color: "#A03020",
              boxShadow: "0 6px 20px rgba(42,14,0,0.08)",
            }}
          >
            <span>View All 100+ Flavours</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
