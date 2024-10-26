import AddItemModal from "@/app/components/modals/AddItemModal";
import LoginModal from "@/app/components/modals/LoginModal";
import SearchModal from "@/app/components/modals/SearchModal";
import SignupModal from "@/app/components/modals/SignupModal";
import Navbar from "@/app/components/navbar/Navbar";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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

        <LoginModal />
        <SearchModal />
        <SignupModal />
        <AddItemModal />
      </body>
    </html>
  );
}
