"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout";

interface Task {
  id: number;
  text: string;
  selected: boolean;
  createdAt: string;
  title: string;
}

export default function CreateTask() {
  const [taskText, setTaskText] = useState("");
  const [titleTask, setTitleTask] = useState("");
  const router = useRouter();

  const handleTaskTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(event.target.value);
  };
  const handleTitleTaskChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTitleTask(event.target.value);
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
        title: titleTask,
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
    <Layout>
      <div className="p-3 w-full h-screen flex flex-col justify-between">
        <button
          className="bg-gray-300 text-gray-800 py-2 text-start"
          onClick={handleCancel}
        >
          <p>&#x276E;</p>
          Create Task
        </button>
        <div>
          <input
            className="w-full  border-transparent bg-inherit rounded py-2 px-4 mb-4 text-slate-950 focus-visible:border-transparent"
            type="text"
            placeholder="Task Title"
            value={titleTask}
            onChange={handleTitleTaskChange}
          />
          <input
            className="w-full border border-gray-300 rounded py-2 px-4 mb-4 text-slate-950"
            type="text"
            placeholder="Task Text"
            value={taskText}
            onChange={handleTaskTextChange}
          />
        </div>

        <div className="flex justify-between">
          <button
            className="mb-8 border rounded bg-gradient-to-br from-purple-700 via-purple-500 to-pink-500 text-white py-6 px-4 mt-8 w-full "
            onClick={handleCreateTask}
          >
            Create Task
          </button>
        </div>
      </div>
    </Layout>
  );
}
