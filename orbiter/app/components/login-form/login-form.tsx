import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '~/contexts/auth-context';
import { loginUser } from '~/services/auth/auth.service';
import { isResultSuccess } from '~/types/result';
import { Button } from '../ui/button';
import InputText from '../ui/input-text';
import Surface from '../ui/surface';

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userResult = await loginUser({ email, password });
      if (isResultSuccess(userResult)) {
        login(userResult.data);
        navigate('/');
      } else {
        throw new Error(userResult.error);
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Surface classname="w-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-surface-text-500 mb-4 text-center text-xl font-semibold">Login to Luunar</h2>
          <div className="mb-4">
            <label className="text-surface-text-500 mb-1 block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <InputText id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-6">
            <label className="text-surface-text-500 mb-1 block text-sm font-medium" htmlFor="password">
              Password
            </label>
            <InputText id="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
          </div>

          <Button type="submit" className='w-full'>Log In</Button>
          <p className="text-surface-text-500 mt-4 text-center">
            Don&apos;t have an account?{' '}
            <a
              href="/register"
              className="cursor-pointer text-accent-500 underline hover:text-accent-500/80 focus:outline-none"
            >
              Sign up
            </a>
          </p>
        </form>
      </Surface>
    </div>
  );
}
