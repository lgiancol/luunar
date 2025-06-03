import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { usePaginatedPayments } from '~/hooks/payments/userPaginatedPayments';
import { useRedirectIfUnauthenticated } from '~/hooks/useRedirectIfUnauthenticated';

export default function PaymentsPage() {
  useRedirectIfUnauthenticated();
  const { paymentsPage, loading } = usePaginatedPayments({ page: 1, pageSize: 5 });

  if (loading) {
    return (
      <div>
        <p className="text-background-text-500">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-2">
          <div className="text-2xl font-semibold text-background-text-500">
            <h2 className="text-text-primary-500">Payments</h2>
          </div>

          <div>
            <Link to="/payments/add">
              <Button variant="outline">
                <PlusIcon />
                Add Payment
              </Button>
            </Link>
          </div>
        </div>
        {/* <ClientList page={clientsPage} /> */}
        <div>{paymentsPage?.meta.total}</div>
      </div>
    </div>
  );
}
