"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/layout";

interface Task {
  id: number;
  text: string;
  selected: boolean;
  createdAt: string;
  title: string;
}

export default function Edit() {
  const [taskText, setTaskText] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [task, setTask] = useState<Task | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsedTasks: Task[] = JSON.parse(storedTasks);
      const selectedTask = parsedTasks.find((item) => item.id === Number(id));
      if (selectedTask) {
        setTask(selectedTask);
        setTaskText(selectedTask.text);
        setTaskTitle(selectedTask.title);
      }
    }
  }, [id]);

  const handleTaskTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(event.target.value);
  };
  const handleTaskTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTaskTitle(event.target.value);
  };

  const handleUpdateTask = () => {
    if (!task) return;

    const updatedTask = {
      ...task,
      text: taskText,
      title: taskTitle,
    };

    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsedTasks: Task[] = JSON.parse(storedTasks);
      const updatedTasks = parsedTasks.map((item) =>
        item.id === task.id ? updatedTask : item
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTask(updatedTask);
    }

    window.history.replaceState({}, "", "/");
  };

  const handleDeleteTask = () => {
    if (!task) return;

    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsedTasks: Task[] = JSON.parse(storedTasks);
      const updatedTasks = parsedTasks.filter((item) => item.id !== task.id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    window.history.replaceState({}, "", "/");
  };
  const handleCancel = () => {
    window.history.replaceState({}, "", "/");
  };

  return (
    <Layout>
      <div className="p-3 w-full h-screen flex flex-col justify-between">
        <form className="flex h-full flex-col justify-between">
          <div className="flex justify-between">
            <button
              className="bg-inherit text-gray-800 py-2 text-start"
              onClick={handleCancel}
            >
              <p>&#x276E;</p>
              Edit Task
            </button>
            <button
              onClick={handleDeleteTask}
              className="bg-inherit hover:bg-red-600 text-black py-2 px-4 rounded text-end"
            >
              Delete
            </button>
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              value={taskTitle}
              onChange={handleTaskTitleChange}
              className="w-full  border-transparent bg-inherit rounded py-2 px-4 mb-4 text-slate-950 focus-visible:border-transparent"
            />
            <input
              type="text"
              value={taskText}
              onChange={handleTaskTextChange}
              className="mr-2 py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-slate-950"
            />
          </div>

          <button
            className="mb-8 border rounded bg-gradient-to-br from-purple-700 via-purple-500 to-pink-500 text-white py-6 px-4 mt-8 w-full "
            onClick={handleUpdateTask}
          >
            Edit Task
          </button>
        </form>
      </div>
    </Layout>
  );
}
