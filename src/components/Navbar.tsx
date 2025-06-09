import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Task {
  id: string;
  text: string;
}

interface NavbarProps {
  tasks: Task[];
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ tasks, onSearch }) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [matchedTasks, setMatchedTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (id: string, text: string) => {
    setQuery(text);
    setShowDropdown(false);
    navigate(`/task/${id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || matchedTasks.length === 0) return;
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prev) => (prev + 1) % matchedTasks.length);
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prev) => (prev - 1 + matchedTasks.length) % matchedTasks.length);
    } else if (e.key === 'Enter') {
      const task = matchedTasks[highlightedIndex];
      if (task) handleSelect(task.id, task.text);
    }
  };

  useEffect(() => {
    setHighlightedIndex(0);
    const trimmed = query.trim();
    if (!trimmed) {
      setMatchedTasks([]);
      return;
    }
    const regex = new RegExp(trimmed, 'i');
    const matches = tasks.filter(task => regex.test(task.text));
    setMatchedTasks(matches);
  }, [query, tasks]);

  return (
    <nav className="flex items-center justify-between p-4 shadow-md bg-white fixed top-0 left-0 w-full z-10">
      <div className="flex items-center gap-2">
        <img src="https://via.placeholder.com/32" alt="Logo" className="h-8 w-8" />
        <span className="text-xl font-semibold text-gray-800">To-Do App</span>
      </div>
      <motion.div
        className="relative w-64"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            const newQuery = e.target.value;
            setQuery(newQuery);
            onSearch(newQuery); // let parent decide what to display
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="border border-gray-300 rounded px-3 py-1 text-sm w-full"
        />
        {showDropdown && matchedTasks.length > 0 && (
          <ul className="absolute z-10 bg-white border mt-1 rounded w-full shadow max-h-48 overflow-y-auto">
            {matchedTasks.map((task, index) => (
              <li
                key={task.id}
                className={`px-3 py-1 cursor-pointer ${
                  index === highlightedIndex ? 'bg-blue-100' : ''
                }`}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseDown={() => handleSelect(task.id, task.text)}
              >
                {task.text}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </nav>
  );
};

export default Navbar;