import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import PageDetailsDrawer from '~/components/shared/page-details-drawer';
import { AddSubscriptionForm } from '~/components/shared/subscriptions/add-subscription-form';
import { SubscriptionList } from '~/components/shared/subscriptions/subscription-list';
import { Button } from '~/components/ui/button';
import { usePaginatedSubscriptions } from '~/hooks/subscriptions/userPaginatedSubscriptions';
import { useRedirectIfUnauthenticated } from '~/hooks/useRedirectIfUnauthenticated';

export default function SubscriptionsPage() {
  useRedirectIfUnauthenticated();

  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const { subscriptionsPage, loading, refresh } = usePaginatedSubscriptions({});

  const handleAddSuccess = () => {
    setIsAddDrawerOpen(false);
    refresh();
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
          <SubscriptionList subscriptionsPage={subscriptionsPage} />
        </div>
      </div>

      <PageDetailsDrawer
        open={isAddDrawerOpen}
        title="Add New Subscription"
        onOpenChange={setIsAddDrawerOpen}
        level={0}
      >
        <PageDetailsDrawer.Content>
          <AddSubscriptionForm onSuccess={handleAddSuccess} />
        </PageDetailsDrawer.Content>
        <PageDetailsDrawer.Footer>
          <div className="flex justify-end">
            <Button form="add-subscription-form" type="submit">
              Save Subscription
            </Button>
          </div>
        </PageDetailsDrawer.Footer>
      </PageDetailsDrawer>
    </div>
  );
}
