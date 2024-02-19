import {Flex, IconButton} from "@chakra-ui/react";
import {PlusSquareIcon} from "@chakra-ui/icons";
import {BindValueLink} from "@inflame/models";

export const NodePin = () => <IconButton aria-label="node-pin" icon={<PlusSquareIcon/>}></IconButton>

export const NodePinBlock = (props: {
    inputs: Record<string, BindValueLink>
}) => {
    return <Flex>
        {
            props.inputs && Object.keys(props.inputs).map(() => {
                return <NodePin />
            })
        }
    </Flex>
}