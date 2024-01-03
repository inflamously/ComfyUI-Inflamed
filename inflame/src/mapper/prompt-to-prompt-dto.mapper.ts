import {workflowToWorkflowDtoMapper} from "./workflow-to-workflow-dto.mapper.ts";
import {Prompt, PromptDTO} from "@inflame/models";

export const promptToPromptDto = (props: {
    clientId: string,
    prompt: Prompt,
}): PromptDTO => {
    return {
        client_id: props.clientId,
        prompt: props.prompt ? workflowToWorkflowDtoMapper(props.prompt.workflow) : {},
        extra_data: {}
    };
}