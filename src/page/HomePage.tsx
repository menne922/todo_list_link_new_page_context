import { useState } from 'react';
import ToDoItem from '../components/ToDoItem';
import { useTasks } from '../context/TaskContext';

const ToDoApp = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!input.trim()) return;

    if (editId) {
      updateTask(editId, input);
      setEditId(null);
    } else {
      const newTask = {
        id: Date.now().toString(),
        text: input,
        completed: false,
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'medium' as 'medium',
      };
      addTask(newTask);
    }

    setInput('');
  };

  const handleEdit = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setInput(task.text);
      setEditId(id);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white p-6 shadow-md rounded-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">To-Do List</h2>
        <div className="flex mb-4 gap-2">
          <input
            type="text"
            className="flex-grow border rounded px-2 py-1"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Add or edit a task..."
          />
          <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={handleAdd}>
            {editId ? 'Update' : 'Add'}
          </button>
        </div>

        <div className="space-y-2">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <ToDoItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <p className="text-gray-500">No tasks yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoApp;