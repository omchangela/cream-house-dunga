"use client";
type CartItem = { name: string; price: number; qty: number };
type Props = { items: CartItem[]; onRemove: (i: number) => void; onClose: () => void };

export default function CartDrawer({ items, onRemove, onClose }: Props) {
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);
  return (
    <div id="cart-drawer" className="fixed inset-0 z-[200] pointer-events-none">
      {/* Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm" onClick={onClose}
        style={{ background: "rgba(61,28,2,0.4)", pointerEvents: "all" }} />

      {/* Drawer */}
      <div className="absolute top-0 right-0 h-full w-full max-w-[420px] flex flex-col shadow-[-24px_0_80px_rgba(61,28,2,0.2)]"
        style={{ background: "#FFFCF7", borderLeft: "1px solid rgba(212,134,58,0.15)", pointerEvents: "all" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid rgba(212,134,58,0.12)" }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-bg rounded-xl flex items-center justify-center">
              <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <h3 className="text-lg font-black" style={{ color: "#1A0A00" }}>Your Cart</h3>
            {items.length > 0 && (
              <span className="gradient-bg text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                {items.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center font-black transition-all duration-300 hover:gradient-bg hover:text-white"
            style={{ background: "rgba(212,134,58,0.08)", border: "1px solid rgba(212,134,58,0.2)", color: "#8B5E35" }}>
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
              <span className="text-6xl">🍦</span>
              <p className="font-bold" style={{ color: "#8B5E35" }}>Your cart is empty</p>
              <button onClick={onClose}
                className="gradient-bg text-white px-6 py-3 rounded-full text-sm font-bold shadow-[0_8px_24px_rgba(212,134,58,0.4)]">
                Browse Products
              </button>
            </div>
          ) : items.map((it, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl"
              style={{ background: "rgba(255,245,232,0.8)", border: "1px solid rgba(212,134,58,0.12)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: "rgba(212,134,58,0.1)" }}>🍦</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-black truncate" style={{ color: "#1A0A00" }}>
                  {it.name}{it.qty > 1 ? ` ×${it.qty}` : ""}
                </div>
                <div className="text-sm font-black gradient-text">₹{it.price * it.qty}</div>
              </div>
              <button onClick={() => onRemove(i)}
                className="w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center transition-all duration-200 hover:text-white hover:gradient-bg"
                style={{ background: "rgba(212,134,58,0.08)", color: "#D4863A", border: "1px solid rgba(212,134,58,0.2)" }}>
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 flex flex-col gap-4" style={{ borderTop: "1px solid rgba(212,134,58,0.12)" }}>
            <div className="flex justify-between items-center">
              <span className="font-bold" style={{ color: "#8B5E35" }}>Total</span>
              <span className="text-2xl font-black gradient-text">₹{total}</span>
            </div>
            <button className="w-full gradient-bg text-white py-4 rounded-2xl font-bold text-lg shadow-[0_8px_32px_rgba(212,134,58,0.4)] hover:opacity-90 hover:-translate-y-0.5 transition-all duration-300">
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
