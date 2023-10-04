import {DynamicPromptNodeLinkObject, PromptNodeLinkObject, PromptNodeLinkObjectKey} from "./prompt-node-link.ts";


export type PromptNodeFields<State> = {
    id: string,
    initialState: State
}

export type PromptNodeType<
    State,
    Inputs extends PromptNodeLinkObject,
    Outputs extends PromptNodeLinkObject,
> = {
    id: Readonly<string>,
    classtype: string,
    getInputs: () => Readonly<DynamicPromptNodeLinkObject<PromptNodeLinkObjectKey<Inputs>>> | undefined,
    setInputs: (inputs: DynamicPromptNodeLinkObject<PromptNodeLinkObjectKey<Inputs>>) => void
    state: State,
    setState: (state: State) => void,
    getOutputs: () => Readonly<DynamicPromptNodeLinkObject<PromptNodeLinkObjectKey<Outputs>>> | undefined,
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
    Inputs extends PromptNodeLinkObject,
    Outputs extends PromptNodeLinkObject,
>(
    props: PromptNodeFields<State>,
    classtype: string,
    inputs?: DynamicPromptNodeLinkObject<PromptNodeLinkObjectKey<Inputs>>,
    outputs?: DynamicPromptNodeLinkObject<PromptNodeLinkObjectKey<Outputs>>,
): PromptNodeType<State, Inputs, Outputs> => {
    // Properties configuring the node
    const {
        id,
        initialState
    } = props

    // Node's state values
    let __state = initialState
    let __inputs = inputs
    const __outputs = outputs

    // Nodes state changing functions
    const setState = (state: State) => __state = state
    const setInputs = (inputs: DynamicPromptNodeLinkObject<PromptNodeLinkObjectKey<Inputs>>) => {
        __inputs = inputs
    }

    return {
        id,
        classtype,
        getInputs: () => __inputs,
        setInputs,
        state: __state,
        setState,
        getOutputs: () => __outputs,
    }
}

export type AbstractPromptNodeType = {
    id: Readonly<string>,
    classtype: string,
    getInputs: () => DynamicPromptNodeLinkObject<PromptNodeLinkObject> | undefined,
    setInputs: (inputs: DynamicPromptNodeLinkObject<never>) => void
    state: never | unknown,
    setState: (state: never) => void,
    getOutputs: () => DynamicPromptNodeLinkObject<PromptNodeLinkObject> | undefined,
}

export type PromptNodeTypeGuardFunction<T extends AbstractPromptNodeType = never> = (obj: AbstractPromptNodeType | undefined) => obj is T;

export const PromptNodeTypeGuard = <T extends AbstractPromptNodeType = never>(classtype: string): PromptNodeTypeGuardFunction<T> => {
    return (obj: AbstractPromptNodeType | undefined): obj is T => {
        return obj !== undefined && obj !== null && obj.classtype === classtype
    }
}