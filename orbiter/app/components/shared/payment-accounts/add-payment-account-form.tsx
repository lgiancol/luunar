import { useState } from 'react';
import InputText from '~/components/ui/input-text';
import InputTextarea from '~/components/ui/input-textarea';
import type { PaymentAccount, PaymentAccountType } from '~/services/payments/payment-account.model';
import { addPaymentAccount } from '~/services/payments/payment-accounts.service';
import { isResultError } from '~/types/result';
import PaymentAccountTypeSelector from './payment-account-type-selector';

interface AddPaymentAccountFormProps {
  onSuccess?: (paymentAccount: PaymentAccount) => void;
}
export default function AddPaymentAccountForm({ onSuccess }: AddPaymentAccountFormProps) {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<PaymentAccountType | undefined>('card');
  const [notes, setNotes] = useState<string>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!type) return;

    const result = await addPaymentAccount({
      name,
      type,
      notes,
    });

    if (isResultError(result)) {
      console.log(result.error);
      return;
    }

    onSuccess?.(result.data);
  };

  return (
    <div>
      <form id="add-payment-account-form" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          {/* <Panel>
          </Panel> */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-surface-text-500 mb-1 block text-sm font-medium">Name</label>
                <InputText id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="flex-1">
                <label className="text-surface-text-500 mb-1 block text-sm font-medium" htmlFor="organizationId">
                  Type
                </label>
                <PaymentAccountTypeSelector selectedPaymentAccountType={type} onSelect={(pat) => setType(pat)} />
              </div>
            </div>

            <div className="w-full">
              <div>
                <label className="text-surface-text-500 mb-1 block text-sm font-medium" htmlFor="notes">
                  Notes
                </label>
                <InputTextarea id="notes" defaultValue={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
