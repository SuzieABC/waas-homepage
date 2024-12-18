"use client";

import Image from "next/image";
import useWindowWidth from "@/utils/localization/hooks/useWindowWidth";
import logo from "@/assets/images/header_logo_image.png";
import { useState, useEffect } from "react";

export default function Footer() {
  const { isMobile, isTablet } = useWindowWidth();
  const footer = {
    Company: ["About Us", "Careers", "Press"],
    Docs: ["Whitepaper", "FAQ", "API Docs"],
    Connect: ["Twitter", "Facebook", "LinkedIn"],
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex justify-center w-full min-w-[320px] overflow-x-hidden">
      {isLoading && (
        <footer
          className={`max-w-[1920px] w-full mb-[40px] bg-[#181821] rounded-[40px] ${
            isMobile || isTablet
              ? "px-[20px] mx-[16.5px] py-[60px]"
              : "px-[40px] mx-[40px] pt-[48px] pb-[80px]"
          }`}
        >
          <div
            className={`flex justify-between items-start ${
              (isMobile || isTablet) && "flex-col"
            }`}
          >
            <Image
              src={logo}
              alt="ABC WaaS logo"
              width={isMobile || isTablet ? 126.9 : 151.79}
              height={18}
              className="pb-[40px]"
            />
            <div
              className={`flex gap-[20px] ${
                (isMobile || isTablet) && "flex-col"
              } gap-[36px] px-[4px]`}
            >
              {Object.entries(footer).map(([key, items]) => (
                <div
                  key={key}
                  className="flex flex-col gap-[10px] min-w-[200px]"
                >
                  <span className="text-[#ffffff] font-dmSansSemibold pb-[12px]">
                    {key}
                  </span>
                  {items.map((item) => (
                    <span
                      key={item}
                      className="text-[#cccccc] font-dmSansRegular"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p
            className={`text-[#888888] mt-[20px] ${
              isMobile && "text-[11px] mt-[36px] px-[8px] font-dmSansRegular"
            }`}
          >
            © AhnLab Blockchain Company. All rights reserved.
          </p>
        </footer>
      )}
    </div>
  );
}
