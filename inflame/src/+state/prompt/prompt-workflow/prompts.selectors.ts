import {promptsEntityAdapter, PromptsEntityAdapterType} from "./prompts.entity.ts";
import {createSelector} from "@reduxjs/toolkit";
import {Prompt} from "./prompt.model.ts";
import {PromptState} from "./prompts.slice.ts";
import {AppState} from "../../inflame-store.ts";

const promptsEntityAdapterSelectors = promptsEntityAdapter.getSelectors();

const selectPromptsState = (state: AppState) => state.prompts;

const selectPromptsStateItems = createSelector(
    selectPromptsState,
    (state: PromptState) => state.items,
)

const selectPromptById = createSelector([
        selectPromptsStateItems,
        (_, id: number) => id,
    ],
    (state: PromptsEntityAdapterType, id) => promptsEntityAdapterSelectors.selectById(state, id),
)

const selectPrompts= createSelector(
    selectPromptsStateItems,
    (state: PromptsEntityAdapterType) => promptsEntityAdapterSelectors.selectAll(state)
)

const selectPromptsByNewest = createSelector(
    selectPrompts,
    (prompts: Prompt[] | undefined) => prompts ? prompts[prompts.length - 1] : undefined
)

export const promptsSelectors = {
    selectPromptsState,
    selectPromptsStateItems,
    selectPromptById,
    selectPrompts,
    selectPromptsByNewest,
};