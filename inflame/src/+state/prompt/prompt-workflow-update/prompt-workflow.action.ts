import {createAction} from "@reduxjs/toolkit";
import {PipelineNodeUpdatePayload} from "@inflame/models";

export const nodeUpdate = createAction(
    "promptWorkflow/nodeUpdate",
    (payload: PipelineNodeUpdatePayload) => {
        return {
            payload
        }
    });

export const promptWorkflowUpdate = {
    nodeUpdate,
}