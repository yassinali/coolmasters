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
    template: "%s | Better-Auth Tutorial",
    absolute: "Better-Auth Tutorial by Coding in Flow",
  },
  description:
    "Learn how to handle authentication in Next.js using Better-Auth with this tutorial by Coding in Flow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className={`${outfit.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
