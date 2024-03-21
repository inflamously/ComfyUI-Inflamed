import { GenericNode } from '@inflame/models'
import { NodeTypeBuilderDefinition, ResolvedNodeType } from '@inflame/models'
import { NodeDefinitionLoadImage } from '../../load-image/node-definition-load-image.ts'
import { NodeDefinitionPreviewImage } from '../../preview-image/node-definition-preview-image.ts'

const isNodeOfType = <T extends NodeTypeBuilderDefinition>(
    node: GenericNode,
    classtype: string,
    _definition: T
): node is ResolvedNodeType<T> => {
    return node?.classtype === classtype
}

export const isNodeTypeLoadImage = (node: GenericNode) =>
    isNodeOfType(node, 'LoadImage', NodeDefinitionLoadImage)

export const isNodeTypePreviewImage = (node: GenericNode) =>
    isNodeOfType(node, 'PreviewImage', NodeDefinitionPreviewImage)
