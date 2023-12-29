import {addNodeToPromptWorkflowUpdateListener} from "./prompt-workflow-update.listener.ts";
import {findAbstractPromptNodeById} from "../../../prompt-nodes/prompt-node.utils.ts";
import {
    hasSingleNode,
    sourceAppendixMatchType,
    sourceContainNodes,
    sourceIncludesAppendix
} from "./prompt-workflow-update.utils.ts";
import {AbstractPromptNode} from "@inflame/models";
import {updateObject} from "../../../core/object.utils.ts";
import {nodeTypePreviewImage} from "../../../prompt-nodes/preview-image/preview-image.node.ts";

export const subscribePreviewImageNodeUpdate = () => {
    addNodeToPromptWorkflowUpdateListener((action, api) => {
            const {source, target} = action.payload

            if (!sourceContainNodes(source) ||
                !sourceIncludesAppendix(source)) {
                console.error("Acquire source did not contain an appendix.")
                return;
            }

            // "appendix": {
            //         "images": [
            //             {
            //                 "filename": "ComfyUI_temp_bkcgz_00001_.png",
            //                 "subfolder": "",
            //                 "type": "temp"
            //             }
            //         ]
            //     }

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
                if (!sourceAppendixMatchType(source.appendix, {
                        images: [{
                            filename: undefined,
                            subfolder: undefined,
                            type: undefined
                        }]
                    }
                )) {
                    return;
                }

                newNode.state.images = source.appendix.images.map((item) => {
                    return {
                        name: item.filename as string,
                        path: item.type as string
                    }
                })
            })

            console.log(previewImageNode);

            // api.dispatch(promptsSliceActions.updatePromptNodes({
            //     nodes
            // }))
        }
    );
}

