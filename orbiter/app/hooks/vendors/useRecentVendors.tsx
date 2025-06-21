import { useState, useEffect } from 'react';
import { getRecentVendors } from '~/services/vendors/vendors.service';
import type { Vendor } from '~/services/vendors/vendors.model';
import type { PaginatedResponse } from '~/shared/pagination';

export function useRecentVendors(limit: number = 5) {
  const [vendors, setVendors] = useState<PaginatedResponse<Vendor> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecentVendors = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getRecentVendors(limit);
      
      if (result.success) {
        setVendors(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch recent vendors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentVendors();
  }, [limit]);

  const refetch = () => {
    fetchRecentVendors();
  };

  return {
    vendors,
    loading,
    error,
    refetch,
  };
} 