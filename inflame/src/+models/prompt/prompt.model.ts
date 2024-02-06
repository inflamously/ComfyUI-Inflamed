import {AbstractPromptNode} from "./prompt-node.model.ts";

export type Prompt = {
    name: string,
    remoteId?: string,
    workflow: PromptWorkflow
}

export type PromptWorkflow = {
    nodes: AbstractPromptNode[]
}