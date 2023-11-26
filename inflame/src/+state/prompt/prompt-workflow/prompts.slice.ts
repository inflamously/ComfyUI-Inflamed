import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Prompt, PromptData} from "../prompt.model.ts";
import {PromptsEntity, promptsEntityAdapter} from "./prompts.entity.ts";

export type PromptState = {
    // workflow: PromptWorkflow,
    // workflows: EntityState<PromptWorkflow>
    entities: PromptsEntity
}


const INITIAL_STATE: PromptState = {
    entities: promptsEntityAdapter.getInitialState(),
}

export const promptsSliceName = "prompts"

export const promptsSlice = createSlice({
    name: promptsSliceName,
    initialState: INITIAL_STATE,
    reducers: {
        createPrompt: (state, action: PayloadAction<Prompt>) => {
            const { payload } = action
            const promptStored = {
                workflow: payload.workflow.getNodes()
            } satisfies PromptData
            promptsEntityAdapter.addOne(state.entities, promptStored)
        },
        // createWorkflow: (state, action: PayloadAction<AbstractPromptNodeType[]>) => {
        //     workflows.addOne(state.workflows, createPromptWorkflow({
        //         nodes: action.payload
        //     }))
        // }
    },
    extraReducers: () => {
    }
})

export const promptsSliceActions = {
    ...promptsSlice.actions
}
