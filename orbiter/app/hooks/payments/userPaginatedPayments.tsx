import { useEffect, useState } from 'react';
import type { Payment } from '~/services/payments/payment.model';
import { getPayments } from '~/services/payments/payments.service';
import type { PaginatedPayloadDTO, PaginatedResponse } from '~/shared/pagination';
import { isResultError } from '~/types/result';

export function usePaginatedPayments({ page = 1, pageSize = 20 }: PaginatedPayloadDTO) {
  const [paymentsPage, setPaymentsPage] = useState<PaginatedResponse<Payment>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPayments({ page, pageSize }).then((paymentsResult) => {
      if (isResultError(paymentsResult)) {
        console.log('Error: ', paymentsResult.error);
        return;
      }

      const page = paymentsResult.data;
      setPaymentsPage(page);
      setLoading(false);
    });
  }, [page, pageSize]);

  return { paymentsPage, loading };
}
