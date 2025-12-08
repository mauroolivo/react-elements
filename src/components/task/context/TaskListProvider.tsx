"use client";
import { TaskListContext } from "./TaskListContext";
import { useCallback, useState } from "react";
import type { Task } from "./TaskListContext";

export function TaskListProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = useCallback((text: string) => {

    setTasks((currTasks) => [
      ...currTasks,
      { id: Date.now().toString(), text, completed: false },
    ]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((currTasks) =>
      currTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks((currTasks) => currTasks.filter((task) => task.id !== id));
  }, []);

  return (
    <TaskListContext value={{ tasks, addTask, toggleTask, removeTask }}>
      {children}
    </TaskListContext>
  );
}
