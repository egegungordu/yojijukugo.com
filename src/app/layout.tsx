import type { Metadata } from "next";
import {
  Inter,
  M_PLUS_Rounded_1c,
  Shippori_Mincho,
  Zen_Maru_Gothic,
} from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar";
//
// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
//   adjustFontFallback: false,
// });
// const mPlusRounded1c = M_PLUS_Rounded_1c({
//   weight: "400",
//   subsets: ["latin-ext"],
//   display: "swap",
//
//   adjustFontFallback: false,
// });
// const zenMaruGothic = Zen_Maru_Gothic({
//   weight: "400",
//   subsets: ["latin-ext"],
//   display: "swap",
//
//   adjustFontFallback: false,
// });
const shipporiMincho = Shippori_Mincho({
  weight: "500",
  subsets: ["latin-ext"],
  display: "swap",

  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "四字熟語.com",
  description: "Daily dose of Japanese four-character idioms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full bg-neutral-50"
      data-font-family={shipporiMincho.style.fontFamily}
    >
      <body className={`${shipporiMincho.className} h-full flex`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
