import React from "react";

interface Task {
  id: number;
  text: string;
  selected: boolean;
  createdAt: string;
  title: string;
}

interface ListProps {
  item: Task;
  onCheckboxChange: (id: number) => void;
  onEditTask: (id: number) => void;
  checked: any;
}

export const List: React.FC<ListProps> = ({
  item,
  onCheckboxChange,
  onEditTask,
  checked,
}) => {
  const handleCheckbox = () => {
    onCheckboxChange(item.id);
  };

  const handleEdit = () => {
    onEditTask(item.id);
  };

  return (
    <div className="flex items-center px-6 py-5 justify-between text-left gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckbox}
        className="h-7 w-7 text-white active:text-white focus:ring-white border-gray-600 rounded"
      />
      <div className="w-full">
        {checked ? (
          <h1 className="text-xl text-white">{item.title}</h1>
        ) : (
          <h1 className="text-xl">{item.title}</h1>
        )}
        <span className="mr-2 px-3 text-sm text-slate-400">{item.text}</span>
      </div>
      {checked ? (
        <button
          onClick={handleEdit}
          className="bg-inherit hover:bg-blue-50 text-white py-2 px-4 rounded"
        >
          &#x276F;
        </button>
      ) : (
        <button
          onClick={handleEdit}
          className="bg-inherit hover:bg-blue-50 text-black py-2 px-4 rounded"
        >
          &#x276F;
        </button>
      )}
    </div>
  );
};
