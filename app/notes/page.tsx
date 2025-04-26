'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  FaStar,
  FaRegStar,
  FaTrash,
  FaPlus,
  FaSearch,
  FaFileExport,
} from 'react-icons/fa';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  favorite: boolean;
  createdAt: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Omit<Note, 'id' | 'createdAt'>>({
    title: '',
    content: '',
    tags: [],
    favorite: false,
  });
  const [previewMode, setPreviewMode] = useState(false);
  const [sortByFav, setSortByFav] = useState(false);

  // Load/Save
  useEffect(() => {
    const data = localStorage.getItem('notes');
    if (data) setNotes(JSON.parse(data));
  }, []);
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Sort & Filter
  const sorted = [...notes].sort((a, b) =>
    sortByFav ? Number(b.favorite) - Number(a.favorite) : 0
  );
  const filtered = sorted.filter(n =>
    [n.title, n.content, ...n.tags]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // DnD-kit
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setNotes(items => {
        const oldIndex = items.findIndex(x => x.id === active.id);
        const newIndex = items.findIndex(x => x.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Form actions
  const openForm = (note?: Note) => {
    if (note) {
      setEditId(note.id);
      setDraft({
        title: note.title,
        content: note.content,
        tags: note.tags,
        favorite: note.favorite,
      });
    } else {
      setEditId(null);
      setDraft({ title: '', content: '', tags: [], favorite: false });
    }
    setPreviewMode(false);
    setIsFormOpen(true);
  };
  const saveNote = () => {
    if (editId) {
      setNotes(n => n.map(x => x.id === editId ? { ...x, ...draft } : x));
    } else {
      const newNote: Note = {
        ...draft,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      setNotes(n => [newNote, ...n]);
    }
    setIsFormOpen(false);
  };
  const deleteNote = (id: string) => setNotes(n => n.filter(x => x.id !== id));
  const toggleFav = (id: string) => setNotes(n => n.map(x => x.id === id ? { ...x, favorite: !x.favorite } : x));
  const exportNotes = () => {
    const blob = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'notes.json'; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <main className="pt-[12vh] p-6 bg-indigo-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100">
      {/* Header Controls */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notițe</h1>
        <div className="flex space-x-2">
          <button onClick={() => openForm()} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
            <FaPlus className="inline mr-1"/>Adaugă
          </button>
          <button onClick={exportNotes} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
            <FaFileExport className="inline mr-1"/>Export
          </button>
          <button onClick={() => setSortByFav(!sortByFav)} className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded">
            {sortByFav ? 'Toate' : 'Favorite'}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Caută notițe..." className="w-full pl-10 pr-3 py-2 rounded border bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"/>
      </div>

      {/* Form */}
      {isFormOpen && (
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} className="mb-6 p-4 bg-white dark:bg-gray-800 rounded shadow">
          <div className="flex space-x-2 mb-4">
            <button onClick={()=>setPreviewMode(false)} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">Edit</button>
            <button onClick={()=>setPreviewMode(true)} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">Preview</button>
          </div>
          {!previewMode ? (
            <>
              <input type="text" placeholder="Titlu" value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})} className="w-full mb-3 p-2 border rounded bg-gray-100 dark:bg-gray-700"/>
              <textarea placeholder="Conținut" value={draft.content} onChange={e=>setDraft({...draft,content:e.target.value})} className="w-full mb-3 p-2 border rounded h-32 bg-gray-100 dark:bg-gray-700"/>
              <input type="text" placeholder="Etichete, comma" value={draft.tags.join(',')} onChange={e=>setDraft({...draft,tags:e.target.value.split(',').map(t=>t.trim())})} className="w-full mb-3 p-2 border rounded bg-gray-100 dark:bg-gray-700"/>
            </>
          ) : (
            <div className="mb-3 p-2 border rounded h-32 overflow-auto bg-gray-100 dark:bg-gray-700"><ReactMarkdown>{draft.content}</ReactMarkdown></div>
          )}
          <div className="flex justify-end space-x-2">
            <button onClick={()=>setIsFormOpen(false)} className="px-4 py-2 bg-red-500 text-white rounded">Anulează</button>
            <button onClick={saveNote} className="px-4 py-2 bg-indigo-600 text-white rounded">Salvează</button>
          </div>
        </motion.div>
      )}

      {/* Grid */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filtered.map(n=>n.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(note=><NoteCard key={note.id} note={note} onEdit={()=>openForm(note)} onDelete={()=>deleteNote(note.id)} onToggle={()=>toggleFav(note.id)}/>)}
          </div>
        </SortableContext>
      </DndContext>
    </main>
  );
}

function NoteCard({note,onEdit,onDelete,onToggle}:{note:Note;onEdit:()=>void;onDelete:()=>void;onToggle:()=>void}){
  const {attributes,listeners,setNodeRef,transform,transition} = useSortable({id:note.id});
  const style = {transform:CSS.Transform.toString(transform),transition};
  return (
    <motion.div ref={setNodeRef} style={style} initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="p-4 bg-white dark:bg-gray-800 rounded shadow relative cursor-pointer" {...attributes} {...listeners} onClick={onEdit}>
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">{note.title}</h3>
        <div className="flex space-x-1">
          <button onClick={e=>{e.stopPropagation();onToggle();}} className="text-yellow-500"><FaStar/></button>
          <button onClick={e=>{e.stopPropagation();onDelete();}} className="text-red-500"><FaTrash/></button>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 my-2">{note.content}</p>
      <div className="flex flex-wrap gap-1 mb-2">{note.tags.map(t=><span key={t} className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 rounded">{t}</span>)}</div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(note.createdAt).toLocaleString()}</p>
    </motion.div>
  );
}
