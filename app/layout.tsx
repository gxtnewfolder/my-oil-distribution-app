// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../src/styles/globals.css";
import Link from "next/link";
import Sidebar from "@app/components/common/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TATA Oil Distribution Centre",
  description:
    "TATA co. is a leading oil distribution center providing reliable and efficient fuel delivery services to our valued customers. With state-of-the-art facilities and a dedicated team, we ensure the timely and secure distribution of petroleum products across the region.",
    keywords: ["oil distribution", "fuel delivery", "petroleum products"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <head>
            <link rel="icon" href="/logo.png" sizes="any" />
        </head>
      <body className={inter.className}>
        <div className="flex">
          <Sidebar />
          <div className="container mx-auto p-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
