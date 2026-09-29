"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Heart, Star, ShoppingBag, Check } from "lucide-react";
import { useCart } from "./CartContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Product {
  id: string;
  name: string;
  category: "all" | "taco-cone" | "chocobar" | "kulfi";
  categoryLabel: string;
  badge: string;
  badgeType: "bestseller" | "popular" | "traditional" | "premium" | "new" | "crunchy" | "crispy";
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  description: string;
  glowColor: string;
}

const products: Product[] = [
  {
    id: "prod-taco",
    name: "Taco",
    category: "taco-cone",
    categoryLabel: "Specialty Taco",
    badge: "Best Seller",
    badgeType: "bestseller",
    image: "/Images/taco.png",
    price: 40,
    originalPrice: 50,
    rating: 4.9,
    reviews: 120,
    description: "Fresh milk, premium ingredients and rich creamy texture that melts in every bite.",
    glowColor: "rgba(216, 40, 85, 0.25)",
  },
  {
    id: "prod-gone",
    name: "Gone Stick",
    category: "taco-cone",
    categoryLabel: "Waffle Cone Stick",
    badge: "Popular",
    badgeType: "popular",
    image: "/Images/gone.png",
    price: 35,
    originalPrice: 45,
    rating: 4.8,
    reviews: 120,
    description: "Fresh milk, premium ingredients and rich creamy texture that melts in every bite.",
    glowColor: "rgba(212, 143, 55, 0.25)",
  },
  {
    id: "prod-kulfi",
    name: "Kulfi",
    category: "kulfi",
    categoryLabel: "Traditional Malai",
    badge: "Traditional",
    badgeType: "traditional",
    image: "/Images/kulfi.png",
    price: 30,
    originalPrice: 40,
    rating: 4.9,
    reviews: 120,
    description: "Fresh milk, premium ingredients and rich creamy texture that melts in every bite.",
    glowColor: "rgba(201, 142, 58, 0.25)",
  },
  {
    id: "prod-white-chocobar",
    name: "Choco Bar",
    category: "chocobar",
    categoryLabel: "White Belgian",
    badge: "Premium",
    badgeType: "premium",
    image: "/Images/whit_chocobar.png",
    price: 35,
    originalPrice: 45,
    rating: 4.8,
    reviews: 120,
    description: "Fresh milk, premium ingredients and rich creamy texture that melts in every bite.",
    glowColor: "rgba(168, 120, 95, 0.25)",
  },
  {
    id: "prod-oreo-stick",
    name: "Oreo Stick",
    category: "chocobar",
    categoryLabel: "Cookies & Cream",
    badge: "New",
    badgeType: "new",
    image: "/Images/oreo.png",
    price: 40,
    originalPrice: 50,
    rating: 5.0,
    reviews: 120,
    description: "Fresh milk, premium ingredients and rich creamy texture that melts in every bite.",
    glowColor: "rgba(46, 27, 19, 0.25)",
  },
  {
    id: "prod-chocobar-1",
    name: "Choco Bar",
    category: "chocobar",
    categoryLabel: "Classic Dark",
    badge: "Crunchy",
    badgeType: "crunchy",
    image: "/Images/chocobar-1.png",
    price: 35,
    originalPrice: 45,
    rating: 4.8,
    reviews: 120,
    description: "Fresh milk, premium ingredients and rich creamy texture that melts in every bite.",
    glowColor: "rgba(30, 18, 13, 0.25)",
  },
  {
    id: "prod-chocobar-2",
    name: "Choco Crispy Bar",
    category: "chocobar",
    categoryLabel: "Crisped Rice",
    badge: "Crispy",
    badgeType: "crispy",
    image: "/Images/chocobar-2.png",
    price: 35,
    originalPrice: 45,
    rating: 4.9,
    reviews: 120,
    description: "Fresh milk, premium ingredients and rich creamy texture that melts in every bite.",
    glowColor: "rgba(191, 106, 45, 0.25)",
  },
  {
    id: "prod-chocobar-3",
    name: "Chocolate Nuts Bar",
    category: "chocobar",
    categoryLabel: "Roasted Nuts",
    badge: "Premium",
    badgeType: "premium",
    image: "/Images/chocobar-3.png",
    price: 40,
    originalPrice: 50,
    rating: 5.0,
    reviews: 120,
    description: "Fresh milk, premium ingredients and rich creamy texture that melts in every bite.",
    glowColor: "rgba(74, 51, 40, 0.25)",
  },
];

const badgeStyles = {
  bestseller: {
    bg: "linear-gradient(135deg, #D82855 0%, #FF4D7E 100%)",
    color: "#FFFFFF",
    shadow: "0 4px 14px rgba(216, 40, 85, 0.35)",
  },
  popular: {
    bg: "linear-gradient(135deg, #D48F37 0%, #F5B054 100%)",
    color: "#FFFFFF",
    shadow: "0 4px 14px rgba(212, 143, 55, 0.35)",
  },
  traditional: {
    bg: "linear-gradient(135deg, #C98E3A 0%, #E8B46C 100%)",
    color: "#FFFFFF",
    shadow: "0 4px 14px rgba(201, 142, 58, 0.35)",
  },
  premium: {
    bg: "linear-gradient(135deg, #2E1B13 0%, #543729 100%)",
    color: "#FFFFFF",
    shadow: "0 4px 14px rgba(46, 27, 19, 0.25)",
  },
  new: {
    bg: "linear-gradient(135deg, #3C7053 0%, #5BA177 100%)",
    color: "#FFFFFF",
    shadow: "0 4px 14px rgba(60, 112, 83, 0.35)",
  },
  crunchy: {
    bg: "linear-gradient(135deg, #BF6A2D 0%, #E08745 100%)",
    color: "#FFFFFF",
    shadow: "0 4px 14px rgba(191, 106, 45, 0.35)",
  },
  crispy: {
    bg: "linear-gradient(135deg, #D82855 0%, #E66085 100%)",
    color: "#FFFFFF",
    shadow: "0 4px 14px rgba(216, 40, 85, 0.35)",
  },
};

