import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";

type ComfyuiSocketState = {
    name: string,
    clientId: string
}

export const socketAdapter = createEntityAdapter<ComfyuiSocketState>({
    selectId: (state) => state.name,
})

export const socketSliceName = "comfyuiSocket"

export const socketSlice = createSlice({
    name: socketSliceName,
    initialState: socketAdapter.getInitialState(),
    reducers: {
        createSocketState: socketAdapter.addOne
    },
    extraReducers: () => {}
})

export const socketSliceActions = socketSlice.actions;