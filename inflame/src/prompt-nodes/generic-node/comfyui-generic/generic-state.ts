import {isComfyuiInput} from "./generic-input.ts";

export type ComfyuiIntOptions = {
    default: number,
    min: number,
    max: number
}

const comfyuiStateTypeConstantMapper = (stateType: string, options: Record<string, unknown> | undefined) => {
    switch (stateType) {
        case "INT": {
            return {
                value: 0,
                options,
            }
        }
    }
}

export const mapComfyuiNodeState = (
    input: Record<string, unknown>
) => {
    if (!isComfyuiInput(input)) {
        return undefined
    }

    return Object.fromEntries(
        Object.keys(input.required).map((key) => {
            const [type, value] = input.required[key]

            const isTypeLink = typeof type === "string" && value === undefined
            const isTypeArray = Array.isArray(type) && value === undefined
            const isTypeConstant = typeof type === "string" && value !== undefined
            const isValueAnObject = typeof value === "object" && !Array.isArray(value)

            if (isTypeArray) {
                return [key, type]
            }

            if (isTypeLink) {
                return []
            }

            if (isTypeConstant && value !== null && isValueAnObject) {
                comfyuiStateTypeConstantMapper(type, value as Record<string, unknown>)
                console.log(type, value)
            }

            return [key, input.required[key]]
        }).filter((entry) => entry.length == 2)
    )
}