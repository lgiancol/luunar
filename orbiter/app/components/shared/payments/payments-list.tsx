import type { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router';
import { Checkbox } from '~/components/ui/checkbox';
import { DataTable } from '~/components/ui/data-table';
import type { PaymentAccount } from '~/services/payments/payment-account.model';
import { PaymentType, type Payment } from '~/services/payments/payment.model';
import type { PaginatedResponse } from '~/shared/pagination';

interface IPaymentsListParams {
  paymentsPage: PaginatedResponse<Payment> | undefined;
  onPaymentSelectionChange?: (selectedPayments: Payment[]) => void;
}
export default function PaymentsList({ paymentsPage, onPaymentSelectionChange }: IPaymentsListParams) {
  return (
    <DataTable columns={columns} data={paymentsPage?.data || []} onRowSelectionChange={onPaymentSelectionChange} />
  );
}

const columns: ColumnDef<Payment>[] = [
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
    id: 'paymentAccount',
    header: () => {
      return <div>Payment Account</div>;
    },
    accessorKey: 'paymentAccount',
    cell: ({ row }) => {
      return (
        <div className="h-full w-full">
          <Link to={`/income/${row.getValue<string>('select')}`} className="flex h-full w-full items-center p-3">
            {row.getValue<PaymentAccount>('paymentAccount').name}
          </Link>
        </div>
      );
    },
  },
  {
    id: 'amount',
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const type = row.getValue<PaymentType>('type');
      let amount = row.getValue<number>('amount');
      if (type === PaymentType.outgoing) {
        amount *= -1;
      }

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'CAD',
      }).format(amount);

      return (
        <div className="h-full w-full">
          <Link to={`/income/${row.getValue<string>('select')}`} className="flex h-full w-full items-center p-3">
            {formatted}
          </Link>
        </div>
      );
    },
    footer: ({ table }) => {
      const amount = table.getRowModel().rows.reduce((total, row) => {
        const type = row.getValue<PaymentType>('type');
        let amount = row.getValue<number>('amount');
        if (type === PaymentType.outgoing) {
          amount *= -1;
        }
        return total + amount;
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
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <div className="h-full w-full">
        <Link to={`/income/${row.getValue<string>('select')}`} className="flex h-full w-full items-center p-3">
          {row.getValue<string>('type')}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: 'receivedAt',
    header: 'Paid On',
    cell: ({ row }) => {
      const date = row.getValue<Date>('receivedAt');
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      });

      return (
        <div className="h-full w-full">
          <Link to={`/income/${row.getValue<string>('select')}`} className="flex h-full w-full items-center p-3">
            {formattedDate}
          </Link>
        </div>
      );
    },
  },
];
