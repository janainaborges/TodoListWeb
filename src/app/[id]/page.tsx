"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Task {
  id: number;
  text: string;
  selected: boolean;
  createdAt: string;
}

export default function Edit() {
  const [taskText, setTaskText] = useState("");
  const [task, setTask] = useState<Task | null>(null);

  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsedTasks: Task[] = JSON.parse(storedTasks);
      const selectedTask = parsedTasks.find((item) => item.id === Number(id));
      if (selectedTask) {
        setTask(selectedTask);
        setTaskText(selectedTask.text);
      }
    }
  }, [id]);

  const handleTaskTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(event.target.value);
  };

  const handleUpdateTask = () => {
    if (!task) return;
  
    const updatedTask = {
      ...task,
      text: taskText,
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


  return (
    <div className="flex items-center">
      <form className="flex items-center">
        <input
          type="text"
          value={taskText}
          onChange={handleTaskTextChange}
          className="mr-2 py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-slate-950"
        />
        <button
          onClick={handleUpdateTask}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Update
        </button>
        <button
          onClick={handleDeleteTask}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Delete
        </button>
      </form>
    </div>
  );
}
