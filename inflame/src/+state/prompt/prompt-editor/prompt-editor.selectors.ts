import { createSelector } from '@reduxjs/toolkit'
import { AppState } from '@inflame/state'

const selectPromptEditorState = (state: AppState) => state.promptEditor

const selectCurrentPromptName = createSelector(
    selectPromptEditorState,
    (state) => state.currentPrompt.id
)

export const promptEditorSelectors = {
    selectCurrentPromptName,
}
