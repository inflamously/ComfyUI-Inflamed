import {BindValueLink, PromptNodeConnection} from "@inflame/models";

type ComfyuiInputs = {
    required: Record<string, unknown[] | unknown[][]>
}

export const isComfyuiInput = (obj: Record<string, unknown>): obj is ComfyuiInputs => {
    return (obj as ComfyuiInputs)?.required !== undefined
}

export const checkIfInputIsLink = (value: string) => {
    return [
        "IMAGE"
    ].includes(value)
}

const mapComfyuiInputType = (
    nodeInput: [string, unknown[] | unknown[][] | Record<string, unknown>]
): PromptNodeConnection | undefined => {
    const [key, values] = nodeInput

    if (Array.isArray(values) && values.length > 0 && typeof values[0] === "string") {
        // We return here undefined since the input must be bound from other context
        return undefined
    } else {
        console.warn(`Node has invalid config ${key} ${values}`)
        return undefined;
    }
}

export const mapComfyuiInput = (
    input: Record<string, unknown>
): Record<string, BindValueLink> | undefined => {
    if (!isComfyuiInput(input)) {
        return undefined
    }

    const entries = Object.keys(input.required)
        .map((key) => [key, mapComfyuiInputType([key, input.required[key]])])

    return Object.fromEntries(entries)
}