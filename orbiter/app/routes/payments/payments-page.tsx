import { PlusIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import AddPaymentForm from '~/components/payments/add-payment-form';
import PageDetailsDrawer from '~/components/shared/page-details-drawer';
import AddPaymentAccountForm from '~/components/shared/payment-accounts/add-payment-account-form';
import { Button } from '~/components/ui/button';
import { useRecentClients } from '~/hooks/clients/useRecentClients';
import { useRecentPaymentAccounts } from '~/hooks/payment-accounts/useRecentPaymentAccounts';
import { usePaginatedPayments } from '~/hooks/payments/userPaginatedPayments';
import { useRedirectIfUnauthenticated } from '~/hooks/useRedirectIfUnauthenticated';
import type { Client } from '~/services/clients/clients.model';
import type { PaymentAccount } from '~/services/payments/payment-account.model';

export default function PaymentsPage() {
  useRedirectIfUnauthenticated();
  const { paymentsPage, loading, refresh: refreshPayments } = usePaginatedPayments({ page: 1, pageSize: 5 });
  const [addPaymentDrawerOpen, setAddPaymentDrawerOpen] = useState<boolean>(true);
  const [addClientDrawerOpen, setAddClientDrawerOpen] = useState<boolean>(false);
  const [addPaymentAccountDrawerOpen, setAddPaymentAccountDrawerOpen] = useState<boolean>(false);
  const { clientsPage: recentClientsPage } = useRecentClients(15);
  const { paymentAccountsPage: recentPaymentAccountsPage, refresh: refreshPaymentAccounts } =
    useRecentPaymentAccounts(15);
  const [selectedClient, setSelectedClient] = useState<Client>();
  const [selectedPaymentAccount, setSelectedPaymentAccount] = useState<PaymentAccount>();

  const addPaymentDrawerLevel = useMemo(() => {
    return addClientDrawerOpen || addPaymentAccountDrawerOpen ? 1 : 0;
  }, [addClientDrawerOpen, addPaymentAccountDrawerOpen]);

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
        level={addPaymentDrawerLevel}
      >
        <PageDetailsDrawer.Content>
          <AddPaymentForm
            recentClients={recentClientsPage?.data}
            recentPaymentAccounts={recentPaymentAccountsPage?.data}
            filteredClients={undefined}
            onAddClient={() => setAddClientDrawerOpen(true)}
            onAddPaymentAccount={() => setAddPaymentAccountDrawerOpen(true)}
            selectedClient={selectedClient}
            selectedPaymentAccount={selectedPaymentAccount}
            onSuccess={() => {
              setAddPaymentDrawerOpen(false);
              refreshPayments();
            }}
          />
        </PageDetailsDrawer.Content>
        <PageDetailsDrawer.Footer>
          <div className="flex justify-end">
            <Button form="add-payment-form" type="submit">
              Save Payment
            </Button>
          </div>
        </PageDetailsDrawer.Footer>
      </PageDetailsDrawer>

      <PageDetailsDrawer open={addClientDrawerOpen} title="Add Client" onOpenChange={setAddClientDrawerOpen} level={0}>
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
                setAddClientDrawerOpen(false);
              }}
            >
              Save Client
            </Button>
          </div>
        </PageDetailsDrawer.Footer>
      </PageDetailsDrawer>

      <PageDetailsDrawer
        open={addPaymentAccountDrawerOpen}
        title="Add Payment Account"
        onOpenChange={setAddPaymentAccountDrawerOpen}
        level={0}
      >
        <PageDetailsDrawer.Content>
          <AddPaymentAccountForm
            onSuccess={(pa) => {
              setSelectedPaymentAccount(pa);
              setAddPaymentAccountDrawerOpen(false);
              refreshPaymentAccounts();
            }}
          />
        </PageDetailsDrawer.Content>
        <PageDetailsDrawer.Footer>
          <div className="flex justify-end">
            <Button form="add-payment-account-form" type="submit">
              Save Payment Account
            </Button>
          </div>
        </PageDetailsDrawer.Footer>
      </PageDetailsDrawer>
    </div>
  );
}
