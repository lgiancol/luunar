import { useMemo } from 'react';
import type { Client } from '~/services/clients/clients.model';
import DataSelector from './data-selector';

interface ClientSelectorProps {
  selectedClient?: Client;
  recentClients?: Client[];
  filteredClients?: Client[];
  loadNextPage?: () => void;
  onSelect?: (client?: Client) => void;
  onAddClient?: () => void;
}
export default function ClientSelector({
  selectedClient,
  recentClients,
  filteredClients,
  loadNextPage,
  onSelect,
  onAddClient,
}: ClientSelectorProps) {
  const clients = useMemo(() => {
    const clients = filteredClients ? filteredClients : recentClients;
    return {
      data: clients,
      label: !filteredClients ? 'Recent' : null,
    };
  }, [recentClients, filteredClients]);

  return (
    <DataSelector
      dataId="id"
      dataType="clients"
      recentList={recentClients}
      selectedEntry={selectedClient}
      onSelect={onSelect}
      onAddItem={onAddClient}
    >
      <DataSelector.SelectedItem>
        {(selectedClient: Client) => (
          <div className="flex items-baseline gap-1 text-left">
            <p className="font-bold">{selectedClient.name}</p>
            <p className="text-xs text-text-primary-300">({selectedClient.email})</p>
          </div>
        )}
      </DataSelector.SelectedItem>

      <DataSelector.Item>{(client: Client) => <div>{client.name}</div>}</DataSelector.Item>
    </DataSelector>
  );
}
