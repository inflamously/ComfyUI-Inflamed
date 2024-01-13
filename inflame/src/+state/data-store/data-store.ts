import {createListenerPreparedAction} from "../action.utils.ts";
import {subscribeToStoreChange} from "../inflame-store.listener.ts";
import {EnhancedStore} from "@reduxjs/toolkit";
import {AppState} from "../inflame-store.ts";

const initialize = createListenerPreparedAction(
    "dataStore/initialize",
    (payload: Partial<AppState>) => {
        return {
            payload,
        }
    }
)

const save = createListenerPreparedAction(
    'dataStore/save',
    (payload: Partial<AppState>) => {
        return {
            payload
        }
    }
)

const clear = createListenerPreparedAction('dataStore/delete', () => {
    return {
        payload: undefined
    }
})

export const dataStoreActions = {
    initialize,
    save,
    clear
}

export const subscribeToSyncStoreDataChanges = (store: EnhancedStore) => {
    const localDataStoreConfig: {
        name: string,
    } = {
        name: "inflame-data-store",
    }

    const loadData = (): AppState => JSON.parse(localStorage.getItem(localDataStoreConfig.name) ?? "")

    const savePartialData = (nextData: Partial<AppState>) => {
        const prevData: Record<string, unknown> = loadData()

        for (const key of Object.keys(nextData)) {
            prevData[key as keyof AppState] = nextData[key as keyof Partial<AppState>]
        }

        localStorage.setItem(localDataStoreConfig.name, JSON.stringify(prevData))
    }

    // Set empty data-store if none exist
    if (!localStorage.getItem(localDataStoreConfig.name)) {
        localStorage.setItem(localDataStoreConfig.name, JSON.stringify({}))
    } else {
        store.dispatch(initialize(loadData()))
    }


    subscribeToStoreChange(save, (action) => {
        const {payload} = action

        if (!payload) {
            console.error("Invalid data cannot be saved")
        }

        savePartialData(payload!)
    })
}