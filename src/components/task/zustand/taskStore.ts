import { create } from 'zustand';

type Task = {
  id: string;
  text: string;
  completed: boolean;
};
type TaskState = {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
};

/**
 * Zustand store for managing task state and operations.
 * 
 * @returns {TaskState} The task store with state and action methods
 * 
 * @property {Task[]} tasks - Array of task objects
 * @property {(text: string) => void} addTask - Adds a new task with the provided text
 * @property {(id: string) => void} toggleTask - Toggles the completed status of a task by id
 * @property {(id: string) => void} removeTask - Removes a task by id from the store
 */
export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  addTask: (text: string) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { id: Date.now().toString(), text, completed: false },
      ],
    })),
  toggleTask: (id: string) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    })),
  removeTask: (id: string) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));