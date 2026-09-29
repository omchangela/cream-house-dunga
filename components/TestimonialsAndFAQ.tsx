"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ChevronDown, Sparkles, MessageCircle, MapPin, Clock, Phone } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "How does Cream House achieve such velvet silkiness without artificial stabilizers?",
    a: "We rely entirely on natural fat emulsion and high solids from morning-collected A2 whole farm milk. By cold-aging our cream mixture for 24 hours at 2°C, natural proteins bond with butterfat crystals. When slow-churned at -4°C with minimal air overrun (under 18%), the result is pure silk density.",
  },
  {
    q: "How does delivery keep ice cream frozen solid?",
    a: "All home deliveries are packed in insulated thermal-shield boxes with food-grade dry ice packs calibrated to maintain -20°C for up to 90 minutes. We guarantee zero melting upon doorstep arrival.",
  },
  {
    q: "Do you cater for weddings, anniversaries, and private dessert bars?",
    a: "Yes! Our mobile Churning Station brings live artisan gelato carving, waffle taco pressing, and bespoke flavour tailoring directly to your celebrations. Contact our parlour concierge to customize an event flight.",
  },
  {
    q: "What makes your fruit flavours different from standard ice cream?",
    a: "We never use synthetic essences or artificial coloring. Our Alphonso mango comes from Ratnagiri orchards, our wild strawberries are hand-picked from hill farmers, and our black currants are slow-simmered whole.",
  },
];

const testimonials = [
  {
    quote:
      "The Artisanal Gelato Taco is pure culinary genius. The waffle shell stays audibly crispy while the double berry mascarpone melts into liquid silk. Lightyears ahead of typical dessert parlours.",
    author: "Chef Rohan Verma",
    title: "Culinary Reviewer, Gourmet Digest",
    rating: 5,
    tag: "Artisanal Taco",
  },
  {
    quote:
      "You can immediately taste the difference that real whole milk and zero artificial stabilizers make. The Belgian Noir 70% bar has that unmistakable snap of authentic tempered chocolate.",
    author: "Pooja Singhania",
    title: "Verified Food Patron",
    rating: 5,
    tag: "Noir Chocobar",
  },
  {
    quote:
      "The Kesar Rajbhog and Royal Malai Kulfi taste like royal palace recipes from 100 years ago. Rich, dense, fragrant with real saffron, and not artificially oversweetened. Absolutely world-class.",
    author: "Vikram Malhotra",
    title: "Dessert Aficionado",
    rating: 5,
    tag: "Royal Kulfi",
  },
];

export default function TestimonialsAndFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: ".testimonials-grid-wrap",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.14,
        duration: 0.85,
        ease: "power3.out",
      });

      gsap.from(".faq-container-reveal", {
        scrollTrigger: {
          trigger: ".faq-container-reveal",
          start: "top 82%",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "120px 0",
        background: "#FFFFFF",
        position: "relative",
      }}
    >
      <div className="container-custom">
        {/* Testimonials Header */}
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 50px" }}>
          <div
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
              Tasting Notes & Acclaim
            </span>
          </div>

          <h2
            className="serif-heading"
            style={{
              fontSize: "clamp(32px, 4vw, 50px)",
              lineHeight: 1.15,
              color: "var(--cocoa-dark)",
              marginBottom: "16px",
            }}
          >
            Loved by Connoisseurs,{" "}
            <span className="italic-accent">Cherished by All.</span>
          </h2>
        </div>

        {/* Testimonials Grid with Stagger Reveal */}
        <div
          className="testimonials-grid-wrap"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
            marginBottom: "90px",
          }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="testimonial-card glass-panel"
              style={{
                padding: "36px 30px",
                borderRadius: "28px",
                background: "var(--bg-cream-soft)",
                border: "1px solid rgba(46, 27, 19, 0.08)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "var(--shadow-lg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ display: "flex", color: "#F59E0B" }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#F59E0B" />
                    ))}
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--berry-velvet)",
                      background: "var(--berry-soft)",
                      padding: "4px 10px",
                      borderRadius: "999px",
                    }}
                  >
                    {t.tag}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "var(--cocoa-rich)",
                    fontStyle: "italic",
                    marginBottom: "24px",
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--cocoa-dark)",
                  }}
                >
                  {t.author}
                </div>
                <div style={{ fontSize: "12.5px", color: "var(--cocoa-muted)" }}>
                  {t.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ & Parlour Details Grid */}
        <div
          className="faq-container-reveal faq-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "50px",
            alignItems: "start",
          }}
        >
          {/* FAQ Accordion with Smooth Sliding Transitions */}
          <div>
            <h3
              className="serif-heading"
              style={{
                fontSize: "30px",
                color: "var(--cocoa-dark)",
                marginBottom: "24px",
              }}
            >
              Frequently Asked Questions
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      borderRadius: "20px",
                      background: "var(--bg-cream-soft)",
                      border: "1px solid rgba(46, 27, 19, 0.08)",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      style={{
                        width: "100%",
                        padding: "20px 24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          color: isOpen ? "var(--berry-velvet)" : "var(--cocoa-dark)",
                          transition: "color 0.25s ease",
                        }}
                      >
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={20}
                        color="var(--cocoa-rich)"
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                          flexShrink: 0,
                          marginLeft: "12px",
                        }}
                      />
                    </button>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        transition: "grid-template-rows 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      <div style={{ overflow: "hidden" }}>
                        <div
                          style={{
                            padding: "0 24px 22px 24px",
                            fontSize: "14.5px",
                            lineHeight: 1.7,
                            color: "var(--cocoa-muted)",
                            borderTop: "1px solid rgba(46, 27, 19, 0.06)",
                            paddingTop: "14px",
                          }}
                        >
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Parlour Visit & Hours Card */}
          <div
            className="glass-panel"
            style={{
              padding: "36px 30px",
              borderRadius: "32px",
              background: "var(--bg-cream-warm)",
              border: "1px solid rgba(46, 27, 19, 0.1)",
              boxShadow: "0 15px 35px rgba(46, 27, 19, 0.06)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "999px",
                background: "#FFFFFF",
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--berry-velvet)",
                marginBottom: "16px",
              }}
            >
              ✦ Visit The Parlour
            </div>

            <h3
              className="serif-heading"
              style={{
                fontSize: "26px",
                color: "var(--cocoa-dark)",
                marginBottom: "20px",
              }}
            >
              Warm Waffles & Cold Churns
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <MapPin size={20} color="var(--berry-velvet)" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <div style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--cocoa-dark)" }}>
                    Cream House Flagship Parlour
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--cocoa-muted)", lineHeight: 1.5 }}>
                    Dunga Road, Main Avenue, Flagship Gelateria & Dessert Lounge
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <Clock size={20} color="var(--gold-honey)" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <div style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--cocoa-dark)" }}>
                    Opening Hours (Late Night Indulgence)
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--cocoa-muted)", lineHeight: 1.5 }}>
                    Monday – Sunday: 11:00 AM – 1:00 AM
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <Phone size={20} color="var(--pistachio-leaf)" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <div style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--cocoa-dark)" }}>
                    Direct Parlour Concierge
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--cocoa-muted)", lineHeight: 1.5 }}>
                    +91 98765 43210 • orders@creamhouse.com
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "26px",
                padding: "16px",
                borderRadius: "16px",
                background: "#FFFFFF",
                border: "1px solid rgba(46, 27, 19, 0.08)",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--cocoa-rich)" }}>
                Craving dessert right now? Order through our live cart or call directly!
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .faq-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
