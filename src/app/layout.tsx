import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { DarkModeProvider } from '@/components/DarkModeProvider';
import { RatingProvider } from "@/contexts/RatingContext";
import TopNavbar from "@/components/Landing/TopNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PlanetMovies",
  description: "Your Best Movie App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className={`${inter.className} h-full bg-skin-fill text-skin-base`}>
          <DarkModeProvider>
          <RatingProvider>
            <div className="min-h-screen">
              {children}
            </div>
          </RatingProvider>
          </DarkModeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}