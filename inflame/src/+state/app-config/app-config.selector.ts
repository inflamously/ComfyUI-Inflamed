import {AppState} from "../inflame-store.ts";
import {AppConfigState} from "./app-config.slice.ts";

export const selectAppState = (state: AppState & AppConfigState): AppConfigState | undefined => {
    return state.appConfig ? state.appConfig : state;
}