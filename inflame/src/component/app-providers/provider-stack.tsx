import {ProvideDataStore} from "./provide-data-store.tsx";
import {ReactNode} from "react";
import {AppSocket} from "@inflame/models";
import {ProvideAppSocket} from "./provide-socket-listener.tsx";

const ProviderStack = (props: {
    children: ReactNode,
    value: {
        socket: AppSocket,
    }
}) => {
    const {children, value} = props

    return <ProvideDataStore>
        <ProvideAppSocket value={value.socket}>
            {children}
        </ProvideAppSocket>
    </ProvideDataStore>
}

export default ProviderStack