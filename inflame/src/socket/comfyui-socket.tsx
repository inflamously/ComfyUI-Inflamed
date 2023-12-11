import {useCallback} from "react";
import {ComfyuiEventStatus, WS_COMFYUI_STATE} from "./comfyui-socket-state.ts";
import useWebsocket from "./websocket.tsx";
import {useSelector} from "react-redux";
import {socketSliceActions} from "../+state/socket/socket-slice.ts";
import {socketStateSelectors} from "../+state/socket/socket.selectors.ts";
import {AppState, useAppDispatch} from "../+state/inflame-store.ts";
import {SOCKET_MAIN} from "../+state/socket/socket.model.ts";

const useComfyuiSocket = () => {
    const dispatch = useAppDispatch()
    const socketState = useSelector(
        (state: AppState) => socketStateSelectors.selectSocketById(state, "main")
    )

    const handleMessage = useCallback((ev: MessageEvent) => {
        if (!ev || !ev.data) {
            return;
        }

        let messageData: Record<string, unknown> | null = null
        try {
            messageData = JSON.parse(ev.data);
        } catch (e) {
            console.error(e);
        }
        if (!messageData) {
            return;
        }

        if ("type" in messageData) {
            switch (messageData.type) {
                case WS_COMFYUI_STATE.STATUS: {
                    const statusData = messageData.data as ComfyuiEventStatus
                    // In case of sid we have a new client
                    if (statusData.sid && !socketState) {
                        dispatch(socketSliceActions.createSocket({
                            name: SOCKET_MAIN,
                            clientId: statusData.sid
                        }))

                        // TODO: Edit or remove
                        dispatch(socketSliceActions.socketEvent(""))
                    }
                    break;
                }
                case WS_COMFYUI_STATE.EXECUTED: {
                    break;
                }
                default:
                    throw new Error(`Message type not implemented "${messageData.type}"`)
            }
        }
    }, [dispatch, socketState])

    // First try connecting to acquire clientId
    // Afterwards use clientId to connect to message pool
    useWebsocket({
        url: `ws://localhost:8188/ws${socketState ? `?clientId=${socketState.clientId}` : ""}`,
        onMessage: handleMessage
    })
}

export default useComfyuiSocket