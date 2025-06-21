import { useEffect, useState } from 'react';
import type { PaymentAccount } from '~/services/payments/payment-account.model';
import { PaymentType, type Payment } from '~/services/payments/payment.model';
import { addPayment } from '~/services/payments/payments.service';
import { isResultError } from '~/types/result';
import PaymentAccountSelector from '../shared/payment-account-selector';
import { VendorSelector } from '../shared/vendor-selector';
import InputNumber from '../ui/input-number';
import InputText from '../ui/input-text';
import InputTextarea from '../ui/input-textarea';

interface AddExpenseFormProps {
  recentPaymentAccounts?: PaymentAccount[];
  selectedPaymentAccount?: PaymentAccount;
  onAddPaymentAccount?: () => void;
  onSuccess?: (payment: Payment) => void;
}

export default function AddExpenseForm({
  recentPaymentAccounts,
  selectedPaymentAccount,
  onAddPaymentAccount,
  onSuccess,
}: AddExpenseFormProps) {
  const [paidAt, setPaidAt] = useState<Date>(new Date());
  const [amount, setAmount] = useState<number>(0);
  const [vendorId, setVendorId] = useState<string>('');
  const [paymentAccount, setPaymentAccount] = useState<PaymentAccount | undefined>(selectedPaymentAccount);
  const [invoiceReference, setInvoiceReference] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    setPaymentAccount(selectedPaymentAccount);
  }, [selectedPaymentAccount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!vendorId) return;

    const result = await addPayment({
      type: PaymentType.outgoing, // Always outgoing for expenses
      received_at: paidAt,
      amount,
      client_id: undefined, // No client for expenses
      vendor_id: vendorId, // Use vendor ID instead of text
      payment_account_id: paymentAccount?.id ?? 'test-payment-account-id',
    });

    if (isResultError(result)) {
      console.log(result.error);
      return;
    }

    onSuccess?.(result.data);
  };

  return (
    <div>
      <form id="add-expense-form" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            {/* Date and Amount Row */}
            <div className="flex gap-3">
              <div className="w-max">
                <label className="text-surface-text-500 mb-1 block text-sm font-medium">Date Paid</label>
                <InputText
                  id="paidAt"
                  type="date"
                  value={paidAt.toISOString().split('T')[0]}
                  onChange={(e) => setPaidAt(new Date(e.target.value))}
                />
              </div>

              <div className="flex-1">
                <label className="text-surface-text-500 mb-1 block text-sm font-medium">Amount</label>
                <InputNumber id="amount" type="number" defaultValue={amount} onChange={(e) => setAmount(e)} />
              </div>
            </div>

            {/* Payment Method and Vendor Row */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-surface-text-500 mb-1 block text-sm font-medium">
                  Payment Method
                </label>
                <PaymentAccountSelector
                  selectedPaymentAccount={paymentAccount}
                  paymentAccounts={recentPaymentAccounts}
                  onSelect={(pA) => setPaymentAccount(pA)}
                  onAddPaymentAccount={onAddPaymentAccount}
                />
              </div>

              <div className="flex-1">
                <label className="text-surface-text-500 mb-1 block text-sm font-medium">
                  Vendor
                </label>
                <VendorSelector
                  value={vendorId}
                  onChange={setVendorId}
                  placeholder="Select vendor..."
                />
              </div>
            </div>

            {/* Invoice Reference and Category Row */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-surface-text-500 mb-1 block text-sm font-medium">
                  Invoice/Reference
                </label>
                <InputText
                  id="invoiceReference"
                  type="text"
                  value={invoiceReference}
                  onChange={(e) => setInvoiceReference(e.target.value)}
                  placeholder="Optional invoice number"
                />
              </div>

              <div className="flex-1">
                <label className="text-surface-text-500 mb-1 block text-sm font-medium">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-md border border-surface-border-300 bg-surface-500 px-3 py-2 text-sm text-surface-text-500 focus:border-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-300"
                >
                  <option value="">Select a category</option>
                  <option value="office-supplies">Office Supplies</option>
                  <option value="travel">Travel</option>
                  <option value="software">Software</option>
                  <option value="utilities">Utilities</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Description Row */}
            <div className="w-full">
              <label className="text-surface-text-500 mb-1 block text-sm font-medium">
                Description
              </label>
              <InputTextarea
                id="description"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
