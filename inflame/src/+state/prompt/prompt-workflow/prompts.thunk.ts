import {AppState} from "../../inflame-store.ts";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {promptsSliceActions} from "./prompts.slice.ts";
import {AbstractPromptNode} from "../prompt-nodes/prompt-node.ts";
import {promptsSelectors} from "./prompts.selectors.ts";
import {dataNodesThunk} from "../../data-nodes/data-nodes.thunk.ts";
import {dataNodesSelectors} from "../../data-nodes/data-nodes.selectors.ts";
import {mergeDataNodeIntoPromptNode} from "../prompt-nodes/prompt-node.utils.ts";
import {LoadImageDataNodeMerger} from "../prompt-nodes/load-image/load-image-data-node.mapper.ts";

const createPromptWithWorkflow = (props: {
    nodes: AbstractPromptNode[]
}) => async (dispatch: ThunkDispatch<AppState, undefined, AnyAction>, getState: () => AppState) => {
    const {nodes} = props;

    await dispatch(dataNodesThunk.queryDataNodes(false))

    const dataNodes = dataNodesSelectors.selectDataNodes(getState())

    dispatch(promptsSliceActions.createPrompt());

    const prompt = promptsSelectors.selectPromptsByNewest(getState());
    if (!prompt) {
        throw new Error("Prompt creation failed.")
    }

    let updatedNodes = nodes;
    if (dataNodes) {
        updatedNodes = mergeDataNodeIntoPromptNode(nodes, dataNodes, {
            "LoadImage": LoadImageDataNodeMerger,
        })
    }

    dispatch(promptsSliceActions.updatePrompt({
        clientId: prompt.clientId,
        nodes: updatedNodes,
    }))
}

export const promptsThunk = {
    createPromptWithWorkflow
}