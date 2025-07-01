import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import PageDetailsDrawer from '~/components/shared/page-details-drawer';
import AddPaymentAccountForm from '~/components/shared/payment-accounts/add-payment-account-form';
import { AddSubscriptionForm } from '~/components/shared/subscriptions/add-subscription-form';
import { SubscriptionList } from '~/components/shared/subscriptions/subscription-list';
import { Button } from '~/components/ui/button';
import { AddVendorForm } from '~/components/vendors/add-vendor-form';
import { useRecentPaymentAccounts } from '~/hooks/payment-accounts/useRecentPaymentAccounts';
import { usePaginatedSubscriptions } from '~/hooks/subscriptions/userPaginatedSubscriptions';
import { useRedirectIfUnauthenticated } from '~/hooks/useRedirectIfUnauthenticated';
import { useRecentVendors } from '~/hooks/vendors/useRecentVendors';
import type { PaymentAccount } from '~/services/payments/payment-account.model';
import type { Subscription } from '~/services/subscriptions/subscriptions.model';
import type { Vendor } from '~/services/vendors/vendors.model';

export default function SubscriptionsPage() {
  useRedirectIfUnauthenticated();

  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [addVendorDrawerOpen, setAddVendorDrawerOpen] = useState(false);
  const [addPaymentAccountDrawerOpen, setAddPaymentAccountDrawerOpen] = useState(false);

  const [selectedVendor, setSelectedVendor] = useState<Vendor>();
  const { subscriptionsPage, loading, refresh } = usePaginatedSubscriptions({});
  const { vendors: recentVendorsPage, refetch: refreshVendors, loading: vendorsLoading } = useRecentVendors(50);
  const { paymentAccountsPage, refresh: refreshPaymentAccounts } = useRecentPaymentAccounts(50);
  const [selectedPaymentAccount, setSelectedPaymentAccount] = useState<PaymentAccount>();
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<Subscription[]>([]);

  const handleAddSuccess = () => {
    setIsAddDrawerOpen(false);
    refresh();
  };

  const handleVendorAdded = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setAddVendorDrawerOpen(false);
    refreshVendors();
  };

  const handlePaymentAccountAdded = (paymentAccount: PaymentAccount) => {
    setSelectedPaymentAccount(paymentAccount);
    setAddPaymentAccountDrawerOpen(false);
    refreshPaymentAccounts();
  };

  if (loading) {
    return (
      <div>
        <p className="text-background-text-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-2">
          <div className="text-2xl font-semibold text-background-text-500">
            <h2 className="text-text-primary-500">Subscriptions</h2>
          </div>

          <div>
            <Button variant="white" onClick={() => setIsAddDrawerOpen(true)}>
              <PlusIcon />
              Add Subscription
            </Button>
          </div>
        </div>
        <div>
          <SubscriptionList
            subscriptionsPage={subscriptionsPage}
            onSubscriptionSelectionChange={setSelectedSubscriptions}
          />
        </div>
      </div>

      <PageDetailsDrawer
        open={isAddDrawerOpen}
        title="Add New Subscription"
        onOpenChange={setIsAddDrawerOpen}
        level={addVendorDrawerOpen || addPaymentAccountDrawerOpen ? 1 : 0}
      >
        <PageDetailsDrawer.Content>
          <AddSubscriptionForm
            onSuccess={handleAddSuccess}
            onAddVendor={() => setAddVendorDrawerOpen(true)}
            onAddPaymentAccount={() => setAddPaymentAccountDrawerOpen(true)}
            selectedVendor={selectedVendor}
            recentVendors={recentVendorsPage?.data}
            vendorsLoading={vendorsLoading}
            selectedPaymentAccount={selectedPaymentAccount}
            recentPaymentAccounts={paymentAccountsPage?.data}
            onPaymentAccountSelect={setSelectedPaymentAccount}
            onVendorSelect={setSelectedVendor}
          />
        </PageDetailsDrawer.Content>
        <PageDetailsDrawer.Footer>
          <div className="flex justify-end">
            <Button form="add-subscription-form" type="submit">
              Save Subscription
            </Button>
          </div>
        </PageDetailsDrawer.Footer>
      </PageDetailsDrawer>

      <PageDetailsDrawer open={addVendorDrawerOpen} title="Add Vendor" onOpenChange={setAddVendorDrawerOpen} level={0}>
        <PageDetailsDrawer.Content>
          <AddVendorForm onSuccess={handleVendorAdded} />
        </PageDetailsDrawer.Content>
        <PageDetailsDrawer.Footer>
          <div className="flex justify-end">
            <Button form="add-vendor-form" type="submit">
              Save Vendor
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
          <AddPaymentAccountForm onSuccess={handlePaymentAccountAdded} />
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
