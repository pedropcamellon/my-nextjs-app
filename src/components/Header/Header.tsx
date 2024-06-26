"use client";

import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { signIn, useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ThemeContext from "@/context/themeContext";
import toast from "react-hot-toast";

const Header = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  const { data: session } = useSession();

  const router = useRouter();

  const pathname = usePathname();

  const loginHandler = async () => {
    try {
      await signIn();
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Something wen't wrong");
    }
  };

  return (
    <header className="py-10 px-4 container mx-auto text-xl flex flex-wrap md:flex-nowrap items-center justify-between">
      <div className="flex items-center">
        {/* Logo */}

        <Link href="/" className="font-black text-tertiary-dark">
          Golden Coast
        </Link>

        {/* END - Logo */}
      </div>

      <ul className="flex gap-8 justify-center items-center mt-4">
        <li className="hover:-translate-y-2 duration-500 transition-all">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:-translate-y-2 duration-500 transition-all">
          <Link href="/rooms">Rooms</Link>
        </li>

        {/* TODO - Add contact page */}
        {/* <li className="hover:-translate-y-2 duration-500 transition-all">
          <Link href="/">Contact</Link>
        </li> */}
      </ul>

      <ul className="flex gap-8 justify-end items-center mt-4">
        {/* User */}

        {
          // Validate if user is logged in
          session && session.user ? (
            <li className="flex items-center">
              <Link href={`/users/${session.user.id}`}>
                {session.user.image ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={session.user.image}
                      alt={session.user.name!}
                      width={40}
                      height={40}
                      className="scale-animation img"
                    />
                  </div>
                ) : (
                  <FaUserCircle className="cursor-pointer" />
                )}
              </Link>
            </li>
          ) : (
            // User is not logged in
            // Show if not on the auth page
            pathname !== "/auth" && (
              <>
                <button type="button" onClick={loginHandler}>
                  <Link href="/auth">Login</Link>
                </button>

                <button type="button">
                  <Link href="/auth">Register</Link>
                </button>
              </>
            )
          )
        }

        {/* END - User */}

        {/* Dark Mode Toggle */}

        <li className="ml-2">
          {darkTheme ? (
            <MdOutlineLightMode
              className="cursor-pointer"
              onClick={() => {
                setDarkTheme(false);
                localStorage.removeItem("hotel-theme");
              }}
            />
          ) : (
            <MdDarkMode
              className="cursor-pointer"
              onClick={() => {
                setDarkTheme(true);
                localStorage.setItem("hotel-theme", "true");
              }}
            />
          )}
        </li>

        {/* END - Dark Mode Toggle */}
      </ul>
    </header>
  );
};

export default Header;
