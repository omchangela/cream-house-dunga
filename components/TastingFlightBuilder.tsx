"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Check, Plus, ShoppingBag, RotateCcw } from "lucide-react";
import { useCart } from "./CartContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SCOOPS_POOL = [
  { id: "ice-1", name: "Madagascar Vanilla Bean", image: "/images/products/ice-1.png", price: 35 },
  { id: "ice-2", name: "Wild Ruby Strawberry", image: "/images/products/ice-2.png", price: 40 },
  { id: "ice-3", name: "Golden Butterscotch Crunch", image: "/images/products/ice-3.png", price: 35 },
  { id: "ice-4", name: "Black Currant Royale", image: "/images/products/ice-4.png", price: 45 },
  { id: "ice-5", name: "Belgian Dark Cocoa", image: "/images/products/ice-5.png", price: 40 },
  { id: "ice-6", name: "Alphonso Mango Sorbet", image: "/images/products/ice-6.png", price: 45 },
  { id: "ice-7", name: "Roasted Royal Almond", image: "/images/products/ice-7.png", price: 50 },
  { id: "ice-8", name: "Kesar Rajbhog Royale", image: "/images/products/ice-8.png", price: 55 },
  { id: "ice-9", name: "Warm Gulab Jamun Swirl", image: "/images/products/ice-9.png", price: 50 },
  { id: "ice-10", name: "American Dry Fruit Feast", image: "/images/products/ice-10.png", price: 55 },
];

const VESSELS = [
  { id: "bowl", name: "Handmade Butter Waffle Bowl", extra: 20, desc: "Baked fresh with European butter" },
  { id: "cone", name: "Double-Rolled Waffle Cone", extra: 15, desc: "Crisp vanilla waffle cylinder" },
  { id: "coupe", name: "Chilled Crystal Parlour Coupe", extra: 0, desc: "Pure indulgence, zero distraction" },
];

const TOPPINGS = [
  { id: "top-ganache", name: "Warm Belgian Ganache", price: 15 },
  { id: "top-pistachio", name: "Crushed Iranian Pistachio", price: 20 },
  { id: "top-honeycomb", name: "Golden Honeycomb Shards", price: 15 },
  { id: "top-pecan", name: "Toasted Butter Pecans", price: 20 },
  { id: "top-berry", name: "Wild Blackberry Coulis", price: 15 },
];

