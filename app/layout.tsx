import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const font = Inter ({
  weight:["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Chat Bot",
  description: "Simple app created using Next.js and OpenRouter API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body
        className={`${font.className} antialiased bg-[#0a0f2c]`}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
