'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Task {
  id: number;
  text: string;
  selected: boolean;
  createdAt: string;
}

export default function CreateTask() {
  const [taskText, setTaskText] = useState("");
  const router = useRouter();

  const handleTaskTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(event.target.value);
  };

  const handleCreateTask = () => {
    if (taskText.trim() !== "") {
      const storedTasks = localStorage.getItem("tasks");
      const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

      const newTask: Task = {
        id: Date.now(),
        text: taskText,
        selected: false,
        createdAt: new Date().toISOString(),
      };

      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      router.push("/");
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Create Task</h1>
      <input
        className="w-full border border-gray-300 rounded py-2 px-4 mb-4 text-slate-950"
        type="text"
        placeholder="Task Text"
        value={taskText}
        onChange={handleTaskTextChange}
      />
      <div className="flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
          onClick={handleCreateTask}
        >
          Create
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
