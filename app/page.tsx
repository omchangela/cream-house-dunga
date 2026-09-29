"use client";

import { CartProvider, useCart } from "@/components/CartContext";
import SmoothScrollAndCursor from "@/components/SmoothScrollAndCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FlavorExperience from "@/components/FlavorExperience";
import SignatureProducts from "@/components/SignatureProducts";
import MilkshakeBar from "@/components/MilkshakeBar";
import StoryProcess from "@/components/StoryProcess";
import TastingFlightBuilder from "@/components/TastingFlightBuilder";
import TestimonialsAndFAQ from "@/components/TestimonialsAndFAQ";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Sparkles } from "lucide-react";

function ToastNotification() {
  const { toastMessage } = useCart();
  if (!toastMessage) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(30, 18, 13, 0.92)",
        backdropFilter: "blur(16px)",
        color: "#FFFFFF",
        padding: "12px 24px",
        borderRadius: "9999px",
        fontSize: "14px",
        fontWeight: 600,
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.25)",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        animation: "toastPop 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <Sparkles size={16} color="var(--gold-honey)" />
      <span>{toastMessage}</span>

      <style jsx>{`
        @keyframes toastPop {
          from {
            opacity: 0;
            transform: translate(-50%, 20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

function MainAppContent() {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Ambient Atmospheric Lightings */}
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />

      {/* Smooth Scroll Engine and Interactive Cursor */}
      <SmoothScrollAndCursor />

      {/* Floating Glassmorphic Header */}
      <Navbar />

      {/* Main Page Flow */}
      <main>
        {/* 1. Hero with GSAP 3D Stage & Staggered Typography */}
        <HeroSection />

        {/* 2. Interactive Churning Room (10 Scoops with Dynamic Ambient Morphing) */}
        <FlavorExperience />

        {/* 3. Handcrafted Signature Creations (Tacos, Chocobars, Kulfis) */}
        <SignatureProducts />

        {/* 4. Velvet Milkshake Bar */}
        <MilkshakeBar />

        {/* 5. Heritage & 4 Pillars of Slow Churning */}
        <StoryProcess />

        {/* 6. Interactive 3-Step Tasting Flight Builder */}
        <TastingFlightBuilder />

        {/* 7. Culinary Acclaim, FAQs & Parlour Hours */}
        <TestimonialsAndFAQ />
      </main>

      {/* 8. Artisanal Footer with Kinetic Marquee */}
      <Footer />

      {/* Slide-out Tasting Box Cart Drawer */}
      <CartDrawer />

      {/* Floating Micro-interaction Toast */}
      <ToastNotification />
    </div>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
}
