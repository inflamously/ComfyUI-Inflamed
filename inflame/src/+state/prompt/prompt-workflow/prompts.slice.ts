import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PromptsEntityAdapterType, promptsEntityAdapter} from "./prompts-entity.ts";
import {AbstractPromptNode, Prompt} from "@inflame/models";
import {dataStoreActions} from "../../data-store/data-store.ts";
import {subscribeToStoreChange} from "../../inflame-store.listener.ts";

type PromptAction<Type extends Record<string, unknown>> = PayloadAction<{
    clientId: string
} & Type>

export type PromptState = {
    items: PromptsEntityAdapterType
}

const INITIAL_STATE: PromptState = {
    items: promptsEntityAdapter.getInitialState(),
}

export const promptsSlice = createSlice({
    name: 'prompts',
    initialState: INITIAL_STATE,
    reducers: {
        createPrompt: (state, action: PayloadAction<string>) => {
            const {payload} = action

            if (!payload) {
                console.error("Missing name for creation of a new prompt.")
                return state;
            }

            if (state.items.entities[payload]) {
                console.error(`Prompt with name ${payload} already exists`)
                return state;
            }

            promptsEntityAdapter.addOne(state.items, {
                clientId: payload,
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
            nodes: AbstractPromptNode[]
        }>) => {
            const {clientId, nodes} = action.payload
            if (!clientId) {
                return state;
            }

            const prompt = state.items.entities[clientId]
            if (!prompt) {
                return state;
            }

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
        },
    },
    extraReducers: (builder) => {
        /**
         * Reload data from localStorage
         */
        builder.addCase(dataStoreActions.initialize, (_, action) => {
            const prompts = action.payload.prompts
            // Must delete remote id since we not longer have access after reload or refresh
            if (prompts && prompts.items?.ids?.length > 0) {
                for (const id of prompts.items.ids) {
                    delete prompts.items.entities[id]?.remoteId
                }
            }
            return prompts
        })
    }
})

export const promptsSliceActions = {
    ...promptsSlice.actions
}

subscribeToStoreChange(promptsSliceActions.updatePromptNodes, (_, {dispatch, getState}) => {
    dispatch(dataStoreActions.save({
        prompts: getState().prompts
    }))
})