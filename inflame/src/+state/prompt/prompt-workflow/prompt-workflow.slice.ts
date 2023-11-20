import {createEntityAdapter, createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {createPromptWorkflow, PromptWorkflow} from "./create-prompt-workflow.ts";
import {AbstractPromptNodeType} from "../prompt-nodes/prompt-node.ts";

type PromptWorkflowState = {
    workflow: PromptWorkflow,
    workflows: EntityState<PromptWorkflow>
}

const workflows = createEntityAdapter<PromptWorkflow>()

const INITIAL_STATE: PromptWorkflowState = {
    workflow: createPromptWorkflow({}),
    workflows: workflows.getInitialState()
}

export const promptWorkflowSliceName = "promptWorkflow"

export const promptWorkflowSlice = createSlice({
    name: promptWorkflowSliceName,
    initialState: INITIAL_STATE,
    reducers: {
        createWorkflow: (state, action: PayloadAction<AbstractPromptNodeType[]>) => {
            workflows.addOne(state.workflows, createPromptWorkflow({
                nodes: action.payload
            }))
        }
    },
    extraReducers: () => {
    }
})

