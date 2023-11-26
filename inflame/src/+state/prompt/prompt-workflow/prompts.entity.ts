import {createEntityAdapter} from "@reduxjs/toolkit";
import {PromptData} from "../prompt.model.ts";

export const promptsEntityAdapter = createEntityAdapter<PromptData>()
export type PromptsEntity = ReturnType<typeof promptsEntityAdapter.getInitialState>;