"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const SettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4">
          Setările mele
        </h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full">
          <div className="mb-4">
            <label htmlFor="theme" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Mod temă
            </label>
            <button
              onClick={toggleTheme}
              className="mt-2 p-3 w-full rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-white bg-blue-600"
            >
              {isDarkMode ? "Comută la temă deschisă" : "Comută la temă închisă"}
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default SettingsPage;
