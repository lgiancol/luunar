import { useState, useEffect } from 'react';
import { useRecentVendors } from '~/hooks/vendors/useRecentVendors';
import type { Vendor } from '~/services/vendors/vendors.model';

interface VendorSelectorProps {
  value?: string;
  onChange: (vendorId: string) => void;
  placeholder?: string;
  className?: string;
}

export function VendorSelector({ value, onChange, placeholder = 'Select vendor...', className = '' }: VendorSelectorProps) {
  const { vendors, loading } = useRecentVendors(50);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  useEffect(() => {
    if (value && vendors?.data) {
      const vendor = vendors.data.find(v => v.id === value);
      setSelectedVendor(vendor || null);
    } else {
      setSelectedVendor(null);
    }
  }, [value, vendors]);

  const handleVendorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const vendorId = e.target.value;
    onChange(vendorId);
  };

  if (loading) {
    return <div className={`animate-pulse bg-gray-200 h-10 rounded ${className}`} />;
  }

  return (
    <select
      value={value || ''}
      onChange={handleVendorChange}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    >
      <option value="">{placeholder}</option>
      {vendors?.data.map((vendor) => (
        <option key={vendor.id} value={vendor.id}>
          {vendor.name}
        </option>
      ))}
    </select>
  );
} 