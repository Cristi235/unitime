"use client";

import React, { useState } from "react";
import { Switch } from "@headlessui/react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [language, setLanguage] = useState("ro");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen p-6 pt-24 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Setări tehnice
        </h1>

        {/* Tema */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">Apariență</h2>
          <div className="flex items-center justify-between">
            <label className="text-gray-600 dark:text-gray-300">Mod întunecat</label>
            <Switch
              checked={darkMode}
              onChange={setDarkMode}
              className={`${darkMode ? "bg-indigo-600" : "bg-gray-300"}
              relative inline-flex h-6 w-11 items-center rounded-full transition`}
            >
              <span
                className={`${darkMode ? "translate-x-6" : "translate-x-1"}
                inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </section>

        {/* Notificări */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">Notificări</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-600 dark:text-gray-300">Email</label>
              <Switch
                checked={emailNotifs}
                onChange={setEmailNotifs}
                className={`${emailNotifs ? "bg-indigo-600" : "bg-gray-300"}
                relative inline-flex h-6 w-11 items-center rounded-full transition`}
              >
                <span
                  className={`${emailNotifs ? "translate-x-6" : "translate-x-1"}
                  inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-600 dark:text-gray-300">Push</label>
              <Switch
                checked={pushNotifs}
                onChange={setPushNotifs}
                className={`${pushNotifs ? "bg-indigo-600" : "bg-gray-300"}
                relative inline-flex h-6 w-11 items-center rounded-full transition`}
              >
                <span
                  className={`${pushNotifs ? "translate-x-6" : "translate-x-1"}
                  inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
          </div>
        </section>

        {/* Securitate */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">Securitate</h2>
          <label className="text-gray-600 dark:text-gray-300">Schimbă parola</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Noua parolă"
            className="w-full p-2 mt-2 rounded-md border bg-gray-100 dark:bg-gray-700"
          />
          <button
            onClick={() => {
              if (password.length < 6) {
                alert("Parola trebuie să aibă cel puțin 6 caractere.");
                return;
              }
              alert("Parola a fost schimbată.");
              setPassword("");
            }}
            className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Salvează
          </button>
        </section>

        {/* Limbă */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">Preferințe limbă</h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 rounded-md border bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            <option value="ro">Română</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </section>

        {/* Ștergere cont */}
        <section>
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">Ștergere cont</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Această acțiune este ireversibilă.
          </p>
          <button
            onClick={() => confirm("Ești sigur că vrei să-ți ștergi contul?") && alert("Contul a fost șters.")}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Șterge contul
          </button>
        </section>
      </div>
    </main>
  );
}
