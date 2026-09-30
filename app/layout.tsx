import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cream House | Premium Ice Cream Since 1995",
  description: "Premium handcrafted ice creams made with fresh milk, natural ingredients and unforgettable flavours. Every scoop is prepared with love.",
  keywords: "Ice Cream, Cream House, Premium Ice Cream, Kulfi, Taco, Choco Bar",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900;1000&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
