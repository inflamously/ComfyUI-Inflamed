import { GenericNode } from '@inflame/models'

export const validateId = (nodes: GenericNode[]) =>
    nodes.every((node) => Number.isInteger(+node.id))

export const concatNode = (node: GenericNode, nodes: GenericNode[]) => {
    if (!validateId(nodes)) {
        return
    }

    const id = nodes.reduce((next, prev) => (+next.id > +prev.id ? next : prev)).id + 1

    const newNode = {
        ...node,
        id,
    } satisfies GenericNode

    return [...nodes, newNode]
}
