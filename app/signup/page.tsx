"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios"; 

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("STUDENT"); 
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    
    if (password !== confirmPassword) {
      setError("Parolele nu se potrivesc!");
      return;
    }

    
    if (!email.endsWith("@student.unitbv.ro")) {
      setError("Adresa de email trebuie să aibă terminația @student.unitbv.ro.");
      return;
    }

    setError(""); 

    try {
      
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        username,
        email,
        password,
        role,
      });

      // Verifică dacă răspunsul este OK
      if (response.status === 200) {
        console.log("Signup successful:", response.data);
        alert(response.data.message || "Înregistrare reușită. Verifică-ți emailul pentru a confirma contul.");
        router.push("/login");
      }
    } catch (err) {
      // În cazul unui error, afișează mesajul corespunzător
      setError("A apărut o eroare. Te rugăm să încerci din nou.");
      console.error(err);
    }
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
          Creează un cont pe{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            UniTime
          </span>
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Completează formularul pentru a te înregistra.
        </p>
      </motion.div>

      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-200"
            >
              Nume utilizator
            </label>
            <input
              type="text"
              id="username"
              className="mt-2 p-3 w-full rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

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
              htmlFor="role"
              className="block text-sm font-medium text-gray-200"
            >
              Rol
            </label>
            <select
              id="role"
              className="mt-2 p-3 w-full rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="STUDENT">Student</option>
              <option value="PROFESSOR">Profesor</option>
              <option value="ADMIN">Admin</option>
            </select>
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

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-200"
            >
              Confirmă parola
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-2 p-3 w-full rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <motion.button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium shadow-lg hover:opacity-90 transition cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Înregistrează‑te
          </motion.button>
        </form>

        <div className="mt-6 flex justify-center text-sm text-gray-400 space-x-4">
          <Link href="/login" className="hover:text-white transition">
            Am deja cont
          </Link>
          <Link href="/forgot-password" className="hover:text-white transition">
            Ai uitat parola?
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
