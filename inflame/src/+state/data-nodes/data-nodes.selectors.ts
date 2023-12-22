import {createSelector} from "@reduxjs/toolkit";
import {NodesSliceState} from "./data-nodes.slice.ts";
import { AppState } from "../inflame-store.ts";

const selectDataNodesState = (state: AppState): NodesSliceState => {
    return state.dataNodes
}

const selectDataNodes = createSelector(
    selectDataNodesState,
    (state) => Object.keys(state.nodes).length > 0 ? state.nodes : undefined
)

export const dataNodesSelectors = {
    selectDataNodes
}