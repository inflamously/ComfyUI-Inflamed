import {
    Accordion,
    AccordionButton,
    AccordionItem, AccordionPanel,
    Button,
    HStack,
    Input,
} from "@chakra-ui/react";
import {BlockCard} from "../layout/block-card.tsx";
import {promptsSliceActions, useAppDispatch} from "@inflame/state";
import {ChangeEvent, useCallback, useState} from "react";

const ItemCreatePrompt = (props: {
    onCreatePrompt: (name: string) => void
}) => {
    const {onCreatePrompt} = props;

    const [promptName, setPromptName] = useState<string | null>(null);

    const handleCreatePrompt = useCallback(() => {
        if (!promptName) {
            return;
        }

        onCreatePrompt(promptName);
    }, [promptName, onCreatePrompt])

    const handlePromptNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPromptName(event.target.value ?? null);
    }, [setPromptName])

    return <HStack>
        <Input onInput={handlePromptNameChange}/>
        <Button size="md" onClick={handleCreatePrompt}>Create Prompt</Button>
    </HStack>
}


export const PromptToolbar = () => {

    const dispatch = useAppDispatch();

    const handleCreatePrompt = useCallback((name: string) => {
        dispatch(promptsSliceActions.createPrompt(name))
    }, [dispatch])

    return <BlockCard>
        <Accordion variant="inflame">
            <AccordionItem>
                <h2>
                    <AccordionButton>Create Prompt</AccordionButton>
                </h2>
                <AccordionPanel>
                    <ItemCreatePrompt onCreatePrompt={handleCreatePrompt}/>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    </BlockCard>
}