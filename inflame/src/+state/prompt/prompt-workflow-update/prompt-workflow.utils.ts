import {AbstractPromptNode, NodeUpdateSource} from "@inflame/models";

export const hasSingleNode = (nodes: Array<AbstractPromptNode | undefined>) => {
    return nodes?.length === 1
}

export const sourceContainNodes = (source: NodeUpdateSource): source is Omit<NodeUpdateSource, "nodes"> & {
    nodes: string[]
} => {
    return (source?.nodes?.length || 0) > 0;
}

export const sourceIncludesAppendix = (
    source: NodeUpdateSource,
): source is Omit<NodeUpdateSource, "appendix"> & {
    appendix: Record<string, unknown>
} => {
    return source?.appendix !== undefined
}