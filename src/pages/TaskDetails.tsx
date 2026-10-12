import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import TaskCounter from '../components/TaskCounter.tsx';
import { getTasks } from '../api/tasks.ts';
import TaskCard from '../components/TaskCard.tsx';

export default function TaskDetails() {
  const { id } = useParams();
  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });
  const task = tasks.find((task) => task.id === Number(id));

  return (
    <main className="flex flex-col items-center">
      <h1>Task Details</h1>
      <section className="mb-3">
        <TaskCounter tasks={tasks} />
      </section>
      {!task ? (
        <p>No task was found.</p>
      ) : (
        <section>
          <TaskCard task={task} tasks={tasks} />
        </section>
      )}
      <div className="flex items-center gap-1 mt-2.5 self-start">
        <span
          aria-hidden="true"
          className="text-blue-600 text-lg -translate-y-[1px]"
        >
          ←
        </span>
        <Link
          to="/"
          className="text-blue-600 text-sm px-3 py-2 hover:underline transition"
        >
          Back to the queue
        </Link>
      </div>
    </main>
  );
}
