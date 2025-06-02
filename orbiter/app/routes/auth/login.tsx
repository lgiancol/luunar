import LoginForm from '~/components/login-form/login-form';
import { useRedirectIfAuthenticated } from '~/hooks/useRedirectIfAuthenticated';
import type { Route } from './+types/login';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Luunar | Login' }, { name: 'description', content: 'Login to Luunar' }];
}

export default function Login() {
  useRedirectIfAuthenticated();

  return (
    <>
      <div>
        <LoginForm />
      </div>
    </>
  );
}
