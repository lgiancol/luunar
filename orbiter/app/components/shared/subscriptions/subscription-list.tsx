import { type ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router';
import { Checkbox } from '~/components/ui/checkbox';
import { DataTable } from '~/components/ui/data-table';
import type { Subscription } from '~/services/subscriptions/subscriptions.model';
import type { PaginatedResponse } from '~/shared/pagination';

interface ISubscriptionListParams {
  subscriptionsPage: PaginatedResponse<Subscription> | undefined;
  onSubscriptionSelectionChange?: (selectedSubscriptions: Subscription[]) => void;
}

export function SubscriptionList({ subscriptionsPage, onSubscriptionSelectionChange }: ISubscriptionListParams) {
  return (
    <DataTable
      columns={columns}
      data={subscriptionsPage?.data || []}
      onRowSelectionChange={onSubscriptionSelectionChange}
    />
  );
}

const columns: ColumnDef<Subscription>[] = [
  {
    id: 'select',
    accessorKey: 'id',
    size: 10,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <div className="flex h-full w-full items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: () => {
      return <div>Name</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="h-full w-full">
          <Link to={`/subscriptions/${row.getValue<string>('select')}`} className="flex h-full w-full items-center p-3">
            {row.getValue<string>('name')}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: () => {
      return <div>Amount</div>;
    },
    cell: ({ row }) => {
      const amount = row.getValue<number>('amount') || 0;
      const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'CAD',
      }).format(amount);

      return (
        <div className="h-full w-full">
          <Link to={`/subscriptions/${row.getValue<string>('select')}`} className="flex h-full w-full items-center p-3">
            {formattedAmount}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'frequency',
    header: () => {
      return <div>Frequency</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="h-full w-full">
          <Link to={`/subscriptions/${row.getValue<string>('select')}`} className="flex h-full w-full items-center p-3">
            {row.getValue<string>('frequency')}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'interval',
    header: () => {
      return <div>Interval</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="h-full w-full">
          <Link to={`/subscriptions/${row.getValue<string>('select')}`} className="flex h-full w-full items-center p-3">
            {row.getValue<number>('interval')}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'startDate',
    header: () => {
      return <div>Start Date</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="h-full w-full">
          <Link to={`/subscriptions/${row.getValue<string>('select')}`} className="flex h-full w-full items-center p-3">
            {row.getValue<Date>('startDate') ? new Date(row.getValue<Date>('startDate')).toLocaleDateString() : '-'}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'endDate',
    header: () => {
      return <div>End Date</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="h-full w-full">
          <Link to={`/subscriptions/${row.getValue<string>('select')}`} className="flex h-full w-full items-center p-3">
            {row.getValue<Date>('endDate') ? new Date(row.getValue<Date>('endDate')).toLocaleDateString() : '-'}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'isActive',
    header: () => {
      return <div>Active</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="h-full w-full">
          <Link to={`/subscriptions/${row.getValue<string>('select')}`} className="flex h-full w-full items-center p-3">
            {row.getValue<boolean>('isActive') ? 'Yes' : 'No'}
          </Link>
        </div>
      );
    },
  },
];
