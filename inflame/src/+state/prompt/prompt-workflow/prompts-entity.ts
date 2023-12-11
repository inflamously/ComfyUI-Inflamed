import {createEntityAdapter} from "@reduxjs/toolkit";
import {Prompt} from "./prompt.model.ts";

export const promptsEntityAdapter = createEntityAdapter<Prompt>({
    selectId: (prompt) => prompt.clientId,
})
export type PromptsEntityAdapterType = ReturnType<typeof promptsEntityAdapter.getInitialState>;