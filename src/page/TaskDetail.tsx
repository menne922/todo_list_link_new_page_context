import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

const TaskDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks } = useTasks();

  const task = tasks.find((t) => t.id === id);

  if (!task) return <div className="p-8 text-center text-lg text-gray-600">Task not found.</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">📋 Task Details</h1>
        <ul className="space-y-4 text-lg text-gray-700">
          <li><span className="font-semibold text-gray-900">🆔 ID:</span> {task.id}</li>
          <li><span className="font-semibold text-gray-900">📝 Text:</span> {task.text}</li>
          <li><span className="font-semibold text-gray-900">✅ Status:</span> {task.completed ? 'Completed' : 'Active'}</li>
          <li><span className="font-semibold text-gray-900">📅 Due Date:</span> {task.dueDate || 'N/A'}</li>
          <li><span className="font-semibold text-gray-900">⚡ Priority:</span> {task.priority}</li>
        </ul>
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            ⬅ Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;