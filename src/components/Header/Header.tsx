import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

const Header = () => {
  return (
    <header className="py-10 px-4 text-center w-full">
      {/* Navbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="font-black text-tertiary-light"
          >
            Golden Coast
          </Link>
          <ul className="ml-auto flex gap-4 items-center">
            <li className="flex gap-2 items-center">
              <Link href="/auth">
                <FaUserCircle className="cursor-pointer" />
              </Link>
            </li>
            <li>
              <MdDarkMode className="cursor-pointer" />
            </li>
          </ul>
        </div>

        {/* Navbar Links */}
        <ul className="flex gap-4 items-center justify-between mt-4">
          <li className="hover:-translate-y-1 duration-300 transition-all">
            <Link
              href="/"
              className=""
            >
              Home
            </Link>
          </li>
          <li className="hover:-translate-y-1 duration-300 transition-all">
            <Link
              href="/rooms"
              className=""
            >
              Rooms
            </Link>
          </li>
          <li className="hover:-translate-y-1 duration-300 transition-all">
            <Link
              href="/contact"
              className=""
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <h1>Golden Coast</h1>
    </header>
  );
};

export default Header;
