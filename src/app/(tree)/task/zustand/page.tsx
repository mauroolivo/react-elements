import { Task } from "@/components/task/zustand/Task";

export default function Page() {
  return (
    <main className="mx-auto max-w-md p-4 sm:max-w-lg md:max-w-xl">
      <Task />
    </main>
  );
}