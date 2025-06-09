import { useState } from 'react';
import ToDoItem from '../components/ToDoItem';
import Navbar from '../components/Navbar';
import { useTasks } from '../context/TaskContext';

const ToDoApp = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [editId, setEditId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredTasks = tasks.filter(t =>
    (filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed) &&
    t.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex justify-center">
      <Navbar onSearch={setSearchQuery} />
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
        <div className="flex justify-center gap-2 mb-4">
          <button
            className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`px-3 py-1 rounded ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        <div className="space-y-2">
          {filteredTasks.map(task => (
            <ToDoItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={(id) => handleEdit(id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToDoApp;