export default function SignatureProducts() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.category === activeFilter);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const btn = e.currentTarget as HTMLElement;
    gsap.fromTo(
      btn,
      { scale: 0.6 },
      { scale: 1, duration: 0.5, ease: "elastic.out(1.8, 0.3)" }
    );
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddToCartWithFeedback = (prod: Product, e: React.MouseEvent) => {
    const btn = e.currentTarget as HTMLElement;
    gsap.fromTo(
      btn,
      { scale: 0.92 },
      { scale: 1, duration: 0.4, ease: "back.out(2)" }
    );

    addToCart({
      id: prod.id,
      name: prod.name,
      category: prod.categoryLabel,
      price: prod.price,
      image: prod.image,
    });

    setAddedItems((prev) => ({ ...prev, [prod.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [prod.id]: false }));
    }, 1800);
  };

  // ScrollTrigger Stagger Entrance
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".product-header-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
      });

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".product-card-wrap");
        gsap.fromTo(
          cards,
          {
            y: 60,
            opacity: 0,
            rotationX: 12,
            scale: 0.94,
          },
          {
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
            },
            y: 0,
            opacity: 1,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.09,
            ease: "power3.out",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeFilter]);

  // Card 3D tilt with real-time dynamic light sheen
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotationY: x * 15,
      rotationX: -y * 15,
      transformPerspective: 900,
      duration: 0.35,
      ease: "power1.out",
    });

    const glare = card.querySelector(".card-glare") as HTMLElement | null;
    if (glare) {
      const mouseXPercent = ((e.clientX - rect.left) / rect.width) * 100;
      const mouseYPercent = ((e.clientY - rect.top) / rect.height) * 100;
      glare.style.opacity = "0.7";
      glare.style.background = `radial-gradient(circle at ${mouseXPercent}% ${mouseYPercent}%, rgba(255,255,255,0.45) 0%, transparent 60%)`;
    }

    const img = card.querySelector(".product-floating-img");
    if (img) {
      gsap.to(img, {
        x: x * 22,
        y: y * 22,
        scale: 1.12,
        duration: 0.35,
        ease: "power1.out",
      });
    }
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    });

    const glare = card.querySelector(".card-glare") as HTMLElement | null;
    if (glare) {
      glare.style.opacity = "0";
    }

    const img = card.querySelector(".product-floating-img");
    if (img) {
      gsap.to(img, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      style={{
        padding: "120px 0",
        background: "linear-gradient(180deg, #FFFFFF 0%, #FAF7F2 100%)",
        position: "relative",
      }}
    >
      <div className="container-custom">
        {/* Section Header with ScrollTrigger entrance */}
        <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 50px" }}>
          <div
            className="product-header-reveal"
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
              Our Master Creations
            </span>
          </div>

          <h2
            className="serif-heading product-header-reveal"
            style={{
              fontSize: "clamp(32px, 4.2vw, 54px)",
              lineHeight: 1.15,
              color: "var(--cocoa-dark)",
              marginBottom: "16px",
            }}
          >
            Our Handcrafted{" "}
            <span className="italic-accent">Treats Collection.</span>
          </h2>

          <p
            className="product-header-reveal"
            style={{
              fontSize: "17px",
              color: "var(--cocoa-muted)",
              lineHeight: 1.7,
            }}
          >
            Enjoy our delicious range of handcrafted dessert tacos, slow-churned
            kulfis, wafer cones, and thick Belgian chocolate crackle bars made with
            fresh A2 farm milk and pure natural ingredients.
          </p>
        </div>

        {/* Filter Pills with Magnetic Pull */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "50px",
          }}
        >
          {[
            { id: "all", label: "All Treats (8)" },
            { id: "taco-cone", label: "Tacos & Cones" },
            { id: "chocobar", label: "Artisan Chocobars" },
            { id: "kulfi", label: "Traditional Kulfi" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              data-magnetic="true"
              style={{
                padding: "10px 24px",
                borderRadius: "9999px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                border:
                  activeFilter === tab.id
                    ? "1px solid var(--berry-velvet)"
                    : "1px solid rgba(46, 27, 19, 0.1)",
                background:
                  activeFilter === tab.id ? "var(--berry-velvet)" : "#FFFFFF",
                color: activeFilter === tab.id ? "#FFFFFF" : "var(--cocoa-rich)",
                boxShadow:
                  activeFilter === tab.id
                    ? "0 8px 20px rgba(216, 40, 85, 0.28)"
                    : "0 2px 8px rgba(46, 27, 19, 0.04)",
                transition: "all 0.25s ease",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid: 4 columns on desktop with 3D Card Hover */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "28px",
          }}
          className="products-custom-grid"
        >
          {filteredProducts.map((prod) => {
            const isFav = favorites[prod.id];
            const isAdded = addedItems[prod.id];
            const badgeStyle = badgeStyles[prod.badgeType] || badgeStyles.premium;

            return (
              <div
                key={prod.id}
                className="product-card-wrap"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                style={{
                  borderRadius: "28px",
                  background: "#FFFFFF",
                  border: "1px solid rgba(216, 40, 85, 0.1)",
                  boxShadow: "0 10px 30px rgba(46, 27, 19, 0.06)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transformStyle: "preserve-3d",
                  transition: "box-shadow 0.4s ease, border-color 0.4s ease",
                }}
              >
                {/* Real-time Glare Sheen Overlay */}
                <div
                  className="card-glare"
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 15,
                    opacity: 0,
                    transition: "opacity 0.25s ease",
                    borderRadius: "28px",
                  }}
                />

                {/* Badge Top Left */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    zIndex: 20,
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "9999px",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      background: badgeStyle.bg,
                      color: badgeStyle.color,
                      boxShadow: badgeStyle.shadow,
                      padding: "5px 14px",
                      fontSize: "11.5px",
                    }}
                  >
                    {prod.badge}
                  </span>
                </div>

                {/* Heart Bookmark Button Top Right */}
                <button
                  onClick={(e) => toggleFavorite(prod.id, e)}
                  aria-label="Save Favorite"
                  data-magnetic="true"
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "16px",
                    zIndex: 20,
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: isFav ? "var(--berry-velvet)" : "rgba(255, 255, 255, 0.9)",
                    color: isFav ? "#FFFFFF" : "var(--cocoa-muted)",
                    border: "1px solid rgba(46, 27, 19, 0.08)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                >
                  <Heart
                    size={16}
                    fill={isFav ? "#FFFFFF" : "none"}
                    color={isFav ? "#FFFFFF" : "var(--berry-velvet)"}
                  />
                </button>

                {/* 3D Product Visual Stage */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "250px",
                    background:
                      "linear-gradient(180deg, #FFF7FA 0%, #FFFFFF 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    overflow: "hidden",
                  }}
                >
                  {/* Subtle flavor aura */}
                  <div
                    style={{
                      position: "absolute",
                      width: "180px",
                      height: "180px",
                      borderRadius: "50%",
                      background: prod.glowColor,
                      filter: "blur(30px)",
                      zIndex: 1,
                    }}
                  />

                  {/* Product Cutout with Mouse Parallax Target */}
                  <div
                    className="product-floating-img"
                    style={{
                      position: "relative",
                      width: "210px",
                      height: "210px",
                      zIndex: 2,
                    }}
                  >
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      style={{
                        objectFit: "contain",
                        filter: "drop-shadow(0 16px 20px rgba(46, 27, 19, 0.16))",
                      }}
                    />
                  </div>
                </div>

                {/* Product Information Card Body */}
                <div
                  style={{
                    padding: "24px 22px 22px",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    {/* Star Rating & Reviews */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "10px",
                      }}
                    >
                      <Star size={15} fill="#FBBF24" color="#FBBF24" />
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "var(--cocoa-dark)",
                        }}
                      >
                        {prod.rating}
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "var(--cocoa-muted)",
                        }}
                      >
                        ({prod.reviews} Reviews)
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3
                      className="serif-heading"
                      style={{
                        fontSize: "22px",
                        color: "var(--cocoa-dark)",
                        lineHeight: 1.25,
                        marginBottom: "8px",
                        transition: "color 0.25s ease",
                      }}
                    >
                      {prod.name}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--cocoa-muted)",
                        lineHeight: 1.6,
                        marginBottom: "18px",
                      }}
                    >
                      {prod.description}
                    </p>
                  </div>

                  <div>
                    {/* Pricing Row with Save Tag */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        marginBottom: "14px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                        <span
                          className="serif-heading"
                          style={{
                            fontSize: "28px",
                            fontWeight: 800,
                            color: "var(--berry-velvet)",
                          }}
                        >
                          ₹{prod.price}
                        </span>
                        <span
                          style={{
                            fontSize: "15px",
                            color: "var(--cocoa-muted)",
                            textDecoration: "line-through",
                          }}
                        >
                          ₹{prod.originalPrice}
                        </span>
                      </div>

                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#16A34A",
                          background: "#DCFCE7",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          boxShadow: "0 2px 6px rgba(22, 163, 74, 0.15)",
                        }}
                      >
                        Save ₹{prod.originalPrice - prod.price}
                      </span>
                    </div>

                    {/* Add to Cart Button with Celebratory Micro-feedback */}
                    <button
                      onClick={(e) => handleAddToCartWithFeedback(prod, e)}
                      className="btn-primary"
                      data-magnetic="true"
                      style={{
                        width: "100%",
                        padding: "12px",
                        fontSize: "14px",
                        gap: "8px",
                        background: isAdded
                          ? "linear-gradient(135deg, #16A34A 0%, #15803D 100%)"
                          : undefined,
                      }}
                    >
                      {isAdded ? (
                        <>
                          <Check size={16} />
                          <span>Added To Tasting Box!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={16} />
                          <span>Add To Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 1200px) {
          .products-custom-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1199px) {
          .products-custom-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 767px) {
          .products-custom-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
