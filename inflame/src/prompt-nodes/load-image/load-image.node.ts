import {
    createPromptNode,
    PromptNodeTypeGuard,
} from "../prompt-node.ts";
import {BindValueLink, BindValueStateInput, BindValueString, PromptNode, PromptNodeFields} from "@inflame/models";
import {NodeTypeDefinition} from "@inflame/models";

type NodeLoadImageTypeDefinition = NodeTypeDefinition<
    {
        images: string[],
        allowUpload: boolean,
        currentImage: string,
    },
    never,
    {
        image: BindValueLink,
    },
    {
        "choose file to upload": BindValueString,
        image: BindValueStateInput,
    }
>

export type PromptNodeLoadImageType = PromptNode<NodeLoadImageTypeDefinition>

export const nodeTypeLoadImage = PromptNodeTypeGuard<PromptNodeLoadImageType>("LoadImage")

export const PromptNodeLoadImage = (props: PromptNodeFields<NodeLoadImageTypeDefinition["state"]>) => {
    const {
        id
    } = props

    return createPromptNode<NodeLoadImageTypeDefinition>(
        props,
        "LoadImage",
        undefined,
        {
            image: {
                kind: "link",
                id,
                slot: 0
            }
        },
        {
            // TODO: Convert state to "path-property" object
            stateInputs: (state) => {
                return {
                    "choose file to upload": {
                        kind: "string",
                        value: "image",
                    },
                    image: {
                        kind: "state",
                        propertyPath: state.currentImage ?? "", // TODO: Retrieve from state above.
                    },
                }
            },
        },
    );
}
