import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PromptsEntityAdapterType, promptsEntityAdapter} from "./prompts-entity.ts";
import {generatePromptId} from "./prompts.utils.ts";
import {Prompt} from "./prompt.model.ts";
import {AbstractPromptNode} from "../prompt-nodes/prompt-node.ts";
import {addSocketEventHandler} from "../../socket/socket-event-handler.listener.ts";
import {comfyuiSocketActions} from "../../socket/comfyui-socket/comfyui-socket.actions.ts";

type PromptAction<Type extends Record<string, unknown>> = PayloadAction<{
    clientId: string
} & Type>

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
        createPrompt: (state) => {
            promptsEntityAdapter.addOne(state.items, {
                clientId: generatePromptId().toString(),
                workflow: {
                    nodes: []
                }
            })
        },
        updatePromptRemoteId: (state, action: PromptAction<{ remoteId: string }>) => {
            const {clientId, remoteId} = action.payload
            if (!clientId) {
                return state;
            }

            const prompt = state.items.entities[clientId]
            if (prompt) {
                prompt.remoteId = remoteId
            }
        },
        updatePromptNodes: (state, action: PromptAction<{
            nodes: readonly AbstractPromptNode[] | AbstractPromptNode[]
        }>) => {
            const {clientId, nodes} = action.payload
            if (!clientId) {
                return state;
            }

            const prompt = state.items.entities[clientId]
            if (prompt) {
                const newPrompt: Prompt = {
                    ...prompt,
                    workflow: {
                        nodes
                    }
                }
                promptsEntityAdapter.updateOne(state.items, {
                    id: prompt.clientId,
                    changes: newPrompt
                })
            } else {
                return state
            }
        }
    },
    extraReducers: () => {
    }
})

/**
 * Socket Handling
 */
addSocketEventHandler(comfyuiSocketActions.statusEvent, (action) => {
    // TODO: Reactivate on need
    console.log(action);
})

addSocketEventHandler(comfyuiSocketActions.executionStart, (action) => {
    // TODO: Handle loading state?
    console.log(action)
})

addSocketEventHandler(comfyuiSocketActions.executionCached, (action) => {
    console.log(action)
})

addSocketEventHandler(comfyuiSocketActions.executing, (action) => {
    console.log(action)
})

addSocketEventHandler(comfyuiSocketActions.executed, (action) => {
    console.log(action)
})

export const promptsSliceActions = {
    ...promptsSlice.actions
}