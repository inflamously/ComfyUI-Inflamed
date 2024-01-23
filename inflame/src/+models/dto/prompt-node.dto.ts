import {NodeErrorMapDTO} from "./error.dto.ts";

export type PromptNodeValueLinkDTO = [string, number]
export type PromptNodeValueDTO = string | number | PromptNodeValueLinkDTO | boolean | undefined

type PromptIds = string

/**
 * Workflow for invoking prompts
 */
export type PromptDTO = {
    client_id: string,
    prompt: PromptWorkflowDTO,
    extra_data: Record<string, unknown>,
}

export type PromptWorkflowDTO = {
    [id in keyof PromptIds as string]: PromptNodeDTO
}

export type PromptNodeInputsDTO = Record<string, PromptNodeValueDTO | unknown> // TODO: Need to fix typing?

export type PromptNodeDTO = {
    inputs: PromptNodeInputsDTO // Depends on implementation
    class_type: string
}

export type PromptResultDTO = {
    prompt_id: string,
    "number": number,
    node_errors: NodeErrorMapDTO
}
