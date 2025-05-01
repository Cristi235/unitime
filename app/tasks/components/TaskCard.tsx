import React, { useState } from 'react';
import { Task, Id } from '@/app/types';
import TrashIcon from '@/app/icons/TrashIcon';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask}: Props) {

  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: editMode,
   });

   const style = {
     transition,
     transform: CSS.Transform.toString(transform),
    }; 

  const toggleEditMode = () => {
    setEditMode(prev => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="
    opacity-30
    bg-mainBackgroundColor p-2.5 h-[100px]
    min-h-[100px] items-center flex text-left rounded-xl
    hover:ring-2 hover:ring-inset hover:ring-purple-500
    cursor-grab border-2 border-purple-500 relative 
    "> </div >;
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-gray-700 p-4 rounded-lg shadow-md transition"
      >
        <textarea
          className="w-full h-full bg-gray-600 text-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={task.content}
          autoFocus
          placeholder="Type your task here..."
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter") toggleEditMode();
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        />
      </div>
    );
  }

  return (
  <div
  ref={setNodeRef}
  style={style}
  {...attributes}
  {...listeners}
  onClick={toggleEditMode}
   className="bg-mainBackgroundColor p-2.5 h-[100px]
  min-h-[100px] items-center flex text-left rounded-xl
  hover:ring-2 hover:ring-inset hover:ring-purple-500
  cursor-grab relative .task"

  onMouseEnter={() => setMouseIsOver(true)}
  onMouseLeave={() => setMouseIsOver(false)}

  >
    <p 
    className="my-auto h-[90%] w-full overflow-y-auto
    overflow-x-hidden whitespace-pre-wrap"
    >
      {task.content}
    </p> 

  {mouseIsOver && (
    <button 
    onClick={() => {
        deleteTask(task.id);
      }
    }
    className=" stroke-white
  absolute right-4 top-1/2-translate-y-[-50%]
  hover:stroke-red-500 p-2 rounded opacity-60 hover:opacity-100
"
  > 
    <TrashIcon />
  </button>
  )}
   </div>
  );
}
export default TaskCard
