import {AppState} from "../inflame-store.ts";
import {socketEntityAdapter} from "./socket-entity.ts";
import {createSelector} from "@reduxjs/toolkit";
import {SocketSliceState} from "./socket-slice.ts";

// Selects the proper slice
const selectSocketState = (state: AppState) => state.sockets

const socketEntityAdapterSelectors = socketEntityAdapter.getSelectors<AppState>((state) => state.items);

const selectSocketById = createSelector(
    [
        selectSocketState,
        (_: SocketSliceState, socketName: string) => socketName,
    ],
    socketEntityAdapterSelectors.selectById
)

export const socketStateSelectors = {
    selectSocketById,
}