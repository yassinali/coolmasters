import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Outfit } from "next/font/google";
import "../globals.css";
import Header from "@/components/headerMain";
import Footer from "@/components/footer";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">
              <Header />
              {children}
              <Footer />

              <Toaster />
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
