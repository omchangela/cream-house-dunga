export default function Marquee() {
  const items = ["🍦 Taco Ice Cream", "✦", "🍫 Choco Bar", "✦", "🍬 Kulfi", "✦", "🍪 Oreo Stick", "✦", "🍡 Gone Stick", "✦", "🍫 Choco Crispy Bar", "✦", "🥜 Chocolate Nuts Bar", "✦"];
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="py-4 overflow-hidden relative"
      style={{ background: "linear-gradient(135deg, #2A0E00 0%, #5C2E08 50%, #2A0E00 100%)" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,200,100,0.06) 50%, transparent 100%)" }} />
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="px-6 text-sm font-black tracking-widest"
            style={{ color: i % 2 === 1 ? "#D4863A" : "rgba(255,230,180,0.95)" }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
