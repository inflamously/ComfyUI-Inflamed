import {AbstractPromptNode} from "../../../prompt-nodes/prompt-node.ts";
import {AbstractDataNode} from "../data-node.model.ts";
import {PromptDataNodeMergerFunc} from "./prompt-node-merge.utils.ts";

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