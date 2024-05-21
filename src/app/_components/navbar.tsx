"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", text: "home" },
  { href: "/about", text: "about" },
];

function ThemeSwitcher({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <button
      className={cn("text-white overflow-hidden p-2", className)}
      suppressHydrationWarning
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <img
          key="light"
          src="/aka.svg"
          alt="Light mode"
          className="size-5 text-white transition-transform animate-in fade-in-0 zoom-in-75 duration-200"
        />
      ) : (
        <img
          key="dark"
          src="/kura.svg"
          alt="Dark mode"
          className="size-5 text-white transition-transform animate-in fade-in-0 zoom-in-75 duration-200"
        />
      )}
    </button>
  );
}

export default function Navbar() {
  const path = usePathname();

  return (
    <nav className="h-full shrink-0 bg-gradient-to-b from-black leading-none via-neutral-950 to-neutral-900 flex [writing-mode:vertical-lr] items-center border-r">
      <Link href="/" className="py-2 w-full flex items-center justify-center">
        <img
          src="/logo.svg"
          alt="四字熟語.com"
          className="size-5 text-white mx-auto hover:scale-105 transition-transform"
        />
      </Link>

      {LINKS.map(({ href, text }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "font-semibold bg-black text-white pr-2 py-3 hover:bg-neutral-700 transition-colors pl-[13px]",
            {
              "bg-neutral-50 text-black hover:bg-neutral-50": path === href,
            },
          )}
        >
          {text}
        </Link>
      ))}

      <ThemeSwitcher className="mt-auto mb-2" />
    </nav>
  );
}
