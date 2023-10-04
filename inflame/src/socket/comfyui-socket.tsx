import {useCallback} from "react";
import {ComfyuiEventStatus, WS_COMFYUI_STATE} from "./comfy-state.ts";
import useWebsocket from "./websocket.tsx";
import {useDispatch, useSelector} from "react-redux";
import {socketSliceActions} from "../+state/socket/socket-slice.ts";
import {socketStateSelectors} from "../+state/socket/socket-selectors.ts";
import {InflameStoreState} from "../+state/inflame-store.ts";
import {SOCKET_MAIN} from "../+state/socket/socket-names.ts";

const useComfyuiSocket = () => {
    const dispatch = useDispatch()
    const socketState = useSelector(
        (state: InflameStoreState) => socketStateSelectors.selectById(state, "main")
    )

    const handleMessage = useCallback((ev: MessageEvent) => {
        if (!ev || !ev.data) {
            return;
        }

        const messageData = JSON.parse(ev.data);
        if ("type" in messageData) {
            switch (messageData.type) {
                case WS_COMFYUI_STATE.STATUS: {
                    const statusData = messageData.data as ComfyuiEventStatus
                    // Incase of sid we have a new client
                    if (statusData.sid && !socketState) {
                        dispatch(socketSliceActions.createSocketState({
                            name: SOCKET_MAIN,
                            clientId: statusData.sid
                        }))
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