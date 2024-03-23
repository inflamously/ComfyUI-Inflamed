import { GenericNode } from '@inflame/models'

export const validateId = (nodes: GenericNode[]) =>
    nodes.every((node) => Number.isInteger(+node.id))

export const concatNodeOfHighestId = (node: GenericNode, nodes: GenericNode[]): GenericNode[] => {
    if (!validateId(nodes)) {
        console.error('Nodes with invalid ids found, make sure all nodes are numeric.')
        return nodes
    }

    let id = '0'
    nodes?.forEach((node) => {
        if (+node.id > +id) {
            id = node.id
        }
    })
    id = (+id + 1).toString()

    const newNode = {
        ...node,
        id,
    } satisfies GenericNode

    return [...nodes, newNode]
}

export const deleteNodeById = (nodeId: string, nodes: GenericNode[]): GenericNode[] => {
    return nodes.filter((node) => node.id !== nodeId)
}
