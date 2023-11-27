import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PromptsEntityAdapterType, promptsEntityAdapter} from "./prompts.entity.ts";
import {generatePromptId} from "./prompts.utils.ts";
import {Prompt} from "./prompt.model.ts";
import {AbstractPromptNode} from "../prompt-nodes/prompt-node.ts";

export type PromptState = {
    items: PromptsEntityAdapterType
}


const INITIAL_STATE: PromptState = {
    items: promptsEntityAdapter.getInitialState(),
}

export const promptsSliceName = "prompts"

export const promptsSlice = createSlice({
    name: promptsSliceName,
    initialState: INITIAL_STATE,
    reducers: {
        createNewPrompt: (state) => {
            promptsEntityAdapter.addOne(state.items, {
                clientId: generatePromptId().toString(),
                workflow: {
                    nodes: []
                }
            })
        },
        updatePrompt: (state, action: PayloadAction<{
            clientId: string,
            nodes: AbstractPromptNode[]
        }>) => {
            const { clientId, nodes } = action.payload
            const prompt = state.items.entities[clientId]
            if (prompt) {
                const newPrompt: Prompt = {
                    ...prompt,
                    workflow: {
                        nodes
                    }
                }
                promptsEntityAdapter.setOne(state.items, newPrompt)
            } else {
                return state
            }
        }
    },
    extraReducers: () => {
    }
})

export const promptsSliceActions = {
    ...promptsSlice.actions
}
