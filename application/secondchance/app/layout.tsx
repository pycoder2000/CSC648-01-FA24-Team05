import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AddItemModal from "./components/modals/AddItemModal";
import LoginModal from "./components/modals/LoginModal";
import SearchModal from "./components/modals/SearchModal";
import SignupModal from "./components/modals/SignupModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SecondChance",
  description: "Platform for renting second-hand items, promoting sustainability",
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

        <div className="pt-32">
          {children}
        </div>

        <LoginModal />
        <SearchModal />
        <SignupModal />
        <AddItemModal />
      </body>
    </html>
  );
}