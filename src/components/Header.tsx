"use client";

import Link from "next/link";
import type { LocaleTypes } from "@/utils/localization/settings";
import { useParams } from "next/navigation";
import Image from "next/image";
import ChangeLocale from "./ChangeLocale";
import useWindowWidth from "@/utils/localization/hooks/useWindowWidth";
import useEventListener from "@/utils/localization/hooks/useEventListener";
import logo from "@/assets/images/header_logo_image.png";
import { useState, useEffect } from "react";

export default function Header() {
  const { isMobile, isTablet } = useWindowWidth();
  const locale = useParams()?.locale as LocaleTypes;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  const handleScrollBackground = () => {
    setIsScrolled(window.scrollY > 10);
  };

  const handleScollNav = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEventListener("scroll", handleScrollBackground);
  useEventListener("scroll", handleScollNav);

  return (
    <div
      className={`flex justify-center fixed w-full z-[9999] ${
        isScrolled ? "bg-blue-700" : "bg-transparent"
      } transition-transform duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {isLoading && (
        <header
          className={`flex justify-between items-center max-w-[1920px] w-full mx-auto px-[40px] ${
            isMobile || isTablet
              ? "pl-[20px] pr-[16px] h-[60px] "
              : "px-[80px] h-[80px] "
          }`}
        >
          <Link href={`/${locale}`} passHref>
            <Image
              src={logo}
              alt="ABC WaaS logo"
              width={isMobile || isTablet ? 119 : 152.05}
              height={isMobile || isTablet ? 17 : 22.5}
            />
          </Link>
          <nav className="flex items-center">
            <Link href={`/${locale}`} passHref className="p-[16px]">
              <span className="px-[10px] text-[15px]">Docs</span>
            </Link>
            <ChangeLocale />
          </nav>
        </header>
      )}
    </div>
  );
}
