import {useTypedGenericPromptNodeFromDataNode} from "../nodes/nodes.hooks.tsx";
import {NodeDefinitionLoadImage} from "../../prompt-nodes/load-image/node-definition-load-image.ts";
import {NodeDefinitionPreviewImage} from "../../prompt-nodes/preview-image/node-definition-preview-image.ts";
import {promptToPromptDto} from "../../mapper/prompt-to-prompt-dto.mapper.ts";
import {GenericSocket} from "@inflame/models";
import {AppState, comfyApi, promptsSelectors, promptsSliceActions, useAppDispatch} from "@inflame/state";
import {useSelector} from "react-redux";
import structuredClone from "@ungap/structured-clone";
import {useEffect} from "react";

/**
 * Simple Proof-of-Concept for Dynamic-Nodes and prompting
 */
export const usePostSimpleImagePrompt = (props: {
    socket: GenericSocket,
    promptName?: string
}) => {
    const {socket, promptName = "usePostSimpleImagePrompt"} = props

    const [postPrompt, requestMeta] = comfyApi.usePostPrompt();
    const dispatch = useAppDispatch()
    const prompt = useSelector((state: AppState) => promptsSelectors.selectPromptByName(state, promptName))

    const nodeLoadImage = useTypedGenericPromptNodeFromDataNode({
        id: "1",
        classtype: "LoadImage",
        definition: NodeDefinitionLoadImage
    })

    const nodePreviewImage = useTypedGenericPromptNodeFromDataNode({
        id: "2",
        classtype: "PreviewImage",
        definition: NodeDefinitionPreviewImage
    })

    if (!prompt) {
        dispatch(promptsSliceActions.createPrompt(promptName))
    }

    useEffect(() => {
        if (!nodeLoadImage || !nodePreviewImage) {
            return;
        }

        const loadImage = structuredClone(nodeLoadImage)
        const previewImage = structuredClone(nodePreviewImage)

        if (loadImage.state.image) {
            loadImage.inputs.image = {
                kind: "string", value: loadImage.state.image[0][1] ?? ""
            }
        } else {
            console.error("Cannot set inputs image due to missing image in loadImage")
        }

        loadImage.inputs.upload = {
            kind: "boolean",
            value: true,
        };

        // TODO: How to fix IMAGE === IMAGE vs. IMAGE === MASK? (Typing issue?)
        previewImage.inputs.images = loadImage.outputs.IMAGE

        dispatch(promptsSliceActions.updatePromptNodes({
            name: promptName,
            nodes: [
                loadImage,
                previewImage,
            ]
        }))
    }, [nodeLoadImage, nodePreviewImage]);

    useEffect(() => {
        console.log(requestMeta)

        if (!socket || prompt.workflow.nodes.length < 0 || !nodeLoadImage || !nodePreviewImage) {
            return;
        }

        const promptDto = promptToPromptDto({
            socketId: socket.clientId,
            prompt,
        })

        postPrompt(promptDto)
    }, [socket, prompt, nodeLoadImage, nodePreviewImage]);

}