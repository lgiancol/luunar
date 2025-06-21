import { useState } from 'react';
import { useRecentVendors } from '~/hooks/vendors/useRecentVendors';
import type { Vendor } from '~/services/vendors/vendors.model';
import DataSelector from './data-selector';

interface VendorSelectorProps {
  selectedVendor?: Vendor;
  recentVendors?: Vendor[];
  onSelect?: (vendor?: Vendor) => void;
  placeholder?: string;
  className?: string;
  onAddVendor?: () => void;
}

export function VendorSelector({ 
  selectedVendor,
  recentVendors,
  onSelect,
  placeholder = 'Select vendor...', 
  className = '',
  onAddVendor
}: VendorSelectorProps) {
  const { vendors, loading } = useRecentVendors(50);
  
  // Use provided vendors or fall back to hook data
  const vendorsData = recentVendors || vendors?.data;

  const handleVendorSelect = (vendor?: Vendor) => {
    onSelect?.(vendor);
  };

  if (loading) {
    return <div className={`animate-pulse bg-gray-200 h-10 rounded ${className}`} />;
  }

  return (
    <DataSelector
      dataType="vendor"
      dataId="id"
      selectedEntry={selectedVendor}
      recentList={vendorsData}
      onSelect={handleVendorSelect}
      onAddItem={onAddVendor}
      showAdd={!!onAddVendor}
    >
      <DataSelector.SelectedItem>
        {(vendor: Vendor) => <div>{vendor.name}</div>}
      </DataSelector.SelectedItem>
      <DataSelector.Item>{(vendor: Vendor) => <div>{vendor.name}</div>}</DataSelector.Item>
    </DataSelector>
  );
} 