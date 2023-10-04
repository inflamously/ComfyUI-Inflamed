import structuredClone from "@ungap/structured-clone";

export type PromptNodeLink = {
    id: string,
    slot: number,
}

export type PromptNodeFields<State> = {
    id: string,
    initialState?: State
}

export type AbstractPromptNode = ReturnType<typeof PromptNode>

export type NodeWithoutOutputs = Record<string, never>

/**
 * State: Internal state of node
 * Inputs: Define connections from other node
 * Outputs: Defines available data points to be used for external nodes
 */
// TODO: Check inputs and validate for ids
export function PromptNode<
    Outputs extends Record<string, PromptNodeLink> | NodeWithoutOutputs,
    State extends Record<string, unknown> | undefined,
    Inputs extends Record<string, PromptNodeLink>,
>(
    props: PromptNodeFields<State>,
    classtype: string,
    outputs: Record<string, Omit<PromptNodeLink, "id" | "slot">>,
) {
    let __inputs: Inputs;
    let __state: State | undefined = props.initialState

    return {
        id: props.id,
        classtype,
        getOutputs: (): Record<keyof Outputs, PromptNodeLink> => {
            const modifiedOutputs: Record<string, Omit<PromptNodeLink, "id" | "slot">> = structuredClone(outputs)

            Object.keys(modifiedOutputs).forEach((key, slot) => {
                    modifiedOutputs[key] = Object.assign(structuredClone(modifiedOutputs[key]), {
                        id: props.id,
                        slot,
                    })
                }
            )

            return modifiedOutputs as Outputs
        },
        getState: () => __state,
        setState: (state: State) => {
            __state = __state ? Object.assign(structuredClone(__state), state) : undefined
        },
        getInputs: () => __inputs,
        setInputs: (inputs: Inputs) => {
            __inputs = inputs
        },
        json: (): string => {
            return ""
        },
        parse: (json: string) => {
            throw new Error(`Not implemented parse(${json})`)
        }
    }
}