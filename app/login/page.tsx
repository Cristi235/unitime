"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link"; 

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Te rog completează toate câmpurile!");
      return;
    }

    // Logica de autentificare
    console.log("User logged in with:", email);

    // Dacă Remember Me este selectat, poți salva un cookie sau un token
    if (rememberMe) {
      // Poți folosi cookie sau alte metode pentru a păstra utilizatorul conectat
      console.log("Remember me is enabled");
    }

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
          Conectează-te la{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600">
            UniTime
          </span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Introduceti detaliile pentru a accesa contul vostru.
        </p>
      </motion.div>

      <motion.div
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <form onSubmit={handleLogin}>
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
          </div>

          <div className="mb-6">
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

          {/* Câmpul Remember Me */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="mr-2"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-700 dark:text-gray-300">
              Ține-mă minte
            </label>
          </div>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <motion.button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Conectează-te
          </motion.button>
        </form>

        {/* Link pentru a accesa Forgot Password */}
        <div className="mt-4 text-center">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Ai uitat parola?
          </Link>
        </div>

        {/* Link pentru a naviga către pagina de înregistrare */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Nu ai cont?{" "}
            <Link
              href="/signup"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Înregistrează-te
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
