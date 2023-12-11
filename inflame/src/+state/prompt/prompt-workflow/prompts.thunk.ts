import {AppState} from "../../inflame-store.ts";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {promptsSliceActions} from "./prompts.slice.ts";
import {AbstractPromptNode} from "../prompt-nodes/prompt-node.ts";
import {promptsSelectors} from "./prompts.selectors.ts";
import {dataNodesSelectors} from "../../data-nodes/data-nodes.selectors.ts";
import {mergeDataNodeIntoPromptNode} from "../prompt-nodes/prompt-node.utils.ts";
import {LoadImageDataNodeMerger} from "../prompt-nodes/load-image/load-image-data-node.mapper.ts";
import {comfyApi} from "../../../api/comfy.api.ts";

const createPromptWithWorkflow = (props: {
    nodes: AbstractPromptNode[]
}) => async (dispatch: ThunkDispatch<AppState, undefined, AnyAction>, getState: () => AppState) => {
    const {nodes} = props;

    await dispatch(comfyApi.GetObjectInfoQuery())

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

    dispatch(promptsSliceActions.updatePromptNodes({
        clientId: prompt.clientId,
        nodes: updatedNodes,
    }))

    return promptsSelectors.selectPromptByClientId(getState(), prompt.clientId)
}

export const promptsThunk = {
    createPromptWithWorkflow
}