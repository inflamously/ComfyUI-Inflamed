import {PromptWorkflow} from "./prompt-workflow/create-prompt-workflow.ts";
import {AbstractPromptNodeType} from "./prompt-nodes/prompt-node.ts";

// TODO: Better name
export type Prompt = {
    // TODO: Ref to socket
    workflow: PromptWorkflow // TODO: Ref to PromptWorkflow
}

// TODO: Redux Store Version of Prompt / Refactor
export type PromptData = {
    workflow: AbstractPromptNodeType[]
}