import {ReactNode} from "react";
import {AppSocketContext} from "../socket/websocket.tsx";
import {AppSocket} from "@inflame/models";


export const ProvideAppSocket = (props: {
    value: AppSocket,
    children?: ReactNode,
}) => {
    const {children, value} = props
    return <AppSocketContext.Provider value={value}>
        {children}
    </AppSocketContext.Provider>
}