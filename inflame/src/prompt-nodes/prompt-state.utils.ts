import {
    BaseNodeTypeDefinition,
    Prompt,
    PromptNode,
    PromptNodeConnection,
    ValidatedNodeUpdateSource,
} from '@inflame/models'
import { calculatePathsForObject, filterToExistingNodes } from './prompt-workflow.utils.ts'
import { GenericNode } from '@inflame/models'
import structuredClone from '@ungap/structured-clone'

export const updateNodeState = <NTD extends BaseNodeTypeDefinition>(
    node: PromptNode<NTD>,
    state: NTD['state']
): PromptNode<NTD> => {
    return {
        ...node,
        state,
    }
}

export const calculateStateInputs = <
    State extends Record<string, unknown>,
    Inputs extends Record<string, PromptNodeConnection>,
    StateInputs extends Record<string, PromptNodeConnection>,
>(
    state: State,
    inputs: Inputs | undefined,
    defaultInputs: Inputs | undefined,
    stateInputs: ((state: State) => StateInputs) | undefined
): Inputs | StateInputs => {
    let result: Inputs | StateInputs | undefined = inputs ?? defaultInputs

    if (stateInputs) {
        const calculatedInputs = stateInputs(calculatePathsForObject(state) as State)

        result = result
            ? {
                  ...result,
                  ...calculatedInputs,
              }
            : {
                  ...calculatedInputs,
              }
    }

    return result ?? ({} as Inputs & StateInputs)
}

export const updateStateInExistingNodes = (
    source: ValidatedNodeUpdateSource,
    target: Prompt
): GenericNode[] => {
    const updatedNodes = filterToExistingNodes({
        source,
        target,
    }).map((node) => {
        const { appendix } = source

        const newNode = structuredClone(node)
        Object.keys(appendix).forEach((key) => {
            newNode.state[key] = appendix[key]
        })

        return newNode
    })

    return target.workflow.nodes.map(
        (node) => updatedNodes.find((updatedNode) => updatedNode.id === node.id) ?? node
    )
}
