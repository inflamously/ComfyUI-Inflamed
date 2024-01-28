import {Box, Button, Image, Text} from "@chakra-ui/react";
import {useCallback} from "react";
import Fileuploader from "../file/fileuploader.tsx";
import {useSelector} from "react-redux";
import {useDebugPrompt} from "./debug-image-prompt.hooks.tsx";
import {AppState, socketStateSelectors} from "@inflame/state";
import {promptsSliceActions} from "@inflame/state";
import {comfyApi} from "@inflame/state";
import {isPromptResultDTO} from "@inflame/state";
import {promptToPromptDto} from "../../mapper/prompt-to-prompt-dto.mapper.ts";
import {COMFYUI_SOCKET} from "../socket/comfyui/comfyui-socket.hooks.tsx";
import {useAppDispatch} from "@inflame/state";
import {useGetViewImage} from "../resources/comfyui-api/view-image-download.hooks.ts";
import {AbstractNodeView} from "../nodes/abstract-node-view.tsx";
import {GenericSocket} from "@inflame/models";
import {usePostSimpleImagePrompt} from "./image-prompt.hooks.ts";

const DebugImagePrompt = () => {
    const debugPrompt = useDebugPrompt();
    const socket = useSelector((state: AppState): GenericSocket => socketStateSelectors.selectSocketById(state, COMFYUI_SOCKET))
    const [postPrompt] = comfyApi.usePostPrompt()
    const dispatch = useAppDispatch()
    const {url: exampleUrl} = useGetViewImage({
        type: "input",
        filename: "example.png"
    })

    usePostSimpleImagePrompt({
        socket,
    })

    const {url: generatedImageUrl = ""} = useGetViewImage({
        type: "output",
        filename: "",
    })

    const handleInvokePrompt = useCallback(async () => {
        if (!debugPrompt || !socket) {
            return;
        }

        const promptDto = promptToPromptDto({
            socketId: socket.clientId,
            prompt: debugPrompt
        });

        if (promptDto) {
            const response = await postPrompt(promptDto)
            if ('data' in response && isPromptResultDTO(response.data)) {
                dispatch(promptsSliceActions.updatePromptRemoteId({
                    clientId: debugPrompt.clientId,
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
                <Image src={exampleUrl} width={128} height={128}></Image>
                <p>"example.png" image from "input" folder on server</p>
            </Box>
            <Box pb={4}>
                <Fileuploader fileTypes={[
                    "image/jpeg", "image/png"
                ]}/>
            </Box>
            <Box>
                <Text pb={4}>Custom Prompt</Text>
                <Button onClick={handleInvokePrompt}>Invoke</Button>
            </Box>
            <Box>
                <Text pb={4}>Client ID {debugPrompt?.clientId}</Text>
                <Text pb={4}>Remote ID {debugPrompt?.remoteId}</Text>
                <Text pb={4}>{JSON.stringify(debugPrompt?.workflow.nodes[1]?.state)}</Text>
            </Box>
            <Box>
                <AbstractNodeView abstractNode={debugPrompt?.workflow.nodes.at(0)}></AbstractNodeView>
                <Image src={generatedImageUrl} width={128} height={128}></Image>
            </Box>
        </Box>
    )
}

export default DebugImagePrompt;