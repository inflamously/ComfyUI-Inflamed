import {ReactNode} from "react";
import {AppSocket} from "@inflame/models";
import { AppSocketContext } from "../../socket/websocket";


export const ProvideAppSocket = (props: {
    value: AppSocket,
    children?: ReactNode,
}) => {
    const {children, value} = props
    return <AppSocketContext.Provider value={value}>
        {children}
    </AppSocketContext.Provider>
}