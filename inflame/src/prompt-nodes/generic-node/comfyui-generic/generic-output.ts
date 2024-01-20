import {BindValueLink} from "@inflame/models";
import {mapNodeIOLinks} from "./comfyui-generic-node.utils.ts";

export const mapComfyuiOutput = (props: {
    id: string,
    slot: number,
    type: string,
}): BindValueLink | undefined => {
    return mapNodeIOLinks(props)
}