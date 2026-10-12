import type { Task } from '../api/tasks.ts';
import TaskItem from './TaskItem.tsx';

type TaskListProps = {
  tasks: Task[];
};

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <ul className="list-none py-4 px-2 flex flex-col gap-3 rounded-xl">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
