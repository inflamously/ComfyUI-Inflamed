import {createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {socketEntityAdapter} from "./socket-entity.ts";
import {GenericSocket} from "@inflame/models";

export type SocketSliceState = {
    items: EntityState<GenericSocket, string>,
    events: {
        [socketId: string]: Record<string, unknown>[]
    }
}

const INITIAL_STATE: SocketSliceState = {
    items: socketEntityAdapter.getInitialState(),
    events: {}
}

export const socketSlice = createSlice({
    name: 'sockets',
    initialState: INITIAL_STATE,
    reducers: {
        createSocket: (state, action: PayloadAction<GenericSocket>) => {
            socketEntityAdapter.addOne(state.items, action.payload)
        },
    },
})

export const socketSliceActions = {
    ...socketSlice.actions,
};