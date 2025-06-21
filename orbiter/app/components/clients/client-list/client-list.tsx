// import { DataTable, type DataTableValue } from 'primereact/datatable';
import { type ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router';
import { Checkbox } from '~/components/ui/checkbox';
import { DataTable } from '~/components/ui/data-table';
import type { Client } from '~/services/clients/clients.model';
import type { PaginatedResponse } from '~/shared/pagination';

interface ClientListProps {
  page: PaginatedResponse<Client> | undefined;
}
export default function ClientList({ page }: ClientListProps) {
  return <DataTable columns={columns} data={page?.data || []} />;
}

const columns: ColumnDef<Client>[] = [
  {
    id: 'select',
    accessorKey: 'id',
    size: 10,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <div className="flex h-full w-full items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="h-full w-full">
        <Link to={`/clients/${row.getValue<string>('select')}`} className="flex h-full w-full items-center p-3">
          {row.getValue<string>('name')}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="h-full w-full">
        <Link to={`/clients/${row.getValue<string>('select')}`} className="flex h-full w-full items-center p-3">
          {row.getValue<string>('email')}
        </Link>
      </div>
    ),
  },
  {
    id: 'income',
    header: () => {
      return <div>Income</div>;
    },
    accessorKey: 'income',
    cell: ({ row }) => {
      const amount = row.getValue<number>('income') || 0;
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'CAD',
      }).format(amount);

      return (
        <div className="h-full w-full">
          <Link to={`/clients/${row.getValue<string>('select')}`} className="flex h-full w-full items-center p-3">
            {formatted}
          </Link>
        </div>
      );
    },
    footer: ({ table }) => {
      const amount = table.getRowModel().rows.reduce((total, row) => {
        return total + (row.getValue<number>('income') || 0);
      }, 0);
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'CAD',
      }).format(amount);

      return (
        <div className="flex h-full w-full items-center">
          <p className="font-bold">{formatted}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'phone',
    header: () => {
      return <div>Phone Number</div>;
    },
    cell: ({ row }) => (
      <div className="h-full w-full">
        <Link to={`/clients/${row.getValue<string>('select')}`} className="flex h-full w-full items-center p-3">
          {row.getValue<string>('phone')}
        </Link>
      </div>
    ),
  },
];
