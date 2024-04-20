import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "./header";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/toaster"
import { Footer } from "./footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevPeerFinder",
  description: "An application for finding other developers to pair program with.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
        <Toaster />
        <NextTopLoader />
          <Header />
          <div className="container mx-auto">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
