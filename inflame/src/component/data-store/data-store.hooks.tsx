import {createContext} from "react";

type DataStoreContextType  = {
    clear: () => void
}

export const DataStoreContext = createContext<DataStoreContextType| undefined>(undefined)