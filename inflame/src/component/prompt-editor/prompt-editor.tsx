import { Box, Text } from '@chakra-ui/react'
import { Blocklist } from './blocklist.tsx'
import { NodeBlock } from './blocks/node-block.tsx'
import { PromptProperties } from './prompt-properties.tsx'
import { useCallback, useState } from 'react'
import { GenericNode, Prompt, PromptNodeConnection } from '@inflame/models'
import { Blockgroups } from './blockgroups.tsx'
import { PromptToolbar } from './prompt-toolbar.tsx'
import { concatNodeOfHighestId, deleteNodeById } from '../../prompt-nodes/prompt-nodes.utils.ts'
import { promptsSelectors, promptsActions, useAppDispatch } from '@inflame/state'
import { useMemoSelector } from '../store.hooks.tsx'
import { promptEditorActions } from '../../+state/prompt/prompt-editor/prompt-editor.slice.ts'
import { promptEditorSelectors } from '../../+state/prompt/prompt-editor/prompt-editor.selectors.ts'

const NodeEditor = (props: {
    onNodeDelete: (nodeId: string) => void
    prompt: Prompt | undefined
}) => {
    const { onNodeDelete } = props

    const handlePinConnection = useCallback(
        (pin: PromptNodeConnection, sourceNode: GenericNode) => {
            console.log(pin, sourceNode)
        },
        []
    )

    return (
        <Blockgroups>
            <Blocklist>
                {props?.prompt?.workflow?.nodes?.map((node, index) => {
                    return (
                        <NodeBlock
                            key={index}
                            node={node}
                            onPinClick={handlePinConnection}
                            onDelete={onNodeDelete}
                        />
                    )
                })}
            </Blocklist>
        </Blockgroups>
    )
}

export const PromptEditor = () => {
    const dispatch = useAppDispatch()

    // TODO: Missing synchronization after state change
    const promptName = useMemoSelector((state) =>
        promptEditorSelectors.selectCurrentPromptName(state)
    )
    const prompt = useMemoSelector((state) =>
        promptsSelectors.selectPromptByName(state, promptName)
    )

    const handlePromptNodeAdd = useCallback(
        (node: GenericNode) => {
            if (!prompt) {
                return
            }

            const newNodes = concatNodeOfHighestId(node, prompt.workflow.nodes)

            dispatch(
                promptsActions.updatePromptNodes({
                    nodes: newNodes,
                    promptName: prompt.name,
                })
            )
        },
        [dispatch, prompt]
    )

    const handlePromptNodeDelete = useCallback(
        (nodeId: string) => {
            if (!prompt) {
                return
            }

            const newNodes = deleteNodeById(nodeId, prompt.workflow.nodes)

            dispatch(
                promptsActions.updatePromptNodes({
                    nodes: newNodes,
                    promptName: prompt.name,
                })
            )
        },
        [dispatch, prompt]
    )

    const handlePromptSelection = useCallback(
        (promptName: string) => {
            dispatch(promptEditorActions.setCurrentPrompt(promptName))
        },
        [dispatch]
    )

    return (
        <Box>
            <Text pb={4}>Under construction</Text>
            <PromptToolbar />
            <PromptProperties
                onPromptNameSelected={handlePromptSelection}
                onPromptNodeAdd={handlePromptNodeAdd}
            />
            <NodeEditor prompt={prompt} onNodeDelete={handlePromptNodeDelete} />
        </Box>
    )
}
