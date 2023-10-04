import {configureStore} from "@reduxjs/toolkit";
import {socketSlice, socketSliceName} from "./socket/socket-slice.ts";

const store = configureStore({
    devTools: true,
    reducer: {
        [socketSliceName]: socketSlice.reducer,
    },
    middleware: [],
})

export type InflameStoreState = ReturnType<typeof store.getState>;

export default store;