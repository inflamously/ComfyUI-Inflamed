import {AnyAction, createListenerMiddleware, ListenerEffect, ThunkDispatch} from "@reduxjs/toolkit";
import {socketSliceActions} from "./socket-slice.ts";

const socketEventHandlerListener = createListenerMiddleware({
    onError: (error, errorInfo) => {
        console.error(error);
        console.error(errorInfo);
    }
})

export const socketEventHandlerMiddleware = socketEventHandlerListener.middleware;

export const registerNewSocketEventHandler = (effect: ListenerEffect<AnyAction, unknown, ThunkDispatch<unknown, unknown, AnyAction>>) => {
    socketEventHandlerListener.startListening({
        actionCreator: socketSliceActions.socketEvent,
        effect,
    })
}