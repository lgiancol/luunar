import { useState, useEffect } from 'react';
import { getVendors } from '~/services/vendors/vendors.service';
import type { Vendor } from '~/services/vendors/vendors.model';
import type { PaginatedResponse } from '~/shared/pagination';

export function usePaginatedVendors(initialPage: number = 1, initialPageSize: number = 10) {
  const [vendors, setVendors] = useState<PaginatedResponse<Vendor> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getVendors({ page, pageSize });
      
      if (result.success) {
        setVendors(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vendors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, [page, pageSize]);

  const refetch = () => {
    fetchVendors();
  };

  return {
    vendors,
    loading,
    error,
    page,
    setPage,
    pageSize,
    setPageSize,
    refetch,
  };
} 