"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HiAcademicCap, HiBars3BottomRight } from "react-icons/hi2";
import { navLinks } from "@/constant/constant";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  openNav: () => void;
};

const Navbar = ({ openNav }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={`fixed w-full z-[1000] transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-gradient-to-r from-blue-900 via-blue-950 to-black shadow-lg h-16 backdrop-blur-md"
          : "bg-transparent h-24"
      }`}
    >
      <div className="flex items-center justify-between w-[90%] xl:w-[80%] mx-auto h-full">
        {/* Logo */}
        <motion.div variants={itemVariants} className="flex items-center space-x-3">
          <div className="w-11 h-11 bg-rose-500 rounded-full flex items-center justify-center shadow-md">
            <HiAcademicCap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl text-white uppercase font-bold tracking-wider">
            UniTime
          </h1>
        </motion.div>

        {/* Nav Links */}
        <motion.div
          variants={itemVariants}
          className="hidden lg:flex items-center justify-center space-x-10 flex-grow"
        >
          {navLinks.map((link) => (
            <motion.div key={link.id} variants={itemVariants}>
              <Link href={link.url} className="group">
                <p
                  className={`relative text-white text-base font-medium after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-rose-400 after:transition-all after:duration-300 ${
                    pathname.replace(/\/$/, "") === link.url.replace(/\/$/, "")
                      ? "after:w-full"
                      : "after:w-0 group-hover:after:w-full"
                  }`}
                >
                  {link.label}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex items-center space-x-4"
        >
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setNotificationsOpen((prev) => !prev)}
              className="relative hover:scale-110 transition-transform duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C8.67 7.165 8 8.97 8 11v3.159c0 .538-.214 1.055-.595 1.436L6 17h5m4 0a3 3 0 11-6 0m6 0H9"
                />
              </svg>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                3
              </span>
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg p-4">
                <p className="text-gray-700 font-semibold mb-2">Notificări</p>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600">Notificare 1</li>
                  <li className="text-sm text-gray-600">Notificare 2</li>
                  <li className="text-sm text-gray-600">Notificare 3</li>
                </ul>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <Image
              src="/default-avatar.jpg"
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full cursor-pointer hover:scale-110 transition-transform duration-200"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Profil
                </Link>
                <Link href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Setări
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Deconectare
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <HiBars3BottomRight
            onClick={openNav}
            className="w-8 h-8 cursor-pointer text-white lg:hidden"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Navbar;
