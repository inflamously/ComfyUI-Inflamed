import {set} from "lodash";
import {isConnectionOfLink} from "./prompt-node-connection.utils.ts";
import {
    AbstractPromptNode, BaseNodeTypeDefinition, Prompt,
    PromptNode,
    PromptNodeConnection,
    PromptWorkflow
} from "@inflame/models";
import structuredClone from "@ungap/structured-clone";
import {updateObject} from "../core/object.utils.ts";

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


export const updateNodeState = <NTD extends BaseNodeTypeDefinition>(
    node: PromptNode<NTD>,
    state: NTD["state"]
): PromptNode<NTD> => {
    return {
        ...node,
        state,
    }
}

/**
 * This intentionally changes original object since IDs are referenced and must change in all other objects. Connections are made by Reference.
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

export const findAbstractPromptNodeById = (id: string, workflow: PromptWorkflow): AbstractPromptNode | undefined => {
    if (!workflow?.nodes || workflow.nodes.length <= 0) {
        return undefined;
    }

    return workflow.nodes.find((node) => node.id === id);
}


export const filterToExistingNodes = (props: {
    source: {
        nodes: string[]
    },
    target: Prompt
}): Array<AbstractPromptNode | undefined> => {
    const {source, target} = props

    if (!source || !target)
        return [];

    return source.nodes
        .map((id) => findAbstractPromptNodeById(id, target.workflow))
        .filter((node) => node !== undefined);
}

export const replaceNodesInWorkflow = (workflow: PromptWorkflow, nodes: Array<AbstractPromptNode>) => {
    return updateObject(workflow, (newWorkflow) => {
        newWorkflow.nodes = newWorkflow.nodes.map((workflowNode) =>
            nodes.find((newNode) => workflowNode?.id === newNode.id) ?? workflowNode
        )
    })
}
