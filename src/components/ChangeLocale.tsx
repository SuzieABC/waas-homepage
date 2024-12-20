"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import Image from "next/image";
import worldIcon from "@/assets/icons/world_light.png";
import useEventListener from "@/utils/localization/hooks/useEventListener";

export default function ChangeLocale() {
  const router = useRouter();
  const urlSegments = useSelectedLayoutSegments();
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(
    typeof window !== "undefined" && localStorage.getItem("i18nextLng")
  );
  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운을 감지할 ref
  const LANGUAGES = [
    { code: "ko", label: "한국어" },
    { code: "en", label: "ENGLISH" },
  ];

  // Initialize language state safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("i18nextLng");
      setLanguage(storedLanguage || "en"); // Default to "en" if not found
    }
  }, []);

  const handleLocaleChange = (locale: string) => {
    setIsOpen(false); // 드롭다운 닫기
    router.push(`/${locale}/${urlSegments.join("/")}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false); // 드롭다운 닫기
    }
  };

  useEventListener("mousedown", handleClickOutside);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 드롭다운 버튼 (이미지 클릭) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-[40px] h-[40px] p-[8px]"
      >
        <Image
          src={worldIcon}
          alt="Select Locale"
          className="w-full h-full object-cover"
        />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <ul className="absolute mt-2 bg-white border rounded-[12px] shadow-md text-black px-[12px] right-0">
          {LANGUAGES.map((item, index) => (
            <li
              key={item.code}
              onClick={() => handleLocaleChange(item.code)}
              className={`flex flex-col items-center justify-center gap-2 cursor-pointer my-[12px] ${
                language === "ko" && index === 0
                  ? "font-pretendardSemibold text-red-500"
                  : "font-dmSansRegular"
              } ${
                language === "en" && index === 1
                  ? "font-dmSansSemibold text-red-600"
                  : "font-pretendardRegular"
              }`}
            >
              <span>{item.label}</span>
              {index === 0 && (
                <div className="h-[1px] bg-black/20 w-full"></div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
