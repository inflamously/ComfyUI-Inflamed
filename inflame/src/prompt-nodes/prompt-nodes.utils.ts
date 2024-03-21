import { GenericNode } from '@inflame/models'

export const validateId = (nodes: GenericNode[]) =>
    nodes.every((node) => Number.isInteger(+node.id))

export const concatNodeOfHighestId = (node: GenericNode, nodes: GenericNode[]): GenericNode[] => {
    if (!validateId(nodes)) {
        console.error('Nodes with invalid ids found, make sure all nodes are numeric.')
        return nodes
    }

    const id = nodes.reduce((next, prev) => (+next.id > +prev.id ? next : prev)).id + 1

    const newNode = {
        ...node,
        id,
    } satisfies GenericNode

    return [...nodes, newNode]
}
