"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    username: "Andrei123",
    email: "andrei123@email.com",
    registrationDate: "01.02.2024",
    about: "Sunt pasionat de tehnologie și dezvoltare web.",
  });

  const [activityStats] = useState({
    logins: 42,
    changes: 5,
    timeSpent: "12h 30m",
  });

  const [editing, setEditing] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-6 pt-24">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Profilul tău
        </h1>

        <div className="flex flex-col items-center mb-6">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 shadow"
          />
          <button className="text-sm text-blue-600 hover:underline">
            Schimbă poza
          </button>
        </div>

        {/* Informații */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 dark:text-gray-300">Nume utilizator</label>
              <input
                disabled={!editing}
                value={userData.username}
                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                className={`w-full p-2 mt-1 rounded-md border ${
                  editing ? "bg-white dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-700"
                }`}
              />
            </div>

            <div>
              <label className="text-gray-600 dark:text-gray-300">Email</label>
              <input
                disabled={!editing}
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className={`w-full p-2 mt-1 rounded-md border ${
                  editing ? "bg-white dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-700"
                }`}
              />
            </div>

            <div>
              <label className="text-gray-600 dark:text-gray-300">Data înregistrării</label>
              <input
                disabled
                value={userData.registrationDate}
                className="w-full p-2 mt-1 rounded-md bg-gray-100 dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="text-gray-600 dark:text-gray-300">Despre mine</label>
              <textarea
                disabled={!editing}
                value={userData.about}
                onChange={(e) => setUserData({ ...userData, about: e.target.value })}
                className={`w-full p-2 mt-1 rounded-md border h-24 resize-none ${
                  editing ? "bg-white dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-700"
                }`}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            {editing ? (
              <>
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Anulează
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    alert("Date salvate!");
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Salvează
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Editează profilul
              </button>
            )}
          </div>
        </motion.div>

        {/* Statistici activitate */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Statistici activitate</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Logări</p>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{activityStats.logins}</p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Modificări setări</p>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{activityStats.changes}</p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Timp total</p>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{activityStats.timeSpent}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
