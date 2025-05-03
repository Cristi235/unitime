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
      console.log("Remember me is enabled");
    }

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
          Conectează-te la{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            UniTime
          </span>
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Introdu detaliile pentru a accesa contul tău.
        </p>
      </motion.div>

      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 p-3 w-full rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200"
            >
              Parolă
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 p-3 w-full rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="h-4 w-4 text-indigo-500 bg-gray-600 border-gray-500 rounded"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 text-sm text-gray-300"
            >
              Ține‑mă minte
            </label>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <motion.button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium shadow-lg hover:opacity-90 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Conectează‑te
          </motion.button>
        </form>

        <div className="mt-6 flex justify-between text-sm text-gray-400">
          <Link
            href="/forgot-password"
            className="hover:text-white transition"
          >
            Ai uitat parola?
          </Link>
          <Link
            href="/signup"
            className="hover:text-white transition"
          >
            Creează cont
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
