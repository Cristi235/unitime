"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiAcademicCap, HiBars3BottomRight } from "react-icons/hi2";
import { navLinks } from "@/constant/constant";
import Link from "next/link";

type Props = {
  openNav: () => void;
};

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

const Navbar = ({ openNav }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={`${
        isScrolled
          ? "bg-gradient-to-r from-blue-900 via-blue-950 to-black shadow-lg backdrop-blur-md"
          : "bg-transparent"
      } transition-all duration-300 h-[12vh] z-[1000] fixed w-full`}
    >
      <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
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
          className="hidden lg:flex items-center space-x-10"
        >
          {navLinks.map((link) => (
            <motion.div key={link.id} variants={itemVariants}>
              <Link href={link.url}>
                <p className="relative text-white text-base font-medium after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-rose-400 hover:after:w-full after:transition-all after:duration-300">
                  {link.label}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Button + Menu */}
        <motion.div variants={itemVariants} className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="md:px-12 md:py-2.5 px-8 py-2 text-white text-sm bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md hover:opacity-90 transition-all duration-200"
          >
            Buton important
          </motion.button>

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
