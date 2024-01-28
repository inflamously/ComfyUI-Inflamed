import {createSelector} from "@reduxjs/toolkit";
import {DataNodesSliceState} from "./data-nodes.slice.ts";
import { AppState } from "../inflame-store.ts";

const selectDataNodesState = (state: AppState): DataNodesSliceState => {
    return state.dataNodes
}

const selectDataNodes = createSelector(
    selectDataNodesState,
    (state) => Object.keys(state.nodes).length > 0 ? state.nodes : undefined
)

const selectDataNode = createSelector(
    [
        selectDataNodesState,
        (_: AppState, classtype: string) => classtype
    ],
    (state: DataNodesSliceState, classtype: string) => state.nodes[classtype]
)

export const dataNodesSelectors = {
    selectDataNodes,
    selectDataNode,
}