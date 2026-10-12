import { useNavigate } from 'react-router-dom';
import type { Task } from '../api/tasks.ts';

export default function TaskItem({ task }: { task: Task }) {
  const navigate = useNavigate();

  const taskHandler = () => navigate(`/task/${task.id}`);

  const classNameByStatus = `border-l-4 ${
    task.status === 'done'
      ? 'border-green-500'
      : task.status === 'new'
        ? 'border-blue-600'
        : 'border-yellow-500'
  }`;

  return (
    <li>
      <button
        className={`flex cursor-pointer w-full justify-between items-center bg-blue-100 border border-gray-300 rounded-md p-2 text-black text-base transition-shadow focus:outline-blue-600 focus:outline-2 focus:outline-offset-2 hover:shadow-md ${classNameByStatus}`}
        onClick={taskHandler}
        aria-label={`View task ${task.contractNumber} - ${task.name}, Status: ${task.status}`}
      >
        <div className="flex w-full justify-between items-center">
          <span>{task.contractNumber}</span>
          <span className="font-semibold capitalize">{task.status}</span>
        </div>
      </button>
    </li>
  );
}
