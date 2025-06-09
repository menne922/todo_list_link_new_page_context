import { Routes, Route } from 'react-router-dom';
import ToDoApp from './page/HomePage';
import TaskDetail from './page/TaskDetail';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar onSearch={() => {}} />
      <Routes>
        <Route path="/" element={<ToDoApp />} />
        <Route path="/task/:id" element={<TaskDetail />} />
      </Routes>
    </div>
  );
}

export default App;
