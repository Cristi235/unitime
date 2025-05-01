"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ProfilePage() {
  const defaultPhoto = "https://via.placeholder.com/100"; // Default image URL
  const [userData, setUserData] = useState({
    username: "Andrei123",
    email: "andrei123@email.com",
    registrationDate: "01.02.2024",
    about: "Sunt pasionat de tehnologie și dezvoltare web.",
    photo: defaultPhoto,
  });

  const [activityStats] = useState({
    logins: 42,
    changes: 5,
    timeSpent: "12h 30m",
  });

  const [editing, setEditing] = useState(false);
  const [theme, setTheme] = useState("light");
  const [saving, setSaving] = useState(false);

  // Load photo from localStorage on component mount
  useEffect(() => {
    const savedPhoto = localStorage.getItem("profilePhoto");
    if (savedPhoto) {
      setUserData((prevData) => ({ ...prevData, photo: savedPhoto }));
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setEditing(false);
      alert("Date salvate!");
    }, 1500);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newPhoto = event.target?.result as string;
        setUserData((prevData) => ({ ...prevData, photo: newPhoto }));
        localStorage.setItem("profilePhoto", newPhoto); // Save photo to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  const activityProgress = Math.min((activityStats.logins + activityStats.changes) / 100, 1) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-6 pt-24 relative">
      {/* Tema */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:scale-110 transition"
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Profilul tău
        </h1>

        <div className="flex flex-col items-center mb-6">
          <img
            src={userData.photo}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 shadow-lg hover:scale-105 transition"
          />
          <label className="text-sm text-blue-600 hover:underline cursor-pointer">
            Schimbă poza
            <input type="file" onChange={handlePhotoChange} className="hidden" />
          </label>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="space-y-4">
            {['username', 'email', 'registrationDate', 'about'].map((field, index) => (
              <div key={index}>
                <label className="text-gray-600 dark:text-gray-300 capitalize">
                  {field === 'username' ? 'Nume utilizator' : field === 'email' ? 'Email' : field === 'registrationDate' ? 'Data înregistrării' : 'Despre mine'}
                </label>
                {field !== 'about' ? (
                  <input
                    disabled={field === 'registrationDate' || !editing}
                    value={userData[field as keyof typeof userData]}
                    onChange={(e) => setUserData({ ...userData, [field]: e.target.value })}
                    className={`w-full p-2 mt-1 rounded-md border transition ${editing ? "bg-white dark:bg-gray-800 border-blue-400" : "bg-gray-100 dark:bg-gray-700"}`}
                  />
                ) : (
                  <textarea
                    disabled={!editing}
                    value={userData[field as keyof typeof userData]}
                    onChange={(e) => setUserData({ ...userData, about: e.target.value })}
                    className={`w-full p-2 mt-1 rounded-md border h-24 resize-none transition ${editing ? "bg-white dark:bg-gray-800 border-blue-400" : "bg-gray-100 dark:bg-gray-700"}`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            {editing ? (
              <>
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition"
                >
                  Anulează
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                >
                  {saving ? "Se salvează..." : "Salvează"}
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                Editează profilul
              </button>
            )}
          </div>
        </motion.div>

        <motion.div className="mt-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Statistici activitate</h2>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6 overflow-hidden">
            <div
              className="bg-indigo-500 h-4 transition-all"
              style={{ width: `${activityProgress}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(activityStats).map(([key, value], idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-xl text-center"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {key === 'logins' ? 'Logări' : key === 'changes' ? 'Modificări setări' : 'Timp total'}
                </p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}