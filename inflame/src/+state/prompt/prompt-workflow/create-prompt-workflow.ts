import {AbstractPromptNode, PromptNodeTypeGuardFunction} from "../prompt-nodes/prompt-node.ts";

// TODO: Move out of this +state
// TODO: Make store conform
export type PromptWorkflow = {
    getNodes: () => AbstractPromptNode[]
    addNode: (node: AbstractPromptNode) => void
    getNode: <T extends AbstractPromptNode>(
        id: string, typeguard: PromptNodeTypeGuardFunction<T> | undefined
    ) => [typeof typeguard] extends [undefined] ? AbstractPromptNode : T
}

/**
 * Creates a new workflow on given nodes
 * @param props
 */
// TODO: sort nodes by id?
export const createPromptWorkflow = (props: {
    nodes?: AbstractPromptNode[]
}): PromptWorkflow => {
    const {nodes} = props

    const __nodes: AbstractPromptNode[] = nodes ?? []

    const getNodes = (): AbstractPromptNode[] => __nodes

    const addNode = (node: AbstractPromptNode): void => {
        __nodes.push(node)
    }

    const getNode = <T extends AbstractPromptNode>(id: string, typeguard: PromptNodeTypeGuardFunction<T> | undefined): [typeof typeguard] extends [undefined] ? AbstractPromptNode : T => {
        const node = __nodes.find((node) => node.id === id)
        if (typeguard?.(node) && node) {
            return node
        } else {
            throw new Error("Invalid node type, typeguard failed.")
        }
    }

    return {
        getNodes,
        getNode,
        addNode,
    }
}