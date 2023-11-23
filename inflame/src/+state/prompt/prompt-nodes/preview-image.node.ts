// TODO: How to avoid external changes before cloning with method below?

import {
    PromptNodeTypeCreator,
    PromptNodeFields,
    PromptNodeTypeGuard
} from "./prompt-node.ts";
import {BindValueLink} from "./prompt-node-connection-value.ts";


type NodePreviewImageInputs = {
    images: BindValueLink,
}

type NodePreviewImageOutputs = never

type NodePreviewImageState = {
    images: string[] // TODO: Typings?
}

export type PromptNodePreviewImageType = ReturnType<typeof PromptNodePreviewImage>

export const nodeTypePreviewImage = PromptNodeTypeGuard<PromptNodePreviewImageType>("PreviewImage");

const PromptNodePreviewImage = (props: PromptNodeFields<NodePreviewImageState>) => {
    return PromptNodeTypeCreator<
        NodePreviewImageState,
        NodePreviewImageInputs,
        NodePreviewImageOutputs
    >(
        props,
        "PreviewImage",
        {
            images: null
        },
    )
}

export default PromptNodePreviewImage