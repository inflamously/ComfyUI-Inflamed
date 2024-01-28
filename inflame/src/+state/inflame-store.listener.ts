import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload, ActionCreatorWithPreparedPayload,
    createListenerMiddleware, ListenerEffectAPI, PayloadAction, UnsubscribeListener
} from "@reduxjs/toolkit";
import {AppDispatch, AppState} from "./inflame-store.ts";

// This listener is added once and used everywhere as it is designed by the author
const storeListener = createListenerMiddleware<AppState, AppDispatch>();

export const storeListenerMiddleware = storeListener.middleware;

export type ActionCreatorArgument<Args, Payload> =
    | ActionCreatorWithoutPayload
    | ActionCreatorWithPayload<Payload>
    | ActionCreatorWithPreparedPayload<Args[], Payload>

export type EffectListenerArgument<Payload> = (action: PayloadAction<Payload | undefined>, api: ListenerEffectAPI<AppState, AppDispatch>) => void

export const subscribeToStoreChange = <Args, Payload>(
    actionCreator: ActionCreatorArgument<Args, Payload>,
    effect: EffectListenerArgument<Payload>
): UnsubscribeListener => storeListener.startListening({
    actionCreator,
    effect,
})