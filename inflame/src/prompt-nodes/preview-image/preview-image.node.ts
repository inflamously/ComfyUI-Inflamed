import {
    createPromptNode,
    PromptNodeTypeGuard
} from "../prompt-node.ts";
import {BindValueLink, NodeTypeDefinition, PromptNode, PromptNodeFields} from "@inflame/models";

type PreviewImage = {
    filename: string,
    path: string,
    meta: string[]
}

type NodePreviewImageTypeDefinition = NodeTypeDefinition<
    {
        images: PreviewImage[] // TODO: Typings?
    },
    {
        images: BindValueLink,
    },
    never,
    never
>

export type PromptNodePreviewImageType = PromptNode<NodePreviewImageTypeDefinition>

export const nodeTypePreviewImage = PromptNodeTypeGuard<PromptNodePreviewImageType>("PreviewImage");

export const PromptNodePreviewImage = (props: PromptNodeFields<NodePreviewImageTypeDefinition["state"]>) => {
    return createPromptNode<NodePreviewImageTypeDefinition>(
        props,
        "PreviewImage",
        {
            images: null
        },
        undefined,
    )
}

