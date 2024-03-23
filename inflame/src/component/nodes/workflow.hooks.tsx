import { useSubscribeStoreChange } from '../store.hooks.tsx'
import { promptWorkflowUpdate } from '../../+state/prompt/prompt-workflow-update/prompt-workflow.action.ts'
import { promptsActions } from '@inflame/state'
import {
    sourceContainNodes,
    sourceIncludesAppendix,
} from '../../prompt-nodes/prompt-workflow.utils.ts'
import { updateStateInExistingNodes } from '../../prompt-nodes/prompt-state.utils.ts'

/**
 * This listener handles backend prompt updates and updates the specific node accordingly, based on appendix given.
 */
export const usePromptNodeUpdateHandler = () => {
    useSubscribeStoreChange({
        action: promptWorkflowUpdate.nodeUpdate,
        listener: (action, api) => {
            const { source, target } = action.payload ?? {}

            if (
                !source ||
                !target ||
                !sourceContainNodes(source) ||
                !sourceIncludesAppendix(source)
            ) {
                console.warn('Neither source nor target was valid and / or included an appendix.')
                return
            }

            const nodes = updateStateInExistingNodes(source, target)

            api.dispatch(
                promptsActions.updatePromptNodes({
                    nodes,
                    promptName: target.name,
                })
            )
        },
    })
}
