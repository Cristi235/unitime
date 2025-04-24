"use client";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, activity: "Terminarea temei la matematică", completed: false },
    { id: 2, activity: "Participarea la seminarul de fizică", completed: false },
    { id: 3, activity: "Începerea proiectului de informatică", completed: false },
  ]);
  const [schedule, setSchedule] = useState([
    { id: 1, time: "08:00 - 10:00", subject: "Matematică" },
    { id: 2, time: "10:30 - 12:00", subject: "Fizică" },
    { id: 3, time: "13:00 - 15:00", subject: "Informatică" },
  ]);
  const [progress, setProgress] = useState(75);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : prev));
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  const toggleActivity = (id: number) => {
    setRecentActivities((prev) =>
      prev.map((activity) =>
        activity.id === id
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Card Activități recente */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Activități recente
        </h2>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={activity.completed}
                onChange={() => toggleActivity(activity.id)}
                className="text-blue-600"
              />
              <p className={activity.completed ? "line-through" : ""}>
                {activity.activity}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Orar */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Orarul zilei
        </h2>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          {schedule.map((item) => (
            <li key={item.id}>
              <strong>{item.time}</strong>: {item.subject}
            </li>
          ))}
        </ul>
      </div>

      {/* Card Progres */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Progresul tău
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Ai completat {progress}% din tema pentru acest semestru.
        </p>
        <div className="mt-4">
          <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
