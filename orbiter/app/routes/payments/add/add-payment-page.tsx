import { useRedirectIfUnauthenticated } from '~/hooks/useRedirectIfUnauthenticated';

export default function AddPaymentPage() {
  useRedirectIfUnauthenticated();

  return <div>AddPaymentPage works!</div>;
}
