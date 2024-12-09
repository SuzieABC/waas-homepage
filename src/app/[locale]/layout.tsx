import React from "react";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="max-w-[1440px] mx-auto border">{children}</main>
      <Footer />
    </>
  );
}
