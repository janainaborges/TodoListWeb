import React from "react";

interface Task {
  id: number;
  text: string;
  selected: boolean;
  createdAt: string;
}

interface ListProps {
  item: Task;
  onCheckboxChange: (id: number) => void;
  onEditTask: (id: number) => void;
}

export const List: React.FC<ListProps> = ({
  item,
  onCheckboxChange,
  onEditTask,
}) => {
  const handleCheckbox = () => {
    onCheckboxChange(item.id);
  };

  const handleEdit = () => {
    onEditTask(item.id);
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={item.selected}
        onChange={handleCheckbox}
        className="mr-2"
      />
      <span className="mr-2">{item.text}</span>
      <button
        onClick={handleEdit}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Editar
      </button>
    </div>
  );
};
