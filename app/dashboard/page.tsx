"use client";

import { useState, useEffect } from "react";
import { PrivateRoute } from "../context/PrivateRoute";

const DashboardPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [weather, setWeather] = useState<{
    temperature: number;
    windspeed: number;
    weathercode: number;
  } | null>(null);
  const [activities, setActivities] = useState<{ id: number; title: string; dueDate: string }[]>([]);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);
  const [weatherError, setWeatherError] = useState(false);

  // Fetch weather from Open-Meteo
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=45.65&longitude=25.6&current_weather=true`
        );
        if (!response.ok) throw new Error("Failed to fetch weather data");
        const data = await response.json();
        setWeather({
          temperature: data.current_weather.temperature,
          windspeed: data.current_weather.windspeed,
          weathercode: data.current_weather.weathercode,
        });
        setWeatherError(false);
      } catch (error) {
        console.error(error);
        setWeatherError(true);
      }
    };

    fetchWeather();
  }, []);

  // Fetch activities
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
    if (isPomodoroRunning && pomodoroTime > 0) {
      const timer = setInterval(() => {
        setPomodoroTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (pomodoroTime === 0) {
      setIsPomodoroRunning(false);
      alert("Pomodoro session complete!");
    }
  }, [isPomodoroRunning, pomodoroTime]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <PrivateRoute>
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center pt-20 px-6 py-12">
        <div className="text-center max-w-4xl px-6 font-sans mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Stay on top of your tasks, track your progress, and achieve your goals with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          {/* Weather */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center">
            <h3 className="text-lg font-semibold text-white mb-4">Live Weather in Brașov</h3>
            {weatherError ? (
              <p className="text-red-500">Failed to load weather data.</p>
            ) : weather ? (
              <div className="text-center">
                <p className="text-2xl font-bold">Temperature: {weather.temperature}°C</p>
                <p className="text-lg">Wind Speed: {weather.windspeed} km/h</p>
                <p className="text-sm text-gray-400">Code: {weather.weathercode}</p>
              </div>
            ) : (
              <p className="text-gray-400">Loading...</p>
            )}
          </div>

          {/* Activities */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center">
            <h3 className="text-lg font-semibold text-white mb-4">Upcoming Activities</h3>
            {activities.length > 0 ? (
              <ul className="text-gray-400 text-sm">
                {[...activities]
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                  .map((activity) => (
                    <li key={activity.id} className="mb-2">
                      <span className="font-bold text-white">{activity.title}</span> -{" "}
                      <span>{activity.dueDate}</span>
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No activities available.</p>
            )}
          </div>

          {/* Pomodoro */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center">
            <h3 className="text-lg font-semibold text-white mb-4">Pomodoro Timer</h3>
            <div className="text-center mb-4">
              <p className="text-3xl font-bold">{formatTime(pomodoroTime)}</p>
            </div>
            <button
              onClick={() => setIsPomodoroRunning((prev) => !prev)}
              className="bg-blue-600 text-white py-2 px-4 rounded-full"
            >
              {isPomodoroRunning ? "Pause" : "Start"}
            </button>
          </div>
        </div>
      </main>
    </PrivateRoute>
  );
};

export default DashboardPage;
