import {AppState} from "../../inflame-store.ts";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {promptsSliceActions} from "./prompts.slice.ts";
import {AbstractPromptNode} from "../prompt-nodes/prompt-node.ts";
import {promptsSelectors} from "./prompts.selectors.ts";

const createPromptWithWorkflow = (props: {
    nodes: AbstractPromptNode[]
}) => (dispatch: ThunkDispatch<AppState, undefined, AnyAction>, getState: () => AppState) => {
    const {nodes} = props;

    // TODO: When do I query dataNodes into prompt nodes?

    dispatch(promptsSliceActions.createNewPrompt());
    const prompt = promptsSelectors.selectPromptsByNewest(getState());
    if (!prompt) {
        throw new Error("Prompt creation failed.")
    }

    dispatch(promptsSliceActions.updatePrompt({
        clientId: prompt.clientId,
        nodes,
    }))
}

export const promptsThunk = {
    createPromptWithWorkflow
}