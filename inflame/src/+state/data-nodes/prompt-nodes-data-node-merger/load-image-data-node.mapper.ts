import {AbstractPromptNode} from "../../../prompt-nodes/prompt-node.ts";
import {PromptDataNodeMergerFunc} from "./prompt-node-merge.utils.ts";
import {AbstractDataNode} from "@inflame/models";

export const LoadImageDataNodeMerger: PromptDataNodeMergerFunc = (
    node: AbstractPromptNode,
    dataNode: AbstractDataNode
) => {
    const data: unknown = dataNode.input.required["image"]
    if (Array.isArray(data)) {
        node.state["images"] = data[0];
    }

    return node;
}