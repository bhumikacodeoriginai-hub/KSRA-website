import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--nf-display", weight: ["400", "600", "700", "800"] });
const body = Inter({ subsets: ["latin"], variable: "--nf-body" });

export const metadata: Metadata = {
  title: { default: "Karnataka State Rifle Association — K.S.R.A", template: "%s · K.S.R.A" },
  description:
    "Karnataka State Rifle Association (K.S.R.A): world-class 10m, 25m, 50m and Trap & Skeet ranges at the SAI complex, Bengaluru. Events, results, coaching and membership.",
  icons: { icon: "/ref/logo_2.jpg" },
};

export const viewport: Viewport = { themeColor: "#06061a" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="has-cursor antialiased">
        <SmoothScroll>
          <ScrollProgress />
          <Cursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
