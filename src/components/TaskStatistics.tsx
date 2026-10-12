import type { Task } from '../api/tasks.ts';
import { Card } from './ui/card.tsx';

type TaskStatisticsProps = {
  tasks: Task[];
};

export default function TaskStatistics({ tasks }: TaskStatisticsProps) {
  const totalCount = tasks.length;
  const doneCount = tasks.filter((task) => task.status === 'done').length;
  const newCount = tasks.filter((task) => task.status === 'new').length;
  const escalatedCount = tasks.filter(
    (task) => task.status === 'escalated'
  ).length;
  const donePrcnt = Math.round((doneCount / totalCount) * 100);
  const newPrcnt = Math.round((newCount / totalCount) * 100);
  const escalatedPrcnt = Math.round((escalatedCount / totalCount) * 100);

  const stats = [
    { label: 'Done', count: doneCount, pct: donePrcnt },
    { label: 'New', count: newCount, pct: newPrcnt },
    { label: 'Escalated', count: escalatedCount, pct: escalatedPrcnt },
    { label: 'Total', count: totalCount },
  ];

  return (
    <Card className="flex flex-wrap flex-row shadow-none justify-between gap-2.5 border-0 shadow-0">
      {stats.map(({ label, count, pct }) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center rounded-xl shadow-lg h-20 w-64"
        >
          <span className="text-xs text-black">{label}</span>
          <span className="text-blue-900 font-semibold text-2xl">
            {pct !== undefined ? `${count} / ${pct}%` : count}
          </span>
        </div>
      ))}
    </Card>
  );
}
