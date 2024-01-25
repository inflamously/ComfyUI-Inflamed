import {EventListener} from "../../core/event.ts";

export type AppSocket = {
    id?: string,
    listener?: SocketListener,
}

export type SocketListener = {
    onOpen?: () => void,
    onMessage?: EventListener,
    onClose?: () => void,
}