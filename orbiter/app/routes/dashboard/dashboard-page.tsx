import { useRedirectIfUnauthenticated } from '~/hooks/useRedirectIfUnauthenticated';
import { useDashboardMetrics } from '~/hooks/useDashboardMetrics';
import { MetricCard } from '~/components/shared/metric-card';

// interface DashboardPageProps {}
export default function DashboardPage() {
  useRedirectIfUnauthenticated();
  const { metrics, loading, error } = useDashboardMetrics();

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-2 h-4 w-1/2 rounded bg-gray-200"></div>
            <div className="h-8 w-3/4 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-red-800">Error loading dashboard metrics: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Income" value={metrics?.totalIncome || 0} subtitle="All time incoming payments" />
      </div>
    </div>
  );
}
