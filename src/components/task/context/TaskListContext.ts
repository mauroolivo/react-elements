import { createContext } from "react";

export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export type TaskListState = {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
};

export const TaskListContext = createContext<TaskListState>({
  tasks: [],
  addTask: () => {},
  toggleTask: () => {},
  removeTask: () => {},
});
