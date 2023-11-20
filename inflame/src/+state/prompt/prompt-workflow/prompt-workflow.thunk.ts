import Api from "../../../api/api.ts";
import {PromptWorkflowDTO} from "../../../api/dto/prompt-node.dto.ts";

const promptWorkflowThunk = () => {
    const postPrompt =
        (prompt: PromptWorkflowDTO) =>
            async () => {
                return await Api.postPrompt({
                    payload: prompt,
                })
            }

    return {
        postPrompt
    }
}

export default promptWorkflowThunk();