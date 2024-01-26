/**
 * Socket Handling
 */
import {comfyuiSocketActions} from "../../socket/comfyui-socket/comfyui-socket.actions.ts";
import {promptsSelectors} from "./prompts.selectors.ts";
import {promptWorkflowUpdate} from "../prompt-workflow-update/prompt-workflow.action.ts";
import {subscribeToStoreChange} from "../../inflame-store.listener.ts";

export const subscribePromptSocketEventHandler = () => {
    subscribeToStoreChange(comfyuiSocketActions.statusEvent, () => {
        // TODO: Reactivate on need
        console.log("comfyuiSocketActions.statusEvent: not implemented")
    })

    subscribeToStoreChange(comfyuiSocketActions.executionStart, (action) => {
        // TODO: Handle loading state?
        console.log(action)
    })

    subscribeToStoreChange(comfyuiSocketActions.executionCached, (action) => {
        console.log(action)
    })

    subscribeToStoreChange(comfyuiSocketActions.executing, (action) => {
        console.log(action)
    })

    /**
     * On a node's data output
     */
    subscribeToStoreChange(comfyuiSocketActions.executed, (action, api) => {
        // TODO: Proper mapping and validation
        const {payload} = action
        if (payload && payload.node) {
            const prompt = promptsSelectors.selectPromptByRemoteId(api.getState(), payload.prompt_id)

            if (!prompt) {
                return;
            }

            api.dispatch(
                promptWorkflowUpdate.nodeUpdate({
                    source: {
                        nodes: [payload.node],
                        appendix: payload.output
                    },
                    target: prompt,
                })
            )
        }
        console.log(action)
    })
}