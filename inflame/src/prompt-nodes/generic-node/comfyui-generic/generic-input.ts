import {PromptNodeConnection} from "@inflame/models";

type ComfyuiInputs = {
    required: Record<string, unknown[] | unknown[][]>
}

export const isComfyuiInput = (obj: Record<string, unknown>): obj is ComfyuiInputs => {
    return (obj as ComfyuiInputs)?.required !== undefined
}

export const checkIfLinkInput = (value: string) => {
    return [
        "IMAGE"
    ].includes(value)
}

const mapComfyuiInputType = (
    id: string,
    slot: number,
    nodeInput: [string, unknown[] | unknown[][] | Record<string, unknown>]
): PromptNodeConnection | undefined => {
    const [key, values] = nodeInput

    if (Array.isArray(values) && values.length > 0 && typeof values[0] === "string") {
        return checkIfLinkInput(values[0]) ? {
            kind: "link",
            id,
            slot,
        } : undefined
    } else {
        console.warn(`Node has invalid config ${key} ${values}`)
        return undefined;
    }
}

export const mapComfyuiInput = (
    id: string,
    input: Record<string, unknown>
): Record<string, PromptNodeConnection> | undefined => {
    if (!isComfyuiInput(input)) {
        return undefined
    }

    return Object.fromEntries(
        Object.keys(input.required).map((key, index) => {
            return [key, mapComfyuiInputType(id, index, [key, input.required[key]])]
        })
    )
}