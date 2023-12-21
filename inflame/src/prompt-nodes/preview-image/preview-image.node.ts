// TODO: How to avoid external changes before cloning with method below?

import {
    createPromptNode,
    PromptNodeFields,
    PromptNodeTypeGuard
} from "../prompt-node.ts";
import {BindValueLink} from "@inflame/models";

type NodePreviewImageState = {
    images: string[] // TODO: Typings?
}

type NodePreviewImageInputs = {
    images: BindValueLink,
}

type NodePreviewImageOutputs = never

type NodePreviewImageStateInputs = never

export type PromptNodePreviewImageType = ReturnType<typeof PromptNodePreviewImage>

export const nodeTypePreviewImage = PromptNodeTypeGuard<PromptNodePreviewImageType>("PreviewImage");

const PromptNodePreviewImage = (props: PromptNodeFields<NodePreviewImageState>) => {
    return createPromptNode<
        NodePreviewImageState,
        NodePreviewImageInputs,
        NodePreviewImageOutputs,
        NodePreviewImageStateInputs
    >(
        props,
        "PreviewImage",
        {
            images: null
        },
        undefined,
    )
}

export default PromptNodePreviewImage