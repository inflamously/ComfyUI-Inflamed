import App from "./routes/app.tsx";
import PageDebug from "./routes/debug.tsx";
import {createBrowserRouter, RouteObject} from "react-router-dom";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "debug",
                element: <PageDebug/>
            }
        ]
    }
]

export default {
    routes,
    router: createBrowserRouter(routes),
}
