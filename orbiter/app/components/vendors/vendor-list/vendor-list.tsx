import { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { type ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { DataTable } from '~/components/ui/data-table';
import PageDetailsDrawer from '~/components/shared/page-details-drawer';
import { AddVendorForm } from '../add-vendor-form';
import { usePaginatedVendors } from '~/hooks/vendors/usePaginatedVendors';
import type { Vendor } from '~/services/vendors/vendors.model';

export function VendorList() {
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const { vendors, loading, error, page, setPage, pageSize, setPageSize, refetch } = usePaginatedVendors();

  const handleAddSuccess = () => {
    setIsAddDrawerOpen(false);
    refetch();
  };

  if (loading) {
    return <div className="text-center py-8">Loading vendors...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  }

  if (!vendors) {
    return <div className="text-center py-8">No vendors found</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
        <Button variant="white" onClick={() => setIsAddDrawerOpen(true)}>
          <PlusIcon />
          Add Vendor
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={vendors.data}
      />

      <PageDetailsDrawer
        open={isAddDrawerOpen}
        title="Add New Vendor"
        onOpenChange={setIsAddDrawerOpen}
        level={0}
      >
        <PageDetailsDrawer.Content>
          <AddVendorForm
            onSuccess={handleAddSuccess}
          />
        </PageDetailsDrawer.Content>
        <PageDetailsDrawer.Footer>
          <div className="flex justify-end">
            <Button form="add-vendor-form" type="submit">
              Save Vendor
            </Button>
          </div>
        </PageDetailsDrawer.Footer>
      </PageDetailsDrawer>
    </div>
  );
}

const columns: ColumnDef<Vendor>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="h-full w-full">
        <Link to={`/vendors/${row.getValue<string>('id')}`} className="flex h-full w-full items-center p-3">
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
        <Link to={`/vendors/${row.getValue<string>('id')}`} className="flex h-full w-full items-center p-3">
          {row.getValue<string>('email') || '-'}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => (
      <div className="h-full w-full">
        <Link to={`/vendors/${row.getValue<string>('id')}`} className="flex h-full w-full items-center p-3">
          {row.getValue<string>('phone') || '-'}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: 'income',
    header: 'Expenses',
    cell: ({ row }) => {
      const amount = row.getValue<number>('income') || 0;
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'CAD',
      }).format(amount);

      return (
        <div className="h-full w-full">
          <Link to={`/vendors/${row.getValue<string>('id')}`} className="flex h-full w-full items-center p-3">
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
]; 