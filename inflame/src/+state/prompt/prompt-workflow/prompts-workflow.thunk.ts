import Api from "../../../api/api.ts";
import {PromptDTO} from "../../../api/dto/prompt-node.dto.ts";

const promptWorkflowThunk = () => {
    const postPrompt = (prompt: PromptDTO) =>
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