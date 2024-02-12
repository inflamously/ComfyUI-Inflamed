import {ProvideDataStore} from "./provide-data-store.tsx";
import {ReactNode} from "react";
import {AppSocket} from "@inflame/models";
import {ProvideAppSocket} from "./provide-socket-listener.tsx";
import {ProvideRouterPaths} from "./provide-router-paths.tsx";

/**
 * Component for providing custom providers to its children.
 **/
const ProviderStack = (props: {
    children: ReactNode,
    value: {
        socket: AppSocket,
    }
}) => {
    const {children, value} = props

    return <ProvideDataStore>
        <ProvideAppSocket value={value.socket}>
            <ProvideRouterPaths>
                {children}
            </ProvideRouterPaths>
        </ProvideAppSocket>
    </ProvideDataStore>
}

export default ProviderStack