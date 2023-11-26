import {Box, Button, Text} from "@chakra-ui/react";
import {useCallback} from "react";
import Fileuploader from "../file/fileuploader.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../+state/inflame-store.ts";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import promptWorkflowThunk from "../../+state/prompt/prompt-workflow/prompts-workflow.thunk.ts";
import {useDebugImagePrompt} from "./debug-image-prompt.ts";
import {promptToPromptDto} from "../../api/mapper/prompt-to-prompt-dto.mapper.ts";
import {SOCKET_MAIN} from "../../+state/socket/comfyui-socket.model.ts";
import {socketStateSelectors} from "../../+state/socket/socket-selectors.ts";

const DebugImagePrompt = () => {
    const debugPrompt = useDebugImagePrompt();
    const socket = useSelector((state: AppState) => socketStateSelectors.selectById(state, SOCKET_MAIN))
    const dispatch: ThunkDispatch<AppState, never, AnyAction> = useDispatch()

    const handleInvokePrompt = useCallback(async () => {
        const prompt = debugPrompt[0]
        if (prompt && socket) {
            const promptDto = promptToPromptDto({
                socket,
                prompt
            });
            if (promptDto) {
                const result = await dispatch(promptWorkflowThunk.postPrompt(promptDto))
                console.log(result.error);
            }
        }
    }, [socket, debugPrompt, dispatch])

    return (
        <Box p={4}>
            <Box pb={4}>
                <Fileuploader fileTypes={[
                    "image/jpeg", "image/png"
                ]}/>
            </Box>
            <Box>
                <Text pb={4}>Custom Prompt</Text>
                <Button onClick={handleInvokePrompt}>Invoke</Button>
            </Box>
        </Box>
    )
}

export default DebugImagePrompt;