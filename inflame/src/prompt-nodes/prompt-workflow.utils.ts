import { isConnectionOfLink } from './prompt-node-connection.utils.ts'
import {
    GenericNode,
    NodeUpdateSource,
    Prompt,
    PromptNodeConnection,
    PromptWorkflow,
} from '@inflame/models'
import structuredClone from '@ungap/structured-clone'
import { set } from 'lodash'
import { PromptNodeTypeGuardFunction } from './prompt-node.ts'

export const calculatePathsForObject = (tree: Record<string, unknown>) => {
    const statePaths = structuredClone(tree)

    const recurseTree = (
        recursedTree: Record<string, unknown>,
        parentPath: string | null = null
    ) => {
        Object.keys(recursedTree).forEach((k) => {
            const path = parentPath ? parentPath + '.' + k : k

            typeof recursedTree[k] === 'object' && recursedTree['length'] === undefined
                ? recurseTree(recursedTree[k] as Record<string, unknown>, path)
                : set(statePaths, path, path)
        })
    }

    recurseTree(tree, null)

    return statePaths
}

/**
 * This intentionally changes original object since IDs are referenced and must change in all other objects. Connections are made by Reference.
 */
export const updateIdsInConnectionMap = (
    connections: Record<string, PromptNodeConnection>,
    id: string
) => {
    if (connections) {
        Object.keys(connections).forEach((k) => {
            const connection = connections[k]
            if (isConnectionOfLink(connection)) {
                connection['id'] = id
            }
        })
    }
}

/**
 * Updates ID on an original node, also applies to already node connections that are linked.
 */
export const updateNodeId = (node: GenericNode, id: string) => {
    node.id = id

    if (node.outputs) {
        updateIdsInConnectionMap(node.outputs, id)
    }

    return node
}

export const findPromptNodeById = (
    nodeId: string,
    workflow: PromptWorkflow
): GenericNode | undefined => {
    if (!workflow?.nodes || workflow.nodes.length <= 0) {
        return undefined
    }

    return workflow.nodes.find((node) => node.id === nodeId)
}

export const filterToExistingNodes = (props: {
    source: {
        nodes: string[]
    }
    target: Prompt
}): GenericNode[] => {
    const { source, target } = props

    if (!source || !target) return []

    return source.nodes
        .map((id) => findPromptNodeById(id, target.workflow))
        .filter((node): node is GenericNode => node !== undefined)
}

export const replaceNodesInPrompt = (workflow: PromptWorkflow, newNodes: Array<GenericNode>) => {
    const newWorkflow = structuredClone(workflow)
    newWorkflow.nodes = newWorkflow.nodes.map(
        (node) => newNodes.find((newNode) => node?.id === newNode.id) ?? node
    )
    return newWorkflow
}

export const hasSingleNode = (nodes: Array<GenericNode | undefined>) => {
    return nodes?.length === 1
}

export const sourceContainNodes = (
    source: NodeUpdateSource
): source is Omit<NodeUpdateSource, 'nodes'> & {
    nodes: string[]
} => {
    return (source?.nodes?.length || 0) > 0
}

export const sourceIncludesAppendix = (
    source: NodeUpdateSource
): source is Omit<NodeUpdateSource, 'appendix'> & {
    appendix: Record<string, unknown>
} => {
    return source?.appendix !== undefined
}

export const getNodeFromWorkflow = <T extends GenericNode>(
    workflow: PromptWorkflow,
    id: string,
    typeguard: PromptNodeTypeGuardFunction<T> | undefined
): [typeof typeguard] extends [undefined] ? GenericNode : T => {
    if (!workflow) {
        throw new Error('Workflow must be defined')
    }

    const { nodes } = workflow
    const node = nodes.find((node) => node.id === id)

    if (typeguard?.(node) && node) {
        return node
    } else {
        throw new Error('Invalid node type, typeguard failed.')
    }
}
