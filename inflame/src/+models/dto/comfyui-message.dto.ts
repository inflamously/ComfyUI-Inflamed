export type ComfyuiMessage<
    MessageType extends string,
    MessageDataType
> = {
    type: MessageType,
    data: MessageDataType
}


export type ComfyuiStatusWithSidDTO = {
    sid: string,
    status: {
        exec_info: {
            queue_remaining: number
        }
    }
}
export type ComfyuiStatusDTO = Omit<ComfyuiStatusWithSidDTO, "sid">
type ComfyuiStatusMessage = ComfyuiMessage<"status", ComfyuiStatusDTO | ComfyuiStatusWithSidDTO>


export type ComfyuiExecutingDTO = {
    node: string,
    prompt_id: string,
}
type ComfyuiExecutingMessage = ComfyuiMessage<"executing", ComfyuiExecutingDTO>


export type ComfyuiExecutedDTO = {
    node: string,
    output: Record<string, unknown>,
    prompt_id: string,
}
type ComfyuiExecutedMessage = ComfyuiMessage<"executed", ComfyuiExecutedDTO>


export type ComfyuiExecutionStartDTO = {
    prompt_id: string,
}
type ComfyuiExecutionStartMessage = ComfyuiMessage<"execution_start", ComfyuiExecutionStartDTO>


export type ComfyuiProgressDTO = {
    value: number,
    max: number
}
type ComfyuiProgressMessage = ComfyuiMessage<"progress", ComfyuiProgressDTO>


export type ComfyuiExecutionCachedDTO = {
    nodes: Array<string>,
    prompt_id: string
}
export type ComfyuiExecutionCachedMessage = ComfyuiMessage<"execution_cached", ComfyuiExecutionCachedDTO>


export type ComfyuiSocketMessages =
    | ComfyuiStatusMessage
    | ComfyuiExecutingMessage
    | ComfyuiExecutionStartMessage
    | ComfyuiExecutionCachedMessage
    | ComfyuiProgressMessage
    | ComfyuiExecutedMessage