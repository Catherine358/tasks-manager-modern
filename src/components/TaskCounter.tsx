import type { Task } from '../api/tasks.ts';
import { Card } from './ui/card.tsx';

const DAILY_GOAL = 200;

type TaskCounterProps = {
  tasks: Task[];
};

export default function TaskCounter({ tasks }: TaskCounterProps) {
  const doneCount = tasks.filter((task) => task.status === 'done').length;
  const remainingTasks = DAILY_GOAL - doneCount;
  const circumference = 2 * Math.PI * 90;
  const progressPercentage = (doneCount / DAILY_GOAL) * 100;
  const strokeDashoffset =
    circumference - (progressPercentage / 100) * circumference;

  return (
    <Card className="border-0 relative flex flex-col items-center gap-4 rounded-xl px-6 py-4 shadow-lg bg-white">
      <div className="relative w-[220px] h-[220px]">
        <svg width="220" height="220" viewBox="0 0 220 220">
          <circle
            className="stroke-muted"
            cx="110"
            cy="110"
            r="90"
            strokeWidth="12"
            fill="none"
          />
          <circle
            className="stroke-primary transition-all duration-500 ease-in-out"
            cx="110"
            cy="110"
            r="90"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 110 110)"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <span className="text-4xl font-bold text-primary">{doneCount}</span>
        <span className="text-xs text-foreground">Your score points</span>
      </div>
      {remainingTasks > 0 && (
        <span className="text-xs text-muted-foreground">
          {remainingTasks} more to reach the daily goal
        </span>
      )}
    </Card>
  );
}
