import AddPaymentForm from '~/components/payments/add-payment-form';
import { useRedirectIfUnauthenticated } from '~/hooks/useRedirectIfUnauthenticated';

export default function AddIncomePage() {
  useRedirectIfUnauthenticated();

  return (
    <div>
      <AddPaymentForm />
    </div>
  );
}
