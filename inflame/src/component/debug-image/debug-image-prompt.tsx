import {Box, Button, Text} from "@chakra-ui/react";
import {useCallback, useEffect} from "react";
import Fileuploader from "../file/fileuploader.tsx";
import {useSelector} from "react-redux";
import {AppState, useAppDispatch} from "../../+state/inflame-store.ts";
import {useDebugImagePrompt} from "./debug-image-prompt.ts";
import {socketStateSelectors} from "../../+state/socket/socket.selectors.ts";
import {promptsSliceActions} from "../../+state/prompt/prompt-workflow/prompts.slice.ts";
import {comfyApi} from "../../+state/api/comfy-api.slice.ts";
import {isPromptResultDTO} from "../../+state/api/api-dto.utils.ts";
import {promptToPromptDto} from "../../mapper/prompt-to-prompt-dto.mapper.ts";
import {COMFYUI_SOCKET} from "../socket/comfyui/comfyui-socket.tsx";

const DebugImagePrompt = () => {
    const debugPrompt = useDebugImagePrompt();
    const socket = useSelector((state: AppState) => socketStateSelectors.selectSocketById(state, COMFYUI_SOCKET))
    const [postPrompt, result] = comfyApi.usePostPrompt()
    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log("Call Result", result.status)
    }, [result.status])


    const handleInvokePrompt = useCallback(async () => {
        const prompt = debugPrompt[0]
        if (!prompt || !socket) {
            return;
        }

        const promptDto = promptToPromptDto({
            socket,
            prompt
        });

        if (promptDto) {
            const response = await postPrompt(promptDto)
            if ('data' in response && isPromptResultDTO(response.data)) {
                dispatch(promptsSliceActions.updatePromptRemoteId({
                    clientId: prompt.clientId,
                    remoteId: response.data.prompt_id,
                }))
            } else if ('error' in response) {
                console.error("Error", response.error)
            }
        }
    }, [dispatch, socket, debugPrompt, postPrompt])

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