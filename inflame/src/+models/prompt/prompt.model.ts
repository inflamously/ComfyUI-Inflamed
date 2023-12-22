import {AbstractPromptNode} from "./prompt-node.model.ts";

export type Prompt = {
    clientId: string,
    remoteId?: string,
    workflow: PromptWorkflow
}

export type PromptWorkflow = {
    nodes: Readonly<AbstractPromptNode[]>
}