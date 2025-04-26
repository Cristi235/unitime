"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Te rog introdu un email valid!");
      return;
    }
    setEmailError(""); // Resetăm eroarea de email
    if (password !== confirmPassword) {
      setError("Parolele nu se potrivesc!");
      return;
    }
    // Logica de înregistrare
    console.log("User signed up with:", username, email);
    router.push("/dashboard");
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
          Creează un cont pe{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600">
            UniTime
          </span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Completează formularul pentru a te înregistra.
        </p>
      </motion.div>

      <motion.div
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nume utilizator
            </label>
            <input
              type="text"
              id="username"
              className="mt-2 p-3 w-full rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 p-3 w-full rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="text-red-600 text-sm mt-2">{emailError}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Parolă
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 p-3 w-full rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirmă parola
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-2 p-3 w-full rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>} {/* Afișăm mesajul de eroare */}

          <motion.button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Înregistrează-te
          </motion.button>
        </form>
      </motion.div>
    </main>
  );
}
