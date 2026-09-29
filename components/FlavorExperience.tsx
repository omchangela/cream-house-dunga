"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Plus, Award, Check } from "lucide-react";
import { useCart } from "./CartContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FlavorItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  price: number;
  bgGlow: string;
  accentColor: string;
  metrics: {
    creaminess: number;
    sweetness: number;
    intensity: number;
  };
  notes: string[];
}

const flavoursData: FlavorItem[] = [
  {
    id: "flav-1",
    name: "Madagascar Vanilla Bean",
    tagline: "Pure Bourbon Orchid Pods • Velvet Heavy Cream",
    description:
      "Crafted with hand-split organic Madagascar bourbon vanilla beans infused into slow-reduced whole cream. Delicate, floral, and deeply comforting.",
    image: "/images/products/ice-1.png",
    price: 35,
    bgGlow: "rgba(245, 230, 200, 0.45)",
    accentColor: "#C98E3A",
    metrics: { creaminess: 98, sweetness: 70, intensity: 85 },
    notes: ["Bourbon Pods", "Heavy Malai", "Pure Honey"],
  },
  {
    id: "flav-2",
    name: "Wild Ruby Strawberry",
    tagline: "Sun-Ripened Hill Berries • Swirled Mascarpone",
    description:
      "Locally harvested hill strawberries gently simmered in small copper kettles and folded into cold-aged cream for a vibrant berry finish.",
    image: "/images/products/ice-2.png",
    price: 40,
    bgGlow: "rgba(240, 60, 100, 0.35)",
    accentColor: "#D82855",
    metrics: { creaminess: 90, sweetness: 82, intensity: 88 },
    notes: ["Fresh Strawberry Pulp", "Lemon Zest", "Mascarpone"],
  },
  {
    id: "flav-3",
    name: "Golden Butterscotch Crunch",
    tagline: "Caramelized Brown Sugar • Hand-Pounded Praline",
    description:
      "Golden buttery toffee brittle ground into shards and layered through salted caramel cream. Delivers a crackling contrast in every bite.",
    image: "/images/products/ice-3.png",
    price: 35,
    bgGlow: "rgba(225, 155, 50, 0.4)",
    accentColor: "#D48820",
    metrics: { creaminess: 94, sweetness: 88, intensity: 90 },
    notes: ["Butter Toffee", "Roasted Cashew", "Sea Salt"],
  },
  {
    id: "flav-4",
    name: "Black Currant Royale",
    tagline: "Alpine Wild Currants • Velvety Tart Finish",
    description:
      "Intensely tart alpine black currants blended into rich milk fat, producing a royal violet indulgence with tangy brightness.",
    image: "/images/products/ice-4.png",
    price: 45,
    bgGlow: "rgba(120, 40, 140, 0.35)",
    accentColor: "#862899",
    metrics: { creaminess: 88, sweetness: 75, intensity: 95 },
    notes: ["Wild Currants", "Elderberry Note", "Velvet Curd"],
  },
  {
    id: "flav-5",
    name: "Belgian Dark Cocoa",
    tagline: "70% Callebaut Noir • Espresso Undertone",
    description:
      "Direct trade Belgian dark chocolate melted into cultured sweet cream, accented with a whisper of roasted espresso for depth.",
    image: "/images/products/ice-5.png",
    price: 40,
    bgGlow: "rgba(60, 35, 25, 0.45)",
    accentColor: "#422417",
    metrics: { creaminess: 96, sweetness: 65, intensity: 98 },
    notes: ["70% Belgian Noir", "Dark Ganache", "Smoked Salt"],
  },
  {
    id: "flav-6",
    name: "Alphonso Mango Sorbet",
    tagline: "Ratnagiri King Mangoes • Pure Fruit Pulp",
    description:
      "Pure sunshine in a scoop. Hand-picked Ratnagiri Alphonso mangoes churned at peak ripeness with a hint of lime blossom.",
    image: "/images/products/ice-6.png",
    price: 45,
    bgGlow: "rgba(245, 170, 30, 0.4)",
    accentColor: "#E09115",
    metrics: { creaminess: 85, sweetness: 92, intensity: 96 },
    notes: ["Ratnagiri Alphonso", "Lime Blossom", "Saffron Drop"],
  },
  {
    id: "flav-7",
    name: "Roasted Royal Almond",
    tagline: "Slow-Toasted Mamra Almonds • Cardamom Cream",
    description:
      "Wood-fire toasted whole Mamra almonds crushed and folded into lightly sweetened cardamom cream. Nutty, crunchy, and aristocratic.",
    image: "/images/products/ice-7.png",
    price: 50,
    bgGlow: "rgba(200, 150, 100, 0.35)",
    accentColor: "#9E6538",
    metrics: { creaminess: 92, sweetness: 70, intensity: 88 },
    notes: ["Mamra Almonds", "Green Cardamom", "Ghee Toast"],
  },
  {
    id: "flav-8",
    name: "Kesar Rajbhog Royale",
    tagline: "Kashmiri Mongra Saffron • Pistachio Chenna",
    description:
      "A royal celebratory heritage scoop steeped with Kashmiri saffron strands, soft cottage chenna bits, and toasted slivered pistachios.",
    image: "/images/products/ice-8.png",
    price: 55,
    bgGlow: "rgba(245, 185, 40, 0.4)",
    accentColor: "#D68D12",
    metrics: { creaminess: 97, sweetness: 85, intensity: 94 },
    notes: ["Mongra Saffron", "Iranian Pistachio", "Sweet Chenna"],
  },
  {
    id: "flav-9",
    name: "Warm Gulab Jamun Swirl",
    tagline: "Khoya Dumpling Core • Rosewater Cardamom Ribbons",
    description:
      "Freshly prepared miniature khoya gulab jamuns folded directly into cold cardamom cream with a sticky saffron rosewater swirl.",
    image: "/images/products/ice-9.png",
    price: 50,
    bgGlow: "rgba(180, 70, 40, 0.35)",
    accentColor: "#A63D1F",
    metrics: { creaminess: 95, sweetness: 90, intensity: 92 },
    notes: ["Khoya Dumplings", "Rose Petal Glaze", "Cardamom"],
  },
  {
    id: "flav-10",
    name: "American Dry Fruit Feast",
    tagline: "California Walnuts, Figs, Raisins & Roasted Pecans",
    description:
      "A lavish medley of honey-soaked black raisins, dried Turkish figs, California walnuts, and roasted pecans in golden milk cream.",
    image: "/images/products/ice-10.png",
    price: 55,
    bgGlow: "rgba(160, 100, 70, 0.35)",
    accentColor: "#7D4A32",
    metrics: { creaminess: 93, sweetness: 82, intensity: 95 },
    notes: ["Turkish Figs", "Black Currants", "Pecan Praline"],
  },
];

