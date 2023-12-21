import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {socketSlice, socketSliceName} from "./socket/socket-slice.ts";
import {nodesSlice, nodesSliceName} from "./data-nodes/data-nodes.slice.ts";
import {promptsSlice, promptsSliceName} from "./prompt/prompt-workflow/prompts.slice.ts";
import {useDispatch} from "react-redux";
import {socketEventHandlerMiddleware} from "./socket/socket-event-handler.listener.ts";
import {promptWorkflowUpdateListenerMiddleware} from "./prompt/prompt-workflow/prompt-workflow-update.listener.ts";
import {subscribePromptSocketEventMapper} from "./prompt/prompt-workflow/prompts-socket-event-mapper.ts";
import {subscribePreviewImageNodeUpdate} from "./prompt/preview-image-pipeline-update.ts";
import {comfyApi} from "./api/comfy-api.slice.ts";

const store = configureStore({
    devTools: true,
    reducer: combineReducers({
        [socketSliceName]: socketSlice.reducer,
        [nodesSliceName]: nodesSlice.reducer,
        [promptsSliceName]: promptsSlice.reducer,
        [comfyApi.name]: comfyApi.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(comfyApi.middleware)
            .prepend(socketEventHandlerMiddleware)
            .prepend(promptWorkflowUpdateListenerMiddleware)
})

export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;

// Listeners
subscribePromptSocketEventMapper();
subscribePreviewImageNodeUpdate();

export default store;