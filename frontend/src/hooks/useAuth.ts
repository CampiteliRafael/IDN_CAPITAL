import {
  clearError,
  loginThunk,
  logoutThunk,
  registerThunk,
  useAppDispatch,
  useAppSelector,
} from '@/lib/store';
import type { LoginDto, RegisterDto } from '@/lib/validations/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login: (credentials: LoginDto) => dispatch(loginThunk(credentials)),
    register: (data: RegisterDto) => dispatch(registerThunk(data)),
    logout: () => dispatch(logoutThunk()),
    clearError: () => dispatch(clearError()),
  };
}

export function useRequireAuth(redirectTo = '/dashboard') {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.push(redirectTo);
  }, [isAuthenticated, router, redirectTo]);
  return { isAuthenticated };
}
