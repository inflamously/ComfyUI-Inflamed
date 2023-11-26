import {promptsEntityAdapter} from "./prompts.entity.ts";
import {createSelector, EntityState} from "@reduxjs/toolkit";
import {AppState} from "../../inflame-store.ts";
import {Prompt, PromptData} from "../prompt.model.ts";


const selectPromptsState = (state: AppState) => state.prompts;

const selectPromptById: (state: AppState, id: number) => PromptData | undefined = createSelector([
        (state: AppState) => state.prompts,
        (_, id: number) => id,
    ],
    (state: EntityState<Prompt>, id) => promptsEntityAdapter.getSelectors().selectById(state, id),
)

export const promptsSelectors = {
    selectPromptsState,
    selectPromptById
};