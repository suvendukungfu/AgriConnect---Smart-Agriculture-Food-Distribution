import { format } from 'date-fns';

export interface YieldForecastPoint {
  date: string;
  predictedYield: number;
  lowerBound: number;
  upperBound: number;
  riskScore: number;
}

/**
 * Normalizes raw Python AI Engine output into a Recharts-friendly structure.
 * Implements linear downsampling for mobile performance.
 */
export function normalizeYieldData(
  rawData: any[], 
  maxDataPoints: number = window.innerWidth < 768 ? 50 : 150
): YieldForecastPoint[] {
  
  if (!rawData || rawData.length === 0) return [];

  // 1. Sort chronologically
  const sorted = [...rawData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // 2. Downsample (if massive dataset)
  let sampledData = sorted;
  if (sorted.length > maxDataPoints) {
    const step = Math.ceil(sorted.length / maxDataPoints);
    sampledData = sorted.filter((_, index) => index % step === 0);
  }

  // 3. Format strictly to the interface
  return sampledData.map(point => ({
    date: format(new Date(point.date), 'MMM dd, yyyy'),
    predictedYield: Number(point.predictedYield.toFixed(2)),
    lowerBound: Number(point.lowerBound.toFixed(2)),
    upperBound: Number(point.upperBound.toFixed(2)),
    riskScore: Number(point.riskScore.toFixed(0)),
  }));
}
