"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("events"); // "events" or "jobs"
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Display 4 items per page

  const sections = {
    events: [
      {
        title: "Conferință despre Inteligența Artificială",
        description:
          "Oportunitatea de a învăța cele mai noi tehnologii din domeniul inteligenței artificiale, incluzând sesiuni interactive și workshop-uri.",
        date: "5 Mai 2025",
        link: "https://example.com/ai-conference",
      },
      {
        title: "Școala de Vară la Universitate",
        description:
          "Oferă oportunitatea de a participa la cursuri de specializare într-o varietate de domenii, inclusiv robotică, software development și multe altele.",
        date: "15 Iunie 2025",
        link: "https://example.com/summer-school",
      },
      {
        title: "Atelier de dezvoltare personală",
        description:
          "Învață cum să-ți îmbunătățești abilitățile de leadership și comunicare în acest atelier interactiv.",
        date: "20 Mai 2025",
        link: "https://example.com/personal-development",
      },
      {
        title: "Hackathon pentru Studenți",
        description:
          "Participă la un hackathon de 48 de ore pentru a dezvolta soluții inovatoare și a câștiga premii interesante.",
        date: "10 Iulie 2025",
        link: "https://example.com/student-hackathon",
      },
      {
        title: "Workshop de UI/UX Design",
        description:
          "Învață principiile de bază ale designului UI/UX și cum să creezi interfețe atractive și funcționale.",
        date: "25 Iunie 2025",
        link: "https://example.com/ui-ux-workshop",
      },
    ],
    jobs: [
      {
        title: "Internship Java Developer",
        description:
          "Alătură-te echipei ABC Tech ca intern Java Developer. Vei lucra la proiecte inovatoare în domeniul dezvoltării software.",
        date: "Până la 30 Iunie 2025",
        company: "ABC Tech",
        link: "https://example.com/java-internship",
      },
      {
        title: "Job part-time în rețelistică",
        description:
          "Căutăm un student pentru un job part-time în rețelistică. Vei învăța și lucra la implementarea și întreținerea rețelelor de comunicație.",
        date: "Interviuri deschise",
        company: "NetConnect",
        link: "https://example.com/networking-job",
      },
      {
        title: "Internship Robotics Engineer",
        description:
          "Înscriere deschisă pentru programul de internship în robotică. Vino să explorezi soluțiile robotice inovatoare la XYZ Robotics.",
        date: "Termen: 1 Iulie 2025",
        company: "XYZ Robotics",
        link: "https://example.com/robotics-internship",
      },
      {
        title: "Frontend Developer Junior",
        description:
          "Căutăm un Frontend Developer Junior pentru a lucra la aplicații web moderne folosind React și TypeScript.",
        date: "Până la 15 Iulie 2025",
        company: "WebDev Solutions",
        link: "https://example.com/frontend-developer",
      },
      {
        title: "Data Analyst Internship",
        description:
          "Participă la un program de internship în analiza datelor și învață să lucrezi cu instrumente precum Python și SQL.",
        date: "Până la 20 Iulie 2025",
        company: "Data Insights",
        link: "https://example.com/data-analyst-internship",
      },
    ],
  };

  const filteredEvents = (sections.events || []).filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredJobs = (sections.jobs || []).filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedItems: {
    title: string;
    description: string;
    date: string;
    company?: string;
    link: string;
  }[] =
    activeTab === "events"
      ? filteredEvents.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : filteredJobs.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );

  const totalPages =
    activeTab === "events"
      ? Math.ceil(filteredEvents.length / itemsPerPage)
      : Math.ceil(filteredJobs.length / itemsPerPage);

  return (
    <main className="min-h-screen bg-gray-900 flex flex-col items-center pt-32 px-6 pb-24">
      <motion.div
        className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-6xl mb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Evenimente și Oportunități
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setActiveTab("events")}
            className={`px-6 py-2 rounded-l-lg ${
              activeTab === "events"
                ? "bg-purple-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Evenimente
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-6 py-2 rounded-r-lg ${
              activeTab === "jobs"
                ? "bg-purple-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Locuri de muncă
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Caută evenimente sau locuri de muncă..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 rounded-lg border border-gray-600 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Items */}
        <div className="grid grid-cols-1 gap-8">
          {paginatedItems.length > 0 ? (
            paginatedItems.map((item, index) => (
              <motion.div
                key={index}
                className="p-4 bg-gray-700 rounded-xl shadow-sm"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  {item.description}
                </p>
                <span className="text-xs text-gray-400 block mb-2">
                  <strong>Date: </strong>
                  {item.date}
                </span>
                {item.company && (
                  <span className="text-xs text-gray-400">
                    <strong>Companie: </strong>
                    {item.company}
                  </span>
                )}
                {isValidUrl(item.link) && (
                  <div className="flex justify-end mt-4">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                    >
                      More Details
                    </a>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No items found.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === i + 1
                  ? "bg-purple-500 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
              aria-label={`Go to page ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </motion.div>
    </main>
  );
};

export default EventsPage;