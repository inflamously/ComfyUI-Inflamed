import {AppState} from "../inflame-store.ts";
import {createSelector} from "@reduxjs/toolkit";
import {NodesSliceState} from "./data-nodes.slice.ts";

const selectDataNodesState = (state: AppState): NodesSliceState => {
    return state.dataNodes
}

const selectNodes = createSelector(
    selectDataNodesState,
    (state) => state.nodes
)

export const dataNodesSelectors = {
    selectDataNodesState,
    selectNodes,
}