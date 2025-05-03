"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Home/Navbar/Navbar";
import KanbanBoard from "./components/KanbanBoard";

export default function TasksPage() {
  return (
    <>
      {/* Navbar */}
      <Navbar openNav={() => {}} />

      {/* Main Content */}
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16">
        <motion.div
          className="container mx-auto px-6 py-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 text-center">
            Organizatorul Tău de Teme și Proiecte
          </h1>
          <p className="text-lg text-gray-300 mb-12 text-center max-w-2xl mx-auto">
            Creează, organizează și prioritizează sarcinile tale într-un mod simplu și eficient, folosind un board Kanban interactiv.
          </p>

          {/* Kanban Board Container */}
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl shadow-2xl p-6">
            <KanbanBoard />
          </div>
        </motion.div>
      </main>
    </>
  );
}
