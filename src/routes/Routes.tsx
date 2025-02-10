import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Home from '@/pages/Home';
import App from '@/App';
import Signup from '@/pages/SignUp';

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
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
