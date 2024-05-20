"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", text: "home" },
  { href: "/about", text: "about" },
];

export default function Navbar() {
  const path = usePathname();

  return (
    <nav className="h-full shrink-0 bg-gradient-to-b from-black leading-none via-neutral-950 to-neutral-600 flex text-white [writing-mode:vertical-lr] py-2 items-center">
      <Link href="/">
        <h1 className="text-xl text-neutral-200 py-2 hover:text-white">
          四字熟語.com
        </h1>
      </Link>

      {LINKS.map(({ href, text }) => (
        <Link
          key={href}
          href={href}
          className={cn("font-semibold bg-black text-white px-2 py-3 hover:bg-neutral-700 transition-colors", {
            "bg-neutral-50 text-black hover:bg-neutral-50": path === href,
          })}
        >
          {text}
        </Link>
      ))}
    </nav>
  );
}
