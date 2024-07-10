import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { DarkModeProvider } from '@/components/DarkModeProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CineVault",
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
            <div className="min-h-screen">
              {children}
            </div>
          </DarkModeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}