"use client";

import Plusicon from "@/app/icons/Plusicon";
import { Column, Task, Id } from "@/app/types";
import { useMemo, useState, useEffect } from "react";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  useSensors,
  DragOverEvent,
  PointerSensor,
  useSensor,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { arrayMove } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  useEffect(() => {
    const savedColumns = localStorage.getItem("kanbanColumns");
    const savedTasks = localStorage.getItem("kanbanTasks");
    if (savedColumns) {
      try {
        setColumns(JSON.parse(savedColumns));
      } catch {
        console.error("Invalid kanbanColumns");
      }
    }
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch {
        console.error("Invalid kanbanTasks");
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("kanbanColumns", JSON.stringify(columns));
  }, [columns, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks, hydrated]);

  if (!hydrated) return null;

  return (
    <div
      className="
        flex flex-col items-center justify-center w-full min-h-[80vh]
        bg-gray-900 rounded-lg shadow-lg p-6 gap-6
      "
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        {/* Parent container with horizontal scrolling */}
        <div className="w-full overflow-x-auto">
          {/* Columns container with dynamic width */}
          <div
            className={`inline-flex gap-6 ${
              columns.length === 0 ? "justify-center w-full" : ""
            }`}
          >
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))}
            </SortableContext>
            <button
              onClick={createNewColumn}
              className="
                h-[60px] w-[350px] min-w-[350px] cursor-pointer
                bg-gray-800 border-2 border-gray-700 text-gray-300
                hover:bg-gray-700 hover:border-gray-600 rounded-lg
                flex items-center justify-center gap-2 transition
              "
            >
              <Plusicon />
              Add Column
            </button>
          </div>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn ? (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ) : activeTask ? (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: "Task " + (tasks.length + 1),
    };
    setTasks((prev) => [...prev, newTask]);
  }

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: "New Column",
    };
    setColumns((prev) => [...prev, columnToAdd]);
  }

  function updateTask(id: Id, content: string) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, content } : task))
    );
  }

  function deleteTask(id: Id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function deleteColumn(id: Id) {
    setColumns((prev) => prev.filter((col) => col.id !== id));
    setTasks((prev) => prev.filter((task) => task.columnId !== id));
  }

  function updateColumn(id: Id, title: string) {
    setColumns((prev) =>
      prev.map((col) => (col.id === id ? { ...col, title } : col))
    );
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "column") {
      setActiveColumn(event.active.data.current.column);
    } else if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";
    const isOverColumn = over.data.current?.type === "Column";

    if (!isActiveTask) return;

    setTasks((prev) => {
      let items = [...prev];
      const activeIndex = items.findIndex((t) => t.id === activeId);
      if (isOverTask) {
        const overIndex = items.findIndex((t) => t.id === overId);
        const overTask = items[overIndex];
        items[activeIndex].columnId = overTask.columnId;
        items = arrayMove(items, activeIndex, overIndex);
      } else if (isOverColumn) {
        items[activeIndex].columnId = overId;
      }
      return items;
    });
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeColId = active.id;
    const overColId = over.id;
    if (activeColId === overColId) return;

    setColumns((prev) => {
      const oldIndex = prev.findIndex((c) => c.id === activeColId);
      const newIndex = prev.findIndex((c) => c.id === overColId);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  function generateId() {
    return Math.floor(Math.random() * 1000001).toString();
  }
}

export default KanbanBoard;
