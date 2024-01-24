import {useTypedGenericPromptNode} from "../nodes/data-nodes.hooks.tsx";
import {NodeLoadImageDefinition} from "../../prompt-nodes/load-image/node-load-image-definition.ts";
import {useEffect} from "react";
import {NodePreviewImageDefinition} from "../../prompt-nodes/preview-image/node-preview-image-definition.ts";
import {promptToPromptDto} from "../../mapper/prompt-to-prompt-dto.mapper.ts";
import {GenericSocket} from "@inflame/models";
import {AppState, comfyApi, promptsSelectors, promptsSliceActions, useAppDispatch} from "@inflame/state";
import {useSelector} from "react-redux";
import structuredClone from "@ungap/structured-clone";

/**
 * Simple Proof-of-Concept for Dynamic-Nodes and prompting
 */
export const usePostSimpleImagePrompt = (props: {
    socket: GenericSocket,
    name?: string
}) => {
    const {socket, name = "usePostSimpleImagePrompt"} = props

    const [postPrompt] = comfyApi.usePostPrompt();
    const dispatch = useAppDispatch()
    const prompt = useSelector((state: AppState) => promptsSelectors.selectPromptByClientId(state, name))

    const nodeLoadImage = useTypedGenericPromptNode({
        id: "1",
        name: "LoadImage",
        definition: NodeLoadImageDefinition
    })

    const nodePreviewImage = useTypedGenericPromptNode({
        id: "2",
        name: "PreviewImage",
        definition: NodePreviewImageDefinition
    })

    useEffect(() => {
        if (!prompt) {
            dispatch(promptsSliceActions.createPrompt(name))
        }
    }, [prompt, dispatch]);


    useEffect(() => {
        if (!nodeLoadImage || !nodePreviewImage) {
            return;
        }

        const loadImage = structuredClone(nodeLoadImage)
        const previewImage = structuredClone(nodePreviewImage)

        if (loadImage.state.image) {
            loadImage.inputs.image = {
                kind: "string", value: loadImage.state.image[0][0] ?? ""
            }
        } else {
            console.error("Cannot set inputs image due to missing image in loadImage")
        }

        loadImage.inputs.upload = {
            kind: "boolean",
            value: true,
        };

        previewImage.inputs.images = loadImage.outputs.IMAGE

        dispatch(promptsSliceActions.updatePromptNodes({
            clientId: name,
            nodes: [
                loadImage,
                previewImage,
            ]
        }))
    }, [nodeLoadImage, nodePreviewImage]);

    useEffect(() => {
        if (!socket || !prompt || prompt.workflow.nodes.length === 0) {
            return;
        }

        const promptDto = promptToPromptDto({
            socketId: socket.clientId,
            prompt,
        })

        postPrompt(promptDto)
      }, [socket, prompt]);
}