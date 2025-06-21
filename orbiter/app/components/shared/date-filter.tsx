import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

export interface DateFilterValue {
  startDate?: Date;
  endDate?: Date;
  preset?: string;
}

interface DateFilterProps {
  value: DateFilterValue;
  onChange: (value: DateFilterValue) => void;
  className?: string;
}

const PRESETS = [
  { label: 'All Time', value: 'all' },
  { label: 'This Month', value: 'this_month' },
  { label: 'Last Month', value: 'last_month' },
  { label: 'This Year', value: 'this_year' },
  { label: 'Last Year', value: 'last_year' },
];

export function DateFilter({ value, onChange, className }: DateFilterProps) {
  const [isCustomRange, setIsCustomRange] = useState(false);

  useEffect(() => {
    // If no preset is selected, show custom range
    if (!value.preset && (value.startDate || value.endDate)) {
      setIsCustomRange(true);
    }
  }, [value]);

  const handlePresetChange = (preset: string) => {
    if (preset === 'all') {
      onChange({ preset: 'all' });
      setIsCustomRange(false);
      return;
    }

    const now = new Date();
    let startDate: Date | undefined;
    let endDate: Date | undefined;

    switch (preset) {
      case 'this_month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'last_month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'this_year':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31);
        break;
      case 'last_year':
        startDate = new Date(now.getFullYear() - 1, 0, 1);
        endDate = new Date(now.getFullYear() - 1, 11, 31);
        break;
    }

    onChange({ startDate, endDate, preset });
    setIsCustomRange(false);
  };

  const handleCustomDateChange = (field: 'startDate' | 'endDate', dateString: string) => {
    const date = dateString ? new Date(dateString) : undefined;
    onChange({
      ...value,
      [field]: date,
      preset: undefined
    });
  };

  const formatDateForInput = (date?: Date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.value}
            onClick={() => handlePresetChange(preset.value)}
            className={cn(
              "px-3 py-1 text-sm rounded-md border transition-colors",
              value.preset === preset.value || 
              (!value.preset && preset.value === 'all')
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            )}
          >
            {preset.label}
          </button>
        ))}
        <button
          onClick={() => setIsCustomRange(!isCustomRange)}
          className={cn(
            "px-3 py-1 text-sm rounded-md border transition-colors",
            isCustomRange
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          )}
        >
          Custom Range
        </button>
      </div>

      {/* Custom Date Range */}
      {isCustomRange && (
        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={formatDateForInput(value.startDate)}
              onChange={(e) => handleCustomDateChange('startDate', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              value={formatDateForInput(value.endDate)}
              onChange={(e) => handleCustomDateChange('endDate', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
} 