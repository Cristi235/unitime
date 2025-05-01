"use client";

import React from "react";
import { motion } from "framer-motion";

const EventsPage = () => {
  const sections = {
    events: [
      {
        title: "Conferință despre Inteligența Artificială",
        description:
          "Oportunitatea de a învăța cele mai noi tehnologii din domeniul inteligenței artificiale, incluzând sesiuni interactive și workshop-uri.",
        date: "5 Mai 2025",
      },
      {
        title: "Școala de Vară la Universitate",
        description:
          "Oferă oportunitatea de a participa la cursuri de specializare într-o varietate de domenii, inclusiv robotică, software development și multe altele.",
        date: "15 Iunie 2025",
      },
      {
        title: "Atelier de dezvoltare personală",
        description:
          "Învață cum să-ți îmbunătățești abilitățile de leadership și comunicare în acest atelier interactiv.",
        date: "20 Mai 2025",
      },
    ],
    jobs: [
      {
        title: "Internship Java Developer",
        description:
          "Alătură-te echipei ABC Tech ca intern Java Developer. Vei lucra la proiecte inovatoare în domeniul dezvoltării software.",
        date: "Până la 30 Iunie 2025",
        company: "ABC Tech",
      },
      {
        title: "Job part-time în rețelistică",
        description:
          "Căutăm un student pentru un job part-time în rețelistică. Vei învăța și lucra la implementarea și întreținerea rețelelor de comunicație.",
        date: "Interviuri deschise",
        company: "NetConnect",
      },
      {
        title: "Internship Robotics Engineer",
        description:
          "Înscriere deschisă pentru programul de internship în robotică. Vino să explorezi soluțiile robotice inovatoare la XYZ Robotics.",
        date: "Termen: 1 Iulie 2025",
        company: "XYZ Robotics",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center pt-32 px-6">
      <motion.div
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-6xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Evenimente și Oportunități
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Box pentru Evenimente */}
          <div className="p-6 bg-indigo-100 dark:bg-gray-700 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Evenimente
            </h2>
            {sections.events.map((event, index) => (
              <motion.div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm mb-4"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {event.description}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  <strong>Date: </strong>
                  {event.date}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Box pentru Locuri de muncă */}
          <div className="p-6 bg-green-100 dark:bg-gray-700 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Locuri de muncă
            </h2>
            {sections.jobs.map((job, index) => (
              <motion.div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm mb-4"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {job.description}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-2">
                  <strong>Date: </strong>
                  {job.date}
                </span>
                {job.company && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    <strong>Companie: </strong>
                    {job.company}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default EventsPage;
