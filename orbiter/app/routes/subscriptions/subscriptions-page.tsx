import { useRedirectIfUnauthenticated } from '~/hooks/useRedirectIfUnauthenticated';

export default function SubscriptionsPage() {
  useRedirectIfUnauthenticated();

  return (
    <div className="container mx-auto py-6">
      <p>Subscriptions page coming soon!</p>
    </div>
  );
}
