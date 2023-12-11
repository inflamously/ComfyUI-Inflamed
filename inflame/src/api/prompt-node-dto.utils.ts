import {PromptResultDTO} from "./dto/prompt-node.dto.ts";

export const isPromptResultDTO = (obj: unknown): obj is PromptResultDTO => {
    return obj !== undefined &&
        obj !== null &&
        (obj as PromptResultDTO).prompt_id !== undefined &&
        (obj as PromptResultDTO).number !== undefined &&
        (obj as PromptResultDTO).node_errors !== undefined;
}