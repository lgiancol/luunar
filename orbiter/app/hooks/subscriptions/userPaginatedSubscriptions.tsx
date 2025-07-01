import { useCallback, useEffect, useState } from 'react';
import type { Subscription } from '~/services/subscriptions/subscriptions.model';
import { getSubscriptions } from '~/services/subscriptions/subscriptions.service';
import type { PaginatedPayloadDTO, PaginatedResponse } from '~/shared/pagination';
import { isResultError } from '~/types/result';

export function usePaginatedSubscriptions({ page = 1, pageSize = 20 }: PaginatedPayloadDTO) {
  const [subscriptionsPage, setSubscriptionsPage] = useState<PaginatedResponse<Subscription>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refresh();
  }, [page, pageSize]);

  const refresh = useCallback(() => {
    setLoading(true);
    getSubscriptions({ page, pageSize }).then((subscriptionsResult) => {
      if (isResultError(subscriptionsResult)) {
        console.log('Error: ', subscriptionsResult.error);
        return;
      }

      const page = subscriptionsResult.data;
      setSubscriptionsPage(page);
      setLoading(false);
    });
  }, [page, pageSize]);

  return { subscriptionsPage, loading, refresh };
}
