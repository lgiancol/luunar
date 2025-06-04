import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import AddPaymentForm from '~/components/payments/add-payment-form';
import PageDetailsDrawer from '~/components/shared/page-details-drawer';
import { Button } from '~/components/ui/button';
import { useRecentClients } from '~/hooks/clients/useRecentClients';
import { usePaginatedPayments } from '~/hooks/payments/userPaginatedPayments';
import { useRedirectIfUnauthenticated } from '~/hooks/useRedirectIfUnauthenticated';
import type { Client } from '~/services/clients/clients.model';

export default function PaymentsPage() {
  useRedirectIfUnauthenticated();
  const { paymentsPage, loading } = usePaginatedPayments({ page: 1, pageSize: 5 });
  const [addPaymentDrawerOpen, setAddPaymentDrawerOpen] = useState<boolean>(false);
  const [addClientDrawer, setAddClientDrawer] = useState<boolean>(false);
  const { clientsPage: recentClientsPage } = useRecentClients(15);
  const [selectedClient, setSelectedClient] = useState<Client>();
  //   const { clientsPage: searchClients } = usePaginatedClients({ page: 1, pageSize: 5 });

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
            <Button variant="white" onClick={() => setAddPaymentDrawerOpen(true)}>
              <PlusIcon />
              Add Payment
            </Button>
          </div>
        </div>
        <div>{paymentsPage?.meta.total}</div>
      </div>

      <PageDetailsDrawer
        open={addPaymentDrawerOpen}
        title="Add Payment"
        onOpenChange={setAddPaymentDrawerOpen}
        level={addClientDrawer ? 1 : 0}
      >
        <PageDetailsDrawer.Content>
          <AddPaymentForm
            recentClients={recentClientsPage?.data}
            filteredClients={undefined}
            onAddClient={() => setAddClientDrawer(true)}
            selectedClient={selectedClient}
          />
        </PageDetailsDrawer.Content>
        <PageDetailsDrawer.Footer>
          <div className="flex justify-end">
            <Button form="add-payment-form" type="button">
              Save Payment
            </Button>
          </div>
        </PageDetailsDrawer.Footer>
      </PageDetailsDrawer>

      <PageDetailsDrawer open={addClientDrawer} title="Add Client" onOpenChange={setAddClientDrawer} level={0}>
        <PageDetailsDrawer.Content>
          <div>Add client drawer</div>
        </PageDetailsDrawer.Content>
        <PageDetailsDrawer.Footer>
          <div className="flex justify-end">
            <Button
              form="add-payment-form"
              type="button"
              onClick={() => {
                setSelectedClient(recentClientsPage?.data[0]);
                setAddClientDrawer(false);
              }}
            >
              Save Client
            </Button>
          </div>
        </PageDetailsDrawer.Footer>
      </PageDetailsDrawer>
    </div>
  );
}
