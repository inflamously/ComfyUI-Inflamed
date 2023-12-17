import {createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {socketEntityAdapter} from "./socket-entity.ts";
import {GenericSocket} from "./socket.model.ts";

export type SocketSliceState = {
    items: EntityState<GenericSocket>,
    events: {
        [socketId: string]: Record<string, unknown>[]
    }
}

const INITIAL_STATE: SocketSliceState = {
    items: socketEntityAdapter.getInitialState(),
    events: {}
}

export const socketSliceName = "sockets"

export const socketSlice = createSlice({
    name: socketSliceName,
    initialState: INITIAL_STATE,
    reducers: {
        createSocket: (state, action: PayloadAction<GenericSocket>) => {
            socketEntityAdapter.addOne(state.items, action.payload)
        },
    },
    extraReducers: () => {}
})

export const socketSliceActions = {
    ...socketSlice.actions,
};