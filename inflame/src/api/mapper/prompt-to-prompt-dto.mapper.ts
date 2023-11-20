import {Prompt} from "../../+state/prompt/prompt.ts";
import {PromptDTO} from "../dto/prompt-node.dto.ts";
import {workflowToWorkflowDtoMapper} from "./workflow-to-workflow-dto.mapper.ts";

export const promptToPromptDto = (props: Prompt): PromptDTO => {
    const {socket, workflow} = props;

    const result: PromptDTO = {
        client_id: "",
        prompt: {},
        extra_data: {}
    };
    result.client_id = socket?.clientId ?? undefined
    result.prompt = workflowToWorkflowDtoMapper(workflow);

    return result;
}