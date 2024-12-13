"use client";

import { useState, useRef } from "react";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import Image from "next/image";
import worldIcon from "@/assets/icons/world_light.png";
import useEventListener from "@/utils/localization/hooks/useEventListener";

export default function ChangeLocale() {
  const router = useRouter();
  const urlSegments = useSelectedLayoutSegments();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운을 감지할 ref
  const LANGUAGES = [
    { code: "ko", label: "한국어" },
    { code: "en", label: "English" },
  ];

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
        className="flex items-center justify-center w-[40px] h-[40px]"
      >
        <Image
          src={worldIcon}
          alt="Select Locale"
          className="w-full h-full object-cover"
        />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <ul className="absolute mt-2 bg-white border rounded shadow-md text-black">
          {LANGUAGES.map((item) => (
            <li
              key={item.code}
              onClick={() => handleLocaleChange(item.code)}
              className="flex items-center gap-2 p-2 cursor-pointer"
            >
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
