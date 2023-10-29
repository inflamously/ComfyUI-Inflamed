import {
    DynamicPromptNodeLinkObject, PromptNodeBindMap, PromptNodeBindTypes,
} from "./prompt-node-link.ts";

// TODO: Fix typing issue?
type PromptNodeExtraInputs<ParamState> = (state: ParamState) => DynamicPromptNodeLinkObject<Record<string, never>>
type PromptNodeExtraInputsResult<ParamState> = ReturnType<PromptNodeExtraInputs<ParamState>>

export type PromptNodeConfig<
    State,
    Inputs extends Record<string, PromptNodeBindMap>,
    Outputs extends Record<string, PromptNodeBindMap>
> = {
    inputs?: DynamicPromptNodeLinkObject<Inputs>,
    outputs?: DynamicPromptNodeLinkObject<Outputs>,
    // Defines extra inputs which are some sort of special use case of that specific node.
    extraInputs?: PromptNodeExtraInputs<State>
}

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
export type PromptNodeType<
    State,
    Inputs extends Record<string, PromptNodeBindMap>,
    Outputs extends Record<string, PromptNodeBindMap>,
> = {
    id: Readonly<string>,
    classtype: string,
    getInputs: () => Readonly<DynamicPromptNodeLinkObject<Inputs>> | undefined,
    getExtraInputs: () => PromptNodeExtraInputsResult<State> | undefined,
    setInputs: (inputs: DynamicPromptNodeLinkObject<Inputs>) => void
    getState: () => Readonly<State>,
    setState: (state: State) => void,
    getOutputs: () => Readonly<DynamicPromptNodeLinkObject<Outputs>> | undefined,
}

/**
 * State: Internal state of node
 *
 * Inputs: Define connections from other node
 *
 * Outputs: Defines available data points to be used for external nodes
 */
// TODO: Check inputs and validate for ids
export const PromptNodeTypeCreator = <
    State,
    Inputs extends Record<string, Readonly<PromptNodeBindTypes | undefined>>,
    Outputs extends Record<string, Readonly<PromptNodeBindTypes | undefined>>,
>(
    props: PromptNodeFields<State>,
    classtype: string,
    config: PromptNodeConfig<
        State,
        Inputs,
        Outputs
    >,
): PromptNodeType<State, Inputs, Outputs> => {
    // Properties configuring the node
    const {
        id,
        initialState
    } = props

    const {
        inputs,
        outputs,
        extraInputs
    } = config;

    // Node's state values
    let __state = initialState
    let __inputs = inputs
    const __outputs = outputs

    // Nodes state changing functions
    const setState = (state: State) => __state = state
    const setInputs = (inputs: DynamicPromptNodeLinkObject<Inputs>) => {
        __inputs = inputs
    }

    return {
        id,
        classtype,
        getInputs: () => __inputs,
        getExtraInputs: () => extraInputs?.(__state),
        setInputs,
        getState: () => __state,
        setState,
        getOutputs: () => __outputs,
    }
}

/**
 * Abstract node type that can be use in arrays, containers and contexts where its inner details do not matter.
 */
export type AbstractPromptNodeType = {
    id: Readonly<string>,
    classtype: string,
    getInputs: () => DynamicPromptNodeLinkObject<Record<string, never>> | undefined,
    setInputs: (inputs: DynamicPromptNodeLinkObject<never>) => void
    getState: () => Readonly<never | unknown>,
    setState: (state: never) => void,
    getOutputs: () => DynamicPromptNodeLinkObject<Record<string, never>> | undefined,
}

export type PromptNodeTypeGuardFunction<T extends AbstractPromptNodeType = never> = (obj: AbstractPromptNodeType | undefined) => obj is T;

/**
 * Cast specific node to a given type based on its classtype which should be unique.
 */
export const PromptNodeTypeGuard = <T extends AbstractPromptNodeType = never>(classtype: string): PromptNodeTypeGuardFunction<T> => {
    return (obj: AbstractPromptNodeType | undefined): obj is T => {
        return obj !== undefined && obj !== null && obj.classtype === classtype
    }
}