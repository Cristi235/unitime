import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Ascultă evenimentul de scroll
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Curățăm listener-ul la unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Simulare autentificare (înlocuiește cu logica ta de autentificare reală)
    const user = localStorage.getItem("user"); // Exemplu de stocare în localStorage
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[1000] w-full transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-transparent text-white shadow-none" // După scroll, navbar transparent
          : "bg-indigo-700 text-white shadow-md" // Culoare solidă inițial
      } h-20`} // Înălțimea rămâne constantă
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto p-4 md:p-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center shadow-xl">
            <span className="text-white text-2xl font-semibold">UT</span>
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-wider">UniTime</h1>
        </div>

        {/* Links Navbar */}
        <div className="hidden lg:flex space-x-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-lg font-medium hover:text-indigo-300 cursor-pointer">
              Home
            </p>
          </motion.div>

          {isAuthenticated ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-lg font-medium hover:text-indigo-300 cursor-pointer">
                  Profil
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-lg font-medium hover:text-indigo-300 cursor-pointer">
                  Setări
                </p>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-lg font-medium hover:text-indigo-300 cursor-pointer">
                  Login
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-lg font-medium hover:text-indigo-300 cursor-pointer">
                  Înregistrare
                </p>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
