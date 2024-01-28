import {useSubscribeStoreChange} from "../store.hooks.tsx";
import {promptWorkflowUpdate} from "../../+state/prompt/prompt-workflow-update/prompt-workflow.action.ts";
import {
    sourceContainNodes,
    sourceIncludesAppendix
} from "../../+state/prompt/prompt-workflow-update/prompt-workflow.utils.ts";
import {promptsSliceActions} from "@inflame/state";
import {NodeUpdateSource, Prompt} from "@inflame/models";

type ValidatedNodeUpdateSource = {
    nodes: Exclude<NodeUpdateSource["nodes"], undefined>,
    appendix: Exclude<NodeUpdateSource["appendix"], undefined>
}

export const usePromptNodeUpdate = (props: {
    onUpdate: (source: ValidatedNodeUpdateSource, target: Prompt) => void,
}) => {
    const {onUpdate} = props

    useSubscribeStoreChange({
        action: promptWorkflowUpdate.nodeUpdate,
        listener: (action, api) => {
            console.log("Debug Prompt Action happend", action)

            const {source, target} = action.payload ?? {}

            if (!source ||
                !target ||
                !sourceContainNodes(source) ||
                !sourceIncludesAppendix(source)) {
                console.warn("Neither source nor target was valid and / or included an appendix.")
                return;
            }

            onUpdate(source, target)

            api.dispatch(promptsSliceActions.updatePromptNodes({
                nodes: [],
                clientId: target.clientId,
            }))
        }
    })
}