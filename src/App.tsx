import { Routes, Route } from 'react-router-dom';
import ToDoApp from './page/HomePage';
import TaskDetail from './page/TaskDetail';
import Navbar from './components/Navbar';
import { useTasks } from './context/TaskContext';

function App() {
  const { tasks } = useTasks();

  return (
    <div className="pt-16">
      <Navbar tasks={tasks} onSearch={() => {}} /> {/* optional: pass empty function or remove search logic entirely */}
      <Routes>
        <Route path="/" element={<ToDoApp />} />
        <Route path="/task/:id" element={<TaskDetail />} />
      </Routes>
    </div>
  );
}

export default App;