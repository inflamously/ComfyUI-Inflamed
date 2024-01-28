import {createAction} from "@reduxjs/toolkit";
import {NodeUpdatePayload} from "@inflame/models";

export const nodeUpdate = createAction(
    "promptWorkflow/nodeUpdate",
    (payload: NodeUpdatePayload) => {
        return {
            payload
        }
    });

export const promptWorkflowUpdate = {
    nodeUpdate,
}