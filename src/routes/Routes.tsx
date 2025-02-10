import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Home from '@/pages/Home';
import App from '@/App';
import Signup from '@/pages/SignUp';
import SignIn from '@/pages/SignIn';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'register',
        element: <Signup />,
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
