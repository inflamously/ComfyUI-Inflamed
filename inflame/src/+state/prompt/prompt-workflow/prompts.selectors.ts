import {promptsEntityAdapter, PromptsEntityAdapterType} from "./prompts-entity.ts";
import {createSelector} from "@reduxjs/toolkit";
import {PromptState} from "./prompts.slice.ts";
import {AppState} from "../../inflame-store.ts";
import {Prompt} from "@inflame/models";

// Selects the proper slice
const selectPromptsState = (state: AppState) => state.prompts;

const promptsEntityAdapterSelectors = promptsEntityAdapter.getSelectors();

const selectPromptsStateItems = createSelector(
    selectPromptsState,
    (state: PromptState) => state.items,
)

const selectPromptByClientId = createSelector([
        selectPromptsStateItems,
        (_: AppState, clientId: string) => clientId,
    ],
    (state: PromptsEntityAdapterType, clientId) => promptsEntityAdapterSelectors.selectById(state, clientId),
)

const selectPromptByRemoteId = createSelector([
    selectPromptsStateItems,
    (_, remoteId: string) => remoteId
], (state, remoteId: string) => promptsEntityAdapterSelectors.selectAll(state).find((i) => i.remoteId === remoteId))

const selectPrompts = createSelector(
    selectPromptsStateItems,
    (state: PromptsEntityAdapterType) => promptsEntityAdapterSelectors.selectAll(state)
)

const selectPromptsByNewest = createSelector(
    selectPrompts,
    (prompts: Prompt[] | undefined) => prompts ? prompts[prompts.length - 1] : undefined
)

export const promptsSelectors = {
    selectPrompts,
    selectPromptsState,
    selectPromptsStateItems,
    selectPromptByClientId,
    selectPromptByRemoteId,
    selectPromptsByNewest,
};