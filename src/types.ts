export interface BodyMetrics {
  date: string;
  weight: number;
  bodyFat: number;
  muscle: number;
  water: number;
  visceralFat: number;
  waist: number;
  neck: number;
}

export type MetricKey = keyof Omit<BodyMetrics, 'date'>;

export const metricConfigs: Record<MetricKey, { label: string; unit: string; min: number; max: number; step: number }> = {
  weight: { label: 'Weight', unit: 'kg', min: 30, max: 300, step: 0.1 },
  bodyFat: { label: 'Body Fat', unit: '%', min: 0, max: 50, step: 0.1 },
  muscle: { label: 'Muscle Mass', unit: '%', min: 20, max: 80, step: 0.1 },
  water: { label: 'Water', unit: '%', min: 30, max: 70, step: 0.1 },
  visceralFat: { label: 'Visceral Fat', unit: '', min: 1, max: 50, step: 1 },
  waist: { label: 'Waist', unit: 'cm', min: 40, max: 200, step: 0.5 },
  neck: { label: 'Neck', unit: 'cm', min: 20, max: 100, step: 0.5 },
};