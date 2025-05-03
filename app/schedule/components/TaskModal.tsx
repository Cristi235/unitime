"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";

type Task = {
  id: string;
  dateTime: string;
  text: string;
  category: "Curs"|"Seminar"|"Laborator";
};

export default function TaskModal({
  dateTime,
  existing,
  onSave,
  onDelete,
  onClose,
}: {
  dateTime: Date;
  existing?: Task;
  onSave: (t: Task) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}) {
  const [text, setText] = useState(existing?.text||"");
  const [category, setCategory] = useState<"Curs"|"Seminar"|"Laborator">(existing?.category||"Curs");
  const [time, setTime] = useState(dateTime.toISOString().slice(11,16));

  const save = ()=>{
    const iso = format(dateTime,"yyyy-MM-dd") + "T" + time;
    onSave({
      id: existing?.id||Date.now().toString(),
      dateTime: iso,
      text,
      category,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg w-80">
        <h3 className="text-xl mb-4">{existing?"Edit Activity":"Add Activity"}</h3>
        <div className="mb-3">
          <label className="block mb-1">Date & Time</label>
          <input
            type="date"
            value={format(dateTime,"yyyy-MM-dd")}
            disabled
            className="w-full mb-2 bg-gray-800 p-2 rounded"
          />
          <input
            type="time"
            value={time}
            onChange={e=>setTime(e.target.value)}
            className="w-full bg-gray-800 p-2 rounded"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Text</label>
          <input value={text} onChange={e=>setText(e.target.value)} className="w-full bg-gray-800 p-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Category</label>
          <select value={category} onChange={e=>setCategory(e.target.value as any)} className="w-full bg-gray-800 p-2 rounded">
            <option value="Curs">Curs</option>
            <option value="Seminar">Seminar</option>
            <option value="Laborator">Laborator</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          {existing && <button onClick={()=>{ onDelete(existing.id); onClose(); }} className="px-4 py-2 bg-red-600 rounded">Delete</button>}
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
          <button onClick={save} className="px-4 py-2 bg-indigo-600 rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
