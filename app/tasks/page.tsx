"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Home/Navbar/Navbar";
import KanbanBoard from "./components/KanbanBoard";

const TasksPage = () => {
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
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 text-center">
            Organizatorul Tău de Teme și Proiecte
          </h1>
          <p className="text-lg text-gray-300 mb-12 text-center">
            Creează, organizează și prioritizează sarcinile tale într-un mod
            simplu și eficient.
          </p>

          {/* Kanban Board */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <KanbanBoard />
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default TasksPage;