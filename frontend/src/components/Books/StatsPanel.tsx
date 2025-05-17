import React from 'react';
import {
  TOTAL_ITEMS,
  MOST_FREQUENT_AUTHOR,
  EARLIEST_PUBLISHED_YEAR,
  LATEST_PUBLISHED_YEAR,
  RESPONSE_TIME_MS
} from '../../constants/Book';
import { StatsPanelProps } from '../../types/BookList.types';
const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="bg-white border p-4 rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">Search Statistics</h2>
      <ul className="space-y-1 text-sm">
        <li>
          <strong>{ TOTAL_ITEMS}:</strong> {stats.totalItems}
        </li>
        <li>
          <strong>{ MOST_FREQUENT_AUTHOR}:</strong> {stats.mostFrequentAuthor || 'N/A'}
        </li>
        <li>
          <strong>{ EARLIEST_PUBLISHED_YEAR}:</strong> {stats.earliestPublishedYear || 'N/A'}
        </li>
        <li>
          <strong>{ LATEST_PUBLISHED_YEAR}:</strong> {stats.latestPublishedYear || 'N/A'}
        </li>
        <li>
          <strong>{ RESPONSE_TIME_MS}:</strong> {stats.responseTimeMs} ms
        </li>
      </ul>
    </div>
  );
};

export default StatsPanel;
