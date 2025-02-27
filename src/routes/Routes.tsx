import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { DefaultLayout } from '@/layouts/DefaultLayout';
import { NoHeaderLayout } from '@/layouts/NoHeaderLayout';
import Home from '@/pages/Home';
import Repositorio from '@/pages/Repositorio.tsx';
import SignUp from '@/pages/SignUp';
import SignIn from '@/pages/SignIn';

const routes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'repositorio',
        element: <Repositorio />,
      },
    ],
  },
  {
    element: <NoHeaderLayout />,
    children: [
      {
        path: 'register',
        element: <SignUp />,
      },
      {
        path: 'login',
        element: <SignIn />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
