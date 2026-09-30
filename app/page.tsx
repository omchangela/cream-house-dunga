"use client";
import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Products from "@/components/Products";
import About from "@/components/About";
import Flavours from "@/components/Flavours";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

type CartItem = { name: string; price: number; qty: number };

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  };

  const addToCart = useCallback((name: string, price: number) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === name);
      if (existing) {
        return prev.map((i) => (i.name === name ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { name, price, qty: 1 }];
    });
    showToast(`🍦 ${name} added to cart!`);
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <Navbar cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <main>
        <Hero />
        <Marquee />
        <Products onAddCart={addToCart} />
        <About />
        <Flavours />
        <Testimonials />
        <CTA />
      </main>
      <Footer />

      {cartOpen && (
        <CartDrawer
          items={cart}
          onRemove={removeFromCart}
          onClose={() => setCartOpen(false)}
        />
      )}

      {/* Floating Feedback Toast */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] px-7 py-3.5 rounded-full text-sm font-black whitespace-nowrap transition-all duration-300 shadow-[0_16px_48px_rgba(42,14,0,0.25)] ${
          toastVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        }`}
        style={{
          background: "linear-gradient(135deg, #2A0E00, #4A2000)",
          color: "#FFF8EE",
          border: "1.5px solid rgba(212,134,58,0.4)",
        }}
      >
        {toast}
      </div>
    </>
  );
}
