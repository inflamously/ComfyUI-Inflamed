import {workflowToWorkflowDtoMapper} from "./workflow-to-workflow-dto.mapper.ts";
import {Prompt, PromptDTO} from "@inflame/models";

export const promptToPromptDto = (props: {
    socketId: string,
    prompt: Prompt,
}): PromptDTO => {
    const {socketId, prompt} = props

    return {
        client_id: socketId,
        prompt: prompt ? workflowToWorkflowDtoMapper(props.prompt.workflow) : {},
        extra_data: {}
    };
}