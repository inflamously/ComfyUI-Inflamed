import {AppState} from "../../inflame-store.ts";
import {ThunkDispatch, UnknownAction} from "@reduxjs/toolkit";
import {promptsSliceActions} from "./prompts.slice.ts";
import {promptsSelectors} from "./prompts.selectors.ts";
import {dataNodesSelectors} from "../../data-nodes/data-nodes.selectors.ts";
import {LoadImageDataNodeMerger} from "../../data-nodes/prompt-nodes-data-node-merger/load-image-data-node.mapper.ts";
import {mergeDataNodeIntoPromptNode} from "../../data-nodes/prompt-nodes-data-node-merger/prompt-node-merge.utils.ts";
import {comfyApi} from "../../api/comfy-api.slice.ts";
import {AbstractPromptNode} from "@inflame/models";

// TODO: Deprecated? See PoC of image-prompt.hooks.ts
const createPromptWithWorkflow = (props: {
    clientId: string,
    nodes: AbstractPromptNode[]
}) => async (dispatch: ThunkDispatch<AppState, unknown, UnknownAction>, getState: () => AppState) => {
    const {
        clientId,
        nodes
    } = props;

    await dispatch(comfyApi.GetObjectInfoQuery())

    const dataNodes = dataNodesSelectors.selectDataNodes(getState())

    dispatch(promptsSliceActions.createPrompt(clientId));

    const prompt = promptsSelectors.selectPromptsByNewest(getState());
    if (!prompt) {
        throw new Error("Prompt creation failed.")
    }

    // TODO: Rewrite to use Listener instead to acquire data instead of function of function for each node.
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
    createPromptWithWorkflow,
}