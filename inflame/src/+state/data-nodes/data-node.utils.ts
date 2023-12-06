import {AbstractDataNode} from "./data-node.model.ts";

// TODO: Replace with plain object and define node stuff in utils

export type DataNodeCollection = {
    nodes: Record<string, AbstractDataNode>,
    node: <NodeType = never>(predicate: number | string) =>
        ([NodeType] extends [never] ? undefined : NodeType | undefined)
}

export const createDataNodeCollection = (nodes: Record<string, AbstractDataNode>): DataNodeCollection => {
    return {
        nodes,
        node: <NodeType = never>(predicate: number | string): NodeType | undefined => {
            if (typeof predicate === "number") {
                return nodes[Object.keys(nodes)[predicate]] as NodeType
            }

            return nodes[predicate] as NodeType
        }
    }
}