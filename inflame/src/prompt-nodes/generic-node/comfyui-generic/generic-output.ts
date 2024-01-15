import {BindValueLink} from "@inflame/models";

export const mapComfyuiOutput = (props: {
    id: string,
    slot: number,
    type: string,
}): BindValueLink | undefined => {
    const {
        id,
        slot,
        type,
    } = props
    switch (type) {
        case "MASK":
        case "IMAGE":
            return {
                id,
                slot,
                kind: "link",
            }
        default:
            console.error(`Unsupported type "${type}" when mapping comfyui output`)
            return undefined
    }
}