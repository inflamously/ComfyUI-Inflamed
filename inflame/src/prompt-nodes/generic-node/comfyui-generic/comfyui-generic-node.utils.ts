import {AbstractDataNode, BindValueLink} from "@inflame/models";
import {promptNodeGeneric} from "../generic-node.ts";
import {mapComfyuiNodeState} from "./generic-state.ts";
import {mapComfyuiOutput} from "./generic-output.ts";
import {mapComfyuiInput} from "./generic-input.ts";

export const checkIfInputIsLink = (value: string) => {
    return [
        "MODEL",
        "CLIP",
        "VAE",
        "IMAGE",
        "MASK",
    ].includes(value)
}

export const mapNodeIOLinks = (props: {
    id: string,
    slot: number,
    type: string,
}): BindValueLink | undefined => {
    const {id, slot, type} = props

    if (checkIfInputIsLink(type)) {
        return {
            id,
            slot,
            kind: "link",
        }
    }

    console.error(`Unsupported type "${type}" when mapping comfyui output`)
    return undefined
}

const mapComfyuiOutputs = (
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

const mapComfyuiInputs = (
    input: Record<string, unknown>
) => {
    return mapComfyuiInput(input)
}

export const comfyuiDataNodeAsGenericPromptNode = (
    id: string,
    dataNode: AbstractDataNode
) => {
    if (!dataNode) {
        console.error("Invalid data-node provided")
        return undefined
    }

    const {
        name
    } = dataNode

    return promptNodeGeneric(
        {
            id,
            classtype: name,
            initialState: mapComfyuiNodeState(dataNode.input) ?? {}
        },
        mapComfyuiInputs(dataNode.input) ?? {},
        mapComfyuiOutputs(id, dataNode.output) ?? {},
    )
}