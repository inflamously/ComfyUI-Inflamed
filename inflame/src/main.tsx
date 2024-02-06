import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {theme} from "./theme.tsx";
import {Provider} from "react-redux";
import {ChakraProvider} from "@chakra-ui/react";
import {RouterProvider} from "react-router-dom";
import {routerPaths} from "./routes/router.utils.ts";
import {RoutePathsContext} from "./routes/router.utils.ts";
import {Routing} from "./routes/router.tsx";
import {appStore} from "@inflame/state";

ReactDOM.createRoot(
    document.getElementById('root')!
).render(
    <React.StrictMode>
        <Provider store={appStore}>
            <ChakraProvider theme={theme}>
                <RoutePathsContext.Provider value={routerPaths()}>
                    <RouterProvider router={Routing.router} fallbackElement={<p>Loading...</p>}/>
                </RoutePathsContext.Provider>
            </ChakraProvider>
        </Provider>
    </React.StrictMode>,
)

