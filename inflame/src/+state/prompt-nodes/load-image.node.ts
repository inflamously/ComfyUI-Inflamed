import {
    PromptNodeTypeCreator,
    PromptNodeFields,
    PromptNodeTypeGuard,
} from "./prompt-node.ts";
import {PromptNodeLink} from "./prompt-node-link.ts";

type NodeLoadImageInputs = never

type NodeLoadImageOutputs = {
    image: PromptNodeLink,
}

type NodeLoadImageState = {
    images: string[]
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
        undefined,
        {
            image: {
                kind: "link",
                id,
                slot: 0
            }
        }
    );
}

export default PromptNodeLoadImage