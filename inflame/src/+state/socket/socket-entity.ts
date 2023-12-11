import {createEntityAdapter} from "@reduxjs/toolkit";
import {GenericSocket} from "./socket.model.ts";

export const socketEntityAdapter = createEntityAdapter<GenericSocket>({
    selectId: (state) => state.name,
})