import { VendorList } from '~/components/vendors/vendor-list/vendor-list';
import { useRedirectIfUnauthenticated } from '~/hooks/useRedirectIfUnauthenticated';

export default function VendorsPage() {
  useRedirectIfUnauthenticated();

  return (
    <div className="container mx-auto py-6">
      <VendorList />
    </div>
  );
} 