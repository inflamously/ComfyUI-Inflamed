// TODO: How to avoid external changes before cloning with method below?

import {
    PromptNodeTypeCreator,
    PromptNodeFields,
    PromptNodeTypeGuard
} from "./prompt-node.ts";
import {BindValueLink} from "./bind-values.ts";


type NodePreviewImageInputs = {
    images: BindValueLink,
}

type NodePreviewImageOutputs = never

type NodePreviewImageState = {
    images: string[] // TODO: Typings?
}

export type PromptNodePreviewImageType = ReturnType<typeof PromptNodePreviewImage>

export const isPromptNodePreviewImage = PromptNodeTypeGuard<PromptNodePreviewImageType>("PreviewImage");

const PromptNodePreviewImage = (props: PromptNodeFields<NodePreviewImageState>) => {
    return PromptNodeTypeCreator<
        NodePreviewImageState,
        NodePreviewImageInputs,
        NodePreviewImageOutputs
    >(
        props,
        "PreviewImage",
        {}
    )
}

export default PromptNodePreviewImage