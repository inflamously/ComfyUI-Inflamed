import {useContext, useEffect} from "react";
import {AppSocketContext} from "../websocket.tsx";
import {comfyuiSocketActions, socketSliceActions, useAppDispatch} from "@inflame/state";
import {COMFYUI_SOCKET} from "./comfyui-socket.hooks.tsx";
import {resolveToMessageEvent} from "../websocket.utils.ts";
import {isComfyuiMessage} from "./comfyui-socket.utils.ts";

export const useComfyuiSocketEventDispatcher = () => {
    const dispatch = useAppDispatch()
    const appSocket = useContext(AppSocketContext)

    if (!appSocket) {
        return;
    }

    const {id, listener} = appSocket

    useEffect(() => {
        if (!id) {
            return;
        }

        dispatch(socketSliceActions.createSocket({
            name: COMFYUI_SOCKET,
            clientId: id
        }))
    }, [id]);

    useEffect(() => {
        if (!listener) {
            return;
        }

        listener.onMessage?.listen((ev: Event) => {
            if (!resolveToMessageEvent(ev)) {
                return;
            }

            const data = JSON.parse(ev.data);
            if (!isComfyuiMessage(data)) {
                console.warn(`Invalid comfyui websocket message received. ${JSON.stringify(ev)}`)
                return false;
            }

            const message = data;
            switch (message.type) {
                case "status": {
                    dispatch(comfyuiSocketActions.statusEvent(message.data))
                    break;
                }
                case "execution_start": {
                    dispatch(comfyuiSocketActions.executionStart(message.data))
                    break;
                }
                case "execution_cached": {
                    dispatch(comfyuiSocketActions.executionCached(message.data))
                    break;
                }
                case "executing": {
                    dispatch(comfyuiSocketActions.executing(message.data))
                    break;
                }
                case "executed": {
                    dispatch(comfyuiSocketActions.executed(message.data))
                    break;
                }
                default:
                    throw new Error(`Message type not implemented "${message.type}"`)
            }
        })
    }, [listener]);
}