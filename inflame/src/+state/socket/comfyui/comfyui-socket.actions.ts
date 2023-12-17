import {createAction, PayloadAction} from "@reduxjs/toolkit";
import {socketSliceName} from "../socket-slice.ts";

type ComfyuiSocketStatusEventPayload = {
    queue: number
}

const statusEventActionName = `${socketSliceName}/statusEvent`
const statusEvent = createAction(
    statusEventActionName,
    (payload: ComfyuiStatusWithSidDTO | ComfyuiStatusDTO): PayloadAction<ComfyuiSocketStatusEventPayload> => {
        return {
            payload: {
                queue: payload.status.exec_info.queue_remaining
            },
            type: statusEventActionName
        }
    }
)


export const comfyuiSocketActions = {
    statusEvent
}