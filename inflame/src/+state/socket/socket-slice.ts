import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {ComfyuiSocket} from "./comfyui-socket.model.ts";

export const socketAdapter = createEntityAdapter<ComfyuiSocket>({
    selectId: (state) => state.name,
})

export const socketSliceName = "sockets"

export const socketSlice = createSlice({
    name: socketSliceName,
    initialState: socketAdapter.getInitialState(),
    reducers: {
        createSocketState: socketAdapter.addOne
    },
    extraReducers: () => {}
})

export const socketSliceActions = {
    ...socketSlice.actions
};