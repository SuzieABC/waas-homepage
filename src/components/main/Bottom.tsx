"use client";

import Link from "next/link";
import useWindowWidth from "@/utils/localization/hooks/useWindowWidth";
import { useState, useEffect } from "react";
interface BottomProps {
  locale: string;
}
export default function Bottom({ locale }: BottomProps) {
  const { isMobile, isTablet } = useWindowWidth();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(true), 200);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      {isLoading && (
        <div
          className={`flex flex-col justify-center items-center ${
            isMobile || isTablet ? "py-[120px]" : "py-[220px]"
          }`}
        >
          <h1
            className={`${
              isMobile || isTablet
                ? "text-[40px] leading-[47.2px] mb-[20px]"
                : "text-[60px] leading-[78px] mb-[16px]"
            } text-center font-dmSansSemibold`}
          >
            Sustainable
            {(isMobile || isTablet) && <br />}
            Wallet Solution
          </h1>
          <p
            className={`${
              isMobile || isTablet
                ? "text-[20px] leading-[26px]"
                : "text-[30px] leading-[39px]"
            }  mb-[48px] text-center font-dmSansMedium`}
          >
            by AhnLab Blockchain Company
          </p>
          <Link href={`/${locale}/apply`} passHref>
            <button
              className={`bg-[#3140F1] py-[20px] rounded-[40px] ${
                isMobile || isTablet
                  ? "text-[18px] px-[36px]"
                  : "text-[22px] px-[40px]"
              } ${
                locale === "ko" ? "font-pretendardMedium" : "font-dmSansMedium"
              }`}
            >
              도입 문의
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
