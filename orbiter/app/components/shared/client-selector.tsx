import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import type { Client } from '~/services/clients/clients.model';
import { Button } from '../ui/button';
import InputText from '../ui/input-text';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

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
  const [showList, setShowList] = useState<boolean>(false);
  const clients = useMemo(() => {
    const clients = filteredClients ? filteredClients : recentClients;
    return {
      data: clients,
      label: !filteredClients ? 'Recent' : null,
    };
  }, [recentClients, filteredClients]);

  const handleClientClick = useCallback(
    (client?: Client) => {
      if (onSelect) {
        onSelect(client);
      }

      setShowList(false);
    },
    [selectedClient, onSelect]
  );

  return (
    <div id="clientSelector" className="relative flex flex-col gap-1">
      <Popover open={showList} onOpenChange={setShowList} modal>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="h-auto w-full justify-between border border-surface-border-500">
            {selectedClient ? (
              <div className="flex items-baseline gap-1 text-left">
                <p className="font-bold">{selectedClient.name}</p>
                <p className="text-xs text-text-primary-300">({selectedClient.email})</p>
              </div>
            ) : (
              <div>Find or add a client...</div>
            )}
            <ChevronDown className={clsx({ '-rotate-180': showList })} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={clsx('PopoverContent', { hidden: !showList })}
          container={document.getElementById('clientSelector')}
        >
          <div className="w-full">
            <div className="rounded-md">
              <div className="flex flex-col gap-2">
                <div>
                  <InputText placeholder="Search for clients..." className="text-sm" />
                </div>

                <div>
                  <div className="flex flex-col gap-1">
                    {clients.label && <div className="text-sm font-bold">{clients.label}</div>}
                    {clients.data?.map((client) => (
                      <div>
                        <Button
                          key={client.id}
                          variant="ghost"
                          className="h-auto w-full justify-start rounded-xs px-2 py-1 hover:bg-primary-400"
                          onClick={() => handleClientClick(client)}
                        >
                          {client.name}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
