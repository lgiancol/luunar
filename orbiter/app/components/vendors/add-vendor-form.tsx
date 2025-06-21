import { useState } from 'react';
import { Button } from '~/components/ui/button';
import InputText from '~/components/ui/input-text';
import InputTextarea from '~/components/ui/input-textarea';
import { addVendor } from '~/services/vendors/vendors.service';
import type { CreateVendorDto } from '~/services/vendors/vendors.dto';
import type { Vendor } from '~/services/vendors/vendors.model';

interface AddVendorFormProps {
  onSuccess?: (vendor: Vendor) => void;
  onCancel?: () => void;
}

export function AddVendorForm({ onSuccess, onCancel }: AddVendorFormProps) {
  const [formData, setFormData] = useState<CreateVendorDto>({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Vendor name is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await addVendor(formData);
      
      if (result.success) {
        onSuccess?.(result.data);
        setFormData({ name: '', email: '', phone: '', notes: '' });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add vendor');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateVendorDto, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Vendor Name *
        </label>
        <InputText
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Enter vendor name"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <InputText
          id="email"
          type="email"
          value={formData.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Enter email address"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <InputText
          id="phone"
          value={formData.phone || ''}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          placeholder="Enter phone number"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <InputTextarea
          id="notes"
          defaultValue={formData.notes || ''}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          rows={3}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Vendor'}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
} 