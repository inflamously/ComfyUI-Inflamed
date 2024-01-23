import {BindValueLink} from "@inflame/models";

type ComfyuiInputs = {
    required: Record<string, unknown[] | unknown[][]>
}

export const isComfyuiInput = (obj: Record<string, unknown>): obj is ComfyuiInputs => {
    return (obj as ComfyuiInputs)?.required !== undefined
}

export const mapComfyuiInput = (
    input: Record<string, unknown>
): Record<string, BindValueLink> | undefined => {
    if (!isComfyuiInput(input)) {
        return undefined
    }

    const entries = Object
        .keys(input.required)
        .map((key) =>
            // We return here undefined because BindValueLink must be used from other contexts
            [key, undefined]
        )

    return Object.fromEntries(entries)
}