import {isConnectionOfLink} from "./prompt-node-connection.utils.ts";
import {
    AbstractPromptNode, BaseNodeTypeDefinition, Prompt,
    PromptNode,
    PromptNodeConnection,
    PromptWorkflow, ValidatedNodeUpdateSource
} from "@inflame/models";
import structuredClone from "@ungap/structured-clone";
import {GenericNode} from "./generic-node/generic-node.ts";
import {set} from "lodash";

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
): Inputs | StateInputs => {
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

    return result ?? {} as (Inputs & StateInputs)
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

export const findPromptNodeById = (nodeId: string, workflow: PromptWorkflow): AbstractPromptNode | undefined => {
    if (!workflow?.nodes || workflow.nodes.length <= 0) {
        return undefined;
    }

    return workflow.nodes.find((node) => node.id === nodeId);
}

export const findPromptNodeByClasstype = (classtype: string, workflow: PromptWorkflow): AbstractPromptNode[] => {
    if (!workflow?.nodes || workflow.nodes.length <= 0) {
        return [];
    }

    return workflow.nodes.filter(node => node.classtype === classtype)
}

export const filterToExistingNodes = (props: {
    source: {
        nodes: string[]
    },
    target: Prompt
}): GenericNode[] => {
    const {source, target} = props

    if (!source || !target)
        return [];

    return source.nodes
        .map((id) => findPromptNodeById(id, target.workflow))
        .filter((node): node is GenericNode => node !== undefined);
}

export const updateStateInExistingNodes = (
    source: ValidatedNodeUpdateSource,
    target: Prompt
): GenericNode[] => {
    const updatedNodes = filterToExistingNodes({
        source,
        target,
    }).map((node) => {
        const {appendix} = source

        const newNode = structuredClone(node)
        Object.keys(appendix).forEach(key => {
            newNode.state[key] = appendix[key]
        })

        return newNode
    })

    return target.workflow.nodes.map(node => updatedNodes.find(updatedNode => updatedNode.id === node.id) ?? node)
}

export const replaceNodesInPrompt = (workflow: PromptWorkflow, newNodes: Array<AbstractPromptNode>) => {
    const newWorkflow = structuredClone(workflow)
    newWorkflow.nodes = newWorkflow.nodes.map((node) =>
        newNodes.find((newNode) => node?.id === newNode.id) ?? node
    )
    return newWorkflow
}
