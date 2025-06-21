import type { Vendor } from '~/services/vendors/vendors.model';
import DataSelector from './data-selector';

interface VendorSelectorProps {
  selectedVendor?: Vendor;
  recentVendors?: Vendor[];
  onSelect?: (vendor?: Vendor) => void;
  className?: string;
  onAddVendor?: () => void;
  loading?: boolean;
}

export function VendorSelector({ 
  selectedVendor,
  recentVendors,
  onSelect,
  className = '',
  onAddVendor,
  loading = false
}: VendorSelectorProps) {
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
      recentList={recentVendors}
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