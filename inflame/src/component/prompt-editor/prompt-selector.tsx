import {BlockCard} from "../layout/block-card.tsx";
import {FormControl, FormLabel, Select} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {AppState, promptsSelectors} from "@inflame/state";
import {Prompt} from "@inflame/models";
import {ChangeEvent, useCallback} from "react";

export const PromptSelector = (props: {
    onPromptSelection: (prompt: Prompt | undefined) => void,
}) => {
    const prompts = useSelector(
        (state: AppState) => promptsSelectors.selectPrompts(state)
    ).concat(undefined as unknown as Prompt).reverse()

    const handlePromptSelection = useCallback((ev: ChangeEvent<HTMLSelectElement>) => {
        const {value = undefined} = ev?.target as unknown as { value: string }
        const prompt = prompts.find(p => p?.name === value);
        props?.onPromptSelection?.(prompt)
    }, [prompts])

    return <BlockCard>
        <FormControl>
            <FormLabel>Prompt</FormLabel>
            <Select onChange={handlePromptSelection}>
                {prompts && prompts.map((prompt) => {
                    return prompt ? <option key={prompt.name} value={prompt.name}>{prompt.name}</option> :
                        <option key="null" value="empty">{"none"}</option>
                })}
            </Select>
        </FormControl>
    </BlockCard>
}