"use client";

import React, { useState, useEffect, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Bell, Globe, EyeOff, Trash2, CheckCircle, AlertCircle } from "lucide-react";

export default function SettingsPage() {
  
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [language, setLanguage] = useState("ro");
  const [twoFA, setTwoFA] = useState(false);
  const [privacy, setPrivacy] = useState("public");
  const [passwordModal, setPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [socialLinks, setSocialLinks] = useState({ github: "", linkedin: "", twitter: "" });
  const [toast, setToast] = useState<string | null>(null);
  const [toastIcon, setToastIcon] = useState<JSX.Element | null>(null);

  
  useEffect(() => {
    const saved = localStorage.getItem("settings");
    if (saved) {
      const s = JSON.parse(saved);
      setEmailNotifs(s.emailNotifs);
      setPushNotifs(s.pushNotifs);
      setLanguage(s.language);
      setTwoFA(s.twoFA);
      setPrivacy(s.privacy);
      setSocialLinks(s.socialLinks || socialLinks);
    }
  }, []);

  const showToast = (message: string, success = true) => {
    setToast(message);
    setToastIcon(success ? <CheckCircle className="inline-block mr-2" /> : <AlertCircle className="inline-block mr-2" />);
    setTimeout(() => setToast(null), 3000);
  };

  const saveSettings = () => {
    localStorage.setItem(
      "settings",
      JSON.stringify({ emailNotifs, pushNotifs, language, twoFA, privacy, socialLinks })
    );
    showToast("Setările au fost salvate!");
  };

  const handlePasswordChange = () => {
    if (!oldPassword || !newPassword) {
      showToast("Completați toate câmpurile!", false);
      return;
    }
    if (newPassword.length < 6) {
      showToast("Parola nouă trebuie să aibă cel puțin 6 caractere.", false);
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("Parolele noi nu coincid.", false);
      return;
    }
    showToast("Parola a fost schimbată!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordModal(false);
  };

  const deleteAccount = () => {
    showToast("Contul a fost șters.");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-24 pb-12">
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed top-6 right-6 bg-gray-700 px-4 py-2 rounded shadow flex items-center z-50"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            {toastIcon}
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="max-w-3xl mx-auto bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-2xl p-8 shadow-xl relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-extrabold mb-6">Setări</h1>

        {/* Notificări */}
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
            <Bell /> Notificări
          </h2>
          <div className="space-y-4">
            {[
              { label: "Email", state: emailNotifs, setter: setEmailNotifs },
              { label: "Push", state: pushNotifs, setter: setPushNotifs },
            ].map(({ label, state, setter }) => (
              <div key={label} className="flex justify-between items-center">
                <span>{label}</span>
                <input
                  type="checkbox"
                  checked={state}
                  onChange={() => setter(!state)}
                  className="h-5 w-5 rounded bg-gray-700 checked:bg-blue-500 transition"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Securitate */}
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
            <Lock /> Securitate
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Autentificare cu doi factori (2FA)</span>
              <input
                type="checkbox"
                checked={twoFA}
                onChange={() => setTwoFA(!twoFA)}
                className="h-5 w-5 rounded bg-gray-700 checked:bg-blue-500 transition"
              />
            </div>
            <button
              onClick={() => setPasswordModal(true)}
              className="mt-2 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition"
            >
              Schimbă parola
            </button>
          </div>
        </section>

        {/* Modal schimbare parolă */}
        <AnimatePresence>
          {passwordModal && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gray-800 p-6 rounded-2xl shadow-xl w-96"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <h3 className="text-xl font-semibold mb-4">Schimbă parola</h3>
                <input
                  type="password"
                  placeholder="Parola veche"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full mb-3 p-2 rounded bg-gray-700 focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Parola nouă"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full mb-3 p-2 rounded bg-gray-700 focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Confirmă parola nouă"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full mb-4 p-2 rounded bg-gray-700 focus:outline-none"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setPasswordModal(false)}
                    className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition"
                  >
                    Anulează
                  </button>
                  <button
                    onClick={handlePasswordChange}
                    className="px-4 py-2 bg-green-600 rounded hover:bg-green-500 transition"
                  >
                    Confirmă
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Preferințe limbă */}
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
            <Globe /> Limbă
          </h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
          >
            <option value="ro">Română</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </section>

        {/* Confidențialitate */}
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
            <EyeOff /> Confidențialitate
          </h2>
          <div className="space-y-4">
            {[
              { label: "Profil public", value: "public" },
              { label: "Profil privat", value: "private" },
            ].map(({ label, value }) => (
              <div key={value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="privacy"
                  value={value}
                  checked={privacy === value}
                  onChange={() => setPrivacy(value)}
                  className="h-5 w-5 text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500"
                />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Links sociale */}
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
            <Lock /> Profil social<br/>Links
          </h2>
          <input
            type="text"
            placeholder="GitHub URL"
            value={socialLinks.github}
            onChange={(e) => setSocialLinks({...socialLinks, github: e.target.value})}
            className="w-full mb-3 p-2 rounded bg-gray-700 focus:outline-none"
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={socialLinks.linkedin}
            onChange={(e) => setSocialLinks({...socialLinks, linkedin: e.target.value})}
            className="w-full mb-3 p-2 rounded bg-gray-700 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Twitter URL"
            value={socialLinks.twitter}
            onChange={(e) => setSocialLinks({...socialLinks, twitter: e.target.value})}
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
          />
        </section>

        {/* Ștergere cont */}
        <section>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-red-500 mb-4">
            <Trash2 /> Ștergere cont
          </h2>
          <p className="text-gray-400 mb-4">
            Atenție! Această acțiune este ireversibilă.
          </p>
          <button
            onClick={deleteAccount}
            className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition"
          >
            Șterge contul
          </button>
        </section>

        {/* Salvează toate setările */}
        <div className="mt-8 text-center">
          <button
            onClick={saveSettings}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white font-semibold hover:opacity-90 transition-shadow shadow-lg"
          >
            Salvează setări
          </button>
        </div>
      </motion.div>
    </main>
  );
}
