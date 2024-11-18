import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import MetricsForm from './components/MetricsForm';
import MetricsTable from './components/MetricsTable';
import { BodyMetrics } from './types';

const STORAGE_KEY = 'bodyMetrics';

function App() {
  const [metrics, setMetrics] = useState<BodyMetrics[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setMetrics(JSON.parse(stored));
    }
  }, []);

  const handleAddMetrics = (newMetrics: BodyMetrics) => {
    const updated = [...metrics, newMetrics].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setMetrics(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleDeleteMetrics = (date: string) => {
    const updated = metrics.filter(m => m.date !== date);
    setMetrics(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity size={32} className="text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Body Metrics Tracker</h1>
          </div>
          <p className="text-gray-600">Track and monitor your body composition metrics over time</p>
        </header>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Measurement</h2>
            <MetricsForm onSubmit={handleAddMetrics} />
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">History</h2>
            <MetricsTable metrics={metrics} onDelete={handleDeleteMetrics} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;