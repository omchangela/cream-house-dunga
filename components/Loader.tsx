"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const texts = ["Crafting happiness...", "Scooping perfection...", "Almost ready..."];

  useEffect(() => {
    const steps = 100;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setProgress(i);
      if (i >= steps) {
        clearInterval(t);
        setTimeout(() => {
          setLeaving(true);
          setTimeout(onDone, 900);
        }, 300);
      }
    }, 22);
    return () => clearInterval(t);
  }, [onDone]);

  const txt = progress < 40 ? texts[0] : progress < 85 ? texts[1] : texts[2];

  return (
    <div className={`fixed inset-0 z-[999] flex items-center justify-center ${leaving ? "loader-out" : ""}`}
      style={{ background: "linear-gradient(135deg, #FFF8EE 0%, #FFE0A0 50%, #FFD080 100%)" }}>
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(192,76,42,0.15) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,134,58,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="flex flex-col items-center gap-8 relative z-10">
        <div className="flex flex-col items-center gap-3">
          <div
            className="flex items-center px-6 py-3 rounded-full shadow-2xl animate-bounce-ice"
            style={{
              background: "#2A0E00",
              border: "2px solid rgba(192, 76, 42, 0.4)",
            }}
          >
            <Image
              src="/images/nav-log-bg.webp"
              alt="Cream House"
              width={140}
              height={50}
              className="h-10 w-auto object-contain"
              priority
            />
          </div>
          <p className="text-xs font-black tracking-[0.25em] uppercase" style={{ color: "#7A3E10" }}>Premium Ice Cream</p>
        </div>

        <div className="w-72 flex flex-col gap-2">
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(192,76,42,0.15)" }}>
            <div className="h-full rounded-full transition-all duration-75 relative overflow-hidden"
              style={{ width: `${progress}%`, background: "linear-gradient(135deg, #C04C2A, #D4863A)" }}>
              <div className="animate-shimmer absolute inset-0"
                style={{ background: "linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)" }} />
            </div>
          </div>
          <div className="flex justify-between text-xs font-black" style={{ color: "#6B3010" }}>
            <span>{txt}</span>
            <span>{progress}%</span>
          </div>
        </div>

        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2 h-2 rounded-full"
              style={{ background: "linear-gradient(135deg, #C04C2A, #D4863A)", animation: `pulseDot 1.4s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
