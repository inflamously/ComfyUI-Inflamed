import {useSubscribeStoreChange} from "../store.hooks.tsx";
import {promptWorkflowUpdate} from "../../+state/prompt/prompt-workflow-update/prompt-workflow.action.ts";
import {
    sourceContainNodes,
    sourceIncludesAppendix
} from "../../+state/prompt/prompt-workflow-update/prompt-workflow.utils.ts";
import {promptsSliceActions} from "@inflame/state";
import {updateStateInExistingNodes} from "../../prompt-nodes/prompt-node.utils.ts";

export const usePromptNodeUpdateHandler = () => {
    useSubscribeStoreChange({
        action: promptWorkflowUpdate.nodeUpdate,
        listener: (action, api) => {
            const {source, target} = action.payload ?? {}

            if (!source ||
                !target ||
                !sourceContainNodes(source) ||
                !sourceIncludesAppendix(source)) {
                console.warn("Neither source nor target was valid and / or included an appendix.")
                return;
            }

            const nodes = updateStateInExistingNodes(source, target)

            api.dispatch(promptsSliceActions.updatePromptNodes({
                nodes,
                name: target.name,
            }))
        }
    })
}