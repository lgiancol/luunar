import { useRedirectIfUnauthenticated } from '~/hooks/useRedirectIfUnauthenticated';

// interface DashboardPageProps {}
export default function DashboardPage() {
  useRedirectIfUnauthenticated();

  return <div className="text-background-text-500">DashboardPage works!</div>;
}
