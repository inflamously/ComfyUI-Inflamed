import {
    AnyAction,
    createListenerMiddleware,
    ListenerEffect, PayloadAction, PayloadActionCreator, PrepareAction,
    ThunkDispatch
} from "@reduxjs/toolkit";
import {AppState} from "../inflame-store.ts";

const socketEventHandlerListener = createListenerMiddleware()

export const socketEventHandlerMiddleware = socketEventHandlerListener.middleware;

export const addSocketEventHandler = <Payload>(
    action: PayloadActionCreator<Payload, string, PrepareAction<Payload>>,
    effect: ListenerEffect<PayloadAction<Payload>, AppState, ThunkDispatch<AppState, unknown, AnyAction>>
) => {
    socketEventHandlerListener.startListening({
        actionCreator: action,
        effect,
    })
}