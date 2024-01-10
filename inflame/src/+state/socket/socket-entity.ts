import {createEntityAdapter} from "@reduxjs/toolkit";
import {GenericSocket} from "@inflame/models";

export const socketEntityAdapter = createEntityAdapter({
    selectId: (state: GenericSocket) => state.name,
})