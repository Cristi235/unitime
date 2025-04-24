"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const simulatedUserData = {
      username: "Akillu",
      email: "akillu14@yahoo.com",
      accountStatus: "activ",
    };

    const simulatedActivities = [
      {
        description: "Ai schimbat parola contului",
        timestamp: "Acum 2 zile",
      },
      {
        description: "Ai modificat preferințele de notificare",
        timestamp: "Acum 5 zile",
      },
      {
        description: "Ai actualizat profilul",
        timestamp: "Acum 1 săptămână",
      },
    ];

    setUserData(simulatedUserData);
    setRecentActivities(simulatedActivities);
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-6 py-12 pt-32">
      {/* pt-32 adaugă spațiu suplimentar pentru a face loc navbarului fixat */}
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4">
          Bun venit, {userData.username}!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Iată statistici și activități recente.
        </p>
      </motion.div>

      <motion.div
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Activitățile tale recente</h2>
        <ul className="space-y-4">
          {recentActivities.map((activity, index) => (
            <li key={index} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {activity.description}
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400">{activity.timestamp}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <button
          onClick={() => router.push("/settings")}
          className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Mergi la setările contului
        </button>
      </motion.div>
    </main>
  );
};

export default DashboardPage;
