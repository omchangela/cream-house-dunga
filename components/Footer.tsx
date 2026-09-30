import Image from "next/image";

export default function Footer() {
  const links = {
    "Quick Links": ["Home", "Products", "About", "Flavours", "Reviews"],
    "Products": ["Taco Ice Cream", "Kulfi", "Choco Bar", "Oreo Stick", "Gone Stick"]
  };

  return (
    <footer className="pt-20 pb-0 relative"
      style={{ background: "#1F0D00", borderTop: "1px solid rgba(212,134,58,0.15)" }}>
      {/* Warm glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(212,134,58,0.1) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/images/nav-log-bg.webp"
                alt="Cream House Logo"
                width={130}
                height={45}
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: "rgba(255,200,150,0.55)" }}>
              Premium handcrafted ice creams made with fresh milk and natural ingredients since 1995. Every scoop crafted with love.
            </p>
            <div className="flex gap-3">
              {["📸", "👍", "🐦", "💬"].map((icon, i) => (
                <a key={i} href="#"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:gradient-bg"
                  style={{ background: "rgba(212,134,58,0.08)", border: "1px solid rgba(212,134,58,0.15)" }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-black text-sm mb-5 tracking-widest uppercase"
                style={{ color: "rgba(255,220,180,0.85)" }}>{title}</h4>
              <ul className="flex flex-col gap-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm transition-colors duration-200 hover:text-[#D4863A]"
                      style={{ color: "rgba(255,200,150,0.5)" }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 flex flex-wrap justify-between gap-3 text-xs"
          style={{ borderTop: "1px solid rgba(212,134,58,0.1)", color: "rgba(255,200,150,0.35)" }}>
          <span>© 2025 Cream House. All rights reserved. Made with ❤️ in India.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#D4863A] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#D4863A] transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
