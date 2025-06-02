import { EllipsisVerticalIcon } from 'lucide-react';
import type { Client } from '~/services/clients/clients.model';

interface ClientListItemProps {
  client: Client;
}
export default function ClientListItem({ client }: ClientListItemProps) {
  return (
    <div
      key={client.id}
      className="flex cursor-pointer items-center justify-between rounded-sm border border-surface-border-500 bg-surface-500 px-4 py-3 hover:bg-surface-600"
    >
      <div className="flex flex-col">
        <span className="text-lg font-bold text-text-primary-500">{client.name}</span>
        <span className="text-sm text-text-primary-500">{client.email || 'No email'}</span>
        {client.phone && <span className="text-sm text-text-primary-500">{client.phone}</span>}
      </div>
      <div className="flex items-center gap-2">
        <EllipsisVerticalIcon className="text-text-primary-500" />
      </div>
    </div>
  );
}
