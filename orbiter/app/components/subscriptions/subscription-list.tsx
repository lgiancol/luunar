import { type ColumnDef } from '@tanstack/react-table';
import { DataTable } from '~/components/ui/data-table';
import type { Subscription } from '~/services/subscriptions/subscriptions.model';
import type { PaginatedResponse } from '~/shared/pagination';

interface ISubscriptionListParams {
  subscriptionsPage: PaginatedResponse<Subscription> | undefined;
  //   onSubscriptionSelectionChange?: (selectedSubscriptions: Subscription[]) => void;
}

export function SubscriptionList({ subscriptionsPage }: ISubscriptionListParams) {
  return <DataTable columns={columns} data={subscriptionsPage?.data || []} />;
}

const columns: ColumnDef<Subscription>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => row.getValue<string>('name'),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = row.getValue<number>('amount') || 0;
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'CAD',
      }).format(amount);
    },
  },
  {
    accessorKey: 'frequency',
    header: 'Frequency',
    cell: ({ row }) => row.getValue<string>('frequency'),
  },
  {
    accessorKey: 'interval',
    header: 'Interval',
    cell: ({ row }) => row.getValue<number>('interval'),
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) =>
      row.getValue<Date>('startDate') ? new Date(row.getValue<Date>('startDate')).toLocaleDateString() : '-',
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) =>
      row.getValue<Date>('endDate') ? new Date(row.getValue<Date>('endDate')).toLocaleDateString() : '-',
  },
  {
    accessorKey: 'isActive',
    header: 'Active',
    cell: ({ row }) => (row.getValue<boolean>('isActive') ? 'Yes' : 'No'),
  },
];
