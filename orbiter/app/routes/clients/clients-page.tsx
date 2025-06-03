import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router';
import ClientList from '~/components/clients/client-list/client-list';
import { Button } from '~/components/ui/button';
import { usePaginatedClients } from '~/hooks/clients/usePaginatedClients';
import { useRedirectIfUnauthenticated } from '~/hooks/useRedirectIfUnauthenticated';

export default function ClientsPage() {
  useRedirectIfUnauthenticated();
  const { clientsPage, loading } = usePaginatedClients({ page: 1, pageSize: 5 });

  if (loading) {
    return (
      <div>
        <p className="text-background-text-500">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-2">
          <div className="text-2xl font-semibold text-background-text-500">
            <h2 className="text-text-primary-500">Clients</h2>
          </div>

          <div>
            <Link to="/clients/add">
              <Button variant="outline">
                <PlusIcon />
                Add Client
              </Button>
            </Link>
          </div>
        </div>
        <ClientList page={clientsPage} />
      </div>
    </div>
  );
}
