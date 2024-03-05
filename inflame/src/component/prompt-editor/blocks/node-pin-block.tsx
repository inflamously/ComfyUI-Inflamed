import {Flex, IconButton} from "@chakra-ui/react";
import {PlusSquareIcon, ViewIcon} from "@chakra-ui/icons";
import {PromptNodeConnection} from "@inflame/models";
import {useCallback} from "react";

const NodePinIcon = (iconType: string) => {
    switch (iconType.toUpperCase()) {
        case "IMAGE":
            return <ViewIcon/>
        case "MASK":
            return <PlusSquareIcon/>
    }
}

/**
 * Handle simple pin
 */
export const NodePin = (props: {
    label: string,
    onClick?: (label: string) => void,
}) => {

    const iconSwitch = useCallback(() => NodePinIcon(props.label), [props.label])
    const handleClick = useCallback(() => {
        props.onClick?.(props.label)
    }, [props.label, props.onClick]);

    return <IconButton
        aria-label="node-pin"
        key={props.label}
        icon={iconSwitch()}
        onClick={handleClick}></IconButton>
}

/**
 * Handles pins from a node
 */
export const NodeInputPinBlock = (props: {
    inputs: Record<string, PromptNodeConnection>,
    onClick?: (pin: PromptNodeConnection) => void
}) => {

    const handleClick = useCallback((label: string) => {
        props.onClick?.(props.inputs[label])
    }, [props.inputs, props.onClick])

    return <Flex justifyContent="center">
        {
            props.inputs && Object.keys(props.inputs).map((value, index) => {
                return <NodePin key={index} label={value} onClick={handleClick}/>
            })
        }
    </Flex>
}

export const NodeOutputPinBlock = (props: {
    outputs: Record<string, PromptNodeConnection>
    onClick?: (pin: PromptNodeConnection) => void
}) => {

    const handleClick = useCallback((label: string) => {
        props.onClick?.(props.outputs[label])
    }, [props.outputs, props.onClick])

    return <Flex justifyContent="center">
        {
            props.outputs && Object.keys(props.outputs).map((value, index) => {
                return <NodePin key={index} label={value} onClick={handleClick}/>
            })
        }
    </Flex>
}