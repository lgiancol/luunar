import { PlusIcon } from 'lucide-react';
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

  const goToAddNewClientPage = () => {
    console.log('Go to add new client page');
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-2">
          <div className="text-2xl font-semibold text-background-text-500">
            <h2 className="text-text-primary-500">Clients</h2>
          </div>

          <div>
            <Button
              variant="outline"
              onClick={() => {
                goToAddNewClientPage();
              }}
            >
              <PlusIcon />
              Add Client
            </Button>
          </div>
        </div>
        <ClientList page={clientsPage} />
      </div>
    </div>
  );
}
