"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import dayjs from "dayjs";

// Importăm FullCalendar doar pe client
const FullCalendar = dynamic(() => import("@fullcalendar/react"), { ssr: false });
import dayGridPlugin from "@fullcalendar/daygrid";     // Vizualizare lunară
import timeGridPlugin from "@fullcalendar/timegrid";   // Vizualizare săptămânală/zi
import listPlugin from "@fullcalendar/list";           // Vizualizare listă
import interactionPlugin from "@fullcalendar/interaction"; // Interacțiuni

type TaskEvent = {
  id: string;
  title: string;
  start: string;
  end?: string;
  extendedProps: {
    category: string;
  };
};

export default function SchedulePage() {
  const calendarRef = useRef<any>(null);
  const [events, setEvents] = useState<TaskEvent[]>([]);
  const [quickText, setQuickText] = useState("");

  // Încărcăm evenimentele din localStorage
  useEffect(() => {
    const storedEvents = localStorage.getItem("fcEvents");
    if (storedEvents) setEvents(JSON.parse(storedEvents));
  }, []);

  // Salvăm evenimentele în localStorage
  useEffect(() => {
    localStorage.setItem("fcEvents", JSON.stringify(events));
  }, [events]);

  // Adăugare rapidă de evenimente
  const handleQuickAdd = () => {
    if (!quickText.trim()) return;
    const iso = dayjs().hour(12).minute(0).second(0).format();
    setEvents((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: quickText,
        start: iso,
        extendedProps: { category: "Curs" },
      },
    ]);
    setQuickText("");
  };

  // Creare eveniment prin selectare
  const handleDateSelect = (selectInfo: any) => {
    const title = prompt("Numele activității:");
    if (title) {
      setEvents((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          extendedProps: { category: "Curs" },
        },
      ]);
    }
    selectInfo.view.calendar.unselect();
  };

  // Mutare eveniment prin drag-and-drop
  const handleEventDrop = (dropInfo: any) => {
    const { event } = dropInfo;
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === event.id
          ? { ...ev, start: event.startStr, end: event.endStr || undefined }
          : ev
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4">
        <h1 className="text-xl font-bold">Orar</h1>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gray-800">
        <div className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Adaugă rapid o activitate..."
            value={quickText}
            onChange={(e) => setQuickText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleQuickAdd()}
            className="flex-grow px-3 py-2 rounded bg-gray-700 text-white"
          />
          <button
            onClick={handleQuickAdd}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Adaugă
          </button>
        </div>
      </div>

      {/* Legendă categorii */}
      <div className="flex gap-4 p-4 text-sm">
        {[
          ["Curs", "bg-green-500"],
          ["Seminar", "bg-blue-500"],
          ["Laborator", "bg-purple-500"],
        ].map(([label, color]) => (
          <div key={label} className="flex items-center gap-1">
            <span className={`${color} w-3 h-3 rounded-full`}></span>
            {label}
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="p-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          selectable={true}
          editable={true}
          selectMirror={true}
          select={handleDateSelect}
          eventDrop={handleEventDrop}
          events={events as any}
          eventContent={(eventInfo) => {
            const cat = eventInfo.event.extendedProps.category;
            const cls =
              cat === "Curs"
                ? "bg-green-600"
                : cat === "Seminar"
                ? "bg-blue-600"
                : "bg-purple-600";
            return (
              <div className={`${cls} text-white text-xs px-1 rounded`}>
                {eventInfo.event.title}
              </div>
            );
          }}
          dayMaxEvents={3}
          themeSystem="standard"
          height="auto"
        />
      </div>
    </div>
  );
}