export default function FlavorExperience() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scoopRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const currentFlavor = flavoursData[selectedIndex];
  const { addToCart } = useCart();

  // ScrollTrigger section entrance
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".flavour-header-reveal", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 45,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(".flavour-card-main", {
        scrollTrigger: {
          trigger: ".flavour-card-main",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1.1,
        ease: "power4.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Scoop Squash & Stretch physics + Liquid Ripple trigger on flavor change
  useEffect(() => {
    if (!scoopRef.current) return;

    const tl = gsap.timeline();

    // Pulse ripple behind scoop
    if (rippleRef.current) {
      gsap.fromTo(
        rippleRef.current,
        { scale: 0.3, opacity: 0.8 },
        { scale: 1.6, opacity: 0, duration: 0.85, ease: "power2.out" }
      );
    }

    // Squash & Stretch Scoop Entrance
    tl.fromTo(
      scoopRef.current,
      {
        y: -40,
        scaleX: 0.7,
        scaleY: 1.3,
        rotation: -20,
        opacity: 0.2,
      },
      {
        y: 10,
        scaleX: 1.25,
        scaleY: 0.78,
        rotation: 3,
        opacity: 1,
        duration: 0.4,
        ease: "power2.in",
      }
    )
      .to(scoopRef.current, {
        y: -8,
        scaleX: 0.94,
        scaleY: 1.08,
        rotation: -1,
        duration: 0.25,
        ease: "power1.out",
      })
      .to(scoopRef.current, {
        y: 0,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        duration: 0.3,
        ease: "elastic.out(1.2, 0.4)",
      });

    // Animate metric bars
    gsap.fromTo(
      ".flavor-metric-fill",
      { width: "0%" },
      {
        width: (idx, target) => target.getAttribute("data-width") || "80%",
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  }, [selectedIndex]);

  return (
    <section
      id="flavours"
      ref={containerRef}
      style={{
        position: "relative",
        padding: "120px 0",
        background: "var(--bg-cream-warm)",
        overflow: "hidden",
        transition: "background 0.8s ease",
      }}
    >
      {/* Dynamic Background Glow with Organic Breathing */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "75vw",
          height: "75vw",
          maxWidth: "850px",
          maxHeight: "850px",
          borderRadius: "50%",
          background: currentFlavor.bgGlow,
          filter: "blur(90px)",
          pointerEvents: "none",
          transition: "background 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          zIndex: 0,
        }}
      />

      <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 60px" }}>
          <div
            className="flavour-header-reveal"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 18px",
              borderRadius: "9999px",
              background: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(46, 27, 19, 0.08)",
              boxShadow: "var(--shadow-sm)",
              marginBottom: "16px",
            }}
          >
            <Sparkles size={14} color="var(--berry-velvet)" />
            <span
              className="display-badge"
              style={{ fontSize: "11px", color: "var(--cocoa-rich)" }}
            >
              The Churning Room
            </span>
          </div>

          <h2
            className="serif-heading flavour-header-reveal"
            style={{
              fontSize: "clamp(32px, 4vw, 54px)",
              lineHeight: 1.15,
              color: "var(--cocoa-dark)",
              marginBottom: "18px",
            }}
          >
            Ten Masterpiece Scoops,{" "}
            <span className="italic-accent">Infinite Joy.</span>
          </h2>
          <p
            className="flavour-header-reveal"
            style={{
              fontSize: "17px",
              color: "var(--cocoa-muted)",
              lineHeight: 1.7,
            }}
          >
            Explore our rotating repertoire of artisanal gelato and dessert
            confections. Click any flavour below to inspect its churning notes,
            density metrics, and tasting profiles.
          </p>
        </div>

        {/* Interactive Flavour Showcase Card */}
        <div
          className="flavour-card-main glass-panel"
          style={{
            borderRadius: "36px",
            padding: "48px 40px",
            maxWidth: "1150px",
            margin: "0 auto 48px",
            border: "1px solid rgba(255, 255, 255, 0.95)",
            boxShadow: "0 25px 60px -15px rgba(46, 27, 19, 0.12)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.05fr 1fr",
              gap: "50px",
              alignItems: "center",
            }}
            className="flavour-showcase-grid"
          >
            {/* Left: 3D Scoop Display with Liquid Ripple */}
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "380px",
              }}
            >
              {/* Expanding Liquid Ripple SVG */}
              <div
                ref={rippleRef}
                style={{
                  position: "absolute",
                  width: "280px",
                  height: "280px",
                  borderRadius: "50%",
                  border: `3px solid ${currentFlavor.accentColor}`,
                  opacity: 0,
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />

              {/* Pedestal Aura */}
              <div
                style={{
                  position: "absolute",
                  width: "280px",
                  height: "280px",
                  borderRadius: "50%",
                  background: currentFlavor.bgGlow,
                  filter: "blur(40px)",
                  zIndex: 0,
                }}
              />

              {/* Pedestal Ring */}
              <div
                style={{
                  position: "absolute",
                  bottom: "30px",
                  width: "220px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "radial-gradient(ellipse, rgba(46, 27, 19, 0.2) 0%, transparent 70%)",
                  filter: "blur(8px)",
                  zIndex: 1,
                }}
              />

              {/* The Scoop Image with Squash & Stretch */}
              <div
                ref={scoopRef}
                style={{
                  position: "relative",
                  width: "300px",
                  height: "300px",
                  zIndex: 2,
                  filter: "drop-shadow(0 20px 30px rgba(46, 27, 19, 0.22))",
                  cursor: "pointer",
                }}
                onClick={() => {
                  gsap.fromTo(
                    scoopRef.current,
                    { scale: 0.9 },
                    { scale: 1, duration: 0.5, ease: "elastic.out(1.5, 0.3)" }
                  );
                }}
              >
                <Image
                  src={currentFlavor.image}
                  alt={currentFlavor.name}
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>

              {/* Price Pill Below */}
              <div
                style={{
                  marginTop: "16px",
                  display: "inline-flex",
                  alignItems: "baseline",
                  gap: "6px",
                  padding: "8px 22px",
                  borderRadius: "9999px",
                  background: "#FFFFFF",
                  border: "1px solid rgba(46, 27, 19, 0.08)",
                  boxShadow: "var(--shadow-sm)",
                  zIndex: 3,
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--cocoa-muted)",
                  }}
                >
                  Single Artisanal Scoop:
                </span>
                <span
                  className="serif-heading"
                  style={{
                    fontSize: "24px",
                    color: currentFlavor.accentColor,
                    fontWeight: 800,
                  }}
                >
                  ₹{currentFlavor.price}
                </span>
              </div>
            </div>

            {/* Right: Flavor Notes & Metrics */}
            <div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: currentFlavor.accentColor,
                }}
              >
                Recipe No. 0{selectedIndex + 1}
              </span>

              <h3
                className="serif-heading"
                style={{
                  fontSize: "36px",
                  color: "var(--cocoa-dark)",
                  lineHeight: 1.2,
                  marginTop: "4px",
                  marginBottom: "8px",
                }}
              >
                {currentFlavor.name}
              </h3>

              <div
                style={{
                  fontSize: "14.5px",
                  fontWeight: 600,
                  color: "var(--cocoa-muted)",
                  marginBottom: "16px",
                }}
              >
                {currentFlavor.tagline}
              </div>

              <p
                style={{
                  fontSize: "15.5px",
                  lineHeight: 1.7,
                  color: "var(--cocoa-rich)",
                  marginBottom: "26px",
                }}
              >
                {currentFlavor.description}
              </p>

              {/* Flavor Profile Metrics with Animated Fills */}
              <div style={{ marginBottom: "26px" }}>
                <div style={{ marginBottom: "14px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--cocoa-rich)",
                      marginBottom: "6px",
                    }}
                  >
                    <span>Creaminess & Silk Density</span>
                    <span style={{ color: currentFlavor.accentColor, fontWeight: 700 }}>
                      {currentFlavor.metrics.creaminess}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: "7px",
                      background: "rgba(46, 27, 19, 0.08)",
                      borderRadius: "999px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="flavor-metric-fill"
                      data-width={`${currentFlavor.metrics.creaminess}%`}
                      style={{
                        height: "100%",
                        width: `${currentFlavor.metrics.creaminess}%`,
                        background: currentFlavor.accentColor,
                        borderRadius: "999px",
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--cocoa-rich)",
                      marginBottom: "6px",
                    }}
                  >
                    <span>Flavor Intensity & Aroma</span>
                    <span style={{ color: currentFlavor.accentColor, fontWeight: 700 }}>
                      {currentFlavor.metrics.intensity}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: "7px",
                      background: "rgba(46, 27, 19, 0.08)",
                      borderRadius: "999px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="flavor-metric-fill"
                      data-width={`${currentFlavor.metrics.intensity}%`}
                      style={{
                        height: "100%",
                        width: `${currentFlavor.metrics.intensity}%`,
                        background: currentFlavor.accentColor,
                        borderRadius: "999px",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Ingredients Chips */}
              <div style={{ marginBottom: "32px" }}>
                <span
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--cocoa-muted)",
                    marginBottom: "10px",
                  }}
                >
                  Key Tasting Ingredients:
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {currentFlavor.notes.map((note) => (
                    <span
                      key={note}
                      style={{
                        fontSize: "12.5px",
                        fontWeight: 600,
                        padding: "6px 14px",
                        borderRadius: "9999px",
                        background: "rgba(255, 255, 255, 0.85)",
                        border: "1px solid rgba(46, 27, 19, 0.1)",
                        color: "var(--cocoa-dark)",
                      }}
                    >
                      ✦ {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Order Button with Magnetic Attraction */}
              <button
                onClick={() =>
                  addToCart({
                    id: currentFlavor.id,
                    name: `${currentFlavor.name} (Single Scoop)`,
                    category: "Artisanal Scoop",
                    price: currentFlavor.price,
                    image: currentFlavor.image,
                  })
                }
                className="btn-primary"
                data-magnetic="true"
                style={{
                  background: `linear-gradient(135deg, ${currentFlavor.accentColor} 0%, #1E120D 130%)`,
                  padding: "16px 36px",
                  fontSize: "15px",
                  boxShadow: `0 12px 28px ${currentFlavor.bgGlow}`,
                }}
              >
                <Plus size={18} />
                <span>Add To Tasting Box</span>
              </button>
            </div>
          </div>
        </div>

        {/* Flavour Horizontal Scroll Selector */}
        <div
          style={{
            display: "flex",
            gap: "14px",
            overflowX: "auto",
            paddingBottom: "16px",
            paddingTop: "6px",
            scrollbarWidth: "none",
          }}
        >
          {flavoursData.map((flavor, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={flavor.id}
                onClick={() => setSelectedIndex(idx)}
                style={{
                  flex: "0 0 auto",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 18px",
                  borderRadius: "9999px",
                  border: isSelected
                    ? `2px solid ${flavor.accentColor}`
                    : "1px solid rgba(46, 27, 19, 0.1)",
                  background: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                  boxShadow: isSelected
                    ? "0 10px 25px rgba(46, 27, 19, 0.08)"
                    : "none",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={flavor.image}
                    alt={flavor.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontSize: "13.5px",
                      fontWeight: 700,
                      color: isSelected ? flavor.accentColor : "var(--cocoa-dark)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {flavor.name}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--cocoa-muted)",
                      fontWeight: 500,
                    }}
                  >
                    ₹{flavor.price}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .flavour-showcase-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>
    </section>
  );
}
