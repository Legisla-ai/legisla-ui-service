import { createBrowserRouter } from "react-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";

interface RouteObject {
    path: string;
    element: React.ReactNode;
    errorElement?: React.ReactNode;
}

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    }
];

const router = createBrowserRouter(routes);

export default router;