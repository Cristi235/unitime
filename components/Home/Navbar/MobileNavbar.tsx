import { navLinks } from '@/constant/constant';
import Link from 'next/link';
import React from 'react';
import { CgClose } from 'react-icons/cg';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

// Motion variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.7 },
  exit: { opacity: 0 },
};

const menuVariants = {
  hidden: { x: "-100%" },
  visible: {
    x: "0%",
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
    },
  },
  exit: {
    x: "-100%",
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05 },
  }),
};

const MobileNavbar = ({ closeNav, showNav }: Props) => {
  return (
    <AnimatePresence>
      {showNav && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeNav}
            className="fixed inset-0 z-[1002] bg-black w-full h-screen"
          />

          {/* Mobile menu */}
          <motion.div
            key="menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 h-full w-[80%] sm:w-[60%] z-[1050] px-10 py-16 space-y-10 backdrop-blur-xl bg-rose-800/70 border-r border-rose-400/20"
          >
            {/* Close Button */}
            <CgClose
              onClick={closeNav}
              className="absolute top-4 right-4 sm:w-8 sm:h-8 w-6 h-6 text-white cursor-pointer hover:scale-110 transition-transform"
            />

            {/* Nav links */}
            {navLinks.map((link, index) => (
              <motion.div
                key={link.id}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link href={link.url} onClick={closeNav}>
                  <p className="text-white text-[20px] sm:text-[26px] w-fit border-b border-white/30 pb-1 hover:text-rose-300 transition-all duration-200">
                    {link.label}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNavbar;
