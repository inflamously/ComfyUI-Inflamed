import { createSelector } from '@reduxjs/toolkit'

const selectPromptEditorState = (state: any) => state.promptEditor

const selectCurrentPromptName = createSelector(selectPromptEditorState, (state) => state.prompt.id)

export const promptEditorSelectors = {
    selectCurrentPromptName,
}
