"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const TasksPage = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [inputTask, setInputTask] = useState("");

  const addTask = () => {
    if (inputTask.trim() !== "") {
      setTasks([...tasks, inputTask]);
      setInputTask("");
    }
  };

  const removeTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center pt-32 px-6">
      <motion.div
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Task Manager
        </h1>

        <div className="flex space-x-3 mb-6">
          <input
            type="text"
            value={inputTask}
            onChange={(e) => setInputTask(e.target.value)}
            placeholder="Scrie un task..."
            className="flex-1 p-3 rounded-lg border bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={addTask}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
          >
            Adaugă
          </motion.button>
        </div>

        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl flex justify-between items-center"
            >
              <span className="text-gray-800 dark:text-gray-200">{task}</span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => removeTask(index)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Șterge
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </main>
  );
};

export default TasksPage;
