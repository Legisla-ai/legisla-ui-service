import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Home from '@/pages/Home';
import Chat from '@/pages/Chat';
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
      {
        path: 'chat',
        element: <Chat />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
