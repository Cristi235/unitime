"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const DashboardPage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const simulatedUserData = {
      username: "Akillu",
      email: "akillu14@yahoo.com",
      accountStatus: "activ",
    };

    const simulatedActivities = [
      { description: "Ai schimbat parola contului", timestamp: "Acum 2 zile" },
      { description: "Ai modificat preferințele de notificare", timestamp: "Acum 5 zile" },
      { description: "Ai actualizat profilul", timestamp: "Acum 1 săptămână" },
    ];

    setUserData(simulatedUserData);
    setRecentActivities(simulatedActivities);

    setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulăm un loading de 1.5 secunde
  }, []);

  const activityData = [
    { name: "Luni", activitate: 2 },
    { name: "Marți", activitate: 1 },
    { name: "Miercuri", activitate: 3 },
    { name: "Joi", activitate: 4 },
    { name: "Vineri", activitate: 2 },
    { name: "Sâmbătă", activitate: 5 },
    { name: "Duminică", activitate: 3 },
  ];

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          className="w-32 h-2 rounded-full bg-gray-300 overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "8rem" }}
          transition={{ duration: 1.5 }}
        >
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5 }}
          />
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-6 py-12 pt-32 space-y-10">
      {/* Welcome section */}
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

      {/* Recent activities */}
      <motion.div
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Activitățile tale recente
        </h2>
        <ul className="space-y-4">
          {recentActivities.map((activity, index) => (
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

      {/* Activity chart */}
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Activitate săptămânală
        </h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={activityData}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis allowDecimals={false} stroke="#8884d8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="activitate"
              stroke="#6366f1"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mt-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <button
          onClick={() => router.push("/settings")}
          className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
        >
          Setări cont
        </button>
        <button
          onClick={() => {
            // Simulare logout
            localStorage.removeItem("userToken");
            router.push("/login");
          }}
          className="py-2 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold shadow-md"
        >
          Deconectare
        </button>
      </motion.div>
    </main>
  );
};

export default DashboardPage;
