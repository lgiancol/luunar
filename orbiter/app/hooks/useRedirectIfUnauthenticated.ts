import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/contexts/auth-context';

export function useRedirectIfUnauthenticated(redirectTo = '/login') {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (user === null) navigate(redirectTo);
  }, [user, loading]);
}
