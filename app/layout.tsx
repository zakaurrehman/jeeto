import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jeeto.pk - Win Premium Tech & Luxury Cars",
  description: "Trusted Pakistani Lucky Draw Platform. Win iPhones, iPads, Apple Watches, and Mercedes from just PKR 50. Secure, Transparent, Shariah Friendly.",
  keywords: "lucky draw Pakistan, win iPhone, win car, jeeto.pk, online raffle Pakistan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
