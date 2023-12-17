type ComfyuiStatusWithSidDTO = {
    sid: string,
    status: {
        exec_info: {
            queue_remaining: number
        }
    }
}

type ComfyuiStatusDTO = Omit<ComfyuiStatusWithSidDTO, "sid">

type ComfyuiStatusMessage = {
    type: "status",
    data: ComfyuiStatusDTO | ComfyuiStatusWithSidDTO
}

// TODO...
type ComfyuiExecutedDTO = never

type ComfyuiExecutedMessage = {
    type: "executed",
    data: ComfyuiExecutedDTO
}

type ComfyuiSocketMessage = ComfyuiStatusMessage | ComfyuiExecutedMessage