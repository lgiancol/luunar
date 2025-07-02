import { useEffect, useMemo, useState } from 'react';
import PaymentAccountSelector from '~/components/shared/payment-account-selector';
import { VendorSelector } from '~/components/shared/vendor-selector';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import type { PaymentAccount } from '~/services/payments/payment-account.model';
import { addSubscription } from '~/services/subscriptions/subscriptions.service';
import type { Vendor } from '~/services/vendors/vendors.model';
import { isResultError } from '~/types/result';
import InputNumber from '../../ui/input-number';
import InputText from '../../ui/input-text';
import InputTextarea from '../../ui/input-textarea';

interface AddSubscriptionFormProps {
  selectedVendor?: Vendor;
  recentVendors?: Vendor[];
  vendorsLoading?: boolean;

  selectedPaymentAccount?: PaymentAccount;
  recentPaymentAccounts?: PaymentAccount[];

  onPaymentAccountSelect?: (paymentAccount: PaymentAccount) => void;
  onVendorSelect?: (vendor: Vendor) => void;
  onAddPaymentAccount?: () => void;
  onSuccess: () => void;
  onAddVendor?: () => void;
}

export function AddSubscriptionForm({
  onSuccess,
  onAddVendor,
  recentVendors,
  vendorsLoading,
  onAddPaymentAccount,
  recentPaymentAccounts,
  selectedVendor,
  selectedPaymentAccount,
  onPaymentAccountSelect,
  onVendorSelect,
}: AddSubscriptionFormProps) {
  const [form, setForm] = useState({
    name: '',
    amount: 0,
    paymentAccountId: '',
    vendorId: '',
    frequency: '',
    interval: 1,
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    backfill: false,
  });

  const vendor = useMemo(() => {
    return selectedVendor;
  }, [selectedVendor]);
  const paymentAccount = useMemo(() => {
    return selectedPaymentAccount;
  }, [selectedPaymentAccount]);

  useEffect(() => {
    if (selectedVendor) {
      setForm((prev) => ({ ...prev, vendorId: selectedVendor.id }));
    }
  }, [selectedVendor]);

  useEffect(() => {
    if (selectedPaymentAccount) {
      setForm((prev) => ({ ...prev, paymentAccountId: selectedPaymentAccount.id }));
    }
  }, [selectedPaymentAccount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await addSubscription({
      name: form.name,
      amount: form.amount,
      frequency: form.frequency,
      interval: form.interval,
      startDate: new Date(form.startDate),
      endDate: form.endDate ? new Date(form.endDate) : null,
      description: form.description,
      category: '',
      vendorId: form.vendorId,
      paymentAccountId: form.paymentAccountId,
      lastProcessed: null,
      backfill: form.backfill,
    });

    if (isResultError(result)) {
      console.log(result.error);
      return;
    }

    onSuccess();
  };

  return (
    <div>
      <form id="add-subscription-form" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium">Name</label>
              <InputText
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium">Amount</label>
              <InputNumber
                id="amount"
                type="number"
                defaultValue={form.amount}
                onChange={(e) => setForm((prev) => ({ ...prev, amount: e }))}
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Payment Method</label>
            <PaymentAccountSelector
              selectedPaymentAccount={paymentAccount}
              paymentAccounts={recentPaymentAccounts}
              onSelect={onPaymentAccountSelect}
              onAddPaymentAccount={onAddPaymentAccount}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Vendor</label>
            <VendorSelector
              selectedVendor={vendor}
              recentVendors={recentVendors}
              loading={vendorsLoading}
              onSelect={onVendorSelect}
              onAddVendor={onAddVendor}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium">Frequency</label>
              <InputText
                id="frequency"
                type="text"
                value={form.frequency}
                onChange={(e) => setForm((prev) => ({ ...prev, frequency: e.target.value }))}
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium">Interval</label>
              <InputNumber
                id="interval"
                type="number"
                defaultValue={form.interval}
                onChange={(e) => setForm((prev) => ({ ...prev, interval: e }))}
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <InputTextarea
              id="description"
              defaultValue={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium">Start Date</label>
              <InputText
                id="startDate"
                type="date"
                value={form.startDate}
                onChange={(e) => setForm((prev) => ({ ...prev, startDate: e.target.value }))}
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium">End Date</label>
              <InputText
                id="endDate"
                type="date"
                value={form.endDate}
                onChange={(e) => setForm((prev) => ({ ...prev, endDate: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="backfill"
              checked={form.backfill}
              onCheckedChange={(checked) => setForm((prev) => ({ ...prev, backfill: !!checked }))}
            />
            <label htmlFor="backfill" className="text-sm font-medium">
              Backfill past expenses from start date
            </label>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Save Subscription</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
