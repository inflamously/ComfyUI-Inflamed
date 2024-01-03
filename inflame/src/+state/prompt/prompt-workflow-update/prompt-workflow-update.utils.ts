import {AbstractPromptNode, PipelineNodeUpdateSource} from "@inflame/models";

export const hasSingleNode = (nodes: Array<AbstractPromptNode | undefined>) => {
    return nodes?.length === 1
}

export const sourceContainNodes = (source: PipelineNodeUpdateSource): source is Omit<PipelineNodeUpdateSource, "nodes"> & {
    nodes: string[]
} => {
    return (source?.nodes?.length || 0) > 0;
}

export const sourceIncludesAppendix = (
    source: PipelineNodeUpdateSource,
): source is Omit<PipelineNodeUpdateSource, "appendix"> & {
    appendix: Record<string, unknown>
} => {
    const result = source?.appendix !== undefined
    if (!result) {
        console.error("Acquire source did not contain an appendix.")
    }
    return result
}