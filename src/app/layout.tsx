import type { Metadata } from "next";
import type { ReactNode } from "react";
import { team } from "@/content/config";
import { title } from "@/content/content";
import { monaSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: team.productName,
  description: title.tagline,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${monaSans.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
