import {AbstractPromptNode, PipelineNodeUpdateSource} from "@inflame/models";
import {sameKeys} from "../../../core/object.utils.ts";

export const hasSingleNode = (nodes: Array<AbstractPromptNode | undefined>) => {
    return nodes?.length === 1
}

export const sourceContainNodes = (source: PipelineNodeUpdateSource): source is Omit<PipelineNodeUpdateSource, "nodes"> & {
    nodes: string[]
} => {
    return (source?.nodes?.length || 0) > 0;
}

type KeyedObject<T> = {
    [k in keyof T]: (T[k] extends Array<unknown> ? T[k] : (T[k] extends Record<string, unknown> ? KeyedObject<T[k]> : undefined)) | undefined
}

type StripUndefined<T> = {
    [k in keyof T]: (T[k] extends Array<infer U> ? StripUndefined<U>[] : (T[k] extends Record<string, unknown> ? StripUndefined<T[k]> : unknown))
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

export const sourceAppendixMatchType = <ContractType extends Record<string, unknown>>(appendix: Record<string, unknown>, contractType: KeyedObject<ContractType>): appendix is StripUndefined<ContractType> => {
    return sameKeys(appendix, contractType)
}