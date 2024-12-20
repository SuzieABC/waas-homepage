"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { LocaleTypes } from "@/utils/localization/settings";
import useWindowWidth from "@/utils/localization/hooks/useWindowWidth";
import useEventListener from "@/utils/localization/hooks/useEventListener";
import ChangeLocale from "./ChangeLocale";
import logo from "@/assets/images/header_logo_image.png";

export default function Header() {
  const { windowWidth, isMobile, isTablet } = useWindowWidth();
  const locale = useParams()?.locale as LocaleTypes;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const updateHeaderStyles = () => {
    const scrollY = Math.max(0, window.scrollY); // 음수 방지
    setIsScrolled(scrollY > 10);
  };

  const handleScollNav = () => {
    const currentScrollY = Math.max(0, window.scrollY); // 음수 방지
    if (currentScrollY > lastScrollY) {
      setIsVisible(false); // 스크롤 다운 -> 헤더 숨김
    } else {
      setIsVisible(true); // 스크롤 업 -> 헤더 표시
    }
    setLastScrollY(currentScrollY);
  };

  useEventListener("scroll", updateHeaderStyles);
  useEventListener("scroll", handleScollNav);

  return (
    <div
      className={`flex justify-center fixed w-full z-[9999] ${
        isScrolled ? "bg-blue-700" : "bg-transparent"
      } transition-transform duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ visibility: windowWidth ? "visible" : "hidden" }}
    >
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
    </div>
  );
}
