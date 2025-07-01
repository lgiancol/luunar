import { useEffect, useState } from 'react';
import { VendorSelector } from '~/components/shared/vendor-selector';
import { Button } from '~/components/ui/button';
import { useRecentVendors } from '~/hooks/vendors/useRecentVendors';
import { addSubscription } from '~/services/subscriptions/subscriptions.service';
import { isResultError } from '~/types/result';
import InputNumber from '../../ui/input-number';
import InputText from '../../ui/input-text';
import InputTextarea from '../../ui/input-textarea';
import type { Vendor } from '~/services/vendors/vendors.model';

interface AddSubscriptionFormProps {
  onSuccess: () => void;
  onAddVendor?: () => void;
  selectedVendor?: Vendor;
  recentVendors?: Vendor[];
  vendorsLoading?: boolean;
}

export function AddSubscriptionForm({
  onSuccess,
  onAddVendor,
  selectedVendor,
  recentVendors,
  vendorsLoading,
}: AddSubscriptionFormProps) {
  const [form, setForm] = useState({
    name: '',
    amount: 0,
    vendorId: '',
    frequency: '',
    interval: 1,
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
  });

  useEffect(() => {
    if (selectedVendor) {
      setForm((prev) => ({ ...prev, vendorId: selectedVendor.id }));
    }
  }, [selectedVendor]);

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
      paymentAccountId: '',
      lastProcessed: null,
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
            <label className="mb-1 block text-sm font-medium">Vendor</label>
            <VendorSelector
              selectedVendor={selectedVendor}
              recentVendors={recentVendors}
              loading={vendorsLoading}
              onSelect={(vendor) => setForm((prev) => ({ ...prev, vendorId: vendor?.id || '' }))}
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
          <div className="flex justify-end">
            <Button type="submit">Save Subscription</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
