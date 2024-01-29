import {Prompt} from "@inflame/models";

export type ValidatedNodeUpdateSource = {
    nodes: Exclude<NodeUpdateSource["nodes"], undefined>,
    appendix: Exclude<NodeUpdateSource["appendix"], undefined>
}

export type NodeUpdateSource = {
    nodes?: Array<string>,
    appendix?: Record<string, unknown>
}

export type NodeUpdatePayload = {
    source: NodeUpdateSource,
    target: Prompt
}
