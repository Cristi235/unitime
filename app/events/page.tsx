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
  const [activeTab, setActiveTab] = useState<"events" | "jobs">("events");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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

  // Filtrare titluri după query
  const filtered = (activeTab === "events"
    ? sections.events
    : sections.jobs
  ).filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center pt-32 px-6 pb-12">
      <motion.div
        className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-2xl w-full max-w-6xl mb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Evenimente și Oportunități
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          {["events", "jobs"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab as any);
                setCurrentPage(1);
              }}
              className={`px-6 py-2 first:rounded-l-lg last:rounded-r-lg transition ${
                activeTab === tab
                  ? "bg-purple-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {tab === "events" ? "Evenimente" : "Locuri de muncă"}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder={`Caută ${
              activeTab === "events" ? "evenimente" : "locuri de muncă"
            }...`}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        {/* Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paginatedItems.length > 0 ? (
            paginatedItems.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-700 bg-opacity-60 rounded-2xl shadow-md transform transition-transform duration-150 ease-out hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300 mb-4 text-sm">
                  {item.description}
                </p>
                <div className="text-gray-400 text-xs mb-4 space-y-1">
                  <div>
                    <strong>Date:</strong> {item.date}
                  </div>
                  {activeTab === "jobs" && "company" in item && (
                    <div>
                      <div>
                        <strong>Companie:</strong> {String(item.company)}
                      </div>
                    </div>
                  )}
                </div>
                {isValidUrl(item.link) && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition"
                  >
                    Detalii
                  </a>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-full">
              Nu s-au găsit rezultate.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`mx-1 px-4 py-2 rounded-lg transition ${
                currentPage === i + 1
                  ? "bg-purple-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
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
