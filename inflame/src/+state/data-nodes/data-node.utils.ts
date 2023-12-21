import {AbstractDataNode, DataNodeCollection} from "@inflame/models";

export const createDataNodeCollection = (nodes: Record<string, AbstractDataNode>): DataNodeCollection => {
    return {
        nodes,
    }
}