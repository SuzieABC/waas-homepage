import image from "@/assets/images/why_abc_1_image.png";
import Image from "next/image";
import useWindowWidth from "@/utils/localization/hooks/useWindowWidth";

interface CardProps {
  title: string;
  description: string;
  locale: string;
}
export default function Card({ title, description, locale }: CardProps) {
  const { isMobile, isTablet, isDesktop } = useWindowWidth();
  return (
    <div
      className={`flex flex-col flex-1 rounded-3xl bg-gradient-to-b from-[#b4bbff] via-[#d1e0ff] to-white text-black ${
        isMobile || isTablet
          ? "gap-[24px] p-[24px]"
          : isDesktop
          ? "gap-[36px] p-[40px]"
          : "gap-[80px] p-[40px]"
      }`}
    >
      <Image
        src={image}
        alt="card_image"
        width={isMobile ? 64 : isTablet ? 80 : isDesktop ? 100 : 100}
      />
      <div className="min-h-[100px]">
        <p
          className={`mb-[8px] ${
            isMobile || isTablet ? "text-[20px]" : "text-[28px]"
          } ${
            locale === "ko" ? "font-pretendardSemibold" : "font-dmSansSemibold"
          }`}
        >
          {title}
        </p>
        <span
          className={`${isMobile || isTablet ? "text-[16px]" : "text-[20px]"} ${
            locale === "ko" ? "font-pretendardRegular" : "font-dmSansRegular"
          }`}
        >
          {description}
        </span>
      </div>
    </div>
  );
}
