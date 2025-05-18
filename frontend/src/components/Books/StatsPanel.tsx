import React, { useMemo } from 'react';
import {
  TOTAL_ITEMS,
  MOST_FREQUENT_AUTHOR,
  EARLIEST_PUBLISHED_YEAR,
  LATEST_PUBLISHED_YEAR,
  RESPONSE_TIME_MS,
} from '../../constants/Book';
import { StatsPanelProps, StatItem } from '../../types/Books/Book.types';

const STAT_ITEMS: StatItem[] = [
  {
    key: 'totalItems',
    label: TOTAL_ITEMS,
    formatter: (value: number) => value.toString(),
  },
  {
    key: 'mostFrequentAuthor',
    label: MOST_FREQUENT_AUTHOR,
    formatter: (value?: string) => value || 'N/A',
  },
  {
    key: 'earliestPublishedYear',
    label: EARLIEST_PUBLISHED_YEAR,
    formatter: (value?: string) => value || 'N/A',
  },
  {
    key: 'latestPublishedYear',
    label: LATEST_PUBLISHED_YEAR,
    formatter: (value?: string) => value || 'N/A',
  },
  {
    key: 'responseTimeMs',
    label: RESPONSE_TIME_MS,
    formatter: (value: number) => `${value} ms`,
  },
];

const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const visibleStats = useMemo(() => {
    if (!stats) return null;
    return STAT_ITEMS.filter((item) => stats[item.key] !== undefined);
  }, [stats]);

  if (!visibleStats) return null;

  return (
    <div className="bg-white border p-4 rounded shadow mb-4" data-testid="stats-panel">
      <h2 className="text-xl font-semibold mb-2">Search Statistics</h2>
      <ul className="space-y-1 text-sm">
        {visibleStats.map(({ key, label, formatter }) => {
          const value = stats?.[key];
          return (
            <li key={key} data-testid={`stat-${key}`}>
              <strong>{label}:</strong> {formatter(value)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(StatsPanel);
