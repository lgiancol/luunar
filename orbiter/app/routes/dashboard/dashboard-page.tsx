import { useState, useMemo } from 'react';
import { useRedirectIfUnauthenticated } from '~/hooks/useRedirectIfUnauthenticated';
import { useDashboardMetrics } from '~/hooks/useDashboardMetrics';
import { MetricCard } from '~/components/shared/metric-card';
import { DateFilter, type DateFilterValue } from '~/components/shared/date-filter';
import { TrendingUp, TrendingDown } from 'lucide-react';

// interface DashboardPageProps {}
export default function DashboardPage() {
  useRedirectIfUnauthenticated();
  
  const [dateFilter, setDateFilter] = useState<DateFilterValue>({ preset: 'all' });
  
  // Memoize the filters object to prevent unnecessary re-renders
  const filters = useMemo(() => ({
    startDate: dateFilter.startDate,
    endDate: dateFilter.endDate
  }), [dateFilter.startDate, dateFilter.endDate]);
  
  const { metrics, loading, error } = useDashboardMetrics(filters);

  // Determine cash flow trend icon
  const cashFlowIcon = useMemo(() => {
    if (!metrics?.cashFlow) return null;
    
    if (metrics.cashFlow > 0) {
      return <TrendingUp className="w-8 h-8 text-green-600" />;
    } else if (metrics.cashFlow < 0) {
      return <TrendingDown className="w-8 h-8 text-red-600" />;
    }
    return null; // No icon for zero cash flow
  }, [metrics?.cashFlow]);

  // Format best performing month display
  const bestPerformingMonthDisplay = useMemo(() => {
    if (!metrics?.bestPerformingMonth) return "No data";
    return `${metrics.bestPerformingMonth.month} - $${metrics.bestPerformingMonth.profit.toLocaleString()}`;
  }, [metrics?.bestPerformingMonth]);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
        <div className="mb-6">
          <DateFilter value={dateFilter} onChange={setDateFilter} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
        <div className="mb-6">
          <DateFilter value={dateFilter} onChange={setDateFilter} />
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error loading dashboard metrics: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="mb-6">
        <DateFilter value={dateFilter} onChange={setDateFilter} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Income"
          value={metrics?.totalIncome || 0}
          subtitle="Incoming payments"
        />
        <MetricCard
          title="Total Expenses"
          value={metrics?.totalExpenses || 0}
          subtitle="Outgoing payments"
        />
        <MetricCard
          title="Net Profit/Loss"
          value={metrics?.netProfit || 0}
          subtitle="Income minus expenses"
        />
        <MetricCard
          title="Cash Flow"
          value={cashFlowIcon || "—"}
          subtitle="Net cash movement"
        />
        <MetricCard
          title="Best Performing Month"
          value={bestPerformingMonthDisplay}
          subtitle="Highest profit month"
        />
      </div>
    </div>
  );
}
