import {GenericErrorDTO, NodeErrorMapDTO} from "./error.ts";

export type LinkedPromptNodeValueDTO = [string, number]
export type PromptNodeValueDTO = string | number | LinkedPromptNodeValueDTO

export type PromptWorkflowDTO = {
    [id: string]: PromptNodeDTO
}

export type PromptNodeDTO = {
    inputs: Record<string, PromptNodeValueDTO> // Depends on implementation
    class_type: string
}

export type PromptNodeResultDTO = {
    prompt_id: string,
    "number": number,
    node_errors: NodeErrorMapDTO
}

export type PromptNodeErrorsDTO = {
    error: GenericErrorDTO,
    node_errors: NodeErrorMapDTO
}