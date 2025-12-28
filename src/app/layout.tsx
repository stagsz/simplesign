import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SimpleSign - E-signatures for Small Business",
  description:
    "Simple, transparent e-signature solution for Nordic small businesses. No hidden fees. No per-user pricing. Cancel anytime.",
  keywords: [
    "e-signature",
    "digital signature",
    "electronic signature",
    "docusign alternative",
    "e-signatur",
    "digital signatur",
  ],
  openGraph: {
    title: "SimpleSign - E-signatures for Small Business",
    description: "No hidden fees. No BS. Just simple e-signatures.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
