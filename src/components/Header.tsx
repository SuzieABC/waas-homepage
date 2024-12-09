"use client";

import ChangeLocale from "./ChangeLocale";
import Link from "next/link";
import type { LocaleTypes } from "@/utils/localization/settings";
import { useParams } from "next/navigation";

export default function Header() {
  const locale = useParams()?.locale as LocaleTypes;
  return (
    <>
      <header className="flex justify-between border max-w-[1440px] mx-auto px-[40px] py-[16px]">
        <span>Company Logo</span>
        <nav className="flex">
          <Link href={`/${locale}`}>
            <span className="px-[10px]">Docs</span>
          </Link>
          <ChangeLocale />
        </nav>
      </header>
    </>
  );
}
