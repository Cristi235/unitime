"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NotesPage = () => {
  const [note, setNote] = useState("");
  const [notesHistory, setNotesHistory] = useState<
    { text: string; category: string; subject?: string; date: string; favorite: boolean }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [categories, setCategories] = useState(["Personal", "Work", "Study", "Other"]);
  const [subjects, setSubjects] = useState(["Math", "Physics", "Programming", "Other"]);
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Load notes from local storage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("notesHistory");
    if (savedNotes) {
      setNotesHistory(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes history to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("notesHistory", JSON.stringify(notesHistory));
  }, [notesHistory]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleSaveNote = () => {
    if (note.trim() === "") {
      alert("The note is empty!");
      return;
    }

    if (editIndex !== null) {
      // Update existing note
      setNotesHistory((prev) =>
        prev.map((n, i) =>
          i === editIndex
            ? {
                ...n,
                text: note,
                category: selectedCategory === "All" ? "Uncategorized" : selectedCategory,
                subject: selectedSubject === "All" ? undefined : selectedSubject,
                date: selectedDate || new Date().toISOString().split("T")[0],
              }
            : n
        )
      );
      setEditIndex(null);
      alert("Note updated!");
    } else {
      // Add new note
      const newNote = {
        text: note,
        category: selectedCategory === "All" ? "Uncategorized" : selectedCategory,
        subject: selectedSubject === "All" ? undefined : selectedSubject,
        date: selectedDate || new Date().toISOString().split("T")[0],
        favorite: false,
      };
      setNotesHistory((prev) => [newNote, ...prev]);
      alert("Note saved!");
    }

    setNote("");
  };

  const handleDeleteNote = (index: number) => {
    setNotesHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleFavorite = (index: number) => {
    setNotesHistory((prev) =>
      prev.map((note, i) =>
        i === index ? { ...note, favorite: !note.favorite } : note
      )
    );
  };

  const handleEditNote = (index: number) => {
    const noteToEdit = notesHistory[index];
    setNote(noteToEdit.text);
    setSelectedCategory(noteToEdit.category);
    setSelectedSubject(noteToEdit.subject || "All");
    setSelectedDate(noteToEdit.date);
    setEditIndex(index);
  };

  const handleClearAllNotes = () => {
    if (confirm("Are you sure you want to delete all notes?")) {
      setNotesHistory([]);
    }
  };

  const filteredNotes = notesHistory.filter(
    (note) =>
      (selectedCategory === "All" || note.category === selectedCategory) &&
      (selectedSubject === "All" || note.subject === selectedSubject) &&
      (!selectedDate || note.date === selectedDate) &&
      (!filterFavorites || note.favorite) &&
      note.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-32 px-6 pb-24">
      <motion.div
        className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          My Notes
        </h1>

        {/* Notes Editor */}
        <textarea
          value={note}
          onChange={handleTextChange}
          className="w-full h-64 p-4 text-lg bg-gray-700 text-white rounded-lg focus:outline-none"
          placeholder="Write your notes here..."
        />

        {/* Category and Subject Selector */}
        <div className="mt-4 flex gap-4">
          <div>
            <label className="text-white">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="ml-2 p-2 bg-gray-700 text-white rounded-lg"
            >
              <option value="All">All</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-white">Subject:</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="ml-2 p-2 bg-gray-700 text-white rounded-lg"
            >
              <option value="All">All</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-white">Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="ml-2 p-2 bg-gray-700 text-white rounded-lg"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          {/* Save Note */}
          <button
            onClick={handleSaveNote}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
          >
            {editIndex !== null ? "Update Note" : "Save Note"}
          </button>
          {/* Clear All Notes */}
          <button
            onClick={handleClearAllNotes}
            className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600"
          >
            Clear All Notes
          </button>
        </div>

        {/* Search Notes */}
        <div className="mt-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none"
          />
        </div>

        {/* Filter by Favorites */}
        <div className="mt-4 flex items-center">
          <label className="text-white mr-2">Show Favorites Only:</label>
          <input
            type="checkbox"
            checked={filterFavorites}
            onChange={(e) => setFilterFavorites(e.target.checked)}
            className="w-5 h-5"
          />
        </div>

        {/* Notes History */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Notes History
          </h3>
          {filteredNotes.length === 0 ? (
            <p className="text-gray-400">No saved notes.</p>
          ) : (
            <ul className="space-y-4">
              {filteredNotes.map((savedNote, index) => (
                <li
                  key={index}
                  className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="text-white truncate">{savedNote.text}</p>
                    <p className="text-gray-400 text-sm">
                      {savedNote.category} - {savedNote.subject || "No Subject"} -{" "}
                      {savedNote.date}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleToggleFavorite(index)}
                      className={`text-yellow-400 hover:text-yellow-500 ${
                        savedNote.favorite ? "font-bold" : ""
                      }`}
                    >
                      {savedNote.favorite ? "★" : "☆"}
                    </button>
                    <button
                      onClick={() => handleEditNote(index)}
                      className="text-blue-400 hover:text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteNote(index)}
                      className="text-red-400 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </main>
  );
};

export default NotesPage;