import {addNodeToPromptWorkflowUpdateListener} from "./prompt-workflow-update.listener.ts";
import {findAbstractPromptNodeById, replaceNodesInWorkflow} from "../../../prompt-nodes/prompt-node.utils.ts";
import {
    hasSingleNode,
    sourceContainNodes,
    sourceIncludesAppendix
} from "./prompt-workflow-update.utils.ts";
import {AbstractPromptNode} from "@inflame/models";
import {updateObject} from "../../../core/object.utils.ts";
import {nodeTypePreviewImage} from "../../../prompt-nodes/preview-image/preview-image.node.ts";
import {promptsSliceActions} from "../prompt-workflow/prompts.slice.ts";

export const subscribePreviewImageNodeUpdate = () => {
    addNodeToPromptWorkflowUpdateListener((action, api) => {
            const {source, target} = action.payload

            if (!sourceContainNodes(source) ||
                !sourceIncludesAppendix(source)) {
                console.error("Acquire source did not contain an appendix.")
                return;
            }

            const existingNodes: Array<AbstractPromptNode | undefined> = source.nodes
                .map((id) => findAbstractPromptNodeById(id, target.workflow))
                .filter((node) => node !== undefined);

            if (!hasSingleNode(existingNodes)) {
                console.warn("Cannot apply output update on multiple nodes.")
                return;
            }

            const [node] = existingNodes
            if (!node) {
                return;
            }

            if (!nodeTypePreviewImage(node)) {
                return
            }

            const previewImageNode = updateObject(node, (newNode) => {
                if (!Array.isArray(source.appendix.images)) {
                    return;
                }

                // TODO: What model should I choose?
                newNode.state.images = source.appendix.images.map((item) => {
                    return {
                        filename: item.filename,
                        path: "",
                        meta: [
                            item.type,
                        ]
                    }
                })
            })

            console.log("Workflow before", target.workflow)
            const newWorkflow = replaceNodesInWorkflow(target.workflow, [previewImageNode])
            console.log("Workflow after", newWorkflow)

            api.dispatch(promptsSliceActions.updatePromptNodes({
                nodes: newWorkflow.nodes,
                clientId: target.clientId
            }))
        }
    );
}

