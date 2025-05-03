"use client";

import React, { useState } from "react";

export default function UniversityModal({
  onSave,
  onClose,
}: {
  onSave: (s: { id:string; weekType:"Odd"|"Even"; courseName:string; dayOfWeek:number; hour:number }) => void;
  onClose: ()=>void;
}) {
  const [weekType, setWeekType] = useState<"Odd"|"Even">("Odd");
  const [courseName, setCourseName] = useState("");
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(8);

  const save = ()=>{
    onSave({ id:Date.now().toString(), weekType, courseName, dayOfWeek: day, hour });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg w-80">
        <h3 className="text-xl mb-4">Add University Schedule</h3>
        <div className="mb-3">
          <label>Week Type</label>
          <select value={weekType} onChange={e=>setWeekType(e.target.value as any)} className="w-full bg-gray-800 p-2 rounded">
            <option value="Odd">Odd Week</option>
            <option value="Even">Even Week</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Course Name</label>
          <input value={courseName} onChange={e=>setCourseName(e.target.value)} className="w-full bg-gray-800 p-2 rounded" />
        </div>
        <div className="mb-3">
          <label>Day of Week</label>
          <select value={day} onChange={e=>setDay(+e.target.value)} className="w-full bg-gray-800 p-2 rounded">
            {[...Array(7)].map((_,i)=><option key={i} value={i}>{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][i]}</option>)}
          </select>
        </div>
        <div className="mb-4">
          <label>Hour</label>
          <select value={hour} onChange={e=>setHour(+e.target.value)} className="w-full bg-gray-800 p-2 rounded">
            {Array.from({length:13},(_,i)=>8+i).map(h=><option key={h} value={h}>{h}:00</option>)}
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
          <button onClick={save} className="px-4 py-2 bg-green-600 rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
