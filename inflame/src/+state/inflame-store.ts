import {combineSlices, configureStore, Dispatch} from "@reduxjs/toolkit";
import {socketSlice} from "./socket/socket-slice.ts";
import {nodesSlice} from "./data-nodes/data-nodes.slice.ts";
import {promptsSlice} from "./prompt/prompt-workflow/prompts.slice.ts";
import {useDispatch} from "react-redux";
import {comfyApi} from "./api/comfy-api.slice.ts";
import {storeListenerMiddleware} from "./inflame-store.listener.ts";
import {subscribeToSyncStoreDataChanges} from "./data-store/data-store.ts";
import {subscribePromptSocketEventHandler} from "./prompt/prompt-workflow/prompts-socket-event-mapper.ts";

// This must be explicitely defined or else typescript just drops bombs on type system.
const combinedReducer = combineSlices(
    socketSlice,
    nodesSlice,
    promptsSlice,
    comfyApi.slice
)

const store = configureStore({
    devTools: true,
    reducer: combinedReducer,
    middleware: (defaultMiddleware) => defaultMiddleware()
        .concat(comfyApi.middleware)
        .prepend(storeListenerMiddleware)
})

export type AppState = ReturnType<typeof combinedReducer>;
export type AppDispatch = Dispatch;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;

// Listeners
subscribePromptSocketEventHandler();
// subscribePreviewImageNodeUpdate();
subscribeToSyncStoreDataChanges(store);

export default store;