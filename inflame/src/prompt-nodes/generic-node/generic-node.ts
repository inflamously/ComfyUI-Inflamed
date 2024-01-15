import {
    BaseNodeTypeDefinition,
    PromptNode,
    PromptNodeFields
} from "@inflame/models";
import {createPromptNode} from "../prompt-node.ts";

type NodeGenericNodeTypeDefinition = BaseNodeTypeDefinition

export type PromptNodeGeneric = PromptNode<NodeGenericNodeTypeDefinition>

export const promptNodeGeneric = (
    props: PromptNodeFields<NodeGenericNodeTypeDefinition["state"]> & { classtype: string },
    inputs: NodeGenericNodeTypeDefinition["inputs"],
    outputs: NodeGenericNodeTypeDefinition["outputs"],
) => {
    const {classtype} = props

    return createPromptNode<NodeGenericNodeTypeDefinition>(
        props,
        classtype,
        {},
        outputs,
        {
            inputs
        }
    )
}