import {Box, Button, Image, Input, Text} from "@chakra-ui/react";
import {ChangeEvent, useCallback, useState} from "react";
import Fileuploader from "../file/fileuploader.tsx";
import {useSelector} from "react-redux";
import {AppState, socketStateSelectors} from "@inflame/state";
import {promptsSliceActions} from "@inflame/state";
import {comfyApi} from "@inflame/state";
import {isPromptResultDTO} from "@inflame/state";
import {promptToPromptDto} from "../../mapper/prompt-to-prompt-dto.mapper.ts";
import {COMFYUI_SOCKET} from "../socket/comfyui/comfyui-socket.hooks.tsx";
import {useAppDispatch} from "@inflame/state";
import {AbstractNodeView} from "../nodes/abstract-node-view.tsx";
import {GenericSocket, ViewQueryDTO} from "@inflame/models";
import {useDebugPrompt} from "./debug-image-prompt.hooks.tsx";
import {useComfyuiImage} from "../resources/comfyui-api/view-image-download.hooks.ts";
import {NodeDefinitionPreviewImage} from "../../prompt-nodes/preview-image/node-definition-preview-image.ts";
import {useNodeFromPrompt} from "../nodes/nodes.hooks.tsx";

const DebugImagePrompt = () => {
    const [imageIndex, setImageIndex] = useState<number>(1);

    const debugPrompt = useDebugPrompt({
        promptName: "debug-prompt",
        image: {
            index: imageIndex
        }
    })

    const socket = useSelector((state: AppState): GenericSocket => socketStateSelectors.selectSocketById(state, COMFYUI_SOCKET))
    const [postPrompt] = comfyApi.usePostPrompt()
    const dispatch = useAppDispatch()

    const {url: exampleUrl} = useComfyuiImage({
        type: "input",
        filename: "example.png"
    })

    const previewImage = useNodeFromPrompt({
        nodeId: "2",
        prompt: debugPrompt,
        definition: NodeDefinitionPreviewImage
    })

    const {url: generatedImageUrl = ""} = useComfyuiImage({
        type: previewImage?.state?.images?.[0]?.type as ViewQueryDTO["type"] ?? "",
        filename: previewImage?.state?.images?.[0]?.filename ?? "",
    })

    const handleInvokePrompt = useCallback(async () => {
        if (!postPrompt || !debugPrompt || !socket) {
            return;
        }

        const promptDto = promptToPromptDto({
            socketId: socket.clientId,
            prompt: debugPrompt
        });

        if (promptDto) {
            const response = await postPrompt(promptDto)

            if ('error' in response) {
                console.error("Error", response.error)
                return;
            }

            if ('data' in response && isPromptResultDTO(response.data)) {
                dispatch(promptsSliceActions.updatePromptRemoteId({
                    name: debugPrompt.name,
                    remoteId: response.data.prompt_id,
                }))
            }
        }
    }, [dispatch, postPrompt, debugPrompt, socket])

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
                <Input type="number" value={imageIndex}
                       onChange={(ev: ChangeEvent) => setImageIndex((ev?.target as unknown as {
                           value: number
                       }).value ?? 1)}></Input>
                <Button onClick={handleInvokePrompt}>Invoke</Button>
            </Box>
            <Box p={16}>
                <Text pb={4}>Client ID {debugPrompt?.name}</Text>
                <Text pb={4}>Remote ID {debugPrompt?.remoteId}</Text>
                <Text pb={4}>{JSON.stringify(debugPrompt?.workflow.nodes[1]?.state)}</Text>
                <Image src={generatedImageUrl} width={128} height={128}></Image>
            </Box>
            <Box>
                <AbstractNodeView abstractNode={debugPrompt?.workflow.nodes.at(0)}></AbstractNodeView>
            </Box>
        </Box>
    )
}

export default DebugImagePrompt;