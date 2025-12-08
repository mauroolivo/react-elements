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