import {NodeErrorMapDTO} from "./error.dto.ts";
import {Digit} from "../../utils/literal-types.ts";

export type PromptNodeValueLinkDTO = [string, number]
export type PromptNodeValueDTO = string | number | PromptNodeValueLinkDTO | undefined

type PromptIds = `${Digit}${Digit}${Digit}${Digit}`

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

export type PromptNodeInputsDTO = {
    [key: string]: PromptNodeValueDTO
}

export type PromptNodeDTO = {
    inputs: PromptNodeInputsDTO // Depends on implementation
    class_type: string
}

export type PromptNodeResultDTO = {
    prompt_id: string,
    "number": number,
    node_errors: NodeErrorMapDTO
}
