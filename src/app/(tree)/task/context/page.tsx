import { Task } from '@/components/task/context/Task';
import { TaskListProvider } from '@/components/task/context/TaskListProvider';

export default function Page() {
  return (
    <main className="mx-auto max-w-md p-4 sm:max-w-lg md:max-w-xl">
      <TaskListProvider>
        <Task />
      </TaskListProvider>
    </main>
  );
}
