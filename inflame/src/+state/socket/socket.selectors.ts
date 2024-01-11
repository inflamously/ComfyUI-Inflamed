import {socketEntityAdapter} from "./socket-entity.ts";
import {createSelector} from "@reduxjs/toolkit";
import {SocketSliceState} from "./socket-slice.ts";
import {AppState} from "../inflame-store.ts";

// Selects the proper slice
const selectSocketState = (state: AppState) => state.sockets

const socketEntityAdapterSelectors = socketEntityAdapter.getSelectors<SocketSliceState>((state) => state.items);

const selectSocketById = createSelector(
    [
        selectSocketState,
        (_: AppState, socketName: string) => socketName,
    ],
    socketEntityAdapterSelectors.selectById
)

export const socketStateSelectors = {
    selectSocketById,
}