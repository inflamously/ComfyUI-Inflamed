import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { BlockCard } from '../layout/block-card.tsx'
import { promptsSliceActions, useAppDispatch } from '@inflame/state'
import { ChangeEvent, useCallback, useState } from 'react'

const ItemCreatePrompt = (props: { onCreatePrompt: (name: string) => void }) => {
    const { onCreatePrompt } = props

    const [promptName, setPromptName] = useState<string | null>(null)

    const handleCreatePrompt = useCallback(() => {
        if (!promptName) {
            return
        }

        onCreatePrompt(promptName)
    }, [promptName, onCreatePrompt])

    const handlePromptNameChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setPromptName(event.target.value ?? null)
        },
        [setPromptName]
    )

    return (
        <Flex gap={2} direction="column">
            <FormControl>
                <FormLabel>Prompt Name</FormLabel>
                <Input onInput={handlePromptNameChange} />
            </FormControl>
            <Button size="md" onClick={handleCreatePrompt}>
                Create
            </Button>
        </Flex>
    )
}

export const PromptToolbar = () => {
    const dispatch = useAppDispatch()

    const handleCreatePrompt = useCallback(
        (name: string) => {
            dispatch(promptsSliceActions.createPrompt(name))
        },
        [dispatch]
    )

    return (
        <BlockCard>
            <ItemCreatePrompt onCreatePrompt={handleCreatePrompt} />
        </BlockCard>
    )
}
