import {PromptNode, PromptNodeFields, PromptNodeLink} from "./generic/node.ts";

type NodeLoadImageOutputs = {
    image: PromptNodeLink,
}

const NodeLoadImage = (props: PromptNodeFields<never>) => {
    return PromptNode<
        NodeLoadImageOutputs,
        never,
        never
    >(
        props,
        "LoadImage",
        {
            image: {
            }
        }
    )
}

export default NodeLoadImage