"use client";

export default function CTA() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #2A0E00 0%, #4A2000 60%, #1A0800 100%)" }}
    >
      {/* Decorative Warm Ambient Glows */}
      <div
        className="absolute top-[-150px] right-[-100px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,134,58,0.25) 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div
        className="absolute bottom-[-100px] left-[-50px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(192,76,42,0.2) 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10 text-center" id="cta-content">
        <div className="text-8xl mb-6 animate-float-emoji inline-block">🍦</div>

        <div
          className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full text-sm font-black shadow-md"
          style={{
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.25)",
            color: "#FFE8C0",
          }}
        >
          <span className="w-2.5 h-2.5 rounded-full animate-pulse-dot" style={{ background: "#D4863A" }} />
          Limited Time Celebration Offer
        </div>

        <h2
          className="font-black tracking-tight leading-tight mb-6 text-white"
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}
        >
          Get{" "}
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              background: "linear-gradient(135deg, #FFB347, #FF7043)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "#FFB347",
            }}
          >
            20% Off
          </span>{" "}
          Your First Order!
        </h2>

        <p className="text-xl leading-relaxed mb-10 font-bold" style={{ color: "rgba(255,240,215,0.9)" }}>
          Use promotional code <strong className="text-amber-400 underline decoration-amber-500">CREAMHOUSE20</strong> at
          checkout. Fresh artisan ice creams delivered chilled straight to your home.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <button
            onClick={() => scrollTo("products")}
            className="text-white px-10 py-5 rounded-full text-xl font-black transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #C04C2A, #D4863A)",
              boxShadow: "0 12px 40px rgba(192,76,42,0.6)",
            }}
          >
            🛒 Order Now
          </button>
          <a
            href="tel:+911234567890"
            className="px-9 py-5 rounded-full text-xl font-bold transition-all duration-300 hover:-translate-y-1 cursor-pointer flex items-center gap-2"
            style={{
              border: "2px solid rgba(255,255,255,0.3)",
              color: "#FFFFFF",
              background: "rgba(255,255,255,0.08)",
            }}
          >
            📞 Call Direct
          </a>
        </div>
      </div>
    </section>
  );
}
