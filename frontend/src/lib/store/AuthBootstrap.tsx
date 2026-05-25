'use client';

import { useEffect } from 'react';
import { fetchCurrentUserThunk, useAppDispatch, useAppSelector } from '@/lib/store';

export default function AuthBootstrap() {
  const dispatch = useAppDispatch();
  const authResolved = useAppSelector((state) => state.auth.authResolved);

  useEffect(() => {
    if (!authResolved) {
      dispatch(fetchCurrentUserThunk());
    }
  }, [authResolved, dispatch]);

  return null;
}
