import {addNodeToPromptWorkflowUpdateListener} from "@inflame/state";
import {findAbstractPromptNodeById} from "../../../prompt-nodes/prompt-node.utils.ts";

export const subscribePreviewImageNodeUpdate = () => {
    addNodeToPromptWorkflowUpdateListener((action) => {
        const {source, target} = action.payload
        if (!source || !target) {
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

        const existingNodes = source.nodes?.map((id) => findAbstractPromptNodeById(id, target.workflow))
            .filter((node) => node !== undefined);

        // source.appendix

        console.log(existingNodes);
    });
}