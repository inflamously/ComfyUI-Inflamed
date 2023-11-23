import {
    PromptNodeTypeCreator,
    PromptNodeFields,
    PromptNodeTypeGuard,
} from "./prompt-node.ts";
import {BindValueLink} from "./prompt-node-connection-value.ts";

type NodeLoadImageInputs = never

type NodeLoadImageOutputs = {
    image: BindValueLink,
}

type NodeLoadImageState = {
    images: string[],
    currentImage: string,
}

export type PromptNodeLoadImageType = ReturnType<typeof PromptNodeLoadImage>
export const nodeTypeLoadImage = PromptNodeTypeGuard<PromptNodeLoadImageType>("LoadImage")

const PromptNodeLoadImage = (props: PromptNodeFields<NodeLoadImageState>) => {
    const {
        id
    } = props

    return PromptNodeTypeCreator<
        NodeLoadImageState,
        NodeLoadImageInputs,
        NodeLoadImageOutputs
    >(
        props,
        "LoadImage",
        undefined,
        {
            outputs: {
                image: {
                    kind: "link",
                    id,
                    slot: 0
                }
            },
            stateInputs: (state) => {
                return {
                    "choose file to upload": {
                        kind: "string",
                        value: "image",
                    },
                    image: {
                        kind: "string",
                        value: state.currentImage
                    }
                }
            }
        },
    );
}

export default PromptNodeLoadImage