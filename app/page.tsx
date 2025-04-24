"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        className="text-center max-w-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-white mb-4">
          Bine ai venit în{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600">
            UniTime
          </span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Aplicația ta modernă pentru organizarea timpului de student. Simplă,
          eficientă, adaptată ție.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 transition rounded-xl font-medium shadow-md"
          >
            Conectează-te
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition rounded-xl font-medium"
          >
            Creează cont
          </button>
        </div>
      </motion.div>

      <motion.section
        className="mt-24 text-center max-w-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
          Ce este UniTime?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          UniTime este un dashboard intuitiv care te ajută să-ți gestionezi
          orarul, activitățile și progresul academic. Totul într-un singur loc,
          accesibil și elegant.
        </p>
      </motion.section>
    </main>
  );
}
