import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AbstractDataNode} from "./data-node.model.ts";
import {sortObjectByItsProperties} from "../../utils/object.utils.ts";

/**
 * This file defines the data nodes. They are used in or on prompt nodes which are used in a workflow.
 */

export type NodesSliceState = {
    dataNodes: Record<string, AbstractDataNode>,
}

const INITIAL_STATE: NodesSliceState = {
    dataNodes: {},
}

export const nodesSliceName = "nodes"

// TODO: Rename?
export const nodesSlice = createSlice({
    name: nodesSliceName,
    initialState: INITIAL_STATE,
    reducers: {
        updateDataNodeCollection:
            (state, action: PayloadAction<Record<string, AbstractDataNode>>) => {
                let nodes = action.payload ?? {}
                nodes = sortObjectByItsProperties(nodes)
                state.dataNodes = nodes
            },
    },
})

export const nodeSliceActions = {
    ...nodesSlice.actions
}