import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";

interface RouteObject {
    path: string;
    element: React.ReactNode;
    errorElement?: React.ReactNode;
}

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
    }
];

const router = createBrowserRouter(routes);

export default router;