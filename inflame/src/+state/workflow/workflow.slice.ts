import {createEntityAdapter, createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {NewPromptWorkflow, PromptWorkflow} from "./nodes/workflow.model.ts";
import {AbstractPromptNode} from "./nodes/generic/node.ts";

type WorkflowState = {
    workflow: PromptWorkflow,
    workflows: EntityState<PromptWorkflow>
}

const workflows = createEntityAdapter<PromptWorkflow>()

const INITIAL_STATE: WorkflowState = {
    workflow: NewPromptWorkflow({}),
    workflows: workflows.getInitialState()
}


export const workflowSliceName = "workflow"

export const workflowSlice = createSlice({
    name: workflowSliceName,
    initialState: INITIAL_STATE,
    reducers: {
        createWorkflow: (state, action: PayloadAction<AbstractPromptNode[]>) => {
            workflows.addOne(state.workflows, NewPromptWorkflow({
                nodes: action.payload
            }))
        }
    },
    extraReducers: () => {
    }
})

