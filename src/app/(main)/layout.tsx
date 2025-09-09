// app/layout.tsx
import { Navbar } from "./navbar";
import "../globals.css"; // caso use CSS global
import { Outfit } from "next/font/google";
import { Metadata } from "next";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Coolmastersmz",
    absolute: "Coolmastersmz , a tua loja de electrodomésticos",
  },
  description:
    "Coolmastersmz , a tua loja de electrodomésticos. Encontre as melhores ofertas em eletrodomésticos de alta qualidade para sua casa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
