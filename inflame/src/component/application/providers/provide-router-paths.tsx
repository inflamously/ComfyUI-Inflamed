import {ReactNode} from "react";
import {RouterPathsContext, routerPaths} from "../../../routes/router.utils.ts";

export const ProvideRouterPaths = (props: {
    children: ReactNode
}) => {
    const {children} = props
    return <>
        <RouterPathsContext.Provider value={routerPaths()}>
            {children}
        </RouterPathsContext.Provider>
    </>
}