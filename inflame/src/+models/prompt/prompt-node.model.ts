import {BaseNodeTypeDefinition} from "./prompt-node-definition.model.ts";
import {GenericNode} from "../../prompt-nodes/generic-node/generic-node.ts";

export type PromptNodeInputs<Inputs, StateInputs> = Inputs | StateInputs

/**
 * Object which declares a node's ID and its initialState which can be passed into it
 */
export type PromptNodeFields<State> = {
    id: string,
    initialState: State
}

/**
 * Foundation of PromptNode
 * This defines the final PromptNode that is use in a Prompt Workflow and so on.
 */
export type PromptNode<NTD extends BaseNodeTypeDefinition> = {
    id: string,
    classtype: string,
    state: Partial<NTD["state"]>,
    inputs: PromptNodeInputs<NTD["inputs"], NTD["stateInputs"]>, // Mix both input types for access via inputs
    outputs: NTD["outputs"],
}

export type PromptNodeValue<Value, Options extends Record<string, unknown>> = {
    value: Value,
    options: Options | undefined
}

/**
 * Abstract node type that can be use in arrays, containers and contexts where its inner details do not matter.
 */
export type AbstractPromptNode = GenericNode