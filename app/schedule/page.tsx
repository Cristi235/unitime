"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import { FaPlus } from "react-icons/fa";

const FullCalendar = dynamic(() => import("@fullcalendar/react"), { ssr: false });
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

type TaskEvent = {
  id: string;
  title: string;
  location?: string;
  start: string;
  end?: string;
  extendedProps: {
    category?: string;
    weekMode?: "Odd" | "Even" | "Both";
  };
};

const defaultCategories = [
  { label: "Activity", color: "bg-blue-500" },
  { label: "University Subject", color: "bg-green-500" },
];

export default function SchedulePage() {
  const [events, setEvents] = useState<TaskEvent[]>([]);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Partial<TaskEvent>>({});
  const [categories] = useState(defaultCategories);

  
  useEffect(() => {
    const storedEvents = localStorage.getItem("fcEvents");
    if (storedEvents) setEvents(JSON.parse(storedEvents));
  }, []);

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("fcEvents", JSON.stringify(events));
    }, 300);
    return () => clearTimeout(timeout);
  }, [events]);

  
  const openActivityModal = (eventData: Partial<TaskEvent> = {}) => {
    setModalData(eventData);
    setIsActivityModalOpen(true);
  };

  
  const openSubjectModal = () => {
    setModalData({});
    setIsSubjectModalOpen(true);
  };

  
  const closeModals = () => {
    setModalData({});
    setIsActivityModalOpen(false);
    setIsSubjectModalOpen(false);
  };

  
  const saveEvent = () => {
    if (!modalData.title || !modalData.start) {
      alert("Title and start date are required!");
      return;
    }

    if (modalData.end && modalData.start > modalData.end) {
      alert("Start date must be before the end date!");
      return;
    }

    if (modalData.id) {

      setEvents((prev) =>
        prev.map((ev) => (ev.id === modalData.id ? { ...ev, ...modalData } : ev))
      );
    } else {
      
      setEvents((prev) => [
        ...prev,
        {
          id: uuidv4(),
          title: modalData.title,
          location: modalData.location,
          start: modalData.start,
          end: modalData.end,
          extendedProps: {
            category: modalData.extendedProps?.category || "Activity",
            weekMode: modalData.extendedProps?.weekMode || "Both",
          },
        } as TaskEvent,
      ]);
    }

    closeModals();
  };

 
  const deleteEvent = (eventId: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents((prev) => prev.filter((ev) => ev.id !== eventId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-24">
      {/* Buttons */}
      <div className="flex justify-center gap-4 items-center p-4">
        <button
          onClick={() => openActivityModal()}
          className="px-6 py-3 bg-gradient-to-r from-purple-400 to-blue-500 text-white rounded-lg shadow-md hover:opacity-90 transition flex items-center gap-2"
        >
          <FaPlus /> Add Activity
        </button>
        <button
          onClick={openSubjectModal}
          className="px-6 py-3 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-lg shadow-md hover:opacity-90 transition flex items-center gap-2"
        >
          <FaPlus /> Add Subject
        </button>
      </div>

      {/* Calendar */}
      <div className="p-4">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            firstDay={1} 
            dayHeaderClassNames="bg-gray-700 text-gray-200 border-b border-gray-600"
            contentHeight="auto"
            selectable={true}
            editable={true}
            selectMirror={true}
            select={(info) =>
              openActivityModal({ start: info.startStr, end: info.endStr })
            }
            eventClick={(info) =>
              openActivityModal({
                id: info.event.id,
                title: info.event.title,
                location: info.event.extendedProps.location,
                start: info.event.startStr,
                end: info.event.endStr,
                extendedProps: {
                  category: info.event.extendedProps?.category || "Activity",
                  weekMode: info.event.extendedProps?.weekMode || "Both",
                },
              })
            }
            events={events as any}
            eventContent={(eventInfo) => {
              const cat = eventInfo.event.extendedProps.category;
              const cls =
                cat === "Activity"
                  ? "bg-blue-600"
                  : cat === "University Subject"
                  ? "bg-green-600"
                  : "bg-gray-600";
              return (
                <div
                  className={`${cls} text-white text-xs px-1 rounded flex justify-between items-center`}
                >
                  <span>{eventInfo.event.title}</span>
                  <button
                    onClick={() => deleteEvent(eventInfo.event.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    ✕
                  </button>
                </div>
              );
            }}
            dayMaxEvents={3}
            themeSystem="standard"
          />
        </div>
      </div>

      {/* Activity Modal */}
      {isActivityModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {modalData.id ? "Edit Activity" : "Add Activity"}
            </h2>
            <div className="mb-4">
              <label className="block text-sm mb-1">Title</label>
              <input
                type="text"
                value={modalData.title || ""}
                onChange={(e) =>
                  setModalData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Location</label>
              <input
                type="text"
                value={modalData.location || ""}
                onChange={(e) =>
                  setModalData((prev) => ({ ...prev, location: e.target.value }))
                }
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Start Date</label>
              <input
                type="datetime-local"
                value={modalData.start || ""}
                onChange={(e) =>
                  setModalData((prev) => ({ ...prev, start: e.target.value }))
                }
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">End Date</label>
              <input
                type="datetime-local"
                value={modalData.end || ""}
                onChange={(e) =>
                  setModalData((prev) => ({ ...prev, end: e.target.value }))
                }
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModals}
                className="px-4 py-2 bg-gray-600 text-white rounded shadow-md hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={saveEvent}
                className="px-4 py-2 bg-gradient-to-r from-purple-400 to-blue-500 text-white rounded shadow-md hover:opacity-90 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subject Modal */}
      {isSubjectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add University Subject</h2>
            <div className="mb-4">
              <label className="block text-sm mb-1">Subject Name</label>
              <input
                type="text"
                value={modalData.title || ""}
                onChange={(e) =>
                  setModalData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Location</label>
              <input
                type="text"
                value={modalData.location || ""}
                onChange={(e) =>
                  setModalData((prev) => ({ ...prev, location: e.target.value }))
                }
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Week Mode</label>
              <select
                value={modalData.extendedProps?.weekMode || "Both"}
                onChange={(e) =>
                  setModalData((prev) => ({
                    ...prev,
                    extendedProps: {
                      ...prev.extendedProps,
                      weekMode: e.target.value as "Odd" | "Even" | "Both",
                    },
                  }))
                }
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
              >
                <option value="Both">Both Weeks</option>
                <option value="Odd">Odd Weeks</option>
                <option value="Even">Even Weeks</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Start Date</label>
              <input
                type="datetime-local"
                value={modalData.start || ""}
                onChange={(e) =>
                  setModalData((prev) => ({ ...prev, start: e.target.value }))
                }
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">End Date</label>
              <input
                type="datetime-local"
                value={modalData.end || ""}
                onChange={(e) =>
                  setModalData((prev) => ({ ...prev, end: e.target.value }))
                }
                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModals}
                className="px-4 py-2 bg-gray-600 text-white rounded shadow-md hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={saveEvent}
                className="px-4 py-2 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded shadow-md hover:opacity-90 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}