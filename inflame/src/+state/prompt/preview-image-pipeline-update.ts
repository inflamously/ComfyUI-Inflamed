import {addNodeToPromptWorkflowUpdateListener} from "./prompt-workflow/prompt-workflow-update.listener.ts";

// TODO: Find good place to live.
export const subscribePreviewImageNodeUpdate = () => {
    addNodeToPromptWorkflowUpdateListener((action) => {
        // TODO: Proper mapping and validation
        console.log("Preview Image Node received Update :)", action)
    });
}