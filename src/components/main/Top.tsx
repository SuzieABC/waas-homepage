"use client";

import Image from "next/image";
import blue_head from "@/assets/images/Vector_blue_head.png";
import blue_tail from "@/assets/images/Vector_blue_tail.png";
import useWindowWidth from "@/utils/localization/hooks/useWindowWidth";

interface TopProps {
  title: string;
  locale: string;
}
// export default function Top({ title, locale }: TopProps) {
//   return (
//     <div className="w-full h-lvh relative flex items-center justify-center">
//       {/* 이미지 배경 */}
//       <div className="relative w-full px-[40px]">
//         <div className="flex w-full h-full items-end">
//           <Image src={blue_head} alt="head" height={810} />
//           <div className="w-full h-[747px] bg-[#3140F1] mt-[63px]"></div>
//           <Image src={blue_tail} alt="tail" height={810} />
//         </div>
//         {/* 텍스트와 버튼 */}
//         <div className="absolute top-[140px]">
//           <p className="text-[100px] pl-[160px]">{title}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function Top({ title, locale }: TopProps) {
  const { windowWidth, isMobile, isTablet, isDesktop, isLargeDesktop } =
    useWindowWidth();
  return (
    <div className="w-full h-lvh relative flex items-center justify-center">
      {/* 이미지 배경 */}
      <div className="relative w-full px-[40px]">
        <div className="flex w-full h-full items-end">
          <Image
            src={blue_head}
            alt="head"
            height={810}
            className={`${(isMobile || isTablet) && "min-w-[90px]"} h-[810px]`}
          />
          <div className="w-full h-[747px] bg-[red] mt-[63px]"></div>
          <Image
            src={blue_tail}
            alt="tail"
            height={810}
            className={`${(isMobile || isTablet) && "min-w-[177px]"} h-[810px]`}
          />
        </div>
        {/* 텍스트와 버튼 */}
        <div className="absolute top-[140px]">
          {/* <p className="text-[100px] pl-[160px]">{title}</p> */}
        </div>
      </div>
    </div>
  );
}
