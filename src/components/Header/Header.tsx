"use client";

import ThemeContext from "@/context/themeContext";
import Link from "next/link";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

const Header = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

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
              {darkTheme ? (
                <MdOutlineLightMode
                  className="cursor-pointer"
                  onClick={() => {
                    setDarkTheme(false);
                    localStorage.removeItem("theme");
                  }}
                />
              ) : (
                <MdDarkMode
                  className="cursor-pointer"
                  onClick={() => {
                    setDarkTheme(true);
                    localStorage.setItem("theme", "dark");
                  }}
                />
              )}
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
