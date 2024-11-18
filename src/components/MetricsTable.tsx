import React from 'react';
import { Trash2 } from 'lucide-react';
import { BodyMetrics, metricConfigs } from '../types';

interface MetricsTableProps {
  metrics: BodyMetrics[];
  onDelete: (date: string) => void;
}

export default function MetricsTable({ metrics, onDelete }: MetricsTableProps) {
  if (metrics.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No entries yet. Start by adding your first measurement.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow-lg">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
            {Object.entries(metricConfigs).map(([key, config]) => (
              <th key={key} className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                {config.label} ({config.unit})
              </th>
            ))}
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {metrics.map((entry) => (
            <tr key={entry.date} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-900">
                {new Date(entry.date).toLocaleDateString()}
              </td>
              {Object.keys(metricConfigs).map((key) => (
                <td key={key} className="px-4 py-3 text-sm text-gray-900">
                  {entry[key as keyof Omit<BodyMetrics, 'date'>]}
                </td>
              ))}
              <td className="px-4 py-3 text-sm">
                <button
                  onClick={() => onDelete(entry.date)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}