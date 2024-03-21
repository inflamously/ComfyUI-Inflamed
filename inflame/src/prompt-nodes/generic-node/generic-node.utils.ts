import { AbstractDataNode, NodeTypeBuilderDefinition, ResolvedNodeType } from '@inflame/models'
import { GenericNode } from '@inflame/models'

// TODO: What should I do?
const validateGenericPromptNode = (
    node: GenericNode,
    typeDefinition: NodeTypeBuilderDefinition
): boolean => {
    if (!node) {
        return false
    }

    if (!typeDefinition) {
        console.error('Missing type definition.')
        return false
    }

    const recurseCheckProperties = (
        stateTarget: Record<string, unknown>,
        stateDefinition: Record<string, unknown>
    ) => {
        for (const key of Object.keys(stateDefinition)) {
            const value = stateTarget[key]

            if (!value) {
                console.error(`Key ${key} was not found in stateTarget ${stateTarget}`)
                return false
            }

            if (typeof value === 'object' && !Array.isArray(value)) {
                recurseCheckProperties(
                    value as Record<string, unknown>,
                    stateDefinition[key] as Record<string, unknown>
                )
            }
        }
    }

    recurseCheckProperties(node.state, typeDefinition.state)

    return true
}

// TODO: Implement NodeTypeDefinition validation
export const typeDataNode = <T extends NodeTypeBuilderDefinition>(props: {
    id: string
    node: AbstractDataNode
    mapper: (id: string, dataNode: AbstractDataNode) => GenericNode | undefined
    definition: T
}): ResolvedNodeType<T> | undefined => {
    return untypedDataNode(props) as ResolvedNodeType<T>
}

export const untypedDataNode = (props: {
    id: string
    node: AbstractDataNode
    mapper: (id: string, dataNode: AbstractDataNode) => GenericNode | undefined
}): GenericNode | undefined => {
    const { id, node, mapper } = props

    // TODO: Should I validate or not?
    // if (!validateGenericPromptNode(dynamicNode, definition)) {
    //     return undefined
    // }

    return mapper(id, node)
}

export const castGenericNode = <T extends NodeTypeBuilderDefinition>(
    node: GenericNode,
    _: T
): ResolvedNodeType<T> => {
    return node as ResolvedNodeType<T>
}
