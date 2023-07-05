"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { List } from "@/components/List";
import Layout from "@/components/layout";

interface Task {
  id: number;
  text: string;
  selected: boolean;
  createdAt: string;
  title: string;
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
    router.push(`${item.id}`);
  };

  const countSelectedTasks = () => selectedTasks.length;

  return (
    <Layout>
      <div className="p-3 w-full h-screen flex flex-col justify-between ">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-fuchsia-700">
              {currentWeekday}
            </h1>
            <h3 className="text-sm">{currentDate}</h3>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center"></div>
        </header>
        <div className="mb-8 flex flex-row justify-between ">
          <h1 className="text-md font-bold mb-2">Task List</h1>
          <h2 className="text-sm text-fuchsia-700">
            {countSelectedTasks()}/{countTotalTasks()} Tasks finished
          </h2>
        </div>
        <div className="h-4/5">
          {selectedTasks.length > 0 && (
            <div className="mb-8 border rounded bg-gradient-to-br from-purple-700 via-purple-500 to-pink-500">
              {selectedTasks.map((item) => (
                <List
                  key={item.id}
                  item={item}
                  checked={true}
                  onCheckboxChange={handleSelectedCheckboxChange}
                  onEditTask={() => handleEdit(item)}
                />
              ))}
            </div>
          )}

          <div>
            {tasks.map((item) => (
              <List
                key={item.id}
                item={item}
                checked={false}
                onCheckboxChange={handleCheckboxChange}
                onEditTask={() => handleEdit(item)}
              />
            ))}
          </div>
        </div>
        <button
          className="mb-8 border rounded bg-gradient-to-br from-purple-700 via-purple-500 to-pink-500 text-white py-6 px-4 mt-8 w-full "
          onClick={handleGoToCreateTaskPage}
        >
          Create Task
        </button>
      </div>
    </Layout>
  );
}
