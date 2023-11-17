import {
    PromptNodeTypeCreator,
    PromptNodeFields,
    PromptNodeTypeGuard,
} from "./prompt-node.ts";
import {BindValueLink} from "./bind-values.ts";

type NodeLoadImageInputs = never

type NodeLoadImageOutputs = {
    image: BindValueLink,
}

type NodeLoadImageState = {
    images: string[],
    image: string,
}

export type PromptNodeLoadImageType = ReturnType<typeof PromptNodeLoadImage>
export const isPromptNodeLoadImage = PromptNodeTypeGuard<PromptNodeLoadImageType>("LoadImage")

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
                        value: state.image
                    }
                }
            }
        },
    );
}

export default PromptNodeLoadImage