export default function TastingFlightBuilder() {
  const [selectedScoops, setSelectedScoops] = useState<string[]>(["ice-2", "ice-5", "ice-1"]);
  const [selectedVessel, setSelectedVessel] = useState<string>("bowl");
  const [selectedToppings, setSelectedToppings] = useState<string[]>(["top-ganache", "top-pistachio"]);
  const [displayPrice, setDisplayPrice] = useState(130);

  const priceRef = useRef<HTMLSpanElement>(null);
  const bowlPreviewRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { addToCart } = useCart();

  // Calculate Flight Price
  const scoopsTotal = selectedScoops.reduce((sum, sId) => {
    const s = SCOOPS_POOL.find((x) => x.id === sId);
    return sum + (s ? s.price : 0);
  }, 0);

  const vesselExtra = VESSELS.find((v) => v.id === selectedVessel)?.extra || 0;
  const toppingsTotal = selectedToppings.reduce((sum, tId) => {
    const t = TOPPINGS.find((x) => x.id === tId);
    return sum + (t ? t.price : 0);
  }, 0);

  const targetPrice = scoopsTotal + vesselExtra + toppingsTotal;

  // Animate price roll
  useEffect(() => {
    const obj = { val: displayPrice };
    gsap.to(obj, {
      val: targetPrice,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => {
        setDisplayPrice(Math.round(obj.val));
      },
    });
  }, [targetPrice]);

  // Animate preview scoops whenever selectedScoops change
  useEffect(() => {
    if (!bowlPreviewRef.current) return;
    const scoops = bowlPreviewRef.current.querySelectorAll(".flight-preview-scoop");
    gsap.fromTo(
      scoops,
      { y: -30, scale: 0.7, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(2)" }
    );
  }, [selectedScoops]);

  // ScrollTrigger section reveal
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".builder-header-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleScoop = (id: string, e: React.MouseEvent) => {
    const btn = e.currentTarget as HTMLElement;
    gsap.fromTo(btn, { scale: 0.9 }, { scale: 1, duration: 0.35, ease: "back.out(2)" });

    if (selectedScoops.includes(id)) {
      if (selectedScoops.length > 1) {
        setSelectedScoops(selectedScoops.filter((s) => s !== id));
      }
    } else {
      if (selectedScoops.length < 3) {
        setSelectedScoops([...selectedScoops, id]);
      } else {
        setSelectedScoops([selectedScoops[1], selectedScoops[2], id]);
      }
    }
  };

  const toggleTopping = (id: string, e: React.MouseEvent) => {
    const btn = e.currentTarget as HTMLElement;
    gsap.fromTo(btn, { scale: 0.9 }, { scale: 1, duration: 0.3, ease: "back.out(2)" });

    if (selectedToppings.includes(id)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== id));
    } else {
      setSelectedToppings([...selectedToppings, id]);
    }
  };

  const handleAddFlightToCart = () => {
    const scoopNames = selectedScoops
      .map((sId) => SCOOPS_POOL.find((s) => s.id === sId)?.name)
      .filter(Boolean)
      .join(" + ");

    addToCart({
      id: `flight-${Date.now()}`,
      name: `Custom Artisanal Flight (${scoopNames})`,
      category: "Tasting Flight",
      price: targetPrice,
      image: SCOOPS_POOL.find((s) => s.id === selectedScoops[0])?.image || "/images/products/ice-2.png",
    });
  };

  return (
    <section
      id="builder"
      ref={sectionRef}
      style={{
        padding: "120px 0",
        background: "linear-gradient(180deg, #FAF7F2 0%, #FFFFFF 100%)",
        position: "relative",
      }}
    >
      <div className="container-custom">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 50px" }}>
          <div
            className="builder-header-reveal"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 18px",
              borderRadius: "9999px",
              background: "var(--berry-soft)",
              border: "1px solid rgba(216, 40, 85, 0.15)",
              marginBottom: "16px",
            }}
          >
            <Sparkles size={14} color="var(--berry-velvet)" />
            <span
              className="display-badge"
              style={{ fontSize: "11px", color: "var(--berry-velvet)" }}
            >
              Custom Gelato Atelier
            </span>
          </div>

          <h2
            className="serif-heading builder-header-reveal"
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              lineHeight: 1.15,
              color: "var(--cocoa-dark)",
              marginBottom: "16px",
            }}
          >
            Curate Your Own <span className="italic-accent">Tasting Flight.</span>
          </h2>
          <p
            className="builder-header-reveal"
            style={{
              fontSize: "17px",
              color: "var(--cocoa-muted)",
              lineHeight: 1.7,
            }}
          >
            Choose up to 3 slow-churned gelato scoops, pick a warm freshly pressed
            waffle bowl or coupe, and finish with molten Belgian drizzles.
          </p>
        </div>

        {/* Builder Studio Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "40px",
            alignItems: "start",
          }}
          className="builder-grid"
        >
          {/* Left: Step Configurator */}
          <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
            {/* Step 1: Select 3 Scoops */}
            <div
              className="glass-panel"
              style={{
                padding: "32px",
                borderRadius: "28px",
                background: "#FFFFFF",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "18px",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "11.5px",
                      fontWeight: 700,
                      color: "var(--berry-velvet)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Step 01
                  </span>
                  <h3
                    className="serif-heading"
                    style={{ fontSize: "22px", color: "var(--cocoa-dark)" }}
                  >
                    Select Up to 3 Masterpiece Scoops
                  </h3>
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: "999px",
                    background: "var(--berry-soft)",
                    color: "var(--berry-velvet)",
                  }}
                >
                  {selectedScoops.length} of 3 Selected
                </span>
              </div>

              {/* Scoops Pool Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                  gap: "12px",
                }}
              >
                {SCOOPS_POOL.map((scoop) => {
                  const isSelected = selectedScoops.includes(scoop.id);
                  return (
                    <button
                      key={scoop.id}
                      onClick={(e) => toggleScoop(scoop.id, e)}
                      style={{
                        padding: "12px 10px",
                        borderRadius: "18px",
                        border: isSelected
                          ? "2px solid var(--berry-velvet)"
                          : "1px solid rgba(46, 27, 19, 0.1)",
                        background: isSelected ? "var(--berry-soft)" : "var(--bg-cream-soft)",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        gap: "6px",
                        position: "relative",
                        transition: "all 0.25s ease",
                      }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            position: "absolute",
                            top: "6px",
                            right: "6px",
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            background: "var(--berry-velvet)",
                            color: "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Check size={11} strokeWidth={3} />
                        </div>
                      )}
                      <div
                        style={{
                          position: "relative",
                          width: "56px",
                          height: "56px",
                        }}
                      >
                        <Image
                          src={scoop.image}
                          alt={scoop.name}
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: "11.5px",
                          fontWeight: 700,
                          color: "var(--cocoa-dark)",
                          lineHeight: 1.3,
                        }}
                      >
                        {scoop.name}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "var(--cocoa-muted)",
                          fontWeight: 600,
                        }}
                      >
                        ₹{scoop.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Choose Vessel */}
            <div
              className="glass-panel"
              style={{
                padding: "32px",
                borderRadius: "28px",
                background: "#FFFFFF",
              }}
            >
              <div style={{ marginBottom: "18px" }}>
                <span
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 700,
                    color: "var(--gold-honey)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Step 02
                </span>
                <h3
                  className="serif-heading"
                  style={{ fontSize: "22px", color: "var(--cocoa-dark)" }}
                >
                  Select Vessel Style
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {VESSELS.map((ves) => {
                  const isSelected = selectedVessel === ves.id;
                  return (
                    <button
                      key={ves.id}
                      onClick={() => setSelectedVessel(ves.id)}
                      style={{
                        padding: "14px 18px",
                        borderRadius: "16px",
                        border: isSelected
                          ? "2px solid var(--gold-honey)"
                          : "1px solid rgba(46, 27, 19, 0.1)",
                        background: isSelected ? "var(--gold-light)" : "var(--bg-cream-soft)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        textAlign: "left",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "14.5px",
                            fontWeight: 700,
                            color: "var(--cocoa-dark)",
                          }}
                        >
                          {ves.name}
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--cocoa-muted)" }}>
                          {ves.desc}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: "13.5px",
                          fontWeight: 700,
                          color: "var(--cocoa-rich)",
                        }}
                      >
                        {ves.extra > 0 ? `+₹${ves.extra}` : "Included"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Choose Gourmet Toppings */}
            <div
              className="glass-panel"
              style={{
                padding: "32px",
                borderRadius: "28px",
                background: "#FFFFFF",
              }}
            >
              <div style={{ marginBottom: "18px" }}>
                <span
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 700,
                    color: "var(--pistachio-leaf)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Step 03
                </span>
                <h3
                  className="serif-heading"
                  style={{ fontSize: "22px", color: "var(--cocoa-dark)" }}
                >
                  Add Warm Drizzles & Crunch
                </h3>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {TOPPINGS.map((top) => {
                  const isSelected = selectedToppings.includes(top.id);
                  return (
                    <button
                      key={top.id}
                      onClick={(e) => toggleTopping(top.id, e)}
                      style={{
                        padding: "10px 18px",
                        borderRadius: "9999px",
                        border: isSelected
                          ? "2px solid var(--pistachio-leaf)"
                          : "1px solid rgba(46, 27, 19, 0.1)",
                        background: isSelected ? "var(--pistachio-soft)" : "var(--bg-cream-soft)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: isSelected ? "var(--pistachio-leaf)" : "var(--cocoa-rich)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {isSelected ? <Check size={14} /> : <Plus size={14} />}
                      <span>{top.name}</span>
                      <span style={{ opacity: 0.7 }}>+₹{top.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Live Flight Receipt & Animated Preview */}
          <div
            className="glass-panel"
            style={{
              position: "sticky",
              top: "100px",
              padding: "36px 30px",
              borderRadius: "32px",
              background: "#FFFFFF",
              boxShadow: "0 20px 50px rgba(46, 27, 19, 0.08)",
              border: "2px solid rgba(216, 40, 85, 0.1)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "999px",
                background: "var(--berry-soft)",
                color: "var(--berry-velvet)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              ✦ Live Atelier Preview
            </div>

            <h3
              className="serif-heading"
              style={{
                fontSize: "26px",
                color: "var(--cocoa-dark)",
                lineHeight: 1.2,
                marginBottom: "20px",
              }}
            >
              Your Artisanal Tasting Flight
            </h3>

            {/* Visual Scoops Stacking with GSAP Ref */}
            <div
              ref={bowlPreviewRef}
              style={{
                position: "relative",
                height: "170px",
                background: "radial-gradient(circle, var(--bg-cream-warm) 0%, #FFFFFF 80%)",
                borderRadius: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "20px",
                marginBottom: "24px",
              }}
            >
              {selectedScoops.map((sId, index) => {
                const scoop = SCOOPS_POOL.find((s) => s.id === sId);
                if (!scoop) return null;
                return (
                  <div
                    key={sId}
                    className="flight-preview-scoop"
                    style={{
                      position: "relative",
                      width: "85px",
                      height: "85px",
                      zIndex: index + 1,
                      transform: `translateY(${index % 2 === 1 ? "-10px" : "8px"})`,
                      filter: "drop-shadow(0 10px 14px rgba(46, 27, 19, 0.18))",
                    }}
                  >
                    <Image
                      src={scoop.image}
                      alt={scoop.name}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Summary Breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13.5px",
                  color: "var(--cocoa-muted)",
                }}
              >
                <span>3 Micro-Batch Scoops</span>
                <span style={{ fontWeight: 600, color: "var(--cocoa-dark)" }}>₹{scoopsTotal}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13.5px",
                  color: "var(--cocoa-muted)",
                }}
              >
                <span>Vessel: {VESSELS.find((v) => v.id === selectedVessel)?.name}</span>
                <span style={{ fontWeight: 600, color: "var(--cocoa-dark)" }}>
                  {vesselExtra > 0 ? `+₹${vesselExtra}` : "Free"}
                </span>
              </div>

              {selectedToppings.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "13.5px",
                    color: "var(--cocoa-muted)",
                  }}
                >
                  <span>Toppings ({selectedToppings.length})</span>
                  <span style={{ fontWeight: 600, color: "var(--cocoa-dark)" }}>+₹{toppingsTotal}</span>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  paddingTop: "14px",
                  borderTop: "1px dashed rgba(46, 27, 19, 0.15)",
                }}
              >
                <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--cocoa-dark)" }}>
                  Total Flight Price:
                </span>
                <span
                  ref={priceRef}
                  className="serif-heading"
                  style={{
                    fontSize: "32px",
                    color: "var(--berry-velvet)",
                    fontWeight: 800,
                  }}
                >
                  ₹{displayPrice}
                </span>
              </div>
            </div>

            {/* Add to Box Button with Magnetic Attraction */}
            <button
              onClick={handleAddFlightToCart}
              className="btn-primary"
              data-magnetic="true"
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "15px",
                boxShadow: "0 12px 28px rgba(216, 40, 85, 0.35)",
              }}
            >
              <ShoppingBag size={18} />
              <span>Add Custom Flight To Cart</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 991px) {
          .builder-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
