import {PromptWorkflow} from "./prompt.model.ts";
import {UUIDGenerator} from "../../../utils/generators.ts";
import {AbstractPromptNode, PromptNodeTypeGuardFunction} from "../../../prompt-nodes/prompt-node.ts";

/**
 * Generator that increments numbers from 1..N
 */
const promptUUIDGenerator = UUIDGenerator()
/**
 * Retrieve Unique Id
 */
export const generatePromptId = () => {
    return promptUUIDGenerator.next().value
}

// TODO: Implement pushNodeToWorkflow
// export const pushNodeToWorkflow = (workflow: PromptWorkflow, nodes: AbstractPromptNode[]) => {
//     const newNodes = structuredClone(workflow?.nodes)
//
//     // TODO: Validation and pushing of new nodes...
// }

export const getNodeFromWorkflow = <T extends AbstractPromptNode>(
    workflow: PromptWorkflow,
    id: string,
    typeguard: PromptNodeTypeGuardFunction<T> | undefined
): [typeof typeguard] extends [undefined] ? AbstractPromptNode : T => {
    if (!workflow) {
        throw new Error("Workflow must be defined");
    }

    const {nodes} = workflow
    const node = nodes.find((node) => node.id === id)

    if (typeguard?.(node) && node) {
        return node
    } else {
        throw new Error("Invalid node type, typeguard failed.")
    }
}