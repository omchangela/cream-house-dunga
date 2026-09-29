"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalCount,
    totalPrice,
  } = useCart();

  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Bonus gift milestone (e.g. ₹200 for free artisan waffle crisp)
  const bonusThreshold = 200;
  const progressPercent = Math.min(100, (totalPrice / bonusThreshold) * 100);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      setCheckoutComplete(false);
      setIsCartOpen(false);
    }, 2500);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(30, 18, 13, 0.45)",
          backdropFilter: "blur(8px)",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Slide-out Drawer */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "460px",
          height: "100%",
          background: "#FFFFFF",
          boxShadow: "-20px 0 50px rgba(0, 0, 0, 0.18)",
          display: "flex",
          flexDirection: "column",
          zIndex: 10,
          animation: "slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: "24px 28px",
            borderBottom: "1px solid rgba(46, 27, 19, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "var(--bg-cream-soft)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "var(--berry-soft)",
                color: "var(--berry-velvet)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3
                className="serif-heading"
                style={{ fontSize: "20px", color: "var(--cocoa-dark)" }}
              >
                Your Tasting Box
              </h3>
              <span style={{ fontSize: "12px", color: "var(--cocoa-muted)" }}>
                {totalCount} {totalCount === 1 ? "item" : "items"} selected
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(46, 27, 19, 0.06)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--cocoa-rich)",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Gift Milestone Bar */}
        <div
          style={{
            padding: "14px 28px",
            background: "var(--bg-cream)",
            borderBottom: "1px solid rgba(46, 27, 19, 0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--cocoa-rich)",
              marginBottom: "6px",
            }}
          >
            <span>
              {totalPrice >= bonusThreshold
                ? "🎉 You unlocked a Free Warm Waffle Chip!"
                : `Add ₹${bonusThreshold - totalPrice} more for a Free Warm Waffle Chip!`}
            </span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div
            style={{
              height: "6px",
              background: "rgba(46, 27, 19, 0.1)",
              borderRadius: "999px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progressPercent}%`,
                background: "linear-gradient(90deg, var(--gold-honey), var(--berry-velvet))",
                borderRadius: "999px",
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>

        {/* Items List */}
        <div
          style={{
            flexGrow: 1,
            overflowY: "auto",
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "40px 20px",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "var(--bg-cream)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--cocoa-muted)",
                  marginBottom: "16px",
                }}
              >
                <ShoppingBag size={32} />
              </div>
              <h4
                className="serif-heading"
                style={{ fontSize: "20px", color: "var(--cocoa-dark)", marginBottom: "8px" }}
              >
                Your Tasting Box is Empty
              </h4>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--cocoa-muted)",
                  maxWidth: "260px",
                  lineHeight: 1.6,
                }}
              >
                Explore our artisan scoops, handcrafted tacos, or rich milkshakes to begin.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "16px",
                  padding: "16px",
                  borderRadius: "20px",
                  background: "var(--bg-cream-soft)",
                  border: "1px solid rgba(46, 27, 19, 0.08)",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "65px",
                    height: "65px",
                    flexShrink: 0,
                    borderRadius: "14px",
                    background: "#FFFFFF",
                    padding: "6px",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>

                <div style={{ flexGrow: 1 }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--berry-velvet)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {item.category}
                  </span>
                  <h4
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "var(--cocoa-dark)",
                      lineHeight: 1.3,
                      marginBottom: "6px",
                    }}
                  >
                    {item.name}
                  </h4>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--cocoa-rich)",
                    }}
                  >
                    ₹{item.price}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#FFFFFF",
                    border: "1px solid rgba(46, 27, 19, 0.1)",
                    borderRadius: "999px",
                    padding: "4px 8px",
                  }}
                >
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      display: "flex",
                      color: "var(--cocoa-rich)",
                    }}
                  >
                    <Minus size={14} />
                  </button>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      minWidth: "16px",
                      textAlign: "center",
                    }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      display: "flex",
                      color: "var(--cocoa-rich)",
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Checkout */}
        {cart.length > 0 && (
          <div
            style={{
              padding: "24px 28px",
              borderTop: "1px solid rgba(46, 27, 19, 0.08)",
              background: "var(--bg-cream-soft)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "18px",
              }}
            >
              <span style={{ fontSize: "14px", color: "var(--cocoa-muted)" }}>
                Total Order Value
              </span>
              <span
                className="serif-heading"
                style={{
                  fontSize: "30px",
                  fontWeight: 800,
                  color: "var(--cocoa-dark)",
                }}
              >
                ₹{totalPrice}
              </span>
            </div>

            {checkoutComplete ? (
              <div
                style={{
                  padding: "16px",
                  borderRadius: "16px",
                  background: "#DCFCE7",
                  color: "#166534",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                <CheckCircle2 size={20} />
                <span>Order Dispatched to Parlour! 🍨</span>
              </div>
            ) : (
              <button
                onClick={handleCheckout}
                className="btn-primary"
                style={{ width: "100%", padding: "16px", fontSize: "15px" }}
              >
                <span>Proceed To Flash Delivery</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
