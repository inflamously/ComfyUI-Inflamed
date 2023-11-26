import {Prompt} from "../../+state/prompt/prompt.model.ts";
import {PromptDTO} from "../dto/prompt-node.dto.ts";
import {workflowToWorkflowDtoMapper} from "./workflow-to-workflow-dto.mapper.ts";
import {ComfyuiSocket} from "../../+state/socket/comfyui-socket.model.ts";

export const promptToPromptDto = (props: {
    socket: ComfyuiSocket,
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