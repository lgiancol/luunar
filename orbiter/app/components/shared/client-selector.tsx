import { useMemo } from 'react';
import type { Client } from '~/services/clients/clients.model';
import { Button } from '../ui/button';
import InputText from '../ui/input-text';
import DataSelector from './data-selector';

interface ClientSelectorProps {
  selectedClient?: Client;
  recentClients?: Client[];
  filteredClients?: Client[];
  loadNextPage?: () => void;
  onSelect?: (client?: Client) => void;
}
export default function ClientSelector({
  selectedClient,
  recentClients,
  filteredClients,
  loadNextPage,
  onSelect,
}: ClientSelectorProps) {
  const clients = useMemo(() => {
    const clients = filteredClients ? filteredClients : recentClients;
    return {
      data: clients,
      label: !filteredClients ? 'Recent' : null,
    };
  }, [recentClients, filteredClients]);

  return (
    <DataSelector dataId="id" recentList={recentClients} selectedEntry={selectedClient} onSelect={onSelect}>
      <DataSelector.SelectedItem>
        {(selectedClient: Client) => (
          <div className="flex items-baseline gap-1 text-left">
            <p className="font-bold">{selectedClient.name}</p>
            <p className="text-xs text-text-primary-300">({selectedClient.email})</p>
          </div>
        )}
      </DataSelector.SelectedItem>

      <DataSelector.SearchInput>
        <InputText placeholder="Search for clients..." className="text-sm" />
      </DataSelector.SearchInput>

      <DataSelector.Item>{(client: Client) => <div key={client.id}>{client.name}</div>}</DataSelector.Item>
    </DataSelector>
  );
}
