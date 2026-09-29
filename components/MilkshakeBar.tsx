"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Plus, Milk, Heart, Check } from "lucide-react";
import { useCart } from "./CartContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ShakeItem {
  id: string;
  name: string;
  tagline: string;
  image: string;
  price: number;
  bgGradient: string;
  accent: string;
  thickness: string;
}

const shakesData: ShakeItem[] = [
  {
    id: "shake-1",
    name: "Belgian Noir Ganache Shake",
    tagline: "70% Cocoa Ganache • Whipped Heavy Cream",
    image: "/images/products/milk-1.png",
    price: 65,
    bgGradient: "linear-gradient(180deg, #3D261C 0%, #20130D 100%)",
    accent: "#D48F37",
    thickness: "Ultra Dense (Double Churned)",
  },
  {
    id: "shake-2",
    name: "Cotton Candy Dream Shake",
    tagline: "Spun Sugar Infusion • Ruby Berry Drizzle",
    image: "/images/products/milk-2.png",
    price: 60,
    bgGradient: "linear-gradient(180deg, #F87B9F 0%, #D82855 100%)",
    accent: "#FFE8F0",
    thickness: "Frosted Cloud Velvet",
  },
  {
    id: "shake-3",
    name: "Pistachio Royale Shake",
    tagline: "Crushed Iranian Pistachio • Saffron Whip",
    image: "/images/products/milk-3.png",
    price: 70,
    bgGradient: "linear-gradient(180deg, #3E6F54 0%, #1F3D2E 100%)",
    accent: "#D6F2E2",
    thickness: "Slow-Steeped Malai",
  },
  {
    id: "shake-4",
    name: "Oreo Overload Frost Shake",
    tagline: "Crushed Dark Biscuit • Double Sweet Cream",
    image: "/images/products/milk-4.png",
    price: 65,
    bgGradient: "linear-gradient(180deg, #2B211E 0%, #150F0D 100%)",
    accent: "#F9E7C8",
    thickness: "Chunky Cookie Crumble",
  },
  {
    id: "shake-6",
    name: "Fresh Alphonso King Shake",
    tagline: "100% Ratnagiri Mango Pulp • Cold Milk",
    image: "/images/products/milk-6.png",
    price: 65,
    bgGradient: "linear-gradient(180deg, #E69115 0%, #B36802 100%)",
    accent: "#FFF3D6",
    thickness: "Silky Golden Nectar",
  },
  {
    id: "shake-7",
    name: "Summer Berry Fusion Shake",
    tagline: "Blueberries, Raspberries & Velvet Curd",
    image: "/images/products/milk-7.png",
    price: 60,
    bgGradient: "linear-gradient(180deg, #A83279 0%, #5E1740 100%)",
    accent: "#FFD6ED",
    thickness: "Rich Fruit Cream",
  },
];

