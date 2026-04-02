import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import OfferModal from "@/components/lead modal/ModalForm";
import { Toaster } from "react-hot-toast";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Health",
  description: "Your Health, Our Priority",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[var(--font-outfit)]">
        <Toaster position="top-center" reverseOrder={false} />
        <Header />
        <OfferModal />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}