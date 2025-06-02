import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '~/contexts/auth-context';
import { registerUser } from '~/services/auth/auth.service';
import { isResultSuccess } from '~/types/result';
import { Button } from '../ui/button';
import InputText from '../ui/input-text';
import Surface from '../ui/surface';

export default function RegsiterForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userResult = await registerUser({ first_name: firstName, last_name: lastName, email, password });
      if (isResultSuccess(userResult)) {
        login(userResult.data);
        navigate('/');
      } else {
        throw new Error(userResult.error);
      }
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Surface classname="w-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-surface-text-500 mb-4 text-center text-xl font-semibold">Create an Account for Luunar</h2>
          <div className="flex gap-4">
            <div className="mb-4 flex-1">
              <label className="text-surface-text-500 mb-1 block text-sm font-medium" htmlFor="firstName">
                First Name
              </label>
              <InputText
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 flex-1">
              <label className="text-surface-text-500 mb-1 block text-sm font-medium" htmlFor="lastName">
                Last Name
              </label>
              <InputText
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-surface-text-500 mb-1 block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <InputText id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="text-surface-text-500 mb-1 block text-sm font-medium" htmlFor="password">
              Password
            </label>
            <InputText id="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-6">
            <label className="text-surface-text-500 mb-1 block text-sm font-medium" htmlFor="password">
              Confirm Password
            </label>
            <InputText
              id="password2"
              value={password2}
              type="password"
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Create Account
          </Button>
          <p className="text-surface-text-500 mt-4 text-center">
            Already have an account?{' '}
            <a href="/login" className="cursor-pointer text-accent-500 underline hover:text-accent-500/80 focus:outline-none">
              Sign in
            </a>
          </p>
        </form>
      </Surface>
    </div>
  );
}
