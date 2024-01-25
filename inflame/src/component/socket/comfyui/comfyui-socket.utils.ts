import {ComfyuiSocketMessages, ComfyuiStatusDTO, ComfyuiStatusWithSidDTO} from "@inflame/models";

export const isSidPresent = (message: ComfyuiStatusDTO | ComfyuiStatusWithSidDTO): message is ComfyuiStatusWithSidDTO => {
    return (message as ComfyuiStatusWithSidDTO)?.sid !== undefined
}

export const isComfyuiMessage = (eventData: unknown): eventData is ComfyuiSocketMessages => {
    return eventData != null && (eventData as ComfyuiSocketMessages)?.type !== undefined && (eventData as ComfyuiSocketMessages)?.data !== undefined
}