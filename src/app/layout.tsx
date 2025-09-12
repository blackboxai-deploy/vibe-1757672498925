import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToasterProvider } from "../components/providers/toaster-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Voice BlackBox Dashboard | Enterprise Cloud Orchestration",
  description: "Voice-controlled cloud worker deployment with BlackBox AI integration and collaborative features",
  keywords: "voice control, cloud workers, BlackBox AI, enterprise automation, Cloudflare Workers",
  authors: [{ name: "Enterprise Voice AI Team" }],
  openGraph: {
    title: "Voice BlackBox Dashboard",
    description: "Enterprise voice-controlled cloud orchestration system",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-900 text-white min-h-screen`}>
        {children}
        <ToasterProvider />
      </body>
    </html>
  );
}