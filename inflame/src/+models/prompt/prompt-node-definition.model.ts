import {PromptNodeConnection} from "@inflame/models";

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