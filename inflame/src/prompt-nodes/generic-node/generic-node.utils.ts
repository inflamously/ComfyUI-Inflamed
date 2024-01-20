import {
    AbstractDataNode,
    DynamicNodeTypeDefinition,
} from "@inflame/models";
import {NodeTypeDefinitionBuilder} from "@inflame/models";
import {PromptNodeGeneric} from "./generic-node.ts";

// TODO: Implement NodeTypeDefinition validation
export const typeMapGenericPromptNode = <T extends NodeTypeDefinitionBuilder>(
    id: string,
    dataNode: AbstractDataNode,
    dataNodeMapper: (id: string, dataNode: AbstractDataNode) => PromptNodeGeneric | undefined,
    _nodeTypeDefinition: T
): DynamicNodeTypeDefinition<T> | undefined => {
    return dataNodeMapper(id, dataNode) as DynamicNodeTypeDefinition<T>
}