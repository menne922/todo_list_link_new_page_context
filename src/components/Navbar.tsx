import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search, onSearch]);

  return (
    <nav className="flex items-center justify-between p-4 shadow-md bg-white fixed top-0 left-0 w-full z-10">
      <div className="flex items-center gap-2">
        <img src="https://via.placeholder.com/32" alt="Logo" className="h-8 w-8" />
        <span className="text-xl font-semibold text-gray-800">To-Do App</span>
      </div>
      <motion.div
        className="flex items-center gap-2"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="border border-gray-300 rounded px-3 py-1 text-sm"
        />
      </motion.div>
    </nav>
  );
};

export default Navbar;
