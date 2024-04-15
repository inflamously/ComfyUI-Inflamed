import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PromptEditorState = {
    currentPrompt: {
        id: string | null
    }
}

const INITIAL_STATE: PromptEditorState = {
    currentPrompt: {
        id: null, // # acts as a empty value
    },
}

export const promptEditorSlice = createSlice({
    name: 'promptEditor',
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentPrompt: (state, action: PayloadAction<string | null>) => {
            state.currentPrompt.id = action.payload
        },
    },
})

export const promptEditorActions = {
    ...promptEditorSlice.actions,
}
