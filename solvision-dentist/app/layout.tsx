import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solvision Dentist",
  description: "Mortgage and tax planning dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50">
        <header className="border-b border-zinc-200 bg-white">
          <nav className="mx-auto flex h-14 w-full max-w-7xl items-center gap-6 px-4 md:px-8">
            <Link href="/" className="text-sm font-semibold text-zinc-900">
              Home
            </Link>
            <Link href="/coded" className="text-sm font-semibold text-zinc-900">
              Coded
            </Link>
          </nav>
        </header>
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
