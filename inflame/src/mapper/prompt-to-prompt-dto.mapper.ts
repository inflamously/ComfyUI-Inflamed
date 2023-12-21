import {workflowToWorkflowDtoMapper} from "./workflow-to-workflow-dto.mapper.ts";
import {GenericSocket, Prompt, PromptDTO} from "@inflame/models";

export const promptToPromptDto = (props: {
    socket: GenericSocket,
    prompt: Prompt,
}): PromptDTO => {
    const {socket, prompt} = props;

    const result: PromptDTO = {
        client_id: "",
        prompt: {},
        extra_data: {}
    };
    result.client_id = socket?.clientId ?? undefined
    result.prompt = prompt ? workflowToWorkflowDtoMapper(prompt.workflow) : {};

    return result;
}