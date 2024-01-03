import {PromptNodeConnection} from "./prompt-node-connection.model.ts";

export type PromptNodeInputs<Inputs, StateInputs> = Inputs | StateInputs | undefined

/**
 * Object which declares a node's ID and its initialState which can be passed into it
 */
export type PromptNodeFields<State> = {
    id: string,
    initialState: State
}

/**
 * Foundation of PromptNode
 */
export type PromptNode<
    State,
    Inputs extends Record<string, PromptNodeConnection>,
    Outputs extends Record<string, PromptNodeConnection>,
    StateInputs extends Record<string, PromptNodeConnection>
> = {
    id: string,
    classtype: string,
    inputs: PromptNodeInputs<Inputs, StateInputs>,
    state: Partial<State>,
    outputs: Outputs,
}

/**
 * Abstract node type that can be use in arrays, containers and contexts where its inner details do not matter.
 */
export type AbstractPromptNode = {
    id: string,
    classtype: string,
    inputs: Record<string, PromptNodeConnection> | undefined,
    state: Record<string, unknown>,
    outputs: Record<string, PromptNodeConnection> | undefined,
}