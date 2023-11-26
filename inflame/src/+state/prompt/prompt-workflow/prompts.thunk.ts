import {AppState} from "../../inflame-store.ts";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {Prompt} from "../prompt.model.ts";
import {promptsSliceActions} from "./prompts.slice.ts";

export const createPromptWithWorkflow = (prompt: Prompt) => (dispatch: ThunkDispatch<AppState, undefined, AnyAction>, getState: () => AppState) => {

    dispatch(promptsSliceActions.createPrompt(prompt));

    console.log(getState());
}