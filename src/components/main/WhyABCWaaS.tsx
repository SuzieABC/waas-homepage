"use client";

import head from "@/assets/images/white_card_head.png";
import Image from "next/image";
import card2Data from "@/data/why_abc_waas_2.json";
import { useParams } from "next/navigation";
import { useTranslation } from "@/utils/localization/client";
import type { LocaleTypes } from "@/utils/localization/settings";
import useWindowWidth from "@/utils/localization/hooks/useWindowWidth";
import pic1 from "@/assets/images/whyAbcWaas/pic1.png";
import white_card_head_360 from "@/assets/images/whyAbcWaas/360_white_card_head.png";
import white_card_tail_360 from "@/assets/images/whyAbcWaas/360_white_card_tail.png";
import { useState, useEffect } from "react";

export default function WhyABCWaaS() {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "main");
  const { isMobile, isTablet, isDesktop, isLargeDesktop } = useWindowWidth();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`${
        isMobile
          ? "mt-[80px]"
          : isTablet
          ? "mt-[100px]"
          : isDesktop
          ? "mt-[100px]"
          : "mt-[240px]"
      }`}
    >
      {isLoading && (
        <div
          className={`bg-[#3140F1] w-full text-black grid ${
            isMobile
              ? "rounded-[28px] pt-[80px] pb-[124px] px-[20px] grid-cols-1 gap-[60px]"
              : isTablet
              ? "rounded-[40px] py-[100px] px-[20px] grid-cols-2 gap-[16px]"
              : isDesktop
              ? "rounded-[80px] py-[200px] px-[40px] grid-cols-1 gap-[120px]"
              : "rounded-[80px] py-[200px] px-[40px] grid-cols-1 gap-[120px]"
          }`}
        >
          {card2Data.map((data, index) => (
            <div
              key={data.id}
              className={`flex w-full h-full relative !will-change-transform ${
                isTablet && (index === 0 || index === 1) && "pb-[24px]"
              }`}
            >
              <Image
                src={isMobile || isTablet ? white_card_head_360 : head}
                alt="head of the card"
                height={isMobile || isTablet ? 576 : 620}
              />
              <div
                className={`w-full bg-[#F0F1F4] ${
                  isMobile || isTablet
                    ? "h-[534px]"
                    : "h-[620px] rounded-tr-[50px] rounded-br-[50px]"
                }`}
              />
              <Image
                src={
                  isMobile || isTablet
                    ? white_card_tail_360
                    : white_card_tail_360
                }
                alt="tail of the card"
                height={isMobile || isTablet ? 576 : 620}
                className={`${(isDesktop || isLargeDesktop) && "hidden"}`}
              />

              <div
                className={`absolute ${
                  isMobile || isTablet
                    ? "top-[40px] left-[19px]"
                    : isDesktop
                    ? "top-[80px] left-[80px]"
                    : "top-[80px] left-[120px]"
                }`}
              >
                <p
                  className={`${
                    locale === "ko" ? "font-pretendardBold" : "font-dmSansBold"
                  } whitespace-pre-wrap ${
                    isMobile || isTablet
                      ? "text-[34px] leading-[44.2px] pb-[16px] tracking-[-0.96px]"
                      : "text-[64px] leading-[74.24px] pb-[24px] tracking-[-1.92px]"
                  }`}
                >
                  {t(data.title)}
                </p>
                <span
                  className={`whitespace-pre-wrap ${
                    isMobile || isTablet ? "text-[16px]" : "text-[24px]"
                  } ${
                    locale === "ko"
                      ? "font-pretendardMedium"
                      : "font-dmSansMedium"
                  }`}
                >
                  {t(data.description)}
                </span>
              </div>
              <Image
                src={pic1}
                alt="image"
                width={isMobile || isTablet ? 257.15 : 420}
                className={`absolute ${
                  isMobile || isTablet
                    ? "top-[236px] left-1/2 transform -translate-x-1/2"
                    : isDesktop
                    ? "top-[114px] right-[80px]"
                    : "top-[114px] right-[120.1px]"
                } `}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
