"use client";

const REVIEWS = [
  {
    initial: "P",
    name: "Priya Sharma",
    city: "Mumbai",
    text: "Cream House has been my family's go-to since childhood. The authentic Kulfi is absolutely divine — rich, aromatic, and unmatched by any other brand in the country!",
    color: "#C04C2A",
  },
  {
    initial: "R",
    name: "Rahul Mehta",
    city: "Delhi",
    text: "The Choco Crispy Bar is completely next level! Velvety creamy inside, perfectly crunchy Belgian chocolate outside. My kids request it after every single dinner!",
    featured: true,
    color: "#A03020",
  },
  {
    initial: "S",
    name: "Sneha Patel",
    city: "Ahmedabad",
    text: "Unequivocally the highest quality ice cream I have ever tasted. You can truly experience the fresh dairy purity in every bite. The Oreo Stick is an absolute masterpiece!",
    color: "#007A64",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-28 relative overflow-hidden" style={{ background: "#FFF0D5" }}>
      <div className="absolute inset-0 stripe-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="chip mb-5">💬 Customer Praise</div>
          <h2 className="section-title">
            Loved by{" "}
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                background: "linear-gradient(135deg, #C04C2A, #D4863A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "#C04C2A",
              }}
            >
              Generations
            </span>{" "}
            of Ice Cream Lovers
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {REVIEWS.map(r => (
            <div
              key={r.name}
              className={`review-card relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                r.featured ? "lg:-translate-y-2" : ""
              }`}
              style={
                r.featured
                  ? {
                      background: "linear-gradient(145deg, #FFFFFF, #FFF7EA)",
                      border: "2px solid rgba(192,76,42,0.4)",
                      boxShadow: "0 16px 50px rgba(42,14,0,0.12)",
                    }
                  : {
                      background: "#FFFFFF",
                      border: "1.5px solid rgba(192,76,42,0.2)",
                      boxShadow: "0 8px 30px rgba(42,14,0,0.06)",
                    }
              }
            >
              {/* Star Rating Header */}
              <div className="flex items-center gap-1.5 mb-4 text-amber-500 text-lg">
                {"★★★★★"}
              </div>

              <p className="leading-relaxed mb-6 text-base font-bold" style={{ color: "#3D1800" }}>
                &ldquo;{r.text}&rdquo;
              </p>

              <div className="flex items-center gap-3.5 pt-4" style={{ borderTop: "1px solid rgba(192,76,42,0.15)" }}>
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-black text-white text-lg flex-shrink-0 shadow-sm"
                  style={{ background: r.color }}
                >
                  {r.initial}
                </div>
                <div>
                  <div className="font-black text-base" style={{ color: "#2A0E00" }}>
                    {r.name}
                  </div>
                  <div className="text-xs font-bold" style={{ color: "#7A3E10" }}>
                    Verified Foodie • {r.city}
                  </div>
                </div>
              </div>

              {r.featured && (
                <div
                  className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-md"
                  style={{ background: "linear-gradient(135deg, #C04C2A, #D4863A)" }}
                >
                  Top Review
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
