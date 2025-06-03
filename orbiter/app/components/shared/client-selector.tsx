import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { Client } from '~/services/clients/clients.model';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface ClientSelectorProps {
  clients: Client[] | undefined;
  loadNextPage?: () => void;
}
export default function ClientSelector({ clients, loadNextPage }: ClientSelectorProps) {
  const [showList, setShowList] = useState<boolean>(false);

  return (
    <div id="clientSelector" className="relative flex flex-col gap-1">
      <Popover open={showList} onOpenChange={setShowList} modal>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="w-full justify-between border border-surface-border-500">
            Select a client
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
                {/* <div>
                  <InputText placeholder="Search for clients..." className="text-sm" />
                </div> */}
                <div>LIST</div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
