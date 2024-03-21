import { GenericNode } from '@inflame/models'
import { Block } from './block.tsx'
import { NodeInputPinBlock, NodeOutputPinBlock } from './node-pin-block.tsx'
import { NodePropertyBlock, PropertyItem } from './node-property-block.tsx'
import { PromptNodeConnection } from '@inflame/models'
import { useCallback } from 'react'

export const NodeBlock = (props: {
    node: GenericNode
    customProperties?: PropertyItem[]
    onChangeProperty?: () => void
    onPinClick?: (pin: PromptNodeConnection, sourceNode: GenericNode) => void
}) => {
    const handlePinClick = useCallback(
        (pin: PromptNodeConnection) => {
            props.onPinClick?.(pin, props.node)
        },
        [props.node, props.onPinClick]
    )

    return (
        <Block>
            <NodeInputPinBlock inputs={props.node.inputs} onClick={handlePinClick} />
            {props.node?.state && (
                <NodePropertyBlock
                    entries={Object.entries(props.node.state)}
                    customProperties={props.customProperties}
                />
            )}
            <NodeOutputPinBlock outputs={props.node.outputs} onClick={handlePinClick} />
        </Block>
    )
}
