import {PromptWorkflow} from "./prompt-workflow/create-prompt-workflow.ts";
import {ComfyuiSocket} from "../socket/comfyui-socket.model.ts";

// TODO: Better name
export type Prompt = {
    // TODO: Why should a prompt contain a socket and know its parts?
    // Should socket not be given or acquired in a prompting context instead of saved here?
    socket: ComfyuiSocket,
    workflow: PromptWorkflow
}
