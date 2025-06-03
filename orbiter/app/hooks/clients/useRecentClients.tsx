import { useEffect, useState } from 'react';
import type { Client } from '~/services/clients/clients.model';
import { getRecentClients } from '~/services/clients/clients.service';
import type { PaginatedResponse } from '~/shared/pagination';
import { isResultError } from '~/types/result';

export function useRecentClients(limit: number) {
  const [clientsPage, setClientsPage] = useState<PaginatedResponse<Client>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getRecentClients(limit).then((clientsResult) => {
      if (isResultError(clientsResult)) {
        console.log('Error: ', clientsResult.error);
        return;
      }

      const page = clientsResult.data;
      setClientsPage(page);
      setLoading(false);
    });
  }, [limit]);

  return { clientsPage, loading };
}
