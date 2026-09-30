"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const links = ["Home", "Products", "About", "Flavours", "Reviews", "Contact"];

export default function Navbar({
  cartCount,
  onOpenCart,
}: {
  cartCount: number;
  onOpenCart?: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    setActiveTab(id);
    setMenuOpen(false);
    const targetId = id.toLowerCase() === "home" ? "hero" : id.toLowerCase().replace(/\s+/g, "");
    const el = document.getElementById(targetId);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 shadow-[0_4px_30px_rgba(42,14,0,0.1)]"
            : "py-4 sm:py-5"
        }`}
        style={
          scrolled
            ? {
                background: "rgba(255,248,238,0.96)",
                backdropFilter: "blur(20px)",
                borderBottom: "1.5px solid rgba(192,76,42,0.18)",
              }
            : { background: "transparent" }
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 sm:gap-8">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("Home");
            }}
            className="flex items-center group cursor-pointer"
            aria-label="Cream House Home"
          >
            <div
              className="flex items-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 group-hover:scale-105 shadow-[0_4px_16px_rgba(42,14,0,0.18)]"
              style={{
                background: "#2A0E00",
                border: "1.5px solid rgba(192, 76, 42, 0.35)",
              }}
            >
              <Image
                src="/images/nav-log-bg.webp"
                alt="Cream House Logo"
                width={120}
                height={40}
                className="h-6 sm:h-7.5 w-auto object-contain"
                priority
              />
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {links.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                className="relative px-4 py-2 text-sm font-extrabold transition-all duration-200 cursor-pointer"
                style={{ color: "#2A0E00" }}
              >
                <span>{l}</span>
                {activeTab === l && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2.5px] rounded-full"
                    style={{ background: "#C04C2A" }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Cart Icon Button */}
            <button
              onClick={onOpenCart}
              className="relative w-10 sm:w-11 h-10 sm:h-11 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm"
              style={{
                background: "#FFFFFF",
                border: "1.5px solid rgba(192,76,42,0.25)",
                color: "#2A0E00",
              }}
              aria-label="Open Shopping Cart"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              {cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs font-black flex items-center justify-center text-white shadow-md animate-pulse"
                  style={{ background: "linear-gradient(135deg, #C04C2A, #D4863A)" }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order Now CTA */}
            <button
              onClick={() => scrollTo("Products")}
              className="hidden lg:flex items-center gap-2 text-white px-6 py-2.5 rounded-full text-sm font-black transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-md"
              style={{
                background: "linear-gradient(135deg, #C04C2A, #D4863A)",
                boxShadow: "0 6px 20px rgba(192,76,42,0.45)",
              }}
            >
              <span>Order Now</span>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
              style={{ background: "#FFFFFF", border: "1.5px solid rgba(192,76,42,0.25)" }}
              aria-label="Toggle Navigation Menu"
            >
              <span
                className={`w-5 h-0.5 rounded-full transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
                style={{ background: "#2A0E00" }}
              />
              <span
                className={`w-5 h-0.5 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
                style={{ background: "#2A0E00" }}
              />
              <span
                className={`w-5 h-0.5 rounded-full transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
                style={{ background: "#2A0E00" }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(255,248,238,0.98)", backdropFilter: "blur(24px)" }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          <div className="mb-4 flex items-center justify-center">
            <div
              className="flex items-center px-5 py-2.5 rounded-full shadow-lg"
              style={{
                background: "#2A0E00",
                border: "1.5px solid rgba(192, 76, 42, 0.35)",
              }}
            >
              <Image
                src="/images/nav-log-bg.webp"
                alt="Cream House"
                width={130}
                height={45}
                className="h-8.5 w-auto object-contain"
              />
            </div>
          </div>

          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="text-2xl font-black transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{ color: "#2A0E00" }}
            >
              {l}
            </button>
          ))}

          <button
            onClick={() => {
              setMenuOpen(false);
              scrollTo("Products");
            }}
            className="mt-6 text-white px-10 py-4 rounded-full font-black text-lg shadow-xl cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #C04C2A, #D4863A)",
              boxShadow: "0 8px 32px rgba(192,76,42,0.45)",
            }}
          >
            Order Now 🛒
          </button>
        </div>
      </div>
    </>
  );
}
