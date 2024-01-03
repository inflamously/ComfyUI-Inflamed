import {
    createPromptNode,
    PromptNodeTypeGuard
} from "../prompt-node.ts";
import {BindValueLink, PromptNodeFields} from "@inflame/models";

type PreviewImage = {
    filename: string,
    path: string,
    meta: string[]
}

type NodePreviewImageState = {
    images: PreviewImage[] // TODO: Typings?
}

type NodePreviewImageInputs = {
    images: BindValueLink,
}

type NodePreviewImageOutputs = never

type NodePreviewImageStateInputs = never

export type PromptNodePreviewImageType = ReturnType<typeof PromptNodePreviewImage>

export const nodeTypePreviewImage = PromptNodeTypeGuard<PromptNodePreviewImageType>("PreviewImage");

export const PromptNodePreviewImage = (props: PromptNodeFields<NodePreviewImageState>) => {
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

