import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Calculator from "./components/calculadora";
import { Home } from "./pages/Home";



export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/", element: <Home />,
            },
            { path: "/calculadora", element: <Calculator /> },
        ],
    },
])