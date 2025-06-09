import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface ToDoItemProps {
  task: {
    id: string;
    text: string;
    completed: boolean;
  };
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between border-b py-2">
      <div className="flex items-center space-x-4">
        <Link
          to={`/task/${task.id}`}
          className={`text-blue-600 hover:underline break-all ${
            task.completed ? 'line-through text-gray-500' : ''
          }`}
        >
          {task.text}
        </Link>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onToggle(task.id)}
          className="bg-green-100 text-green-700 px-2 py-1 rounded border border-green-300"
        >
          <FaCheck />
        </button>
        <button
          onClick={() => onEdit(task.id)}
          className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded border border-yellow-300"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-100 text-red-600 px-2 py-1 rounded border border-red-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;