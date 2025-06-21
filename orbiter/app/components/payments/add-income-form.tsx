import { useEffect, useState } from 'react';
import type { Client } from '~/services/clients/clients.model';
import type { PaymentAccount } from '~/services/payments/payment-account.model';
import { PaymentType, type Payment } from '~/services/payments/payment.model';
import { addPayment } from '~/services/payments/payments.service';
import { isResultError } from '~/types/result';
import ClientSelector from '../shared/client-selector';
import PaymentAccountSelector from '../shared/payment-account-selector';
import InputNumber from '../ui/input-number';
import InputText from '../ui/input-text';
import InputTextarea from '../ui/input-textarea';

interface AddIncomeFormProps {
  recentClients?: Client[];
  filteredClients?: Client[];
  selectedClient?: Client;

  recentPaymentAccounts?: PaymentAccount[];
  selectedPaymentAccount?: PaymentAccount;
  onAddClient?: () => void;
  onAddPaymentAccount?: () => void;
  onSuccess?: (payment: Payment) => void;
}

export default function AddIncomeForm({
  recentClients,
  recentPaymentAccounts,
  filteredClients,
  selectedClient,
  selectedPaymentAccount,
  onAddClient,
  onAddPaymentAccount,
  onSuccess,
}: AddIncomeFormProps) {
  const [receivedAt, setReceivedAt] = useState<Date>(new Date());
  const [amount, setAmount] = useState<number>(0);
  const [client, setClient] = useState<Client | undefined>(selectedClient);
  const [paymentAccount, setPaymentAccount] = useState<PaymentAccount | undefined>(selectedPaymentAccount);
  const [invoiceReference, setInvoiceReference] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    setClient(selectedClient);
  }, [selectedClient]);

  useEffect(() => {
    setPaymentAccount(selectedPaymentAccount);
  }, [selectedPaymentAccount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!client) return;

    const result = await addPayment({
      type: PaymentType.incoming, // Always incoming for income form
      received_at: receivedAt,
      amount,
      client_id: client.id,
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
      <form id="add-income-form" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            {/* Date and Amount Row */}
            <div className="flex gap-3">
              <div className="w-max">
                <label className="text-surface-text-500 mb-1 block text-sm font-medium">Date Received</label>
                <InputText
                  id="receivedAt"
                  type="date"
                  value={receivedAt.toISOString().split('T')[0]}
                  onChange={(e) => setReceivedAt(new Date(e.target.value))}
                />
              </div>

              <div className="flex-1">
                <label className="text-surface-text-500 mb-1 block text-sm font-medium">Amount</label>
                <InputNumber id="amount" type="number" defaultValue={amount} onChange={(e) => setAmount(e)} />
              </div>
            </div>

            {/* Payment Method and Client Row */}
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
                  Client
                </label>
                <ClientSelector
                  selectedClient={client}
                  recentClients={recentClients}
                  filteredClients={filteredClients}
                  onSelect={(client) => setClient(client)}
                  onAddClient={onAddClient}
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
                  <option value="consulting">Consulting</option>
                  <option value="product-sales">Product Sales</option>
                  <option value="service-fees">Service Fees</option>
                  <option value="subscriptions">Subscriptions</option>
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