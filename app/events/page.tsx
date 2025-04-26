"use client";

import React from "react";
import { motion } from "framer-motion";

const ActivitiesPage = () => {
  const activities = [
    { description: "Te-ai logat în cont", timestamp: "Acum 2 ore" },
    { description: "Ai editat profilul", timestamp: "Acum 1 zi" },
    { description: "Ai adăugat un task nou", timestamp: "Acum 3 zile" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center pt-32 px-6">
      <motion.div
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Activitățile mele
        </h1>
        <ul className="space-y-6">
          {activities.map((activity, index) => (
            <motion.li
              key={index}
              className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-sm"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {activity.description}
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {activity.timestamp}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </main>
  );
};

export default ActivitiesPage;
