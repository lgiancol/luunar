import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Drawer } from '~/components/ui/drawer';
import { AddVendorForm } from '../add-vendor-form';
import { deleteVendor, updateVendor } from '~/services/vendors/vendors.service';
import type { Vendor } from '~/services/vendors/vendors.model';
import type { UpdateVendorDto } from '~/services/vendors/vendors.dto';

interface VendorListItemProps {
  vendor: Vendor;
  onUpdate: () => void;
}

export function VendorListItem({ vendor, onUpdate }: VendorListItemProps) {
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this vendor?')) {
      return;
    }

    try {
      setLoading(true);
      const result = await deleteVendor(vendor.id);
      
      if (result.success) {
        onUpdate();
      } else {
        alert('Failed to delete vendor: ' + result.error);
      }
    } catch (err) {
      alert('Failed to delete vendor: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleEditSuccess = () => {
    setIsEditDrawerOpen(false);
    onUpdate();
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {vendor.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {vendor.email || '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {vendor.phone || '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(vendor.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex gap-2 justify-end">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsEditDrawerOpen(true)}
            disabled={loading}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </td>
    </tr>
  );
} 