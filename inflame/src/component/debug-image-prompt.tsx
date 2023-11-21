import {Box, Button, Textarea} from "@chakra-ui/react";
import {ChangeEvent, useCallback, useState} from "react";
import * as testPrompt from '../assets/prompting/test-prompt-minified.json'
import Fileuploader from "./file/fileuploader.tsx";
import {socketStateSelectors} from "../+state/socket/socket-selectors.ts";
import {useDispatch, useSelector} from "react-redux";
import {SOCKET_MAIN} from "../+state/socket/socket-names.ts";
import {AppState} from "../+state/inflame-store.ts";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import promptWorkflowThunk from "../+state/prompt/prompt-workflow/prompt-workflow.thunk.ts";

const DebugImagePrompt = () => {
    const socketState = useSelector((state: AppState) => socketStateSelectors.selectById(state, SOCKET_MAIN))
    const [prompt, setPrompt] = useState(JSON.parse(JSON.stringify(testPrompt)))
    const dispatch: ThunkDispatch<AppState, never, AnyAction> = useDispatch()

    const handleInvokePrompt = useCallback(async () => {
        prompt.client_id = socketState?.clientId
        const result = await dispatch(promptWorkflowThunk.postPrompt(prompt))
        console.log(result.error);
    }, [socketState, prompt, dispatch])

    const handlePromptChange = (value: ChangeEvent<HTMLTextAreaElement>) => {
        if (value?.target?.value) {
            setPrompt(JSON.parse(value.target.value));
        }
    }

    return (
        <Box p={4}>
            <Fileuploader fileTypes={[
                "image/jpeg", "image/png"
            ]}/>
            <Textarea
                mb={4}
                defaultValue={JSON.stringify(testPrompt, null, 4)}
                onChange={handlePromptChange}
                height="256"
            />
            <Button onClick={handleInvokePrompt}>Invoke</Button>
        </Box>
    )
}

export default DebugImagePrompt;