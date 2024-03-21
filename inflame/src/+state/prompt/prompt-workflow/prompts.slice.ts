import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PromptsEntityAdapterType, promptsEntityAdapter } from './prompts-entity.ts'
import { GenericNode, Prompt } from '@inflame/models'
import { dataStoreActions } from '../../data-store/data-store.ts'
import { subscribeToStoreChange } from '../../inflame-store.listener.ts'
import { cloneDeep } from 'lodash'

type PromptAction<Type extends Record<string, unknown>> = PayloadAction<
    {
        name: string
    } & Type
>

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
            const { payload } = action

            if (!payload) {
                console.warn('Missing name for creation of a new prompt.')
                return state
            }

            if (state.items.entities[payload]) {
                console.warn(`Prompt with name "${payload}" already exists`)
                return state
            }

            promptsEntityAdapter.addOne(state.items, {
                name: payload,
                workflow: {
                    nodes: [],
                },
            })
        },
        updatePromptRemoteId: (state, action: PromptAction<{ remoteId: string }>) => {
            const { name, remoteId } = action.payload
            if (!name) {
                return state
            }

            const prompt = state.items.entities[name]
            if (prompt) {
                prompt.remoteId = remoteId
            }
        },
        updatePrompt: (state, action: PayloadAction<Prompt>) => {
            const prompt = action.payload

            if (!prompt) {
                return state
            }

            promptsEntityAdapter.updateOne(state.items, {
                id: prompt.name,
                changes: cloneDeep(prompt),
            })
        },
        updatePromptNodes: (
            state,
            action: PromptAction<{
                nodes: GenericNode[]
            }>
        ) => {
            const { name, nodes } = action.payload

            if (!name) {
                return state
            }

            const prompt = state.items.entities[name]
            if (!prompt) {
                return state
            }

            if (prompt.workflow.nodes.some((node) => node === undefined || node === null)) {
                console.warn(`Invalid prompt node was detected in workflow ${prompt.name}`)
                return state
            }

            const newPrompt = {
                ...prompt,
                workflow: {
                    nodes,
                },
            } satisfies Prompt

            promptsEntityAdapter.updateOne(state.items, {
                id: prompt.name,
                changes: newPrompt,
            })
        },
    },
    extraReducers: (builder) => {
        /**
         * Reload data from localStorage
         */
        builder.addCase(dataStoreActions.initialize, (_, action) => {
            const prompts = action.payload.prompts
            // Must delete remote id since we no longer have access after reload or refresh
            if (prompts && prompts.items?.ids?.length > 0) {
                for (const id of prompts.items.ids) {
                    delete prompts.items.entities[id]?.remoteId
                }
            }
            return prompts
        })
    },
})

export const promptsSliceActions = {
    ...promptsSlice.actions,
}

subscribeToStoreChange(promptsSliceActions.createPrompt, (_, { dispatch, getState }) => {
    dispatch(
        dataStoreActions.save({
            prompts: getState().prompts,
        })
    )
})

subscribeToStoreChange(promptsSliceActions.updatePromptNodes, (_, { dispatch, getState }) => {
    dispatch(
        dataStoreActions.save({
            prompts: getState().prompts,
        })
    )
})
