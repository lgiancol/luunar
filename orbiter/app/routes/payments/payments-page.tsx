import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddPaymentForm from '~/components/payments/add-payment-form';
import PageDetailsDrawer from '~/components/shared/page-details-drawer';
import { Button } from '~/components/ui/button';
import { usePaginatedPayments } from '~/hooks/payments/userPaginatedPayments';
import { useRedirectIfUnauthenticated } from '~/hooks/useRedirectIfUnauthenticated';

export default function PaymentsPage() {
  useRedirectIfUnauthenticated();
  const { paymentsPage, loading } = usePaginatedPayments({ page: 1, pageSize: 5 });
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log(drawerOpen);
  }, [drawerOpen]);

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
            <Button variant="white" onClick={() => setDrawerOpen(true)}>
              <PlusIcon />
              Add Payment
            </Button>
          </div>
        </div>
        <div>{paymentsPage?.meta.total}</div>
      </div>

      <PageDetailsDrawer open={drawerOpen} title="Add Payment" onOpenChange={setDrawerOpen}>
        <PageDetailsDrawer.Content>
          <AddPaymentForm />
        </PageDetailsDrawer.Content>
        <PageDetailsDrawer.Footer>
          <div className="flex justify-end">
            <Button form="add-payment-form" type="submit">
              Save
            </Button>
          </div>
        </PageDetailsDrawer.Footer>
      </PageDetailsDrawer>
    </div>
  );
}
