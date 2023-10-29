import {AbstractPromptNodeType, PromptNodeTypeGuardFunction} from "../prompt-nodes/prompt-node.ts";


export type PromptWorkflow = {
    getNodes: () => AbstractPromptNodeType[]
    addNode: (node: AbstractPromptNodeType) => void
    getNode: <T extends AbstractPromptNodeType>(
        id: string, typeguard: PromptNodeTypeGuardFunction<T> | undefined
    ) => [typeof typeguard] extends [undefined] ? AbstractPromptNodeType : T | undefined
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

    const getNode = <T extends AbstractPromptNodeType>(id: string, typeguard: PromptNodeTypeGuardFunction<T> | undefined): [typeof typeguard] extends [undefined] ? AbstractPromptNodeType : T | undefined => {
        const node = __nodes.find((node) => node.id === id)
        return (typeguard?.(node) && node) || undefined
    }

    return {
        getNodes,
        getNode,
        addNode,
    }
}