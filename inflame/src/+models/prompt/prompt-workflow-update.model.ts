import {Prompt} from "@inflame/models";

export type PipelineNodeUpdateSource = {
    nodes?: Array<string>,
    appendix?: Record<string, unknown>
}

export type PipelineNodeUpdatePayload = {
    source: PipelineNodeUpdateSource,
    target: Prompt
}