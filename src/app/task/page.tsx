"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { List } from "@/components/List";

interface Task {
  id: number;
  text: string;
  selected: boolean;
  createdAt: string;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentDate, setCurrentDate] = useState("");
  const [currentWeekday, setCurrentWeekday] = useState("");
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);

  const router = useRouter();

  const handleCheckboxChange = (id: number) => {
    const selectedItem = tasks.find((item) => item.id === id);

    if (selectedItem) {
      const updatedTasks = tasks.filter((item) => item.id !== id);
      setSelectedTasks([...selectedTasks, selectedItem]);
      setTasks(updatedTasks);
    }
  };

  const handleSelectedCheckboxChange = (id: number) => {
    const selectedItem = selectedTasks.find((item) => item.id === id);

    if (selectedItem) {
      const updatedTasks = selectedTasks.filter((item) => item.id !== id);
      setSelectedTasks(updatedTasks);
      setTasks([...tasks, selectedItem]);
    }
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleGoToCreateTaskPage = () => {
    router.push("/create");
  };

  useEffect(() => {
    const date = new Date().toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
      day: "numeric",
    });
    const dateDay = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });
    setCurrentWeekday(dateDay);
    setCurrentDate(date);
  }, []);

  const countTotalTasks = () => {
    if (typeof localStorage !== "undefined") {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        const parsedTasks: Task[] = JSON.parse(storedTasks);
        return parsedTasks.length;
      }
    }
    return 0;
  };

  const handleEdit = (item: any) => {
    router.push(`${item.id}`)
  }

  const countSelectedTasks = () => selectedTasks.length;

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{currentWeekday}</h1>
          <h3 className="text-lg">{currentDate}</h3>
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
         
        </div>
      </header>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Task List</h1>
        <h2 className="text-lg text-gray-600">
          {countSelectedTasks()}/{countTotalTasks()} Tasks finished
        </h2>
      </div>
      {selectedTasks.length > 0 && (
        <div className="mb-8">
          {selectedTasks.map((item) => (
            <List
              key={item.id}
              item={item}
              onCheckboxChange={handleSelectedCheckboxChange}
              onEditTask={function (id: number): void {
                throw new Error("Function not implemented.");
              }}
            />
          ))}
        </div>
      )}

      <div>
        {tasks.map((item) => (
          <List
            key={item.id}
            item={item}
            onCheckboxChange={handleCheckboxChange}
            onEditTask={() => handleEdit(item)}
          />
        ))}
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-8"
        onClick={handleGoToCreateTaskPage}
      >
        Create Task
      </button>
    </div>
  );
}
