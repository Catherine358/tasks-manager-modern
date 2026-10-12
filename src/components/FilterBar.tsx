import { Button } from './ui/button.tsx';
import { activeFilterAtom, type FilterKeys } from "@/atoms/taskFilters.ts";
import {useAtom} from "jotai";

export default function FilterBar() {
  const filters: {
    key: FilterKeys;
    label: string;
  }[] = [
    { key: 'all', label: 'All' },
    { key: 'new', label: 'New' },
    { key: 'done', label: 'Done' },
    { key: 'escalated', label: 'Escalated' },
  ];

  const [activeFilter, setActiveFilter] = useAtom(activeFilterAtom)

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={activeFilter === filter.key ? 'default' : 'outline'}
          onClick={() => setActiveFilter(filter.key)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
