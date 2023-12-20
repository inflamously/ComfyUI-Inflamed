import {AbstractPromptNode} from "../../../prompt-nodes/prompt-node.ts";

export type Prompt = {
    clientId: string,
    remoteId?: string,
    workflow: PromptWorkflow
}

export type PromptWorkflow = {
    nodes: Readonly<AbstractPromptNode[]>
}