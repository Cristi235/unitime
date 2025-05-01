"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HiAcademicCap, HiBars3BottomRight } from "react-icons/hi2";
import { navLinks } from "@/constant/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  openNav: () => void;
};

const Navbar = ({ openNav }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown

  const pathname = usePathname();

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
      if (window.scrollY >= 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false); // Close dropdown if clicked outside
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

        {/* Button + Menu */}
        <motion.div variants={itemVariants} className="flex items-center space-x-4">
          {/* Notifications Bell */}
          <div className="relative">
            <button className="relative hover:scale-110 transition-transform duration-200">
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
              {/* Notification Badge */}
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                3
              </span>
            </button>
          </div>

          {/* Profile Section */}
          <div className="relative" ref={dropdownRef}>
            {/* User Avatar */}
            <img
              src="/path-to-avatar.jpg" // Replace with the actual avatar URL
              alt="User Avatar"
              className="w-8 h-8 rounded-full cursor-pointer hover:scale-110 transition-transform duration-200"
              onClick={() => setDropdownOpen((prev) => !prev)} // Toggle dropdown visibility
            />
            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <Link href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Settings
                </Link>
                <button
                  onClick={() => console.log("Logout clicked")} // Replace with your logout logic
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Mobile Menu Icon */}
        <HiBars3BottomRight
          onClick={openNav}
          className="w-8 h-8 cursor-pointer text-white lg:hidden"
        />
      </div>
    </motion.div>
  );
};

export default Navbar;