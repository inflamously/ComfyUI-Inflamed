import {socketAdapter} from "./socket-slice.ts";
import {AppState} from "../inflame-store.ts";


export const socketStateSelectors = {
    ...socketAdapter.getSelectors<AppState>((s) => s.sockets),
}