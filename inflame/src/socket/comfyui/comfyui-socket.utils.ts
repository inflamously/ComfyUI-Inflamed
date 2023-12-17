import {ComfyuiStatusDTO, ComfyuiStatusWithSidDTO} from "./dto/comfyui-message.model.ts";

export const isSidPresent = (message: ComfyuiStatusDTO | ComfyuiStatusWithSidDTO): message is ComfyuiStatusWithSidDTO => {
    return (message as ComfyuiStatusWithSidDTO)?.sid !== undefined
}