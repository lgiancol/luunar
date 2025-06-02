import { useEffect, useState } from 'react';
import type { Client } from '~/services/clients/clients.model';
import { getClients } from '~/services/clients/clients.service';
import type { PaginatedResponse } from '~/shared/pagination';
import { isResultError } from '~/types/result';

interface UseClientsOptions {
  page?: number;
  pageSize?: number;
}

export function usePaginatedClients({ page = 1, pageSize = 20 }: UseClientsOptions) {
  const [clientsPage, setClientsPage] = useState<PaginatedResponse<Client>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getClients({ page, pageSize }).then((clientsResult) => {
      if (isResultError(clientsResult)) {
        console.log('Error: ', clientsResult.error);
        return;
      }

      const page = clientsResult.data;
      setClientsPage(page);
      setLoading(false);
    });
  }, [page, pageSize]);

  return { clientsPage, loading };
}
