import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PromptEditorState = {
    prompt: {
        id: string
    }
}

const INITIAL_STATE: PromptEditorState = {
    prompt: {
        id: '',
    },
}

export const promptEditorSlice = createSlice({
    name: 'promptEditor',
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentPrompt: (state, action: PayloadAction<string>) => {
            state.prompt.id = action.payload
        },
    },
})

export const promptEditorActions = {
    ...promptEditorSlice.actions,
}
