"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const [weather, setWeather] = useState<{
    name: string;
    main: { temp: number };
    weather: { description: string }[];
  } | null>(null);
  const [activities, setActivities] = useState<{ id: number; title: string; dueDate: string }[]>([]);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);
  const [weatherError, setWeatherError] = useState(false);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=YOUR_API_KEY`
        );
        if (!response.ok) throw new Error("Failed to fetch weather data");
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error(error);
        setWeatherError(true);
      }
    };
    fetchWeather();
  }, []);

  // Fetch activities (mocked for now)
  useEffect(() => {
    const mockActivities = [
      { id: 1, title: "Math Homework", dueDate: "2025-05-01" },
      { id: 2, title: "Group Project Meeting", dueDate: "2025-05-03" },
      { id: 3, title: "Physics Quiz", dueDate: "2025-05-05" },
    ];
    setActivities(mockActivities);
  }, []);

  // Pomodoro Timer Logic
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isPomodoroRunning && pomodoroTime > 0) {
      timer = setInterval(() => {
        setPomodoroTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setIsPomodoroRunning(false);
      alert("Pomodoro session complete!");
    }
    return () => clearInterval(timer);
  }, [isPomodoroRunning, pomodoroTime]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center pt-20 px-6 py-12">
      {/* Welcome Section */}
      <motion.div
        className="text-center max-w-4xl px-6 font-sans mb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
          Welcome to Your Dashboard
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Stay on top of your tasks, track your progress, and achieve your goals with ease.
        </p>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Live Weather */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center">
          <h3 className="text-lg font-semibold text-white mb-4">Live Weather</h3>
          {weatherError ? (
            <p className="text-red-500">Failed to load weather data.</p>
          ) : weather ? (
            <div className="text-center">
              <p className="text-2xl font-bold">{weather.name}</p>
              <p className="text-lg">{weather.main.temp}°C</p>
              <p className="text-sm text-gray-400">{weather.weather[0].description}</p>
            </div>
          ) : (
            <p className="text-gray-400">Loading...</p>
          )}
        </div>

        {/* Upcoming Activities */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center">
          <h3 className="text-lg font-semibold text-white mb-4">Upcoming Activities</h3>
          {activities.length > 0 ? (
            <ul className="text-gray-400 text-sm">
              {activities.map((activity) => (
                <li key={activity.id} className="mb-2">
                  <span className="font-bold text-white">{activity.title}</span> -{" "}
                  <span>{activity.dueDate}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No activities found.</p>
          )}
        </div>

        {/* Pomodoro Timer */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center">
          <h3 className="text-lg font-semibold text-white mb-4">Pomodoro Timer</h3>
          <p className="text-4xl font-bold mb-4">{formatTime(pomodoroTime)}</p>
          <div className="flex gap-4">
            <button
              onClick={() => setIsPomodoroRunning(true)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white"
            >
              Start
            </button>
            <button
              onClick={() => setIsPomodoroRunning(false)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white"
            >
              Pause
            </button>
            <button
              onClick={() => {
                setIsPomodoroRunning(false);
                setPomodoroTime(25 * 60);
              }}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white"
            >
              Reset
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default DashboardPage;