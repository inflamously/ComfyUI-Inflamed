import {DataStoreContext} from "../data-store/data-store.hooks.tsx";
import {ReactNode, useCallback} from "react";
import {useAppDispatch} from "@inflame/state";
import {dataStoreActions} from "../../+state/data-store/data-store.ts";

export const DataStoreProvider = (props: {
    children?: ReactNode
}) => {
    const dispatch = useAppDispatch()
    const clearHandler = useCallback(() => {
        dispatch(dataStoreActions.clear())
    }, [dispatch])

    const {children} = props
    return <DataStoreContext.Provider value={{
        clear: clearHandler
    }}>
        {children}
    </DataStoreContext.Provider>
}