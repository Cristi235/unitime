import Plusicon from "@/app/icons/Plusicon"
import TrashIcon from "@/app/icons/TrashIcon"
import { Column, Task } from "@/app/types"
import { Id } from "@/app/types"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useMemo, useState } from "react"
import TaskCard from "./TaskCard"
import { SortableContext } from "@dnd-kit/sortable"

interface Props {
  column : Column
  deleteColumn: (id: Id) => void
  updateColumn: (id: Id, title: string) => void

  createTask: (columnId: Id) => void
  tasks: Task[];
  deleteTask: (id: Id) => void
  updateTask: (id: Id, content: string) => void
}


const ColumnContainer = (props : Props) => {

const { column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask } = props

const [editMode, setEditMode] = useState(false);

const tasksIds = useMemo(() => {
  return tasks.map((task) => task.id);
}, [tasks]);

 const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
  id: column.id,
  data: {
    type: 'Column',
    column,
  },
  disabled: editMode,
 });

 const style = {
  transition,
  transform: CSS.Transform.toString(transform),
 }; 


 if (isDragging) {
  return <div ref={setNodeRef} style={style} className="
  bg-columnBackgroundColor
  opcaity-60
  border-2
  border-gray-600
  h-[500px]
  w-[350px]
  max-h-[500px]
  rounded-md
  flex
  flex-col
"> </div >;
 }


 return (
  <div
  ref={setNodeRef}
  style={style}
  className="
    bg-gray-800
    h-[500px]
    w-[350px]
    max-h-[500px]
    rounded-lg
    flex
    flex-col
    shadow-lg
    border-2
    border-gray-700
    transition
    hover:shadow-xl
    overflow-visible
  "
>
  {/* Column Title */}
  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-t-lg">
    {!editMode && (
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="
          text-lg
          font-bold
          text-gray-300
          cursor-grab
          flex-grow
          hover:text-white
          transition
        "
      >
        {column.title}
      </div>
    )}
    {editMode && (
      <input
        className="
          w-full
          bg-gray-600
          text-gray-300
          rounded
          px-2
          py-1
          focus:outline-none
          focus:ring-2
          focus:ring-purple-500
        "
        value={column.title}
        onChange={(e) => updateColumn(column.id, e.target.value)}
        autoFocus
        onBlur={() => setEditMode(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setEditMode(false);
        }}
      />
    )}
    <button
      onClick={() => deleteColumn(column.id)}
      className="
        text-gray-400
        stroke-gray-400
        hover:stroke-red-500
        hover:text-red-500
        transition
        p-2
        rounded
        focus:outline-none
        focus:ring-2
        focus:ring-red-500
        z-10
      "
    >
      <TrashIcon />
    </button>
  </div>

  {/* Tasks Container */}
  <div
    className="
      flex-grow
      flex
      flex-col
      gap-4
      p-4
      overflow-y-auto
      bg-gray-800
      rounded-b-lg
    "
  >
    <SortableContext items={tasksIds}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      ))}
    </SortableContext>
  </div>

  {/* Add Task Button */}
  <button
    onClick={() => createTask(column.id)}
    className="
      flex
      items-center
      justify-center
      gap-2
      p-4
      bg-gray-700
      text-gray-300
      hover:bg-gray-600
      rounded-b-lg
      transition
    "
  >
    <Plusicon />
    Add Task
  </button>
</div>
);
}

export default ColumnContainer
