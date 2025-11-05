import "./globals.css";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "File Manager",
  description:
    "A simple file manager built with Next.js 16, Prisma and Tailwind",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white border-b">
            <div className="container py-4 flex items-center justify-between">
              <nav className="space-x-4 text-sm text-gray-600">
                <Link href="/">Dashboard</Link>
                <Link href="/files">Files</Link>
                <Link href="/categories">Categories</Link>
                <Link href="/passions">Passions</Link>
                <Link href="/visits">Visits</Link>
                <Link href="/rendezvous">Rendezvous</Link>
              </nav>
            </div>
          </header>

          <main className="container py-8">{children}</main>

          <footer className="border-t bg-white mt-12">
            <div className="container py-4 text-sm text-gray-500">
              © File Manager
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
