import { PlusIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import AddExpenseForm from '~/components/expenses/add-expense-form';
import { AddVendorForm } from '~/components/vendors/add-vendor-form';
import PageDetailsDrawer from '~/components/shared/page-details-drawer';
import AddPaymentAccountForm from '~/components/shared/payment-accounts/add-payment-account-form';
import PaymentsList from '~/components/shared/payments/payments-list';
import { Button } from '~/components/ui/button';
import { useRecentPaymentAccounts } from '~/hooks/payment-accounts/useRecentPaymentAccounts';
import { usePaginatedOutgoingPayments } from '~/hooks/payments/userPaginatedPayments';
import { useRecentVendors } from '~/hooks/vendors/useRecentVendors';
import { useRedirectIfUnauthenticated } from '~/hooks/useRedirectIfUnauthenticated';
import type { PaymentAccount } from '~/services/payments/payment-account.model';
import type { Payment } from '~/services/payments/payment.model';
import type { Vendor } from '~/services/vendors/vendors.model';

export default function ExpensesPage() {
  useRedirectIfUnauthenticated();
  const { paymentsPage, loading, refresh: refreshPayments } = usePaginatedOutgoingPayments({ page: 1, pageSize: 5 });
  const [addExpenseDrawerOpen, setAddExpenseDrawerOpen] = useState<boolean>(false);
  const [addPaymentAccountDrawerOpen, setAddPaymentAccountDrawerOpen] = useState<boolean>(false);
  const [addVendorDrawerOpen, setAddVendorDrawerOpen] = useState<boolean>(false);
  const { paymentAccountsPage: recentPaymentAccountsPage, refresh: refreshPaymentAccounts } =
    useRecentPaymentAccounts(15);
  const { vendors: recentVendorsPage, refetch: refreshVendors } = useRecentVendors(50);
  const [selectedPaymentAccount, setSelectedPaymentAccount] = useState<PaymentAccount>();
  const [selectedVendor, setSelectedVendor] = useState<Vendor>();
  const [selectedPayments, setSelectedPayments] = useState<Payment[]>([]);

  useEffect(() => {
    console.log(selectedPayments);
  }, [selectedPayments]);

  const addExpenseDrawerLevel = useMemo(() => {
    if (addPaymentAccountDrawerOpen) return 1;
    if (addVendorDrawerOpen) return 1;
    return 0;
  }, [addPaymentAccountDrawerOpen, addVendorDrawerOpen]);

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
            <h2 className="text-text-primary-500">Expenses</h2>
          </div>

          <div>
            <Button variant="white" onClick={() => setAddExpenseDrawerOpen(true)}>
              <PlusIcon />
              Add Expense
            </Button>
          </div>
        </div>
        <div>
          <PaymentsList paymentsPage={paymentsPage} onPaymentSelectionChange={setSelectedPayments} />
        </div>
      </div>

      <PageDetailsDrawer
        open={addExpenseDrawerOpen}
        title="Add Expense"
        onOpenChange={setAddExpenseDrawerOpen}
        level={addExpenseDrawerLevel}
      >
        <PageDetailsDrawer.Content>
          <AddExpenseForm
            recentPaymentAccounts={recentPaymentAccountsPage?.data}
            selectedPaymentAccount={selectedPaymentAccount}
            selectedVendor={selectedVendor}
            onAddPaymentAccount={() => setAddPaymentAccountDrawerOpen(true)}
            onAddVendor={() => setAddVendorDrawerOpen(true)}
            onSuccess={() => {
              setAddExpenseDrawerOpen(false);
              refreshPayments();
            }}
          />
        </PageDetailsDrawer.Content>
        <PageDetailsDrawer.Footer>
          <div className="flex justify-end">
            <Button form="add-expense-form" type="submit">
              Save Expense
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

      <PageDetailsDrawer open={addVendorDrawerOpen} title="Add Vendor" onOpenChange={setAddVendorDrawerOpen} level={0}>
        <PageDetailsDrawer.Content>
          <AddVendorForm
            onSuccess={(vendor) => {
              setSelectedVendor(vendor);
              setAddVendorDrawerOpen(false);
              refreshVendors();
            }}
          />
        </PageDetailsDrawer.Content>
        <PageDetailsDrawer.Footer>
          <div className="flex justify-end">
            <Button form="add-vendor-form" type="submit">
              Save Vendor
            </Button>
          </div>
        </PageDetailsDrawer.Footer>
      </PageDetailsDrawer>
    </div>
  );
}
