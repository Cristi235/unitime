"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const profile = () => {
  const [username, setUsername] = useState("JohnDoe");
  const [email, setEmail] = useState("johndoe@example.com");

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4">
          Profilul meu
        </h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nume utilizator
            </label>
            <input
              type="text"
              id="username"
              className="mt-2 p-3 w-full rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 p-3 w-full rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <motion.button
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Salvează modificările
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
};

export default profile;
