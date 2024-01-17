import {Box, Button, Image, Text} from "@chakra-ui/react";
import {useCallback, useEffect} from "react";
import Fileuploader from "../file/fileuploader.tsx";
import {useSelector} from "react-redux";
import {useDebugImagePrompt} from "./debug-image-prompt.hooks.ts";
import {AppState, socketStateSelectors} from "@inflame/state";
import {promptsSliceActions} from "@inflame/state";
import {comfyApi} from "@inflame/state";
import {isPromptResultDTO} from "@inflame/state";
import {promptToPromptDto} from "../../mapper/prompt-to-prompt-dto.mapper.ts";
import {COMFYUI_SOCKET} from "../socket/comfyui/comfyui-socket.hooks.tsx";
import {useAppDispatch} from "@inflame/state";
import {useGetViewImage} from "../resources/comfyui-api/view-image-download.hooks.ts";
import {AbstractNodeView} from "../nodes/abstract-node-view.tsx";
import {useGenericPromptNode} from "../nodes/data-nodes.hooks.tsx";
import {Prompt} from "@inflame/models";

const DebugImagePrompt = () => {
    const debugPrompt = useDebugImagePrompt();
    const socket = useSelector((state: AppState) => socketStateSelectors.selectSocketById(state, COMFYUI_SOCKET))
    const [postPrompt, result] = comfyApi.usePostPrompt()
    const dispatch = useAppDispatch()
    const [_, url] = useGetViewImage({
        type: "input",
        filename: "example.png"
    })

    const genericLoadImageNode = useGenericPromptNode({
        id: "1",
        name: "LoadImage"
    })
    const genericPreviewImageNode = useGenericPromptNode({
        id: "2",
        name: "PreviewImage"
    })

    // TODO: Simplify this dynamic stuff but without losing dynamic flexibility
    useEffect(() => {
        console.log(genericLoadImageNode?.state)

        if(genericPreviewImageNode?.inputs?.images) {
            genericPreviewImageNode.inputs.images = genericLoadImageNode?.outputs?.IMAGE
        }

        if (genericLoadImageNode?.inputs && "image" in genericLoadImageNode.inputs) {
            genericLoadImageNode.inputs.image = {
                kind: "string",
                value: (genericLoadImageNode?.state?.image as [Array<string>, unknown])?.[0][0] ?? ""
            }

            genericLoadImageNode.inputs["image_upload"] = {
                kind: "string",
                value: "true",
            }
        }

        if (genericPreviewImageNode && genericLoadImageNode) {
            const prompt: Prompt = {
                clientId: "123",
                workflow: {
                    nodes: [
                        genericLoadImageNode,
                        genericPreviewImageNode
                    ]
                }
            }

            const promptDto = promptToPromptDto({
                clientId: "123",
                prompt,
            })

            console.log(promptDto)

            postPrompt(promptDto)
        }
    }, [postPrompt, genericPreviewImageNode, genericLoadImageNode]);

    // const [_, generatedImageUrl] = useGetViewImage({})

    useEffect(() => {
        console.log("Call Result", result.status)
    }, [result.status])


    const handleInvokePrompt = useCallback(async () => {
        const prompt = debugPrompt
        if (!prompt || !socket) {
            return;
        }

        const promptDto = promptToPromptDto({
            clientId: socket.clientId,
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
                <Image src={url} width={128} height={128}></Image>
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
                <AbstractNodeView abstractNode={genericLoadImageNode}></AbstractNodeView>
            </Box>
        </Box>
    )
}

export default DebugImagePrompt;