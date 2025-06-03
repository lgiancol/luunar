import { useState } from 'react';
import type { Client } from '~/services/clients/clients.model';
import { PaymentType } from '~/services/payments/payments.model';
import { addPayment } from '~/services/payments/payments.service';
import ClientSelector from '../shared/client-selector';
import InputNumber from '../ui/input-number';
import InputText from '../ui/input-text';

interface AddPaymentFormProps {
  recentClients: Client[] | undefined;
  filteredClients: Client[] | undefined;
}
export default function AddPaymentForm({ recentClients, filteredClients }: AddPaymentFormProps) {
  const [type, setType] = useState<PaymentType>(PaymentType.incoming);
  const [receivedAt, setReceivedAt] = useState<Date>(new Date());
  const [amount, setAmount] = useState<number>(0);
  const [client, setClient] = useState<Client>();
  const [paymentAccountId, setPaymentAccountId] = useState('test-payment-account-id');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!client) return;

    try {
      const result = await addPayment({
        type,
        received_at: receivedAt,
        amount,
        client_id: client.id,
        payment_account_id: paymentAccountId,
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
              <div className="flex-1">
                <label className="text-surface-text-500 mb-1 block text-sm font-medium" htmlFor="name">
                  Name
                </label>
                {/* <InputText id="name" type="text" value={type} onChange={(e) => setType(e.target.value)} required /> */}
              </div>
              <div className="flex-1">
                <label className="text-surface-text-500 mb-1 block text-sm font-medium">Received At</label>
                <InputText
                  id="receivedAt"
                  type="date"
                  value={receivedAt.toISOString()}
                  onChange={(e) => setReceivedAt(new Date(e.target.value))}
                />
              </div>
            </div>

            <div className="w-max">
              <label className="text-surface-text-500 mb-1 block text-sm font-medium" htmlFor="organizationId">
                Payment Account
              </label>
              <InputText
                id="organizationId"
                type="text"
                value={paymentAccountId}
                onChange={(e) => setPaymentAccountId(e.target.value)}
              />
            </div>

            <div className="w-sm">
              <label className="text-surface-text-500 mb-1 block text-sm font-medium" htmlFor="phone">
                Amount
              </label>
              <InputNumber id="amount" type="number" defaultValue={amount} onChange={(e) => setAmount(e)} />
            </div>
            <div>
              <label className="text-surface-text-500 mb-1 block text-sm font-medium" htmlFor="notes">
                Client
              </label>
              <ClientSelector
                selectedClient={client}
                recentClients={recentClients}
                filteredClients={filteredClients}
                onSelect={(client) => setClient(client)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
