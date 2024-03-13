import {
    Box,
    Text
} from '@chakra-ui/react'
import {Blocklist} from "./blocklist.tsx";
import {NodeBlock} from "./blocks/node-block.tsx";
import {PromptProperties} from "./prompt-properties.tsx";
import {useCallback, useState} from "react";
import {Prompt, PromptNodeConnection} from "@inflame/models";
import {Blockgroups} from "./blockgroups.tsx";
import {GenericNode} from "../../prompt-nodes/generic-node/generic-node.ts";
import {PromptToolbar} from "./prompt-toolbar.tsx";

const NodeEdit = (props: {
    prompt: Prompt | undefined
}) => {
    const handlePinConnection = useCallback((pin: PromptNodeConnection, sourceNode: GenericNode) => {
        console.log(pin, sourceNode)
    }, [])

    return <>
        <Blockgroups>
            <Blocklist>
                {
                    props?.prompt?.workflow?.nodes?.map((node, index) => {
                        return <NodeBlock
                            key={index}
                            node={node}
                            onPinClick={handlePinConnection}
                        />
                    })
                }
            </Blocklist>
        </Blockgroups>
    </>
}

export const PromptEditor = () => {

    const [prompt, setPrompt] = useState<Prompt | undefined>()

    const handlePromptNodeAdd = useCallback((node: GenericNode) => {
        console.log(node, prompt)
    }, [prompt])

    return <Box>
        <Text pb={4}>Under construction</Text>
        <PromptToolbar/>
        <PromptProperties
            onPromptSelection={setPrompt}
            onPromptNodeAdd={handlePromptNodeAdd}
        />
        <NodeEdit prompt={prompt}/>
    </Box>
}