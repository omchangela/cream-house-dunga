import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cream House | Artisanal Handcrafted Gelato & Confections",
  description:
    "Experience velvet, slow-churned artisanal gelato, handcrafted dessert tacos, royal kulfis, and thick frosted milkshakes made from 100% farm fresh cream since 1995.",
  keywords: [
    "Cream House",
    "Artisanal Gelato",
    "Ice Cream Parlour",
    "Handcrafted Ice Cream",
    "Dessert Taco",
    "Malai Kulfi",
    "Gourmet Milkshakes",
  ],
  icons: {
    icon: "/images/nav-log-bg.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/nav-log-bg.webp" />
      </head>
      <body>{children}</body>
    </html>
  );
}
