import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Volea",
  description: "Gerencie sua escola.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
        <body>
          <AuthProvider>{children}</AuthProvider> {/* Envolvendo o children */}
        </body>
    </html>
  );
}
