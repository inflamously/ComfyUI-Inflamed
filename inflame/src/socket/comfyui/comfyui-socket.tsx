import {useCallback} from "react";
import {ComfyuiEventStatus, WS_COMFYUI_STATE} from "./comfyui-socket-state.ts";
import useWebsocket from "../websocket.tsx";
import {useSelector} from "react-redux";
import {socketSliceActions} from "../../+state/socket/socket-slice.ts";
import {socketStateSelectors} from "../../+state/socket/socket.selectors.ts";
import {AppState, useAppDispatch} from "../../+state/inflame-store.ts";
import {SOCKET_MAIN} from "../../+state/socket/socket.model.ts";

type ComfyuiMessageEvent = { type: string } & MessageEvent

const isComfyuiMessage = (ev: MessageEvent): ev is ComfyuiMessageEvent => {
    let messageData: Record<string, unknown> | null = null
    try {
        messageData = JSON.parse(ev.data);
    } catch (e) {
        console.error(e);
        return true;
    }

    return messageData !== null && "type" in messageData && "data" in messageData;
}

const useComfyuiSocket = () => {
    const dispatch = useAppDispatch()
    const socketState = useSelector(
        (state: AppState) => socketStateSelectors.selectSocketById(state, "main")
    )

    const handleWebsocketMessage = useCallback((ev: MessageEvent) => {
        if (!ev || !ev.data) {
            return true;
        }

        if (isComfyuiMessage(ev)) {
            switch (ev.type) {
                case WS_COMFYUI_STATE.STATUS: {
                    const statusData = ev.data as ComfyuiEventStatus
                    // In case of sid we have a new client
                    if (statusData.sid && !socketState) {
                        dispatch(socketSliceActions.createSocket({
                            name: SOCKET_MAIN,
                            clientId: statusData.sid
                        }))

                        // TODO: Edit or remove
                        dispatch(socketSliceActions.socketEvent({}))
                    }
                    break;
                }
                case WS_COMFYUI_STATE.EXECUTED: {
                    break;
                }
                default:
                    throw new Error(`Message type not implemented "${ev.type}"`)
            }
        } else {
            console.warn(`Invalid websocket message received. ${JSON.stringify(ev)}`)
            return;
        }
    }, [dispatch, socketState])

    // First try connecting to acquire clientId
    // Afterwards use clientId to connect to message pool
    useWebsocket({
        url: `ws://localhost:8188/ws${socketState ? `?clientId=${socketState.clientId}` : ""}`,
        onMessage: handleWebsocketMessage
    })
}

export default useComfyuiSocket