"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil } from "lucide-react";

export default function ProfilePage() {
  const defaultPhoto = "https://via.placeholder.com/100";
  const defaultCover =
    "https://images.unsplash.com/photo-1581090700227-1e8a4c17c2aa?auto=format&fit=crop&w=1500&q=80";

  const [userData, setUserData] = useState({
    username: "Andrei123",
    fullName: "Andrei Popescu",
    email: "andrei123@email.com",
    university: "Universitatea Transilvania",
    phone: "+40",
    about: "about",
    photo: defaultPhoto,
    cover: defaultCover,
  });

  const [editing, setEditing] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);

  const loadLocalData = () => {
    const stored = localStorage.getItem("localUserProfile");
    if (stored) {
      setUserData(JSON.parse(stored));
    }
  };

  const saveToLocalStorage = (data: typeof userData) => {
    localStorage.setItem("localUserProfile", JSON.stringify(data));
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          saveToLocalStorage(data);
        } else {
          console.warn("Serverul nu a răspuns. Se folosește localStorage.");
          loadLocalData();
        }
      } catch (error) {
        console.error("Eroare la obținerea profilului:", error);
        loadLocalData();
      }
    };

    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    setEditing(false);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);

    const updatedProfile = {
      fullName: userData.fullName,
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      university: userData.university,
      about: userData.about,
      photo: userData.photo,
      cover: userData.cover,
    };

    saveToLocalStorage(updatedProfile);

    try {
      const response = await fetch("/api/profile/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        throw new Error("Eroare la actualizarea profilului");
      }
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.warn("Salvarea s-a făcut doar local:", error);
    }
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "photo" | "cover"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      try {
        const response = await fetch(`/api/profile/upload-${type}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setUserData((prev) => {
            const updated = { ...prev, [type]: data.url };
            saveToLocalStorage(updated);
            return updated;
          });
        } else {
          throw new Error("Upload eșuat");
        }
      } catch (error) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setUserData((prev) => {
              const updated = { ...prev, [type]: reader.result as string };
              saveToLocalStorage(updated);
              return updated;
            });
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const fields = [
    { key: "fullName", label: "Nume complet" },
    { key: "username", label: "Nume utilizator" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Telefon" },
    { key: "university", label: "Universitate" },
    { key: "about", label: "Descriere", type: "textarea" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 relative">
      <motion.div
        className="relative w-full h-56 md:h-72 lg:h-80 overflow-hidden rounded-b-2xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={userData.cover}
          alt="cover"
          className="w-full h-full object-cover"
        />
        {editing && (
          <label className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-md cursor-pointer text-sm hover:bg-black/80 transition">
            Schimbă cover
            <input
              type="file"
              onChange={(e) => handleImageChange(e, "cover")}
              className="hidden"
            />
          </label>
        )}
      </motion.div>

      <div className="max-w-4xl mx-auto p-6 -mt-20 relative z-10">
        <div className="flex items-center gap-6">
          <div className="relative">
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              src={userData.photo}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-zinc-900 object-cover shadow-xl"
            />
            {editing && (
              <label className="absolute bottom-0 right-0 bg-zinc-800 p-2 rounded-full cursor-pointer shadow hover:bg-zinc-700 transition">
                <Pencil size={16} className="text-white" />
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, "photo")}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white">
              {userData.fullName}
            </h1>
            <p className="text-zinc-400">@{userData.username}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          {editing ? (
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:opacity-90 transition"
            >
              Salvează modificările
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="px-5 py-2 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:opacity-90 transition"
            >
              Editează profilul
            </button>
          )}
        </div>

        <AnimatePresence>
          {savedMessage && (
            <motion.div
              className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-md shadow-lg z-50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              Modificările au fost salvate cu succes!
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {fields.map(({ key, label, type }) => (
            <div key={key} className={type === "textarea" ? "md:col-span-2" : ""}>
              <label className="text-sm text-zinc-400">{label}</label>
              {type === "textarea" ? (
                <textarea
                  disabled={!editing}
                  value={userData[key as keyof typeof userData]}
                  onChange={(e) =>
                    setUserData({ ...userData, [key]: e.target.value })
                  }
                  className="w-full mt-1 p-3 rounded-lg bg-zinc-900 border border-zinc-700 resize-none h-28 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <input
                  type="text"
                  disabled={!editing}
                  value={userData[key as keyof typeof userData]}
                  onChange={(e) =>
                    setUserData({ ...userData, [key]: e.target.value })
                  }
                  className="w-full mt-1 p-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
