import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Coolmastersmz",
    absolute: "Coolmastersmz",
  },
  description:
    "Compre os eletrodomésticos e eletro portáteis na Coolmasters. Air fryer, geleiras, lavaroupas, ar condicionado, climatizador e muito mais. Aproveite!z",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">
            {children}

            <Toaster />
          </main>
        </div>
      </body>
    </html>
  );
}
