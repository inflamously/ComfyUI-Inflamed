import {PromptNodeConnection} from "@inflame/models";

/**
 * This file defines the base model of a node
 * State: Basically anything your dream mapping of
 * Inputs: You can put other node's outputs into this or define a constant value
 * Outputs: This is where a node emits its value and passes it down further
 * StateInputs: Acccess state to define a custom node's input constant aka. select first image in state.images[0]
 */

export type BaseNodeTypeDefinition = NodeTypeDefinition<
    Record<string, unknown>,
    Record<string, PromptNodeConnection>,
    Record<string, PromptNodeConnection>,
    Record<string, PromptNodeConnection>
>

export type NodeTypeDefinition<
    State extends Record<string, unknown>,
    Inputs extends Record<string, PromptNodeConnection>,
    Outputs extends Record<string, PromptNodeConnection>,
    StateInputs extends Record<string, PromptNodeConnection>
> = {
    inputs: Inputs,
    state: State,
    stateInputs: StateInputs,
    outputs: Outputs
}