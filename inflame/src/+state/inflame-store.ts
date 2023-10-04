import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {socketSlice, socketSliceName} from "./socket/socket-slice.ts";
import {nodesSlice, nodesSliceName} from "./data-nodes/nodes.slice.ts";

// TODO: Could enable to combine state for X reducer.
// const testReducerHandler = () => (state, action) => {
//     console.log(state, action)
//     return combineReducers({
//         [socketSliceName]: socketSlice.reducer,
//         [nodesSliceName]: nodesSlice.reducer,
//     })(state, action)
// }

const store = configureStore({
    devTools: true,
    reducer: combineReducers({
        [socketSliceName]: socketSlice.reducer,
        [nodesSliceName]: nodesSlice.reducer,
    }),
    middleware: (
        getDefaultMiddleware
    ) => getDefaultMiddleware(),
})

export type AppState = ReturnType<typeof store.getState>;

export default store;