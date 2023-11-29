import {createSlice} from "@reduxjs/toolkit";

export type AppConfigState = {
    state: 'LOADING' | 'READY'
}

const INITIAL_STATE = {
    state: 'LOADING'
} satisfies AppConfigState

export const appConfigSliceName = "appConfig";

export const appConfigSlice = createSlice({
    name: appConfigSliceName,
    initialState: INITIAL_STATE,
    reducers: {}
})

export const appConfigActions = {
    ...appConfigSlice.actions
};