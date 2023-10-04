import {socketAdapter} from "./socket-slice.ts";
import {InflameStoreState} from "../inflame-store.ts";


export const socketStateSelectors = {
    ...socketAdapter.getSelectors<InflameStoreState>((s) => s.comfyuiSocket),
}