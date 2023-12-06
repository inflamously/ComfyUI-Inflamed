import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {socketSlice, socketSliceName} from "./socket/socket-slice.ts";
import {nodesSlice, nodesSliceName} from "./data-nodes/data-nodes.slice.ts";
import {promptsSlice, promptsSliceName} from "./prompt/prompt-workflow/prompts.slice.ts";
import {useDispatch} from "react-redux";
import {comfyApi} from "../api/comfy.api.ts";

const store = configureStore({
    devTools: true,
    reducer: combineReducers({
        [socketSliceName]: socketSlice.reducer,
        [nodesSliceName]: nodesSlice.reducer,
        [promptsSliceName]: promptsSlice.reducer,
        [comfyApi.name]: comfyApi.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(comfyApi.middleware),
})

export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;

export default store;