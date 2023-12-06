import {AbstractDataNode} from "../../../data-nodes/data-node.model.ts";
import {AbstractPromptNode} from "../prompt-node.ts";
import {PromptDataNodeMergerFunc} from "../prompt-node.utils.ts";

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