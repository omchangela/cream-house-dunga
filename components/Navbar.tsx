"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ShoppingBag, Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { useCart } from "./CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartBtnRef = useRef<HTMLButtonElement>(null);
  const { totalCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate cart button on items change
  useEffect(() => {
    if (totalCount > 0 && cartBtnRef.current) {
      gsap.fromTo(
        cartBtnRef.current,
        { scale: 1.35, rotation: -18 },
        { scale: 1, rotation: 0, duration: 0.6, ease: "elastic.out(1.6, 0.3)" }
      );
    }
  }, [totalCount]);

  const navLinks = [
    { name: "Flavours", href: "#flavours" },
    { name: "Artisan Treats", href: "#products" },
    { name: "Velvet Shakes", href: "#shakes" },
    { name: "The Craft", href: "#heritage" },
    { name: "Tasting Flight", href: "#builder" },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
          padding: scrolled ? "12px 20px" : "22px 20px",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: "none",
        }}
      >
        <div
          className="container-custom"
          style={{
            maxWidth: "1280px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Main Floating Capsule */}
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 20px 10px 16px",
              borderRadius: "9999px",
              background: scrolled
                ? "rgba(255, 255, 255, 0.92)"
                : "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.95)",
              boxShadow: scrolled
                ? "0 18px 40px rgba(46, 27, 19, 0.08)"
                : "0 10px 30px rgba(46, 27, 19, 0.04)",
              pointerEvents: "auto",
              transition: "all 0.4s ease",
            }}
          >
            {/* Logo */}
            <a
              href="#"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                background: "#1E120D",
                padding: "6px 16px 6px 14px",
                borderRadius: "9999px",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Image
                src="/images/nav-log-bg.webp"
                alt="Cream House Logo"
                width={105}
                height={34}
                style={{
                  objectFit: "contain",
                  display: "block",
                  filter: "brightness(1.1)",
                }}
                priority
              />
            </a>

            {/* Desktop Navigation */}
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "32px",
              }}
              className="desktop-nav"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  style={{
                    textDecoration: "none",
                    color: "var(--cocoa-rich)",
                    fontSize: "14.5px",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    position: "relative",
                    padding: "6px 2px",
                    transition: "color 0.25s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--berry-velvet)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--cocoa-rich)")}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Build Box CTA */}
              <a
                href="#builder"
                className="btn-primary desktop-cta"
                style={{
                  padding: "10px 22px",
                  fontSize: "13.5px",
                  boxShadow: "0 8px 20px rgba(216, 40, 85, 0.3)",
                }}
              >
                <Sparkles size={15} />
                <span>Custom Box</span>
              </a>

              {/* Cart Drawer Trigger */}
              <button
                ref={cartBtnRef}
                onClick={() => setIsCartOpen(true)}
                data-magnetic="true"
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "50%",
                  background: "var(--bg-cream-soft)",
                  border: "1px solid rgba(46, 27, 19, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "relative",
                  color: "var(--cocoa-rich)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#FFFFFF";
                  e.currentTarget.style.borderColor = "var(--berry-velvet)";
                  e.currentTarget.style.color = "var(--berry-velvet)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--bg-cream-soft)";
                  e.currentTarget.style.borderColor = "rgba(46, 27, 19, 0.1)";
                  e.currentTarget.style.color = "var(--cocoa-rich)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                aria-label="View Cart"
              >
                <ShoppingBag size={20} />
                {totalCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-4px",
                      right: "-4px",
                      background: "var(--berry-velvet)",
                      color: "#FFFFFF",
                      fontSize: "11px",
                      fontWeight: 700,
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 8px rgba(216, 40, 85, 0.4)",
                      animation: "pulse 1.5s infinite",
                    }}
                  >
                    {totalCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="mobile-toggle"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "rgba(46, 27, 19, 0.05)",
                  border: "none",
                  display: "none",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--cocoa-rich)",
                  cursor: "pointer",
                }}
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "85px",
            left: "16px",
            right: "16px",
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(25px)",
            borderRadius: "28px",
            padding: "24px 20px",
            boxShadow: "0 25px 60px rgba(30, 18, 13, 0.15)",
            zIndex: 99,
            border: "1px solid rgba(216, 40, 85, 0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "var(--cocoa-dark)",
                textDecoration: "none",
                padding: "10px 14px",
                borderRadius: "12px",
                background: "var(--bg-cream)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{link.name}</span>
              <ArrowRight size={16} color="var(--berry-velvet)" />
            </a>
          ))}
          <a
            href="#builder"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-primary"
            style={{ width: "100%", marginTop: "8px" }}
          >
            <Sparkles size={16} />
            <span>Build Your Custom Flight</span>
          </a>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 991px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-cta {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
