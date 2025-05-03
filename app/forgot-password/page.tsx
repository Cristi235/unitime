"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Te rog introdu un email!");
      return;
    }

    setError("");
    alert("Emailul de resetare a fost trimis!");
    router.push("/login");
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
          Resetează-ți{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            parola
          </span>
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Introdu adresa de email pentru a primi instrucțiuni.
        </p>
      </motion.div>

      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
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

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <motion.button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium shadow-lg hover:opacity-90 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Trimite instrucțiuni
          </motion.button>
        </form>

        <div className="mt-6 flex justify-between text-sm text-gray-400">
          <Link href="/login" className="hover:text-white transition">
            Înapoi la autentificare
          </Link>
          <Link href="/signup" className="hover:text-white transition">
            Creează cont
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
