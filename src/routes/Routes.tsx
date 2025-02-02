import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Chat from "@/pages/Chat";
import App from "@/App"; // Importando o layout principal

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />, // App é o layout principal
        children: [
            {
                index: true, // Define Home como padrão em "/"
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "chat",
                element: <Chat />,
            }
        ]
    }
];

const router = createBrowserRouter(routes);

export default router;
