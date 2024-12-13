"use client";

import ChangeLocale from "./ChangeLocale";
import Link from "next/link";
import type { LocaleTypes } from "@/utils/localization/settings";
import { useParams } from "next/navigation";

export default function Header() {
  const locale = useParams()?.locale as LocaleTypes;
  return (
    <div className="flex justify-center fixed w-full z-[9999]">
      <header className="flex justify-between max-w-[1920px] w-full mx-auto px-[40px] py-[16px]">
        <Link href={`/${locale}`} passHref>
          <span>Company Logo</span>
        </Link>
        <nav className="flex">
          <Link href={`/${locale}`} passHref>
            <span className="px-[10px]">Docs</span>
          </Link>
          <ChangeLocale />
        </nav>
      </header>
    </div>
  );
}
