/**
 * Socket Handling
 */
import {addSocketEventHandler} from "../../socket/socket-event-handler.listener.ts";
import {comfyuiSocketActions} from "../../socket/comfyui-socket/comfyui-socket.actions.ts";
import {promptsSelectors} from "./prompts.selectors.ts";
import {promptWorkflowUpdateListenerActions} from "../prompt-workflow-update/prompt-workflow-update.listener.ts";

export const subscribePromptSocketEventMapper = () => {
    addSocketEventHandler(comfyuiSocketActions.statusEvent, () => {
        // TODO: Reactivate on need
        console.log("comfyuiSocketActions.statusEvent: not implemented")
    })

    addSocketEventHandler(comfyuiSocketActions.executionStart, (action) => {
        // TODO: Handle loading state?
        console.log(action)
    })

    addSocketEventHandler(comfyuiSocketActions.executionCached, (action) => {
        console.log(action)
    })

    addSocketEventHandler(comfyuiSocketActions.executing, (action) => {
        console.log(action)
    })

    /**
     * On a node's data output
     */
    addSocketEventHandler(comfyuiSocketActions.executed, (action, api) => {
        // TODO: Proper mapping and validation
        const {payload} = action
        if (payload.node) {
            const prompt = promptsSelectors.selectPromptByRemoteId(api.getState(), payload.prompt_id)
            console.log(prompt)

            if (!prompt) {
                return;
            }

            api.dispatch(
                promptWorkflowUpdateListenerActions.nodeUpdate({
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