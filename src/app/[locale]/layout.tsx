import React from "react";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="max-w-[1920px] min-w-[320px] mx-auto">{children}</main>
      <Footer />
    </>
  );
}
