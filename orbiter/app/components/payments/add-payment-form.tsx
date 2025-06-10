import { useEffect, useState } from 'react';
import type { Client } from '~/services/clients/clients.model';
import type { PaymentAccount } from '~/services/payments/payment-account.model';
import { PaymentType } from '~/services/payments/payment.model';
import { addPayment } from '~/services/payments/payments.service';
import ClientSelector from '../shared/client-selector';
import PaymentAccountSelector from '../shared/payment-account-selector';
import PaymentTypeSelector from '../shared/payment-type-selector';
import InputNumber from '../ui/input-number';
import InputText from '../ui/input-text';

interface AddPaymentFormProps {
  recentClients?: Client[];
  filteredClients?: Client[];
  selectedClient?: Client;

  recentPaymentAccounts?: PaymentAccount[];
  selectedPaymentAccount?: PaymentAccount;
  onAddClient?: () => void;
  onAddPaymentAccount?: () => void;
}
export default function AddPaymentForm({
  recentClients,
  recentPaymentAccounts,

  filteredClients,
  selectedClient,
  selectedPaymentAccount,

  onAddClient,
  onAddPaymentAccount,
}: AddPaymentFormProps) {
  const [type, setType] = useState<PaymentType>(PaymentType.incoming);
  const [receivedAt, setReceivedAt] = useState<Date>(new Date());
  const [amount, setAmount] = useState<number>(0);
  const [client, setClient] = useState<Client | undefined>(selectedClient);
  const [paymentAccount, setPaymentAccount] = useState<PaymentAccount | undefined>(selectedPaymentAccount);

  useEffect(() => {
    setClient(selectedClient);
  }, [selectedClient]);

  useEffect(() => {
    setPaymentAccount(selectedPaymentAccount);
  }, [selectedPaymentAccount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!client) return;

    try {
      const result = await addPayment({
        type,
        received_at: receivedAt,
        amount,
        client_id: client.id,
        payment_account_id: paymentAccount?.id ?? 'test-payment-account-id',
      });
    } catch (err) {
      console.error('addPayment failed:', err);
    }
  };

  return (
    <div>
      <form id="add-payment-form" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          {/* <Panel>
          </Panel> */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <div className="w-max">
                <label className="text-surface-text-500 mb-1 block text-sm font-medium">Received At</label>
                <InputText
                  id="receivedAt"
                  type="date"
                  value={receivedAt.toISOString()}
                  onChange={(e) => setReceivedAt(new Date(e.target.value))}
                />
              </div>

              <div className="flex-1">
                <label className="text-surface-text-500 mb-1 block text-sm font-medium">Amount</label>
                <InputNumber id="amount" type="number" defaultValue={amount} onChange={(e) => setAmount(e)} />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-surface-text-500 mb-1 block text-sm font-medium" htmlFor="organizationId">
                  Payment Account
                </label>
                <PaymentAccountSelector
                  selectedPaymentAccount={selectedPaymentAccount}
                  paymentAccounts={recentPaymentAccounts}
                  onSelect={(pA) => setPaymentAccount(pA)}
                  onAddPaymentAccount={onAddPaymentAccount}
                />
              </div>

              <div className="flex-1">
                <label className="text-surface-text-500 mb-1 block text-sm font-medium" htmlFor="notes">
                  Source
                </label>
                <div className="flex w-full items-center gap-1">
                  <div className="flex-shrink-1">
                    <div>
                      <PaymentTypeSelector selectedPaymentType={type} onPaymentTypeSelect={setType} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <ClientSelector
                      selectedClient={client}
                      recentClients={recentClients}
                      filteredClients={filteredClients}
                      onSelect={(client) => setClient(client)}
                      onAddClient={onAddClient}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
