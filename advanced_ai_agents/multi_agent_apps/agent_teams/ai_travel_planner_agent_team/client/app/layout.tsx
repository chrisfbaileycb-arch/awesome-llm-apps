import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import MasterAuthGuard from "@/components/master-auth-guard";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TripCraft AI",
  description: "Your Journey, Perfectly Crafted with Intelligence",
  openGraph: {
    title: "TripCraft AI",
    description: "Your Journey, Perfectly Crafted with Intelligence",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        <MasterAuthGuard>
          <Header />
          {children}
          <Footer />
        </MasterAuthGuard>
        <Toaster />
      </body>
    </html>
  );
}
