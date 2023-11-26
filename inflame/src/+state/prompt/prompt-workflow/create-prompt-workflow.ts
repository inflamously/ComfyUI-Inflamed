import {AbstractPromptNodeType, PromptNodeTypeGuardFunction} from "../prompt-nodes/prompt-node.ts";

// TODO: Move out of this +state
// TODO: Make store conform
export type PromptWorkflow = {
    getNodes: () => AbstractPromptNodeType[]
    addNode: (node: AbstractPromptNodeType) => void
    getNode: <T extends AbstractPromptNodeType>(
        id: string, typeguard: PromptNodeTypeGuardFunction<T> | undefined
    ) => [typeof typeguard] extends [undefined] ? AbstractPromptNodeType : T
}

/**
 * Creates a new workflow on given nodes
 * @param props
 */
// TODO: sort nodes by id?
export const createPromptWorkflow = (props: {
    nodes?: AbstractPromptNodeType[]
}): PromptWorkflow => {
    const {nodes} = props

    const __nodes: AbstractPromptNodeType[] = nodes ?? []

    const getNodes = (): AbstractPromptNodeType[] => __nodes

    const addNode = (node: AbstractPromptNodeType): void => {
        __nodes.push(node)
    }

    const getNode = <T extends AbstractPromptNodeType>(id: string, typeguard: PromptNodeTypeGuardFunction<T> | undefined): [typeof typeguard] extends [undefined] ? AbstractPromptNodeType : T => {
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