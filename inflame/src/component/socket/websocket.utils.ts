export const isMessageEvent = (obj: unknown): obj is MessageEvent => {
    return obj != null && (obj as MessageEvent).type !== undefined && (obj as MessageEvent)?.data !== undefined;
}

export const isOfMessageEventString = (obj: MessageEvent): obj is MessageEvent<string> => {
    return obj != null && typeof obj.data === "string"
}

export const resolveToMessageEvent = (ev: Event): ev is MessageEvent => {
    if (!isMessageEvent(ev)) {
        console.warn("Unreadable MessageEvent")
        return false
    }

    if (!isOfMessageEventString(ev)) {
        console.warn("Invalid message format")
        return false;
    }


    return true;
}