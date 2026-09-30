"use client";
import { useState } from "react";

const BASE = "https://cream-house-lime.vercel.app";
const PRODUCTS = [
  { id: 1, name: "Taco", price: 40, old: 50, img: "taco.png", badge: "Best Seller", badgeColor: "#C04C2A", rating: 4.9, reviews: 120, cat: "cone" },
  { id: 2, name: "Gone Stick", price: 35, old: 45, img: "gone.png", badge: "Popular", badgeColor: "#7B2AC9", rating: 4.8, reviews: 98, cat: "stick" },
  { id: 3, name: "Kulfi", price: 30, old: 40, img: "kulfi.png", badge: "Traditional", badgeColor: "#007A64", rating: 4.9, reviews: 145, cat: "kulfi" },
  { id: 4, name: "White Choco Bar", price: 35, old: 45, img: "whit chocobar.png", badge: "Premium", badgeColor: "#C04C2A", rating: 4.8, reviews: 87, cat: "bar" },
  { id: 5, name: "Oreo Stick", price: 40, old: 50, img: "oreo.png", badge: "New", badgeColor: "#1A5FAF", rating: 5.0, reviews: 203, cat: "stick" },
  { id: 6, name: "Choco Bar", price: 35, old: 45, img: "chocobar-1.png", badge: "Crunchy", badgeColor: "#8B4A00", rating: 4.8, reviews: 156, cat: "bar" },
  { id: 7, name: "Choco Crispy Bar", price: 35, old: 45, img: "chocobar-2.png", badge: "Crispy", badgeColor: "#1A5FAF", rating: 4.9, reviews: 178, cat: "bar" },
  { id: 8, name: "Chocolate Nuts Bar", price: 40, old: 50, img: "chocobar-3.png", badge: "Premium", badgeColor: "#C04C2A", rating: 5.0, reviews: 231, cat: "bar" },
];
const TABS = ["All", "Sticks", "Bars", "Kulfi", "Cones"];
const FILTER_MAP: Record<string, string> = { All: "all", Sticks: "stick", Bars: "bar", Kulfi: "kulfi", Cones: "cone" };

export default function Products({ onAddCart }: { onAddCart: (name: string, price: number) => void }) {
  const [active, setActive] = useState("All");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [added, setAdded] = useState<number[]>([]);

  const filtered = PRODUCTS.filter(p => FILTER_MAP[active] === "all" || p.cat === FILTER_MAP[active]);

  const handleAddCart = (p: typeof PRODUCTS[0]) => {
    onAddCart(p.name, p.price);
    setAdded(prev => [...prev, p.id]);
    setTimeout(() => setAdded(prev => prev.filter(id => id !== p.id)), 2000);
  };

  const toggleWishlist = (id: number) =>
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  return (
    <section id="products" className="py-28 relative" style={{ background: "#FFF0D5" }}>
      <div className="absolute top-0 left-0 w-full h-full dot-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="chip mb-5">🍦 Our Products</div>
          <h2 className="section-title mb-4">
            Premium <span className="gradient-text" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>Ice Cream</span> Collection
          </h2>
          <p className="text-lg font-bold leading-relaxed" style={{ color: "#4A2000" }}>
            Delicious range of ice creams, kulfis, cones, tacos and chocolate bars made with the finest ingredients.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-3 flex-wrap mb-12">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-7 py-3 rounded-full text-sm font-extrabold border transition-all duration-300 cursor-pointer ${
                active === tab ? "text-white border-transparent -translate-y-0.5" : "border-[rgba(192,76,42,0.3)] hover:border-[rgba(192,76,42,0.6)]"
              }`}
              style={
                active === tab
                  ? { background: "linear-gradient(135deg, #C04C2A, #D4863A)", boxShadow: "0 8px 24px rgba(192,76,42,0.4)", color: "#fff" }
                  : { background: "#FFFFFF", color: "#2A0E00" }
              }
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(p => (
            <div
              key={p.id}
              className="product-card card-float group relative overflow-hidden cursor-pointer"
              style={{ opacity: 1, visibility: "visible" }}
            >
              {/* Badge */}
              <span
                className="absolute top-4 left-4 z-10 text-white text-xs font-black px-3.5 py-1.5 rounded-full tracking-wide shadow-md"
                style={{ background: p.badgeColor }}
              >
                {p.badge}
              </span>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(p.id)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer"
                style={{
                  background: wishlist.includes(p.id) ? "rgba(192,76,42,0.15)" : "rgba(255,255,255,0.95)",
                  border: `1.5px solid ${wishlist.includes(p.id) ? "rgba(192,76,42,0.6)" : "rgba(192,76,42,0.25)"}`,
                  color: wishlist.includes(p.id) ? "#C04C2A" : "#5C2E08",
                }}
              >
                <svg width="16" height="16" fill={wishlist.includes(p.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
              </button>

              {/* Image area */}
              <div
                className="relative flex items-center justify-center py-8 px-4 overflow-hidden min-h-[210px]"
                style={{ background: "linear-gradient(180deg, #FFFCF7 0%, #FFE8C0 100%)" }}
              >
                <img
                  src={`${BASE}/Images/${encodeURIComponent(p.img)}`}
                  alt={p.name}
                  className="h-44 w-auto object-contain relative z-10 drop-shadow-[0_16px_24px_rgba(42,14,0,0.25)] group-hover:scale-110 group-hover:rotate-2 group-hover:-translate-y-2 transition-transform duration-500"
                />
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-6 opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full"
                  style={{ background: "#C04C2A", filter: "blur(14px)" }}
                />
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col gap-3 bg-white">
                <div className="flex items-center gap-2">
                  <span className="text-sm" style={{ color: "#D4863A" }}>{"★".repeat(Math.floor(p.rating))}</span>
                  <span className="font-black text-sm" style={{ color: "#2A0E00" }}>{p.rating}</span>
                  <span className="text-xs font-bold" style={{ color: "#5C2E08" }}>({p.reviews})</span>
                </div>

                <h3
                  className="text-xl font-black leading-tight transition-colors duration-300 group-hover:text-[#C04C2A]"
                  style={{ color: "#2A0E00" }}
                >
                  {p.name}
                </h3>

                <p className="text-xs leading-relaxed font-bold" style={{ color: "#5C2E08" }}>
                  Fresh milk, premium ingredients and rich creamy texture that melts in every bite.
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <span
                    className="text-2xl font-black"
                    style={{ color: "#C04C2A" }}
                  >
                    ₹{p.price}
                  </span>
                  <span className="text-sm line-through font-bold" style={{ color: "#8C5A30" }}>
                    ₹{p.old}
                  </span>
                  <span
                    className="text-xs font-black ml-auto px-2.5 py-1 rounded-full"
                    style={{ color: "#006638", background: "rgba(0,168,120,0.15)" }}
                  >
                    Save ₹{p.old - p.price}
                  </span>
                </div>

                <button
                  onClick={() => handleAddCart(p)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-black transition-all duration-300 cursor-pointer"
                  style={
                    added.includes(p.id)
                      ? { background: "linear-gradient(135deg, #007A64, #00A878)", color: "#fff", boxShadow: "0 8px 24px rgba(0,122,100,0.4)" }
                      : { background: "rgba(192,76,42,0.1)", color: "#A03020", border: "1.5px solid rgba(192,76,42,0.35)" }
                  }
                >
                  {added.includes(p.id) ? (
                    <>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Added!
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <circle cx="8" cy="21" r="1" />
                        <circle cx="19" cy="21" r="1" />
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
