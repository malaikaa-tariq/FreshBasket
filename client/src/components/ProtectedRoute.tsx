import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export function ProtectedRoute({ children }: PropsWithChildren) {
  const { user } = useAppSelector((state) => state.auth);
  return user ? children : <Navigate to="/login" replace />;
}

export function AdminRoute({ children }: PropsWithChildren) {
  const { user } = useAppSelector((state) => state.auth);
  return user?.role === 'admin' ? children : <Navigate to="/" replace />;
}
