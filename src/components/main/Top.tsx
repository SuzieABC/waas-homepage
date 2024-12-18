"use client";

import Image from "next/image";
import blue_head from "@/assets/images/top/blue_card_head_image.png";
import blue_tail from "@/assets/images/top/blue_card_tail_image.png";
import useWindowWidth from "@/utils/localization/hooks/useWindowWidth";
import sphere from "@/assets/images/top/sphere_image.png";
import star from "@/assets/images/top/star_image.png";
import curve from "@/assets/images/top/curve_image.png";
import line from "@/assets/images/top/line_image.png";
import sphereLine from "@/assets/images/top/sphere_line_image.png";

import blue_card_head_360 from "@/assets/images/top/360_blue_card_head.png";
import blue_card_tail_360 from "@/assets/images/top/360_blue_card_tail.png";
import { useTranslation } from "@/utils/localization/client";
import { useParams } from "next/navigation";
import type { LocaleTypes } from "@/utils/localization/settings";
import { useState, useEffect } from "react";

export default function Top() {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "main");
  const { isMobile, isTablet, isDesktop, isLargeDesktop } = useWindowWidth();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(true), 200);

    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    return () => {
      clearTimeout(timeout);
      window.history.scrollRestoration = "auto";
    };
  }, []);

  return (
    <div
      className={`w-full h-lvh relative whitespace-pre overflow-hidden flex items-center justify-center ${
        isMobile || isTablet ? "pt-[60px]" : "pt-[80px]"
      }`}
    >
      {isLoading && (
        <div
          className={`w-full relative !will-change-transform ${
            isMobile
              ? "px-[12px] mt-[40px] mb-[40px]"
              : isTablet
              ? "px-[20px]"
              : "px-[40px]"
          }`}
        >
          {(isMobile || isTablet) && (
            <div className="flex w-full items-end">
              <Image
                src={blue_card_head_360}
                alt="mobile_head"
                height={618}
                priority
              />
              <div className="w-full h-[572px] bg-[#3140F1]" />
              <Image
                src={blue_card_tail_360}
                alt="mobile_tail"
                height={618}
                priority
              />
            </div>
          )}

          {(isDesktop || isLargeDesktop) && (
            <div className="flex w-full items-end">
              <Image src={blue_head} alt="head" height={810} priority />
              <div className="w-full h-[747px] bg-[#3140F1] mt-[63px]"></div>
              <Image src={blue_tail} alt="tail" height={810} priority />
            </div>
          )}

          {!isMobile && (
            <Image
              src={line}
              alt="line shape"
              className="absolute bottom-0 right-0"
              width={isTablet ? 322 : 454.03}
            />
          )}
          {!isMobile && (
            <Image
              src={sphere}
              alt="sphere shape"
              className={`animate-float absolute ${
                isTablet
                  ? "top-[264px] right-[-40px]"
                  : "top-[207px] right-[46px]"
              }`}
              width={isTablet ? 360 : 508}
            />
          )}

          {isMobile && (
            <Image
              src={sphereLine}
              alt="line shape"
              width={245}
              className="animate-float absolute top-[264px] right-[-50px]"
            />
          )}
          <Image
            src={star}
            alt="star shape"
            className={`animate-float absolute ${
              isMobile
                ? "left-[42px] top-[462.62px]"
                : isTablet
                ? "left-[49px] top-[445px]"
                : "left-[144px] top-[494px]"
            }`}
            width={isMobile ? 110.77 : isTablet ? 130 : 246}
          />
          <Image
            src={curve}
            alt="curve shape"
            className={`animate-float absolute top-[14px]  ${
              isMobile
                ? "left-[100px]"
                : isTablet
                ? "left-[179px]"
                : "left-[394px]"
            }`}
            width={isMobile ? 68.61 : isTablet ? 78 : 121}
          />
          <div
            className={`absolute ${
              isMobile
                ? "top-[98px] left-[40px]"
                : isTablet
                ? "top-[100px] left-[80px]"
                : isDesktop
                ? "top-[140px] left-[134px]"
                : "top-[140px] left-[200px]"
            }`}
          >
            <p
              className={`font-dmSansSemibold ${
                isMobile
                  ? "text-[56px] leading-[67.2px]"
                  : isTablet
                  ? "text-[66px] leading-[83.16px]"
                  : "text-[100px] leading-[120px]"
              }`}
            >
              {t("top.title_1")}
              <br />
              {t("top.title_2")}&nbsp;
              {isMobile && <br />}
              {t("top.title_3")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
