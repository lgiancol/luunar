import { cn } from '../../lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number | React.ReactNode;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({ title, value, subtitle, icon, className }: MetricCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-lg border border-gray-200 p-3 shadow-sm",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="mt-1">
            {typeof value === 'number' ? (
              <p className="text-2xl font-bold text-gray-900">
                ${value.toLocaleString()}
              </p>
            ) : typeof value === 'string' ? (
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            ) : (
              <div className="flex items-center">
                {value}
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 ml-4">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
} 