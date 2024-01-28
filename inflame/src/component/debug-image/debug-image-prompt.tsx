import {Box, Button, Image, Text} from "@chakra-ui/react";
import {useCallback} from "react";
import Fileuploader from "../file/fileuploader.tsx";
import {useSelector} from "react-redux";
import {useDebugImagePrompt} from "./debug-image-prompt.hooks.tsx";
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
import {useSubscribeStoreChange} from "../store.hooks.tsx";
import {promptWorkflowUpdate} from "../../+state/prompt/prompt-workflow-update/prompt-workflow.action.ts";
import {
    sourceContainNodes,
    sourceIncludesAppendix
} from "../../+state/prompt/prompt-workflow-update/prompt-workflow.utils.ts";
import {filterToExistingNodes} from "../../prompt-nodes/prompt-node.utils.ts";

const DebugImagePrompt = () => {
    const debugPrompt = useDebugImagePrompt();
    const socket = useSelector((state: AppState): GenericSocket => socketStateSelectors.selectSocketById(state, COMFYUI_SOCKET))
    const [postPrompt] = comfyApi.usePostPrompt()
    const dispatch = useAppDispatch()
    const [_, url] = useGetViewImage({
        type: "input",
        filename: "example.png"
    })

    // TODO: Better naming and fix type issue
    useSubscribeStoreChange({
        action: promptWorkflowUpdate.nodeUpdate,
        listener: (action, api) => {
            console.log("Debug Prompt Action happend", action)

            const {source, target} = action.payload ?? {}

            if (!source ||
                !target ||
                !sourceContainNodes(source) ||
                !sourceIncludesAppendix(source)) {
                console.warn("Neither source nor target was valid and / or included an appendix.")
                return;
            }

            filterToExistingNodes({
                source,
                target,
            }).forEach((_) => {
            })

            api.dispatch(promptsSliceActions.updatePromptNodes({
                nodes: [],
                clientId: target.clientId,
            }))
        }
    })

    // const [_, generatedImageUrl] = useGetViewImage({})

    const handleInvokePrompt = useCallback(async () => {
        const prompt = debugPrompt
        if (!prompt || !socket) {
            return;
        }

        const promptDto = promptToPromptDto({
            socketId: socket.clientId,
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
                <AbstractNodeView abstractNode={debugPrompt?.workflow.nodes.at(0)}></AbstractNodeView>
            </Box>
        </Box>
    )
}

export default DebugImagePrompt;