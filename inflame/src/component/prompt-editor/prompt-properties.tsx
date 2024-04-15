import { BlockCard } from '../layout/block-card.tsx'
import { Button, Flex, FormControl, FormLabel, Select, Stack } from '@chakra-ui/react'
import { AppState, promptsSelectors } from '@inflame/state'
import { ChangeEvent, useCallback, useState } from 'react'
import { useMemoSelector } from '../store.hooks.tsx'
import { dataNodesSelectors } from '../../+state/data-nodes/data-nodes.selectors.ts'
import { GenericNode } from '@inflame/models'
import { useGenericPromptNodeFromDataNode } from '../nodes/nodes.hooks.tsx'
import { promptEditorSelectors } from '../../+state/prompt/prompt-editor/prompt-editor.selectors.ts'

const PromptNodeAdd = (props: { onNodeAdd: (node: GenericNode) => void }) => {
    const { onNodeAdd } = props

    const dateNodeNames: string[] = [
        '',
        ...useMemoSelector((state) => dataNodesSelectors.selectDataNodeNames(state)),
    ]
    const promptName = useMemoSelector((state) =>
        promptEditorSelectors.selectCurrentPromptName(state)
    )
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
        if (node && promptName !== null) {
            console.log('Node creation', node)
            onNodeAdd(node)
        }
    }, [node, onNodeAdd, promptName])

    return (
        <Flex gap={2} direction="column">
            <FormControl>
                <FormLabel>Nodes</FormLabel>
                <Select onChange={handlePromptNodeSelection}>
                    {dateNodeNames?.map((name, index) => {
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

const PromptSelector = (props: { onPromptNameSelected: (promptName: string | null) => void }) => {
    const { onPromptNameSelected } = props

    const promptNames = useMemoSelector((state: AppState) =>
        promptsSelectors.selectPromptNames(state)
    )
        .concat('')
        .reverse()

    const selectedPromptName = useMemoSelector((state) =>
        promptEditorSelectors.selectCurrentPromptName(state)
    )

    const handlePromptSelection = useCallback(
        (ev: ChangeEvent<HTMLSelectElement>) => {
            const { value } = ev?.target as unknown as { value: string }

            if (value === '#') {
                onPromptNameSelected?.(null)
                return
            }

            if (value) {
                onPromptNameSelected?.(value)
            }
        },
        [onPromptNameSelected]
    )

    return (
        <FormControl>
            <FormLabel>Prompt</FormLabel>
            <Select onChange={handlePromptSelection} value={selectedPromptName ?? '#'}>
                {promptNames &&
                    promptNames.map((name) => {
                        return name ? (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ) : (
                            <option key="null" value="#">
                                {'none'}
                            </option>
                        )
                    })}
            </Select>
        </FormControl>
    )
}

export const PromptProperties = (props: {
    onPromptNameSelected: (prompt: string | null) => void
    onPromptNodeAdd: (node: GenericNode) => void
}) => {
    const { onPromptNameSelected, onPromptNodeAdd } = props

    return (
        <BlockCard>
            <Stack gap={4}>
                <PromptSelector onPromptNameSelected={onPromptNameSelected} />
                <PromptNodeAdd onNodeAdd={onPromptNodeAdd} />
            </Stack>
        </BlockCard>
    )
}
