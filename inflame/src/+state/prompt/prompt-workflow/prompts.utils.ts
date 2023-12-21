import {AbstractPromptNode, PromptNodeTypeGuardFunction} from "../../../prompt-nodes/prompt-node.ts";
import {PromptWorkflow} from "@inflame/models";

export const UUIDGenerator = () => {
    const generator = function* () {
        const uuid = function uuidv4() {
            return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                }
            );
        }
        while (true) {
            yield uuid()
        }
    }

    return generator()
}

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