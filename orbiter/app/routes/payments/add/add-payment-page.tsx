import AddPaymentForm from '~/components/payments/add-payment-form';
import { useRedirectIfUnauthenticated } from '~/hooks/useRedirectIfUnauthenticated';

export default function AddPaymentPage() {
  useRedirectIfUnauthenticated();

  return (
    <div>
      <AddPaymentForm />
    </div>
  );
}
