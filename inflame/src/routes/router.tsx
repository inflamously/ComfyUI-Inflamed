import {createBrowserRouter, RouteObject} from "react-router-dom";
import {PageApp} from "./app.page.tsx";
import {PageDebug} from "./debug.page.tsx";
import {PagePromptEditor} from "./prompt-editor.page.tsx";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <PageApp/>,
        children: [
            {
                path: "debug",
                element: <PageDebug/>
            }, {
                path: "editor",
                element: <PagePromptEditor/>
            }
        ]
    }
]

export const Routing = {
    routes,
    router: createBrowserRouter(routes),
}
