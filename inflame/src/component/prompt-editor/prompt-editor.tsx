import { Box, Text } from '@chakra-ui/react'
import { Blocklist } from './blocklist.tsx'
import { NodeBlock } from './blocks/node-block.tsx'
import { PromptProperties } from './prompt-properties.tsx'
import { useCallback, useState } from 'react'
import { GenericNode, Prompt, PromptNodeConnection } from '@inflame/models'
import { Blockgroups } from './blockgroups.tsx'
import { PromptToolbar } from './prompt-toolbar.tsx'
import { concatNodeOfHighestId } from '../../prompt-nodes/prompt-nodes.utils.ts'
import { promptsSliceActions, useAppDispatch } from '@inflame/state'

const NodeEditor = (props: { prompt: Prompt | undefined }) => {
    const handlePinConnection = useCallback(
        (pin: PromptNodeConnection, sourceNode: GenericNode) => {
            console.log(pin, sourceNode)
        },
        []
    )

    return (
        <>
            <Blockgroups>
                <Blocklist>
                    {props?.prompt?.workflow?.nodes?.map((node, index) => {
                        return (
                            <NodeBlock key={index} node={node} onPinClick={handlePinConnection} />
                        )
                    })}
                </Blocklist>
            </Blockgroups>
        </>
    )
}

export const PromptEditor = () => {
    const dispatch = useAppDispatch()
    const [prompt, setPrompt] = useState<Prompt | undefined>()

    const handlePromptNodeAdd = useCallback(
        (node: GenericNode) => {
            if (!prompt) {
                return
            }

            const newNodes = concatNodeOfHighestId(node, prompt.workflow.nodes)

            dispatch(
                promptsSliceActions.updatePromptNodes({
                    nodes: newNodes,
                    promptName: prompt.name,
                })
            )
        },
        [prompt]
    )

    return (
        <Box>
            <Text pb={4}>Under construction</Text>
            <PromptToolbar />
            <PromptProperties onPromptSelection={setPrompt} onPromptNodeAdd={handlePromptNodeAdd} />
            <NodeEditor prompt={prompt} />
        </Box>
    )
}
