import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Humand - Employee Super App",
  description: "Connect, collaborate, and thrive together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--background)]">
        <div className="max-w-lg mx-auto relative">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
