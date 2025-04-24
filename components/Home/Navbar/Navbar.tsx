"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import { HiAcademicCap } from "react-icons/hi2";
import { HiBars3BottomRight } from "react-icons/hi2";
import { navLinks } from "@/constant/constant";
import Link from "next/link";

type Props ={
  openNav:()=>void
}

const Navbar = ({openNav}:Props) => {

const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >=50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Curățăm listener-ul 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={` ${isScrolled ? "gb-blue-950 shadow-md" : "fixed"} transition-all duration-200 h-[12vh] z[1000] fixed w-full  `}>
       <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
          {/*logo*/}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center felx-col">
            <HiAcademicCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl md:text-2x1 text-white uppercase font-bold">
              UniTime
            </h1>
          </div>

          {/*navlinks */}

          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) =>{
              return (
                <Link href={link.url} key={link.id}>
                  <p className="relative text-white text-base font-medium w-fit block after:block after:content-after:hover:scale-x-100 after:transition duration-100 after:origin-right"> 
                    {link.label}
                  </p>
                </Link>
              );
            }
          )}
          </div>

          {/*buttons */}
        <div className="flex items-center space-x-4">
          <button className="md:px-12 md:py-2.5 px-8 text-black text-base bg-white hover:bg-gray-200 transition-all duration-200 rounded-lg">
            Buton important
          </button>

          {/*Burger menu */}
          <HiBars3BottomRight onClick={openNav} className="w-8 h-8 cursor-pointer text-white lg:hidden"/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
