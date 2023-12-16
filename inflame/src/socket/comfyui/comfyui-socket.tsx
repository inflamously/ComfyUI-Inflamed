import {useCallback} from "react";
import useWebsocket from "../websocket.tsx";
import {useSelector} from "react-redux";
import {socketSliceActions} from "../../+state/socket/socket-slice.ts";
import {socketStateSelectors} from "../../+state/socket/socket.selectors.ts";
import {AppState, useAppDispatch} from "../../+state/inflame-store.ts";
import {isMessageEvent, isOfMessageEventString} from "../websocket.utils.ts";
import {isSidPresent} from "./comfyui-socket.utils.ts";

export const COMFYUI_SOCKET = "comfyui-socket"

const isComfyuiMessage = (eventData: unknown): eventData is ComfyuiMessage => {
    return eventData != null && (eventData as ComfyuiMessage)?.type !== undefined && (eventData as ComfyuiMessage)?.data !== undefined
}

const useComfyuiSocket = () => {
    const dispatch = useAppDispatch()
    const socketState = useSelector(
        (state: AppState) => socketStateSelectors.selectSocketById(state, COMFYUI_SOCKET)
    )

    const handleMessage = useCallback((ev: MessageEvent) => {
        if (!isMessageEvent(ev)) {
            console.warn("Unreadable MessageEvent")
            return
        }

        if (!isOfMessageEventString(ev)) {
            console.warn("Invalid message format")
            return;
        }

        const data = JSON.parse(ev.data);
        if (!isComfyuiMessage(data)) {
            console.warn(`Invalid comfyui websocket message received. ${JSON.stringify(ev)}`)
            return;
        }

        const message = data;
        switch (message.type) {
            case "status": {
                // In case of sid we have a new client
                if (isSidPresent(message.data) && !socketState) {
                    dispatch(socketSliceActions.createSocket({
                        name: COMFYUI_SOCKET,
                        clientId: message.data.sid
                    }))

                    // TODO: Edit or remove
                    dispatch(socketSliceActions.socketEvent({}))
                }
                break;
            }
            case "executed": {
                break;
            }
            default:
                throw new Error(`Message type not implemented "${ev.type}"`)
        }
    }, [dispatch, socketState])

    useWebsocket({
        url: `ws://localhost:8188/ws${socketState ? `?clientId=${socketState.clientId}` : ""}`,
        onMessage: handleMessage
    })
}

export default useComfyuiSocket