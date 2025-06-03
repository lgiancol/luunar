import type { Client } from '~/services/clients/clients.model';

interface ClientSelectorProps {
  clients: Client[];
  loadNextPage: () => void;
}
export default function ClientSelector({ clients, loadNextPage }: ClientSelectorProps) {
  return <div>ClientSelector works!</div>;
}
