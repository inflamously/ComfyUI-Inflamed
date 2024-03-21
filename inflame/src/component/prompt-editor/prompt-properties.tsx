import { BlockCard } from '../layout/block-card.tsx'
import { Button, Flex, FormControl, FormLabel, Select, Stack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { AppState, promptsSelectors } from '@inflame/state'
import { Prompt } from '@inflame/models'
import { ChangeEvent, useCallback, useState } from 'react'
import { useMemoSelector } from '../store.hooks.tsx'
import { dataNodesSelectors } from '../../+state/data-nodes/data-nodes.selectors.ts'
import { GenericNode } from '@inflame/models'
import { useGenericPromptNodeFromDataNode } from '../nodes/nodes.hooks.tsx'

const PromptNodeAdd = (props: { onNodeAdd: (node: GenericNode) => void }) => {
    const { onNodeAdd } = props

    const names: string[] = [
        '',
        ...useMemoSelector((state) => dataNodesSelectors.selectDataNodeNames(state)),
    ]
    const [selectedNodeName, setSelectedNodeName] = useState<string>('')
    const node = useGenericPromptNodeFromDataNode({
        id: '-1',
        classtype: selectedNodeName ?? '',
    })

    const handlePromptNodeSelection = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            if (event?.target?.value) {
                setSelectedNodeName(event.target.value)
            }
        },
        [setSelectedNodeName]
    )

    const handlePromptNodeAdd = useCallback(() => {
        if (node) {
            onNodeAdd(node)
        }
    }, [node, onNodeAdd])

    return (
        <Flex gap={2} direction="column">
            <FormControl>
                <FormLabel>Nodes</FormLabel>
                <Select onChange={handlePromptNodeSelection}>
                    {names?.map((name, index) => {
                        return (
                            <option key={index} value={name}>
                                {name}
                            </option>
                        )
                    })}
                </Select>
            </FormControl>
            <Button size="md" onClick={handlePromptNodeAdd}>
                Add
            </Button>
        </Flex>
    )
}

const PromptSelector = (props: { onPromptSelection: (prompt: Prompt | undefined) => void }) => {
    const { onPromptSelection } = props

    // const prompt = useSelector((state: AppState) => promptsSelectors.selectPromptByName(state, ))
    const prompts = useSelector((state: AppState) => promptsSelectors.selectPrompts(state))
        .concat(undefined as unknown as Prompt)
        .reverse()

    const handlePromptSelection = useCallback(
        (ev: ChangeEvent<HTMLSelectElement>) => {
            const { value = undefined } = ev?.target as unknown as { value: string }
            const prompt = prompts.find((p) => p?.name === value)
            onPromptSelection?.(prompt)
        },
        [prompts, onPromptSelection]
    )

    return (
        <FormControl>
            <FormLabel>Prompt</FormLabel>
            <Select onChange={handlePromptSelection}>
                {prompts &&
                    prompts.map((prompt) => {
                        return prompt ? (
                            <option key={prompt.name} value={prompt.name}>
                                {prompt.name}
                            </option>
                        ) : (
                            <option key="null" value="empty">
                                {'none'}
                            </option>
                        )
                    })}
            </Select>
        </FormControl>
    )
}

export const PromptProperties = (props: {
    onPromptSelection: (prompt: Prompt | undefined) => void
    onPromptNodeAdd: (node: GenericNode) => void
}) => {
    const { onPromptSelection, onPromptNodeAdd } = props

    return (
        <BlockCard>
            <Stack gap={4}>
                <PromptSelector onPromptSelection={onPromptSelection} />
                <PromptNodeAdd onNodeAdd={onPromptNodeAdd} />
            </Stack>
        </BlockCard>
    )
}
