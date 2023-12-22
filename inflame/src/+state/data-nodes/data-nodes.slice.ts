import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {sortObjectByItsProperties} from "../../core/object.utils.ts";
import {AbstractDataNode} from "@inflame/models";

/**
 * This file defines the data nodes. They are used in or on prompt nodes which are used in a workflow.
 */

export type NodesSliceState = {
    nodes: Record<string, AbstractDataNode>,
}

const INITIAL_STATE: NodesSliceState = {
    nodes: {},
}

export const nodesSliceName = "dataNodes"

export const nodesSlice = createSlice({
    name: nodesSliceName,
    initialState: INITIAL_STATE,
    reducers: {
        updateDataNodeCollection: (state, action: PayloadAction<Record<string, AbstractDataNode>>) => {
            state.nodes = sortObjectByItsProperties(action.payload ?? {})
        },
    },
})

export const nodesSliceActions = {
    ...nodesSlice.actions
}