"use client";

import { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { motion } from "framer-motion";

interface Task {
  id: number;
  date: string;
  text: string;
  type: string;
  priority: string;
  recurrence: string;
}

interface UniversitySchedule {
  id: number;
  weekType: "Odd" | "Even";
  courseName: string;
}

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [universitySchedules, setUniversitySchedules] = useState<UniversitySchedule[]>([]);
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showUniversityModal, setShowUniversityModal] = useState(false);
  const [taskInput, setTaskInput] = useState({
    text: "",
    type: "",
    priority: "Medium",
    recurrence: "None",
    id: null as number | null,
  });
  const [universityInput, setUniversityInput] = useState({
    weekType: "Odd" as "Odd" | "Even",
    courseName: "",
  });

  const taskTypes = ["Work", "Sport", "Study", "Relax"];
  const priorityOptions = ["Low", "Medium", "High"];
  const recurrenceOptions = ["None", "Daily", "Weekly", "Monthly"];

  useEffect(() => {
    const savedTasks = localStorage.getItem("scheduleTasks");
    const savedSchedules = localStorage.getItem("universitySchedules");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedSchedules) setUniversitySchedules(JSON.parse(savedSchedules));
  }, []);

  useEffect(() => {
    localStorage.setItem("scheduleTasks", JSON.stringify(tasks));
    localStorage.setItem("universitySchedules", JSON.stringify(universitySchedules));
  }, [tasks, universitySchedules]);

  const handleAddTask = () => {
    if (!selectedDate) return;
    setTaskInput({ text: "", type: "", priority: "Medium", recurrence: "None", id: null });
    setShowTaskModal(true);
  };

  const handleSaveTask = () => {
    if (!taskInput.text || !taskInput.type || !selectedDate) return;

    const newTask = {
      date: format(selectedDate, "yyyy-MM-dd"),
      text: taskInput.text,
      type: taskInput.type,
      priority: taskInput.priority,
      recurrence: taskInput.recurrence,
      id: taskInput.id !== null ? taskInput.id : Date.now(),
    };

    if (taskInput.id !== null) {
      setTasks(tasks.map((task) => (task.id === taskInput.id ? { ...task, ...newTask } : task)));
    } else {
      setTasks((prev) => [...prev, newTask]);
    }

    setShowTaskModal(false);
  };

  const handleEditTask = (task: Task) => {
    setTaskInput({
      text: task.text,
      type: task.type,
      priority: task.priority,
      recurrence: task.recurrence,
      id: task.id,
    });
    setSelectedDate(new Date(task.date));
    setShowTaskModal(true);
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleAddUniversitySchedule = () => {
    setUniversityInput({ weekType: "Odd", courseName: "" });
    setShowUniversityModal(true);
  };

  const handleSaveUniversitySchedule = () => {
    if (!universityInput.courseName) return;

    const newSchedule = {
      id: Date.now(),
      weekType: universityInput.weekType,
      courseName: universityInput.courseName,
    };

    setUniversitySchedules((prev) => [...prev, newSchedule]);
    setShowUniversityModal(false);
  };

  const renderHeader = () => (
    <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            viewMode === "month" ? setCurrentDate(subMonths(currentDate, 1)) : setCurrentDate(subWeeks(currentDate, 1))
          }
          className="text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          ← Previous
        </button>
        <button
          onClick={() => setCurrentDate(new Date())}
          className="text-gray-300 hover:text-gray-500 font-semibold"
        >
          Today
        </button>
        <button
          onClick={() =>
            viewMode === "month" ? setCurrentDate(addMonths(currentDate, 1)) : setCurrentDate(addWeeks(currentDate, 1))
          }
          className="text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          Next →
        </button>
      </div>

      <h2 className="text-2xl font-bold">{format(currentDate, "MMMM yyyy")}</h2>

      <div className="flex gap-2">
        <button
          onClick={() => setViewMode("month")}
          className={`px-4 py-2 rounded ${viewMode === "month" ? "bg-indigo-500 text-white" : "bg-gray-800"}`}
        >
          Month
        </button>
        <button
          onClick={() => setViewMode("week")}
          className={`px-4 py-2 rounded ${viewMode === "week" ? "bg-indigo-500 text-white" : "bg-gray-800"}`}
        >
          Week
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
      className="bg-gray-900 text-white min-h-screen pt-32 pb-8 px-4 relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        {renderHeader()}

        <div className="flex gap-4 mb-6">
          <button
            onClick={handleAddUniversitySchedule}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add University Schedule
          </button>
          <button
            onClick={handleAddTask}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add Activity
          </button>
        </div>

        <div className="grid grid-cols-7 gap-4 mt-2">
          {days.map((day) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const dayTasks = tasks.filter((task) => task.date === dateKey);
            const isToday = isSameDay(day, new Date());

            return (
              <motion.div
                whileHover={{ scale: 1.02 }}
                key={dateKey}
                onClick={() => setSelectedDate(day)}
                className={`rounded-lg p-4 min-h-[120px] cursor-pointer transition-all
                  ${!isSameMonth(day, currentDate) ? "bg-gray-700 text-gray-500" : "bg-gray-800 text-white"}
                  ${isToday ? "ring-2 ring-indigo-400" : ""}
                `}
              >
                <div className="text-sm font-bold">{format(day, "d")}</div>
                <div className="mt-2 space-y-1">
                  {dayTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`bg-${task.priority === "High" ? "red" : task.priority === "Medium" ? "yellow" : "green"}-500 text-indigo-100 text-xs rounded px-2 py-1 truncate`}
                    >
                      <span className="font-semibold">{task.text}</span>
                      <div className="text-xs">{task.type}</div>
                      <div className="flex gap-2 mt-1 text-xs">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="text-yellow-400 hover:text-yellow-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-400 hover:text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded-lg w-96">
            <h3 className="text-2xl font-semibold mb-6">{taskInput.id ? "Edit Task" : "Add Task"}</h3>
            <input
              type="text"
              placeholder="Task Name"
              value={taskInput.text}
              onChange={(e) => setTaskInput({ ...taskInput, text: e.target.value })}
              className="w-full p-3 mb-4 bg-gray-800 text-white rounded"
            />
            <select
              value={taskInput.type}
              onChange={(e) => setTaskInput({ ...taskInput, type: e.target.value })}
              className="w-full p-3 mb-4 bg-gray-800 text-white rounded"
            >
              <option value="">Select Activity Type</option>
              {taskTypes.map((type, idx) => (
                <option key={idx} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select
              value={taskInput.priority}
              onChange={(e) => setTaskInput({ ...taskInput, priority: e.target.value })}
              className="w-full p-3 mb-4 bg-gray-800 text-white rounded"
            >
              <option value="">Select Priority</option>
              {priorityOptions.map((priority, idx) => (
                <option key={idx} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowTaskModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTask}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* University Schedule Modal */}
      {showUniversityModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded-lg w-96">
            <h3 className="text-2xl font-semibold mb-6">Add University Schedule</h3>
            <select
              value={universityInput.weekType}
              onChange={(e) => setUniversityInput({ ...universityInput, weekType: e.target.value as "Odd" | "Even" })}
              className="w-full p-3 mb-4 bg-gray-800 text-white rounded"
            >
              <option value="Odd">Odd Week</option>
              <option value="Even">Even Week</option>
            </select>
            <input
              type="text"
              placeholder="Course Name"
              value={universityInput.courseName}
              onChange={(e) => setUniversityInput({ ...universityInput, courseName: e.target.value })}
              className="w-full p-3 mb-4 bg-gray-800 text-white rounded"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowUniversityModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUniversitySchedule}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}