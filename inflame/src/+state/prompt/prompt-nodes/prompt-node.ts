import {
    PromptNodeConnections, PromptNodeConnection, PromptNodeConnectionBind,
} from "./prompt-node-connection.ts";


export type PromptNodeConfig<
    State,
    Inputs extends Record<string, PromptNodeConnection>,
    Outputs extends Record<string, PromptNodeConnection>
> = {
    inputs?: PromptNodeConnections<Inputs>,
    outputs?: PromptNodeConnections<Outputs>,
    // Defines inputs which are bound to state and or are of special use cases.
    stateInputs?: (state: State) => PromptNodeConnections<Record<string, never>>
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
    Inputs extends Record<string, PromptNodeConnection>,
    Outputs extends Record<string, PromptNodeConnection>,
> = {
    id: Readonly<string>,
    classtype: string,
    getInputs: () => PromptNodeConnections<Inputs> | undefined,
    getStateInputs?: () => PromptNodeConnections<Record<string, never>> | undefined,
    setInputs: (inputs: PromptNodeConnections<Inputs>) => void
    getState: () => State,
    setState: (state: State) => void,
    getOutputs: () => PromptNodeConnections<Outputs> | undefined,
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
    Inputs extends Record<string, Readonly<PromptNodeConnectionBind | undefined>>,
    Outputs extends Record<string, Readonly<PromptNodeConnectionBind | undefined>>,
>(
    props: PromptNodeFields<State>,
    classtype: string,
    defaultInputs: [Inputs] extends [never] ? undefined : Inputs,
    config?: PromptNodeConfig<
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

    // Node's state values
    let __state = initialState
    let __inputs = config?.inputs ?? defaultInputs
    const __outputs = config?.outputs

    // Nodes state changing functions
    const setState = (state: State) => __state = state
    const setInputs = (inputs: PromptNodeConnections<Inputs>) => {
        __inputs = inputs
    }

    return {
        id,
        classtype,
        getInputs: () => __inputs,
        getStateInputs: () => config?.stateInputs?.(__state),
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
    getInputs: () => PromptNodeConnections<Record<string, PromptNodeConnection>> | undefined,
    getStateInputs?: () => PromptNodeConnections<Record<string, never>> | undefined,
    setInputs: (inputs: PromptNodeConnections<never>) => void
    getState: () => never | unknown,
    setState: (state: never) => void,
    getOutputs: () => PromptNodeConnections<Record<string, PromptNodeConnection>> | undefined,
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