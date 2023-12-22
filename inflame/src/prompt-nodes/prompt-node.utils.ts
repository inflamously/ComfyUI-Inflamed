import {set} from "lodash";
import {isConnectionOfLink} from "./prompt-node-connection.utils.ts";
import {AbstractPromptNode, PromptNode, PromptNodeConnection, PromptWorkflow} from "@inflame/models";

export const calculatePathsForObject = (tree: Record<string, unknown>) => {
    const statePaths = structuredClone(tree)

    const recurseTree = (recursedTree: Record<string, unknown>, parentPath: string | null = null) => {
        Object.keys(recursedTree).forEach((k) => {
            const path = parentPath ? parentPath + "." + k : k

            typeof recursedTree[k] === "object" && recursedTree["length"] === undefined ?
                recurseTree(recursedTree[k] as Record<string, unknown>, path) :
                set(statePaths, path, path)
        })
    }

    recurseTree(tree, null)

    return statePaths
}

export const calculateStateInputs = <
    State extends Record<string, unknown>,
    Inputs extends Record<string, PromptNodeConnection>,
    StateInputs extends Record<string, PromptNodeConnection>
>(
    state: State,
    inputs: Inputs | undefined,
    defaultInputs: Inputs | undefined,
    stateInputs: ((state: State) => StateInputs) | undefined
): Inputs | StateInputs | undefined => {
    let result: Inputs | StateInputs | undefined = inputs ?? defaultInputs

    if (stateInputs) {
        const calculatedInputs = stateInputs(calculatePathsForObject(state) as State)

        result = result ? {
            ...result,
            ...calculatedInputs
        } : {
            ...calculatedInputs
        }
    }

    return result
}


export const updateNodeState = <
    State,
    Inputs extends Record<string, PromptNodeConnection>,
    Outputs extends Record<string, PromptNodeConnection>,
    StateInputs extends Record<string, PromptNodeConnection>
>(
    node: PromptNode<State, Inputs, Outputs, StateInputs>,
    state: State
): PromptNode<State, Inputs, Outputs, StateInputs> => {
    return {
        ...node,
        state,
    }
}

/**
 * This intentionally changes original object since IDs are referenced and must change in all other objects. Connections are REF made.
 */
export const updateIdsInConnectionMap = (connections: Record<string, PromptNodeConnection>, id: string) => {
    if (connections) {
        Object.keys(connections).forEach((k) => {
            const connection = connections[k];
            if (isConnectionOfLink(connection)) {
                connection["id"] = id;
            }
        })
    }
}

/**
 * Updates ID on an original node, also applies to already node connections that are linked.
 */
export const updateNodeId = (node: AbstractPromptNode, id: string) => {
    node.id = id;

    if (node.outputs) {
        updateIdsInConnectionMap(node.outputs, id);
    }

    return node
}