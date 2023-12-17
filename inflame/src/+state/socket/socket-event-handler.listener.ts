import {
    ActionCreatorWithoutPayload, ActionCreatorWithPayload,
    ActionCreatorWithPreparedPayload,
    AnyAction,
    createListenerMiddleware,
    ListenerEffect, PayloadAction,
    ThunkDispatch
} from "@reduxjs/toolkit";

const socketEventHandlerListener = createListenerMiddleware({
    onError: (error, errorInfo) => {
        console.error(error);
        console.error(errorInfo);
    }
})

export const socketEventHandlerMiddleware = socketEventHandlerListener.middleware;

export const addSocketEventHandler = <
    OriginalPayload,
    PreparedPayload,
    Payload,
>(
    action: ActionCreatorWithPreparedPayload<[payload: OriginalPayload], PreparedPayload> | ActionCreatorWithoutPayload | ActionCreatorWithPayload<Payload>,
    effect: ListenerEffect<PayloadAction<PreparedPayload> | PayloadAction<undefined> | PayloadAction<Payload>, unknown, ThunkDispatch<unknown, unknown, AnyAction>>
) => {
    socketEventHandlerListener.startListening({
        actionCreator: action,
        effect,
    })
}