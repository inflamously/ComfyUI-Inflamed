import {useCallback, useState} from "react";
import useWebsocket from "../websocket.tsx";
import {SocketListener} from "@inflame/models";
import {EventListener} from "../../../core/event.ts";
import {isComfyuiMessage, isSidPresent} from "./comfyui-socket.utils.ts";
import {resolveToMessageEvent} from "../websocket.utils.ts";

export const COMFYUI_SOCKET = "comfyui-socket"

// TODO: Remove redux specific code by providing event listeners via props and pushing events to them, afterwards create a new redux like socket that dispatches events below into store to be listened.
const useComfyuiSocket = () => {
    const [socketId, setSocketId] = useState<string | undefined>()

    const [socketListener] = useState<SocketListener>({
        onClose: undefined,
        onMessage: new EventListener(new MessageEvent("comfyui-socket-message")),
        onOpen: undefined,
    })

    const handleMessage = useCallback((ev: MessageEvent) => {
        if (!resolveToMessageEvent(ev)) {
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
                if (isSidPresent(message.data) && !socketId) {
                    setSocketId(message.data.sid)
                }
                break;
            }
        }

        socketListener?.onMessage?.dispatch(ev.data)
    }, [socketListener, setSocketId])

    useWebsocket({
        url: `ws://localhost:8188/ws${socketId ? `?clientId=${socketId}` : ""}`,
        onOpen: undefined,
        onMessage: handleMessage,
        onClose: undefined,
    })

    return {socketListener, socketId}
}

export default useComfyuiSocket