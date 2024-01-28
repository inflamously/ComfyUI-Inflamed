import {Prompt} from "@inflame/models";

export type NodeUpdateSource = {
    nodes?: Array<string>,
    appendix?: Record<string, unknown>
}

export type NodeUpdatePayload = {
    source: NodeUpdateSource,
    target: Prompt
}