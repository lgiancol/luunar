import RegsiterForm from '~/components/register-form/register-form';
import { useRedirectIfAuthenticated } from '~/hooks/useRedirectIfAuthenticated';
import type { Route } from './+types/login';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Luunar | Register' }, { name: 'description', content: 'Create an account for Luunar' }];
}

export default function Register() {
  useRedirectIfAuthenticated();

  return (
    <>
      <div>
        <RegsiterForm />
      </div>
    </>
  );
}
