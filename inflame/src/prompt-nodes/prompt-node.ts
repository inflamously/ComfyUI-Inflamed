import { PromptNode, PromptNodeConnection, PromptNodeFields } from '@inflame/models'
import { BaseNodeTypeDefinition } from '@inflame/models'
import { calculateStateInputs } from './prompt-state.utils.ts'
import { GenericNode } from '@inflame/models'

export type PromptNodeConfig<
    State,
    Inputs extends Record<string, PromptNodeConnection>,
    StateInputs extends Record<string, PromptNodeConnection>,
> = {
    inputs?: Inputs
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
    props: PromptNodeFields<NTD['state']>,
    classtype: string,
    defaultInputValues: [NTD['inputs']] extends [never] ? undefined : NTD['inputs'],
    outputs: NTD['outputs'] | undefined,
    config?: PromptNodeConfig<NTD['state'], NTD['inputs'], NTD['stateInputs']>
): PromptNode<NTD> => {
    // Properties configuring the node
    const { id, initialState } = props

    return {
        id,
        classtype,
        inputs: calculateStateInputs(
            initialState,
            config?.inputs,
            defaultInputValues,
            config?.stateInputs
        ),
        state: initialState,
        outputs: outputs ?? ({} as NTD['outputs']),
    }
}

export type PromptNodeTypeGuardFunction<T extends GenericNode = never> = (
    obj: GenericNode | undefined
) => obj is T
