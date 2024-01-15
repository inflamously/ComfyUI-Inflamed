import {AbstractDataNode, PromptNodeConnection} from "@inflame/models";
import {promptNodeGeneric} from "./generic-node.ts";
import {mapComfyuiOutput} from "./comfyui-generic/generic-output.ts";
import {mapComfyuiInput} from "./comfyui-generic/generic-input.ts";
import {mapGenericPromptNodeState} from "./comfyui-generic/generic-state.ts";

const mapGenericPromptNodeOutputs = (
    id: string,
    output: { type: string, label: string }[]
): Record<string, PromptNodeConnection> | undefined => {
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

    console.log(dataNode)

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