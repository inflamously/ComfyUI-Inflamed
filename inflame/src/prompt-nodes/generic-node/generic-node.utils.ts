import {AbstractDataNode, BindValueLink} from "@inflame/models";
import {promptNodeGeneric} from "./generic-node.ts";
import {mapComfyuiOutput} from "./comfyui-generic/generic-output.ts";
import {mapComfyuiInput} from "./comfyui-generic/generic-input.ts";
import {mapGenericPromptNodeState} from "./comfyui-generic/generic-state.ts";

export const mapNodeIOLinks = (props: {
    id: string,
    slot: number,
    type: string,
}): BindValueLink | undefined => {
    const {id, slot, type} = props

    switch (type) {
        case "MODEL":
        case "CLIP":
        case "VAE":
        case "IMAGE":
        case "MASK":
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

const mapGenericPromptNodeOutputs = (
    id: string,
    output: { type: string, label: string }[]
): Record<string, BindValueLink> | undefined => {
    if (!output || output.length <= 0) {
        return undefined
    }

    return Object.fromEntries(
        output.map((output, index) =>
            [output.label, mapComfyuiOutput({
                id,
                slot: index,
                type: output.type
            })]
        ).filter((entry) => entry !== undefined)
    )
}

const mapGenericPromptNodeInputs = (
    id: string,
    input: Record<string, unknown>
) => {
    return mapComfyuiInput(id, input)
}

export const dataNodeAsGenericPromptNode = (
    id: string,
    dataNode: AbstractDataNode
) => {
    if (!dataNode) {
        console.error("Invalid data-node provided")
        return
    }

    const {
        name
    } = dataNode

    return promptNodeGeneric(
        {
            id,
            classtype: name,
            initialState: mapGenericPromptNodeState(dataNode.input) ?? {}
        },
        mapGenericPromptNodeInputs(id, dataNode.input) ?? {},
        mapGenericPromptNodeOutputs(id, dataNode.output) ?? {},
    )
}