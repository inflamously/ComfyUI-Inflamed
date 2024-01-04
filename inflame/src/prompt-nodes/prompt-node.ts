import {calculateStateInputs} from "./prompt-node.utils.ts";
import {PromptNode, PromptNodeConnection, PromptNodeFields} from "@inflame/models";
import {AbstractPromptNode} from "@inflame/models";
import {BaseNodeTypeDefinition} from "@inflame/models";

export type PromptNodeConfig<
    State,
    Inputs extends Record<string, PromptNodeConnection>,
    StateInputs extends Record<string, PromptNodeConnection>
> = {
    inputs?: Inputs,
    // TODO: Convert type to Record<string (key of state), string (key of state)>
    stateInputs?: (state: State) => StateInputs // Defines inputs which are bound to state and or are of special use cases.
}

/**
 * State: Internal state of node
 * Inputs: Define connections from other node
 * Outputs: Defines available data points to be used for external nodes
 */
// TODO: Check inputs and validate for ids
export const createPromptNode = <NTD extends BaseNodeTypeDefinition>(
    props: PromptNodeFields<NTD["state"]>,
    classtype: string,
    defaultInputs: [NTD["inputs"]] extends [never] ? undefined : NTD["inputs"],
    outputs: NTD["outputs"] | undefined,
    config?: PromptNodeConfig<
        NTD["state"],
        NTD["inputs"],
        NTD["stateInputs"]
    >,
): PromptNode<NTD> => {
    // Properties configuring the node
    const {
        id,
        initialState
    } = props

    return {
        id,
        classtype,
        inputs: calculateStateInputs(initialState, config?.inputs, defaultInputs, config?.stateInputs),
        state: initialState,
        outputs: outputs ?? {} as NTD["outputs"],
    }
}

export type PromptNodeTypeGuardFunction<T extends AbstractPromptNode = never> = (obj: AbstractPromptNode | undefined) => obj is T;

/**
 * Cast specific node to a given type based on its classtype which should be unique.
 */
export const PromptNodeTypeGuard = <T extends AbstractPromptNode = never>(classtype: string): PromptNodeTypeGuardFunction<T> => {
    return (obj: AbstractPromptNode | undefined): obj is T => {
        return obj !== undefined && obj !== null && obj.classtype === classtype
    }
}