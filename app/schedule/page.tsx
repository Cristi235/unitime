"use client";

import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
import { motion } from "framer-motion";

interface Task {
  date: string;
  text: string;
  type: string;
  id: number;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [showModal, setShowModal] = useState(false);
  const [taskInput, setTaskInput] = useState({ text: "", type: "", id: null as number | null });

  const taskTypes = ["Muncă", "Sport", "Studii", "Relaxare"];

  useEffect(() => {
    const savedTasks = localStorage.getItem("calendarTasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem("calendarTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!selectedDate) return;  // Verificare pentru selectedDate
    setTaskInput({ text: "", type: "", id: null });
    setShowModal(true);
  };

  const handleSaveTask = () => {
    if (!taskInput.text || !taskInput.type || !selectedDate) return;  // Verificare pentru selectedDate
    
    const newTask = {
      date: format(selectedDate, "yyyy-MM-dd"),
      text: taskInput.text,
      type: taskInput.type,
      id: taskInput.id !== null ? taskInput.id : Date.now(), // Folosim ID-ul existent sau generăm unul nou
    };

    if (taskInput.id !== null) {
      // Editare task existent
      setTasks(tasks.map((task) => (task.id === taskInput.id ? { ...task, text: taskInput.text, type: taskInput.type } : task)));
    } else {
      // Adăugare task nou
      setTasks((prev) => [...prev, newTask]);
    }

    setShowModal(false);
  };

  const handleEditTask = (task: Task) => {
    setTaskInput({ text: task.text, type: task.type, id: task.id });
    setSelectedDate(new Date(task.date)); // Setăm selectedDate pe data taskului
    setShowModal(true);
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            setCurrentDate(addDays(currentDate, viewMode === "month" ? -30 : -7))
          }
          className="text-indigo-600 hover:text-indigo-800"
        >
          ← Anterior
        </button>
        <button
          onClick={() => setCurrentDate(new Date())}
          className="text-gray-300 hover:text-gray-500"
        >
          Azi
        </button>
        <button
          onClick={() =>
            setCurrentDate(addDays(currentDate, viewMode === "month" ? 30 : 7))
          }
          className="text-indigo-600 hover:text-indigo-800"
        >
          Următor →
        </button>
      </div>

      <h2 className="text-xl font-bold">{format(currentDate, "MMMM yyyy")}</h2>

      <div className="flex gap-2">
        <button
          onClick={() => setViewMode("month")}
          className={`px-3 py-1 rounded ${viewMode === "month" ? "bg-indigo-500 text-white" : "bg-gray-800"}`}
        >
          Lună
        </button>
        <button
          onClick={() => setViewMode("week")}
          className={`px-3 py-1 rounded ${viewMode === "week" ? "bg-indigo-500 text-white" : "bg-gray-800"}`}
        >
          Săptămână
        </button>
      </div>
    </div>
  );

  const generateCalendarDays = () => {
    const start = viewMode === "month" ? startOfWeek(startOfMonth(currentDate)) : startOfWeek(currentDate);
    const end = viewMode === "month" ? endOfWeek(endOfMonth(currentDate)) : endOfWeek(currentDate);

    const days: Date[] = [];
    let day = start;
    while (day <= end) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  };

  const days = generateCalendarDays();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 text-white min-h-screen pt-24 pb-8 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {renderHeader()}

        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Lu", "Ma", "Mi", "Jo", "Vi", "Sâ", "Du"].map((day) => (
            <div key={day} className="text-center text-gray-400 font-semibold">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 mt-2">
          {days.map((day) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const dayTasks = tasks.filter((task) => task.date === dateKey);
            const isToday = isSameDay(day, new Date());

            return (
              <motion.div
                whileHover={{ scale: 1.02 }}
                key={dateKey}
                onClick={() => setSelectedDate(day)}
                className={`rounded-lg p-3 min-h-[100px] cursor-pointer transition-all
                  ${!isSameMonth(day, currentDate) ? "bg-gray-700 text-gray-500" : "bg-gray-800 text-white"}
                  ${isToday ? "ring-2 ring-indigo-400" : ""}
                  ${selectedDate && isSameDay(day, selectedDate) ? "bg-indigo-700" : ""}
                `}
              >
                <div className="text-xs font-bold">{format(day, "d")}</div>
                <div className="mt-2 space-y-1">
                  {dayTasks.map((task, idx) => (
                    <div key={idx} className="bg-indigo-500 text-indigo-100 text-xs rounded px-2 py-1 truncate">
                      <span className="font-semibold">{task.text}</span>
                      <div className="text-xs">{task.type}</div>
                      <div className="flex gap-2 mt-1 text-xs">
                        <button onClick={() => handleEditTask(task)} className="text-yellow-400 hover:text-yellow-500">Editează</button>
                        <button onClick={() => handleDeleteTask(task.id)} className="text-red-400 hover:text-red-500">Șterge</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {selectedDate && (
          <div className="mt-6 text-right">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddTask}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Adaugă task pentru {selectedDate ? format(selectedDate, 'dd MMM yyyy') : ''}
            </motion.button>
          </div>
        )}

      </div>

      {/* Modal pentru adăugarea sau editarea task-urilor */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded-lg w-80">
            <h3 className="text-xl font-semibold mb-4">{taskInput.id ? "Editează Task" : "Adaugă Task"}</h3>
            <input
              type="text"
              placeholder="Numele taskului"
              value={taskInput.text}
              onChange={(e) => setTaskInput({ ...taskInput, text: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
            />
            <select
              value={taskInput.type}
              onChange={(e) => setTaskInput({ ...taskInput, type: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
            >
              <option value="">Selectează tipul activității</option>
              {taskTypes.map((type, idx) => (
                <option key={idx} value={type}>{type}</option>
              ))}
            </select>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded"
              >
                Anulează
              </button>
              <button
                onClick={handleSaveTask}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Salvează
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
