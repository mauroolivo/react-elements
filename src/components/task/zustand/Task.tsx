"use client";
import React from "react";
import { useState } from "react";
import { useTaskStore } from "./taskStore";

export function Task() {
  const { tasks, addTask, toggleTask, removeTask } = useTaskStore();

  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText.trim());
      setTaskText("");
    }
  };
  return (
    <section className="mx-auto w-full max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-zinc-900">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
        Zustand Task Component
      </h2>

      <form onSubmit={handleSubmit} className="mb-5 flex gap-2">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter a new task"
          aria-label="New task"
          className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-zinc-800 dark:text-gray-100"
        />
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Add Task
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          No tasks yet. Add your first task above.
        </p>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between py-2"
            >
              <button
                type="button"
                onClick={() => toggleTask(task.id)}
                className="flex-1 text-left"
                aria-pressed={task.completed}
                aria-label={
                  task.completed ? "Mark as incomplete" : "Mark as complete"
                }
              >
                <span
                  className={`cursor-pointer transition hover:opacity-80 ${
                    task.completed
                      ? "text-gray-500 line-through"
                      : "text-gray-900 dark:text-gray-100"
                  }`}
                >
                  {task.text}
                </span>
              </button>
              <div className="ml-3 flex items-center gap-2">
                <span
                  className={`inline-flex h-2 w-2 rounded-full ${task.completed ? "bg-emerald-500" : "bg-gray-400"}`}
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={() => removeTask(task.id)}
                  className="rounded-md border border-red-300 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-950/40"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
