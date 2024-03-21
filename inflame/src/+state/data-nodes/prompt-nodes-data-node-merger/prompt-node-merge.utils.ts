import { AbstractDataNode, GenericNode } from '@inflame/models'

export type PromptDataNodeMergerFunc = (
    node: GenericNode,
    dataNode: AbstractDataNode
) => GenericNode

export const mergeDataNodeIntoPromptNode = (
    nodes: GenericNode[],
    dataNodes: Record<string, AbstractDataNode>,
    mergeFunc: Record<string, PromptDataNodeMergerFunc>
) => {
    return nodes.map((node) => {
        if (!dataNodes) {
            return node
        }

        const nodeClass = node.classtype
        const dataNode = dataNodes[nodeClass]
        if (!dataNode) {
            console.error(`Node's classtype ${nodeClass} was not found in DataNodes.`)
            return node
        }

        return mergeFunc[nodeClass]?.(structuredClone(node), dataNode) ?? node
    })
}
