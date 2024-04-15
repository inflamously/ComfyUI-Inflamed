import { Button, Flex } from '@chakra-ui/react'
import { PromptNodeConnection } from '@inflame/models'
import { useCallback } from 'react'

/**
 * Handle simple pin
 */
export const NodePin = (props: { label: string; onClick?: (label: string) => void }) => {
    const { label, onClick } = props

    const handleClick = useCallback(() => {
        onClick?.(label)
    }, [label, onClick])

    return (
        <Button key={props.label} onClick={handleClick}>
            {props.label}
        </Button>
    )
}

/**
 * Handles pins from a node
 */
export const NodeInputPinBlock = (props: {
    inputs: Record<string, PromptNodeConnection>
    onClick?: (pin: PromptNodeConnection) => void
}) => {
    const { onClick, inputs } = props

    const handleClick = useCallback(
        (label: string) => {
            onClick?.(inputs[label])
        },
        [onClick, inputs]
    )

    console.log('NodeInputPinBlock', props.inputs)

    return (
        <Flex justifyContent="center">
            {props.inputs &&
                Object.keys(props.inputs).map((value, index) => {
                    return <NodePin key={index} label={value} onClick={handleClick} />
                })}
        </Flex>
    )
}

export const NodeOutputPinBlock = (props: {
    outputs: Record<string, PromptNodeConnection>
    onClick?: (pin: PromptNodeConnection) => void
}) => {
    const { onClick, outputs } = props

    const handleClick = useCallback(
        (label: string) => {
            onClick?.(outputs[label])
        },
        [outputs, onClick]
    )

    return (
        <Flex justifyContent="center">
            {props.outputs &&
                Object.keys(props.outputs).map((value, index) => {
                    return <NodePin key={index} label={value} onClick={handleClick} />
                })}
        </Flex>
    )
}
