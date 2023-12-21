import {
    createPromptNode,
    PromptNodeTypeGuard,
} from "../prompt-node.ts";
import {BindValueLink, BindValueStateInput, BindValueString, PromptNodeFields} from "@inflame/models";

type NodeLoadImageState = {
    images: string[],
    allowUpload: boolean,
    currentImage: string,
}

type NodeLoadImageInputs = never

type NodeLoadImageOutputs = {
    image: BindValueLink,
}

type NodeLoadImageStateInputs = {
    "choose file to upload": BindValueString,
    image: BindValueStateInput,
}

export type PromptNodeLoadImageType = ReturnType<typeof PromptNodeLoadImage>

export const nodeTypeLoadImage = PromptNodeTypeGuard<PromptNodeLoadImageType>("LoadImage")

const PromptNodeLoadImage = (props: PromptNodeFields<NodeLoadImageState>) => {
    const {
        id
    } = props

    return createPromptNode<
        NodeLoadImageState,
        NodeLoadImageInputs,
        NodeLoadImageOutputs,
        NodeLoadImageStateInputs
    >(
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

export default PromptNodeLoadImage