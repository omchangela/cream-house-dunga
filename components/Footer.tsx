"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, Share2, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  const marqueeText =
    "CREAM HOUSE • HANDCRAFTED ARTISANAL GELATERIA • 100% FARM FRESH A2 MILK • SLOW CHURNED AT -4°C • ZERO ARTIFICIAL GUMS • EST. 1995 • PURE INDULGENCE • ";

  return (
    <footer
      style={{
        background: "var(--cocoa-dark)",
        color: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
        paddingTop: "0",
      }}
    >
      {/* Infinite Running Marquee Ribbon */}
      <div
        style={{
          background: "var(--berry-velvet)",
          padding: "16px 0",
          overflow: "hidden",
          whiteSpace: "nowrap",
          display: "flex",
          borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        <div className="marquee-content">
          <span
            style={{
              fontSize: "14px",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: "var(--font-display)",
              color: "#FFFFFF",
            }}
          >
            {marqueeText.repeat(4)}
          </span>
        </div>
      </div>

      <div
        className="container-custom"
        style={{
          paddingTop: "80px",
          paddingBottom: "50px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 0.9fr 0.9fr 1.2fr",
            gap: "50px",
            marginBottom: "70px",
          }}
          className="footer-grid"
        >
          {/* Col 1: Brand & Logo */}
          <div>
            <div
              style={{
                display: "inline-block",
                background: "#000000",
                padding: "8px 20px",
                borderRadius: "999px",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                marginBottom: "24px",
              }}
            >
              <Image
                src="/images/nav-log-bg.webp"
                alt="Cream House"
                width={120}
                height={38}
                style={{ objectFit: "contain", display: "block" }}
              />
            </div>

            <p
              style={{
                fontSize: "15px",
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: 1.7,
                maxWidth: "340px",
                marginBottom: "24px",
              }}
            >
              Master artisans of slow-churned gelato, handcrafted waffle tacos,
              and rich whole-milk confections. Savoring sweet memories since 1995.
            </p>

            <div style={{ display: "flex", gap: "12px" }}>
              <a
                href="#"
                aria-label="Instagram"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Share"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
              >
                <Share2 size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: The Parlour Menu */}
          <div>
            <h4
              className="serif-heading"
              style={{
                fontSize: "18px",
                color: "#FFFFFF",
                marginBottom: "22px",
                letterSpacing: "0.02em",
              }}
            >
              Parlour Creations
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                fontSize: "14.5px",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              {["Artisanal Gelato Scoops", "Hand-Pressed Dessert Tacos", "Pure Dark Chocobars", "Royal Malai Kulfi", "Velvet Milkshake Bar", "Tasting Flights"].map((item) => (
                <li key={item}>
                  <a
                    href="#products"
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-honey)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)")}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Artisanal Heritage */}
          <div>
            <h4
              className="serif-heading"
              style={{
                fontSize: "18px",
                color: "#FFFFFF",
                marginBottom: "22px",
                letterSpacing: "0.02em",
              }}
            >
              Our Heritage
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                fontSize: "14.5px",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              {["The Churning Method", "Grass-Fed Dairy Sourcing", "Zero Stabilizers Guarantee", "Private Event Catering", "Parlour Flagship Location", "Nutritional Certifications"].map((item) => (
                <li key={item}>
                  <a
                    href="#heritage"
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-honey)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)")}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: VIP Tasting Newsletter */}
          <div>
            <h4
              className="serif-heading"
              style={{
                fontSize: "18px",
                color: "#FFFFFF",
                marginBottom: "12px",
                letterSpacing: "0.02em",
              }}
            >
              VIP Tasting Club
            </h4>
            <p
              style={{
                fontSize: "13.5px",
                color: "rgba(255, 255, 255, 0.65)",
                lineHeight: 1.6,
                marginBottom: "20px",
              }}
            >
              Get invited to seasonal micro-batch drops, secret flavours, and exclusive
              parlour tasting flights.
            </p>

            <form onSubmit={handleSubscribe} style={{ position: "relative" }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                style={{
                  width: "100%",
                  padding: "14px 48px 14px 18px",
                  borderRadius: "9999px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  color: "#FFFFFF",
                  fontSize: "13.5px",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  position: "absolute",
                  right: "6px",
                  top: "6px",
                  bottom: "6px",
                  width: "38px",
                  borderRadius: "50%",
                  background: "var(--berry-velvet)",
                  border: "none",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                {subscribed ? <Check size={16} /> : <ArrowRight size={16} />}
              </button>
            </form>

            {subscribed && (
              <span
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  fontSize: "12px",
                  color: "#4ADE80",
                }}
              >
                ✓ Welcome to the Cream House Tasting Circle!
              </span>
            )}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "13px",
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <div>
            © {new Date().getFullYear()} Cream House Gelateria. Handcrafted with devotion.
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
              Privacy Policy
            </a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
              Terms of Churning
            </a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
              Food Safety Standards
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
