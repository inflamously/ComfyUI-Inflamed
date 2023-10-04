// TODO: How to avoid external changes before cloning with method below?

import {
    PromptNode,
    PromptNodeFields,
    PromptNodeLink,
    NodeWithoutOutputs
} from "./generic/node.ts";

type NodePreviewImageState = {
    images: string[]
}

const NodePreviewImage = (props: PromptNodeFields<NodePreviewImageState>) => {
    return PromptNode<
        NodeWithoutOutputs,
        NodePreviewImageState,
        {
            images: PromptNodeLink
        }
    >(
        props,
        "PreviewImage",
        {}
    )
}

export default NodePreviewImage