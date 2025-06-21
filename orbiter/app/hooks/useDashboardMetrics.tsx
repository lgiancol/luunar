import { useState, useEffect } from 'react';
import { getDashboardMetrics, type DashboardFilters } from '../services/dashboard/dashboard.service';
import type { DashboardMetrics } from '../services/dashboard/dashboard.model';
import type { Result } from '../types/result';

export function useDashboardMetrics(filters?: DashboardFilters) {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        setLoading(true);
        setError(null);
        
        const result = await getDashboardMetrics(filters);
        
        if (result.success) {
          setMetrics(result.data);
        } else {
          setError(result.error);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch dashboard metrics');
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, [filters]);

  return { metrics, loading, error };
} 