import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="max-w-[1920px] min-w-[320px] mx-auto overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
}
