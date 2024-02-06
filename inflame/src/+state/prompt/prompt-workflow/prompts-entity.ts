import {createEntityAdapter} from "@reduxjs/toolkit";
import {Prompt} from "@inflame/models";

export const promptsEntityAdapter = createEntityAdapter({
    selectId: (prompt: Prompt) => prompt.name,
})
export type PromptsEntityAdapterType = ReturnType<typeof promptsEntityAdapter.getInitialState>;