"use client";

import useWindowWidth from "@/utils/localization/hooks/useWindowWidth";

export default function Footer() {
  const { windowWidth, isMobile, isTablet, isDesktop, isLargeDesktop } =
    useWindowWidth();
  return (
    <div className="flex justify-center w-full min-w-[320px] overflow-x-hidden">
      <footer className="max-w-[1920px] w-full m-[40px] bg-[#181821] px-[40px] pt-[48px] pb-[80px] rounded-[40px] ">
        <div className="flex justify-between">
          <span>Company Logo</span>
          <div>menus</div>
        </div>

        <p>© AhnLab Blockchain Company. All rights reserved.</p>
      </footer>
    </div>
  );
}
