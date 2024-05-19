import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="h-full shrink-0 bg-gradient-to-b from-black leading-none via-neutral-950 to-neutral-600 flex text-white [writing-mode:vertical-lr] py-2 items-center">
      <Link href="/">
        <h1 className="text-xl text-neutral-200 py-2 hover:text-white">
          yojijukugo.com
        </h1>
      </Link>

      <Link
        href="/"
        className="text-center font-semibold bg-neutral-50 text-black px-2 py-3 mt-4"
      >
        home
      </Link>

      <Link href="/about" className="text-center bg-black text-white px-2 py-3">
        about
      </Link>
    </nav>
  );
}
