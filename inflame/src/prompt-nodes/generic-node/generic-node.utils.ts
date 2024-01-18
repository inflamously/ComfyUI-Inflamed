import {
    AbstractDataNode, AbstractPromptNode,
    BindValueLink, DynamicNodeTypeDefinition,
    BuilderInputBind
} from "@inflame/models";
import {promptNodeGeneric} from "./generic-node.ts";
import {mapComfyuiOutput} from "./comfyui-generic/generic-output.ts";
import {mapComfyuiInput} from "./comfyui-generic/generic-input.ts";
import {mapComfyuiNodeState} from "./comfyui-generic/generic-state.ts";
import {NodeTypeDefinitionBuilder} from "../../+models/prompt/prompt-node-builder.model.ts";

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

export const dataNodeAsGenericPromptNode = (
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

// TODO: Implement NodeTypeDefinition validation
export const typeMapGenericPromptNode = <T extends NodeTypeDefinitionBuilder>(
    id: string,
    dataNode: AbstractDataNode,
    nodeTypeDefinition: T
): DynamicNodeTypeDefinition<T> | undefined => {
    return dataNodeAsGenericPromptNode(id, dataNode) as DynamicNodeTypeDefinition<T>
}