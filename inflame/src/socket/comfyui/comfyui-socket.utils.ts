export const isSidPresent = (message: ComfyuiStatusDTO | ComfyuiStatusWithSidDTO): message is ComfyuiStatusWithSidDTO & ComfyuiStatusMessage => {
    return (message as ComfyuiStatusWithSidDTO)?.sid !== undefined
}