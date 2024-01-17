import {checkIfInputIsLink, isComfyuiInput} from "./generic-input.ts";

export const mapGenericPromptNodeState = (
    input: Record<string, unknown>
) => {
    if (!isComfyuiInput(input)) {
        return undefined
    }

    return Object.fromEntries(
        Object.keys(input.required).map((key) => {
            const value = input.required[key]?.[0]
            const isLinkInput = typeof value === "string" && checkIfInputIsLink(value)
            return isLinkInput ? [] : [key, input.required[key]]
        }).filter((entry) => entry.length == 2)
    )
}