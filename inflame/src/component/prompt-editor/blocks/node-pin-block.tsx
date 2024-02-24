import {Flex, IconButton} from "@chakra-ui/react";
import {PlusSquareIcon} from "@chakra-ui/icons";
import {PromptNodeConnection} from "@inflame/models";

export const NodePin = (props: {
    label: string,
    onClick?: () => void,
}) => <>
    <IconButton aria-label="node-pin" key={props.label} icon={<PlusSquareIcon/>} onClick={props.onClick}></IconButton>
</>

export const NodePinBlock = (props: {
    inputs: Record<string, PromptNodeConnection>,
    onClick?: () => void
}) => {
    return <Flex justifyContent="center">
        {
            props.inputs && Object.keys(props.inputs).map((value, index) => {
                return <NodePin key={index} label={value} onClick={props.onClick}/>
            })
        }
    </Flex>
}