import { Button } from './ui/button.tsx';

export type FilterKeys = 'all' | 'new' | 'done' | 'escalated';

type FilterBarProps = {
  activeFilter: FilterKeys;
  onFilterChange: (filter: FilterKeys) => void;
};

export default function FilterBar({
  activeFilter,
  onFilterChange,
}: FilterBarProps) {
  const filters: {
    key: FilterKeys;
    label: string;
  }[] = [
    { key: 'all', label: 'All' },
    { key: 'new', label: 'New' },
    { key: 'done', label: 'Done' },
    { key: 'escalated', label: 'Escalated' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={activeFilter === filter.key ? 'default' : 'outline'}
          onClick={() => onFilterChange(filter.key)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
