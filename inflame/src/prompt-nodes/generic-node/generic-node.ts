import {
    NodeTypeDefinition,
    PromptNode,
    PromptNodeConnection,
    PromptNodeFields
} from "@inflame/models";
import {createPromptNode} from "../prompt-node.ts";

type NodeGenericNodeTypeDefinition = NodeTypeDefinition<
    Record<string, unknown>,
    Record<string, PromptNodeConnection>,
    Record<string, PromptNodeConnection>,
    Record<string, never>
>

export type GenericNode = PromptNode<NodeGenericNodeTypeDefinition>

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