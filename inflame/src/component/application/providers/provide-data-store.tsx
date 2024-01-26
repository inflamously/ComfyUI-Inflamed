import {ReactNode, useCallback} from "react";
import {useAppDispatch} from "@inflame/state";
import {dataStoreActions} from "../../../+state/data-store/data-store.ts";
import { DataStoreContext } from "../../data-store/data-store.hooks.tsx";

export const ProvideDataStore = (props: {
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