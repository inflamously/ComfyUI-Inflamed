import {AbstractPromptNode} from "@inflame/models";
import {Box, List, ListItem, Text} from "@chakra-ui/react";


export const AbstractNodeView = (props: {
    abstractNode?: AbstractPromptNode
}) => {
    const {abstractNode} = props

    return <>
        {abstractNode === undefined && <Text>No node provided</Text>}
        {
            abstractNode && <>
                <Box p={4} bgColor="gray.100">
                    <Text>Node Metadata</Text>
                    <Box p={4}>
                        <Text>ID: {abstractNode.id}</Text>
                        <Text>Classtype: {abstractNode.classtype}</Text>
                    </Box>
                </Box>
                <Box p={4} bgColor="gray.50">
                    <Text>State</Text>
                    <List>
                        {
                            Object.keys(abstractNode.state).map((key, index) => {
                                return <ListItem key={index} p={4}>
                                    <Text>Key: {key}</Text>
                                    <List p={4}>
                                        {
                                            !Array.isArray(abstractNode.state[key]) &&
                                            Object.keys(abstractNode.state[key] as Object).map((valueKey, index) => {
                                                return <ListItem key={index}>
                                                    <Text>Value Key: {valueKey}</Text>
                                                </ListItem>
                                            })
                                        }
                                        {
                                            Array.isArray(abstractNode.state[key]) &&
                                            (abstractNode.state[key] as Array<unknown>).map((item, index) => {
                                                return <ListItem key={index}>
                                                    <Text wordBreak="break-all">{JSON.stringify(item)}</Text>
                                                </ListItem>
                                            })
                                        }
                                    </List>
                                </ListItem>
                            })
                        }
                    </List>
                </Box>
                <Box p={4} bgColor="gray.100">
                    <Text>Inputs</Text>
                    <List p={4}>
                        {
                            Object.keys(abstractNode.inputs ?? {}).map((key, index) => {
                                return <ListItem key={index}>
                                    <Text>Key: {key}</Text>
                                </ListItem>
                            })
                        }
                    </List>
                </Box>
                <Box p={4} bgColor="gray.50">
                    <Text>Outputs</Text>
                    <List p={4}>
                        {
                            Object.keys(abstractNode.outputs ?? {}).map((key , index) => {
                                return <ListItem key={index}>
                                    <Text>Key: {key}</Text>
                                </ListItem>
                            })
                        }
                    </List>
                </Box>
            </>
        }
    </>
}