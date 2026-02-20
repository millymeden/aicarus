import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-gray-100 h-25 px-6 shadow-md flex items-center justify-between">
      <Link href="/" className="flex items-center leading-none">
        <Image
          src="/logo.png"
          alt="Aicarus Logo"
          width={1036}
          height={704}
          className="block h-15 w-auto translate-y-[4px]"
          priority
        />
      </Link>

      <ul className="flex items-center space-x-6">
        <li>
          <Link href="/about" className="text-black hover:text-blue-600 hover:font-semibold">
            About
          </Link>
        </li>
        <li>
          <Link href="/blog" className="text-black hover:text-blue-600 hover:font-semibold">
            Making Sense of AI?
          </Link>
        </li>
        <li>
          <Link href="/basics" className="text-black hover:text-blue-600 hover:font-semibold">
            The Basics
          </Link>
        </li>
        <li>
          <Link href="/visual" className="text-black hover:text-blue-600 hover:font-semibold">
            Where Are We Now?
          </Link>
        </li>
      </ul>
    </nav>
  );
}