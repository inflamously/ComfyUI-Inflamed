import {useEffect, useState} from "react";

const handleHandshake = (ws: WebSocket) => {
    return new Promise<void>((res) => {
        ws.addEventListener("open", () => {
            res()
        }, {
            once: true,
        })
    })
}

const useWebsocket = (props: {
    url: string,
    onOpen?: (event: Event) => void,
    onMessage?: (event: MessageEvent) => void,
    onClose?: (event: CloseEvent) => void,
}) => {
    const {url, onMessage, onClose, onOpen} = props;
    const [, setStateWS] = useState<WebSocket | null>(null)

    useEffect(() => {
        const handleOpenConnection = (ev: Event) => {
            onOpen?.(ev)
        }

        const handleCloseConnection = (ev: CloseEvent) => {
            onClose?.(ev);
        }

        const handleMessage = (ev: MessageEvent) => {
            onMessage?.(ev);
        }

        const ws = new WebSocket(url);

        (async () => {
            await handleHandshake(ws)
            ws.addEventListener("open", handleOpenConnection);
            ws.addEventListener("close", handleCloseConnection);
            ws.addEventListener("message", handleMessage);
            setStateWS(ws);
        })()

        return () => {
            ws.removeEventListener("open", handleOpenConnection);
            ws.removeEventListener("close", handleCloseConnection);
            ws.removeEventListener("message", handleMessage);
            ws.close();
        }
    }, [onClose, onMessage, onOpen, url]);
}

export default useWebsocket