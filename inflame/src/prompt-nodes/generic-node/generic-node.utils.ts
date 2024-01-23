import {
    AbstractDataNode,
    ResolvedNodeType,
} from "@inflame/models";
import {NodeTypeBuilderDefinition} from "@inflame/models";
import {GenericNode} from "./generic-node.ts";

const validateGenericPromptNode = (node: GenericNode, typeDefinition: NodeTypeBuilderDefinition): boolean => {
    if (!node) {
        return false;
    }

    if (!typeDefinition) {
        console.error("Missing type definition.")
        return false;
    }

    const recurseCheckProperties = (stateTarget: Record<string, unknown>, stateDefinition: Record<string, unknown>) => {
        for (const key of Object.keys(stateDefinition)) {
            const value = stateTarget[key]

            if (!value) {
                console.error(`Key ${key} was not found in stateTarget ${stateTarget}`)
                return false;
            }

            if (typeof value === "object" && !Array.isArray(value)) {
                recurseCheckProperties(value as Record<string, unknown>, stateDefinition[key] as Record<string, unknown>)
            }
        }
    }

    recurseCheckProperties(node.state, typeDefinition.state)

    return true
}

// TODO: Implement NodeTypeDefinition validation
export const typeDataNode = <T extends NodeTypeBuilderDefinition>(
    props: {
        id: string,
        node: AbstractDataNode,
        mapper: (id: string, dataNode: AbstractDataNode) => GenericNode | undefined,
        definition: T
    }
): ResolvedNodeType<T> | undefined => {
    const {id, node, mapper, definition} = props

    const dynamicNode = mapper(id, node) as ResolvedNodeType<T>

    if (!validateGenericPromptNode(dynamicNode, definition)) {
        return undefined
    }

    return dynamicNode
}

export const castDataNode = <T extends NodeTypeBuilderDefinition>(node: GenericNode, _: T): ResolvedNodeType<T> => {
    return node as ResolvedNodeType<T>
}