export const isMessageEvent = (obj: unknown): obj is MessageEvent => {
    return obj != null && (obj as MessageEvent).type !== undefined && (obj as MessageEvent)?.data !== undefined;
}

export const isOfMessageEventString = (obj: MessageEvent): obj is MessageEvent<string> => {
    return obj != null && typeof obj.data === "string"
}