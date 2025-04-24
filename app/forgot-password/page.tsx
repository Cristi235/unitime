"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Te rog introdu un email!");
      return;
    }
    setEmailError(""); // Resetăm eroarea
    alert("Emailul de resetare a parolei a fost trimis!");
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-6 text-center">
          Resetează parola
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-6 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="text-red-600 text-sm mt-2">{emailError}</p>}
          <button
            type="submit"
            className="w-full px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 transition rounded-xl font-medium shadow-md"
          >
            Trimite instrucțiuni
          </button>
        </form>
      </motion.div>
    </main>
  );
}
