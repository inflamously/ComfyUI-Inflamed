import {AppState} from "../../inflame-store.ts";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {promptsSliceActions} from "./prompts.slice.ts";
import {AbstractPromptNode} from "../prompt-nodes/prompt-node.ts";
import {promptsSelectors} from "./prompts.selectors.ts";
import {dataNodesThunk} from "../../data-nodes/data-nodes.thunk.ts";
import {dataNodesSelectors} from "../../data-nodes/data-nodes.selectors.ts";

const createPromptWithWorkflow = (props: {
    nodes: AbstractPromptNode[]
}) => async (dispatch: ThunkDispatch<AppState, undefined, AnyAction>, getState: () => AppState) => {
    const {nodes} = props;

    // TODO: When do I query dataNodes into prompt nodes?

    await dispatch(dataNodesThunk.queryDataNodes(false))

    const dataNodes = dataNodesSelectors.selectDataNodes(getState())

    console.log(dataNodes);

    // TODO:

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