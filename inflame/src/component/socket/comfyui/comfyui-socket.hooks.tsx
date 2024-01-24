import {useCallback} from "react";
import useWebsocket from "../websocket.tsx";
import {useSelector} from "react-redux";
import {isMessageEvent, isOfMessageEventString} from "../websocket.utils.ts";
import {isSidPresent} from "./comfyui-socket.utils.ts";
import {ComfyuiSocketMessages} from "@inflame/models";
import {AppState, useAppDispatch} from "@inflame/state";
import {socketStateSelectors} from "@inflame/state";
import {socketSliceActions} from "@inflame/state";
import {comfyuiSocketActions} from "@inflame/state";

export const COMFYUI_SOCKET = "comfyui-socket"

const isComfyuiMessage = (eventData: unknown): eventData is ComfyuiSocketMessages => {
    return eventData != null && (eventData as ComfyuiSocketMessages)?.type !== undefined && (eventData as ComfyuiSocketMessages)?.data !== undefined
}

// TODO: Remove redux specific code by providing event listeners via props and pushing events to them, afterwards create a new redux like socket that dispatches events below into store to be listened.
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
                }
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
    }, [dispatch, socketState])

    useWebsocket({
        url: `ws://localhost:8188/ws${socketState ? `?clientId=${socketState.clientId}` : ""}`,
        onMessage: handleMessage
    })
}

export default useComfyuiSocket