import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import './index.css'
import {ChakraProvider} from "@chakra-ui/react";
import {theme} from "./theme.tsx";
import {Provider} from "react-redux";
import inflameStore from "./+state/inflame-store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={inflameStore}>
            <ChakraProvider theme={theme}>
                <App/>
            </ChakraProvider>
        </Provider>
    </React.StrictMode>,
)
