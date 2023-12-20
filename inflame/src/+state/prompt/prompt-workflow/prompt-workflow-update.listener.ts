import {
    AnyAction,
    createAction,
    createListenerMiddleware,
    ListenerEffect,
    PayloadAction,
    ThunkDispatch
} from "@reduxjs/toolkit";
import {AppState} from "../../inflame-store.ts";
import {Prompt} from "./prompt.model.ts";

export type PipelineNodeUpdateSource = {
    nodes?: Array<string>,
    appendix?: Record<string, unknown>
}

export type PipelineNodeUpdatePayload = {
    source: PipelineNodeUpdateSource,
    target: Prompt
}

// TODO: Error handling
const promptWorkflowUpdateListener = createListenerMiddleware()

export const promptWorkflowUpdateListenerMiddleware = promptWorkflowUpdateListener.middleware;

export const nodeUpdate = createAction(
    "promptWorkflowUpdateListener/nodeUpdate",
    (payload: PipelineNodeUpdatePayload) => {
        return {
            payload
        }
    });

export const addNodeToPromptWorkflowUpdateListener = (
    effect: ListenerEffect<PayloadAction<ReturnType<typeof nodeUpdate>["payload"]>, AppState, ThunkDispatch<AppState, unknown, AnyAction>>
) => {
    promptWorkflowUpdateListener.startListening({
        actionCreator: nodeUpdate,
        effect
    })
}

export const promptWorkflowUpdateListenerActions = {
    nodeUpdate,
}