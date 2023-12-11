import {Box, Button, Text} from "@chakra-ui/react";
import {useCallback, useEffect} from "react";
import Fileuploader from "../file/fileuploader.tsx";
import {useSelector} from "react-redux";
import {AppState, useAppDispatch} from "../../+state/inflame-store.ts";
import {useDebugImagePrompt} from "./debug-image-prompt.ts";
import {promptToPromptDto} from "../../api/mapper/prompt-to-prompt-dto.mapper.ts";
import {SOCKET_MAIN} from "../../+state/socket/socket.model.ts";
import {socketStateSelectors} from "../../+state/socket/socket.selectors.ts";
import {comfyApi} from "../../api/comfy.api.ts";
import {isPromptResultDTO} from "../../api/prompt-node-dto.utils.ts";
import {promptsSliceActions} from "../../+state/prompt/prompt-workflow/prompts.slice.ts";

const DebugImagePrompt = () => {
    const debugPrompt = useDebugImagePrompt();
    const socket = useSelector((state: AppState) => socketStateSelectors.selectSocketById(state, SOCKET_MAIN))
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
            const res = await postPrompt(promptDto)
            if ('data' in res && isPromptResultDTO(res.data)) {
                dispatch(promptsSliceActions.updatePromptRemoteId({
                    clientId: prompt.clientId,
                    remoteId: res.data.prompt_id,
                }))
            } else if ('error' in res) {
                console.error("Error", res.error)
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