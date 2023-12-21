import {createEntityAdapter} from "@reduxjs/toolkit";
import {GenericSocket} from "@inflame/models";

export const socketEntityAdapter = createEntityAdapter<GenericSocket>({
    selectId: (state) => state.name,
})