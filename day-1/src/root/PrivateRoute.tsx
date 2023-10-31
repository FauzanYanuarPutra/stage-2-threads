import { Navigate, Outlet, useLoaderData } from 'react-router-dom';

export function PrivateRoute() {
  const { token, user }: any = useLoaderData();

  if (!user && token.message == 'Unauthorized') {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export function PublicRoute() {
  const { token, user }: any = useLoaderData();

  if (token.message !== 'Unauthorized' && user) {
    return <Navigate to="/" />;
  }

  return <Outlet />
}
