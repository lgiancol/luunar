import { useState } from 'react';
import { Button } from '~/components/ui/button';
import InputText from '../ui/input-text';
import InputNumber from '../ui/input-number';
import { Checkbox } from '../ui/checkbox';

interface AddSubscriptionFormProps {
  onSuccess: () => void;
}

export function AddSubscriptionForm({ onSuccess }: AddSubscriptionFormProps) {
  const [form, setForm] = useState({
    name: '',
    amount: 0,
    frequency: '',
    startDate: '',
    endDate: '',
    isActive: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add API call
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
            <label className="mb-1 block text-sm font-medium">Frequency</label>
            <InputText
              id="frequency"
              type="text"
              value={form.frequency}
              onChange={(e) => setForm((prev) => ({ ...prev, frequency: e.target.value }))}
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
              id="isActive"
              checked={form.isActive}
              onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isActive: !!checked }))}
            />
            <label htmlFor="isActive" className="text-sm font-medium">
              Active
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
