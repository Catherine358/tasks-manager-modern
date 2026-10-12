import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../api/tasks.ts';
import TaskList from '../components/TaskList.tsx';
import TaskStatistics from '../components/TaskStatistics.tsx';
import TaskCounter from '../components/TaskCounter.tsx';
import { useNavigate } from 'react-router-dom';
import FilterBar from '../components/FilterBar.tsx';
import WeatherWidget from '../components/WeatherWidget.tsx';
import { Button } from '@/components/ui/button.tsx';
import CreateTaskDialog from "@/components/CreateTaskDialog.tsx";
import {useAtom} from "jotai";
import {activeFilterAtom} from "@/atoms/taskFilters.ts";

export default function TaskQueue() {
  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });
  const navigate = useNavigate();

  const [activeFilter] = useAtom(activeFilterAtom);

  const startQueue = () => {
    if (tasks.length > 0) {
      navigate(`/task/${tasks[0].id}`);
    }
  };

  const filteredTasks =
    activeFilter === 'all' ? tasks : tasks.filter((task) => task.status === activeFilter);

  return (
    <main className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Task Queue</h1>
      <section className="flex justify-center gap-4 flex-wrap">
        <TaskCounter tasks={tasks} />
        <WeatherWidget />
      </section>
        <section>
            <div className="flex justify-between">
                <FilterBar />
                <CreateTaskDialog />
            </div>
        </section>
      <section className="flex-1">
        <TaskList tasks={filteredTasks} />
      </section>
      <section className="flex justify-start">
        <TaskStatistics tasks={tasks} />
      </section>
      <section className="flex justify-start">
        <Button variant="outline" onClick={startQueue}>
          Start queue from the beginning
        </Button>
      </section>
    </main>
  );
}