export default function MilkshakeBar() {
  const [addedShake, setAddedShake] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".shake-header-reveal", {
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

      const cards = sectionRef.current?.querySelectorAll(".shake-card-wrap");
      if (cards) {
        gsap.fromTo(
          cards,
          {
            y: 50,
            opacity: 0,
            scale: 0.94,
          },
          {
            scrollTrigger: {
              trigger: cards[0],
              start: "top 85%",
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleAddShake = (shake: ShakeItem, e: React.MouseEvent) => {
    const btn = e.currentTarget as HTMLElement;
    gsap.fromTo(btn, { scale: 0.9 }, { scale: 1, duration: 0.4, ease: "back.out(2)" });

    addToCart({
      id: shake.id,
      name: shake.name,
      category: "Velvet Shake",
      price: shake.price,
      image: shake.image,
    });

    setAddedShake((prev) => ({ ...prev, [shake.id]: true }));
    setTimeout(() => {
      setAddedShake((prev) => ({ ...prev, [shake.id]: false }));
    }, 1800);
  };

  return (
    <section
      id="shakes"
      ref={sectionRef}
      style={{
        padding: "120px 0",
        background: "var(--bg-cream-warm)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 60px" }}>
          <div
            className="shake-header-reveal"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 18px",
              borderRadius: "9999px",
              background: "#FFFFFF",
              border: "1px solid rgba(46, 27, 19, 0.08)",
              boxShadow: "var(--shadow-sm)",
              marginBottom: "16px",
            }}
          >
            <Milk size={15} color="var(--berry-velvet)" />
            <span
              className="display-badge"
              style={{ fontSize: "11px", color: "var(--cocoa-rich)" }}
            >
              The Velvet Milkshake Bar
            </span>
          </div>

          <h2
            className="serif-heading shake-header-reveal"
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              lineHeight: 1.15,
              color: "var(--cocoa-dark)",
              marginBottom: "16px",
            }}
          >
            Thick, Frosted &{" "}
            <span className="italic-accent">Unapologetically Rich.</span>
          </h2>
          <p
            className="shake-header-reveal"
            style={{
              fontSize: "17px",
              color: "var(--cocoa-muted)",
              lineHeight: 1.7,
            }}
          >
            Zero added ice, zero watered-down syrups. We blend whole-cream gelato
            with ice-cold farm milk for a density so thick you could eat it with a spoon.
          </p>
        </div>

        {/* Milkshake Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "30px",
          }}
        >
          {shakesData.map((shake) => {
            const isAdded = addedShake[shake.id];

            return (
              <div
                key={shake.id}
                className="shake-card-wrap card-3d"
                style={{
                  borderRadius: "32px",
                  background: "#FFFFFF",
                  border: "1px solid rgba(46, 27, 19, 0.08)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-sm)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transition: "box-shadow 0.4s ease, transform 0.4s ease",
                }}
              >
                {/* Bottle / Glass Stage with Frosted Shimmer */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "290px",
                    background:
                      "radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(244, 237, 227, 0.75) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px",
                    overflow: "hidden",
                  }}
                >
                  {/* Glow behind shake */}
                  <div
                    style={{
                      position: "absolute",
                      width: "190px",
                      height: "190px",
                      borderRadius: "50%",
                      background: shake.bgGradient,
                      opacity: 0.16,
                      filter: "blur(28px)",
                    }}
                  />

                  {/* Bottle Cutout with Hover Levitation */}
                  <div
                    style={{
                      position: "relative",
                      width: "200px",
                      height: "240px",
                      transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.09) translateY(-10px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1) translateY(0)")
                    }
                  >
                    <Image
                      src={shake.image}
                      alt={shake.name}
                      fill
                      style={{
                        objectFit: "contain",
                        filter: "drop-shadow(0 20px 26px rgba(46, 27, 19, 0.18))",
                      }}
                    />
                  </div>
                </div>

                {/* Information */}
                <div
                  style={{
                    padding: "26px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flexGrow: 1,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "var(--berry-velvet)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: "6px",
                      }}
                    >
                      {shake.thickness}
                    </div>

                    <h3
                      className="serif-heading"
                      style={{
                        fontSize: "22px",
                        color: "var(--cocoa-dark)",
                        lineHeight: 1.25,
                        marginBottom: "6px",
                      }}
                    >
                      {shake.name}
                    </h3>

                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--cocoa-muted)",
                        marginBottom: "20px",
                        lineHeight: 1.6,
                      }}
                    >
                      {shake.tagline}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "16px",
                      borderTop: "1px solid rgba(46, 27, 19, 0.08)",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "var(--cocoa-muted)",
                          fontWeight: 600,
                          display: "block",
                        }}
                      >
                        Frosted Bottle
                      </span>
                      <span
                        className="serif-heading"
                        style={{
                          fontSize: "26px",
                          color: "var(--cocoa-dark)",
                          fontWeight: 800,
                        }}
                      >
                        ₹{shake.price}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAddShake(shake, e)}
                      className="btn-primary"
                      data-magnetic="true"
                      style={{
                        padding: "11px 22px",
                        fontSize: "13.5px",
                        background: isAdded
                          ? "linear-gradient(135deg, #16A34A 0%, #15803D 100%)"
                          : undefined,
                      }}
                    >
                      {isAdded ? (
                        <>
                          <Check size={16} />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          <span>Add Shake</span>
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
    </section>
  );
}
