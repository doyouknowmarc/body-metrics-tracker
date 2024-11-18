import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { BodyMetrics, metricConfigs, MetricKey } from '../types';

interface MetricsFormProps {
  onSubmit: (metrics: BodyMetrics) => void;
}

export default function MetricsForm({ onSubmit }: MetricsFormProps) {
  const [metrics, setMetrics] = useState<Partial<BodyMetrics>>({
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(metrics).length === 8) {
      onSubmit(metrics as BodyMetrics);
      setMetrics({ date: new Date().toISOString().split('T')[0] });
    }
  };

  const handleChange = (key: keyof BodyMetrics, value: string) => {
    setMetrics(prev => ({ ...prev, [key]: key === 'date' ? value : parseFloat(value) }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={metrics.date || ''}
            onChange={(e) => handleChange('date', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        
        {Object.entries(metricConfigs).map(([key, config]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700">
              {config.label} ({config.unit})
            </label>
            <input
              type="number"
              value={metrics[key as MetricKey] || ''}
              onChange={(e) => handleChange(key as MetricKey, e.target.value)}
              min={config.min}
              max={config.max}
              step={config.step}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        ))}
      </div>
      
      <button
        type="submit"
        className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        <Plus size={20} />
        Add Entry
      </button>
    </form>
  );
}