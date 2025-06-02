import AddClientForm from '~/components/clients/add-client-form';
import { useRedirectIfUnauthenticated } from '~/hooks/useRedirectIfUnauthenticated';

export default function AddClientPage() {
  useRedirectIfUnauthenticated();

  return (
    <div>
      <AddClientForm />
    </div>
  );
}
