import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload, ActionCreatorWithPreparedPayload,
    createListenerMiddleware, ListenerEffectAPI, PayloadAction, UnsubscribeListener
} from "@reduxjs/toolkit";
import {AppDispatch, AppState} from "./inflame-store.ts";

// This listener is added once and used everywhere as it is designed by the author
const storeListener = createListenerMiddleware<AppState, AppDispatch>();

export const storeListenerMiddleware = storeListener.middleware;

export const subscribeToStoreChange = <Args, Payload>(
    actionCreator:
        ActionCreatorWithoutPayload |
        ActionCreatorWithPayload<Payload> |
        ActionCreatorWithPreparedPayload<Args[], Payload>,
    effect: (action: PayloadAction<Payload | undefined>, api: ListenerEffectAPI<AppState, AppDispatch>) => void
): UnsubscribeListener => storeListener.startListening({
    actionCreator,
    effect,
})