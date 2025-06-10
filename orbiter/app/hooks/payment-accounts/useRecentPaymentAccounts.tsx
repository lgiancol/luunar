import { useCallback, useEffect, useState } from 'react';
import type { PaymentAccount } from '~/services/payments/payment-account.model';
import { getPaymentAccounts } from '~/services/payments/payment-accounts.service';
import type { PaginatedResponse } from '~/shared/pagination';
import { isResultError } from '~/types/result';

export function useRecentPaymentAccounts(limit: number) {
  const [paymentAccountsPage, setPaymentAccountsPage] = useState<PaginatedResponse<PaymentAccount>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refresh();
  }, [limit]);

  const refresh = useCallback(() => {
    setLoading(true);
    getPaymentAccounts({ page: 1, pageSize: limit }).then((paymentAccountsResult) => {
      if (isResultError(paymentAccountsResult)) {
        console.log('Error: ', paymentAccountsResult.error);
        return;
      }

      const page = paymentAccountsResult.data;
      setPaymentAccountsPage(page);
      setLoading(false);
    });
  }, [limit]);

  return { paymentAccountsPage, loading, refresh };
}
