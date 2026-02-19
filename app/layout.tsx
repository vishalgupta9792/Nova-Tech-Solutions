import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bodyFont = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body" });
const headingFont = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Nova Tech Solutions | Complete Digital Management for Modern Schools",
  description:
    "Nova Tech Solutions helps private schools with website development, ERP systems, result management, social media, cloud security, and complete digital infrastructure.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg"
  },
  keywords: [
    "School ERP",
    "School Website Development",
    "Result Management System",
    "EdTech Solutions",
    "Private School Technology Partner"
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${headingFont.variable} bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
