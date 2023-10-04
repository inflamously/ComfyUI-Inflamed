import {AppState} from "../inflame-store.ts";
import {createSelector} from "@reduxjs/toolkit";
import {NodesSliceState} from "./nodes.slice.ts";

export const selectNodeSlice = (state: AppState | NodesSliceState): NodesSliceState => {
    return "nodes" in state ? state.nodes : state;
}

export const selectDataNodes = createSelector(selectNodeSlice, (state) => {
    return state.dataNodes
})