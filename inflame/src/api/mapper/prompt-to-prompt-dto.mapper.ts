import {PromptDTO} from "../dto/prompt-node.dto.ts";
import {workflowToWorkflowDtoMapper} from "./workflow-to-workflow-dto.mapper.ts";
import {GenericSocket} from "../../+state/socket/socket.model.ts";
import {Prompt} from "../../+state/prompt/prompt-workflow/prompt.model.ts";

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