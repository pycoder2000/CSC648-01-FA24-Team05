import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/app/components/navbar/Navbar";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SecondChance",
  description:
    "An eco-friendly platform for renting and listing second-hand items.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />

        <div className="pt-32">{children}</div>
      </body>
    </html>
  );
}
