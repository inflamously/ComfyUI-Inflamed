import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AppState, promptsSelectors, useAppDispatch} from "@inflame/state";
import {socketStateSelectors} from "@inflame/state";
import {promptsThunk} from "@inflame/state";
import {Prompt} from "@inflame/models";
import {COMFYUI_SOCKET} from "../socket/comfyui/comfyui-socket.hooks.tsx";
import {useTypedGenericPromptNode} from "../nodes/data-nodes.hooks.tsx";
import {NodeDefinitionLoadImage} from "../../prompt-nodes/load-image/node-definition-load-image.ts";
import {NodeDefinitionPreviewImage} from "../../prompt-nodes/preview-image/node-definition-preview-image.ts";

export const useDebugImagePrompt = (): Prompt | undefined => {
    const socket = useSelector(
        (state: AppState) => socketStateSelectors.selectSocketById(state, COMFYUI_SOCKET)
    )
    const [promptId] = useState<string>("debug-prompt")
    const prompt = useSelector((state: AppState) => promptsSelectors.selectPromptByClientId(state, promptId))
    const dispatch = useAppDispatch();

    const loadImage = useTypedGenericPromptNode({
        id: "1",
        className: "LoadImage",
        definition: NodeDefinitionLoadImage,
    })

    const previewImage = useTypedGenericPromptNode({
        id: "2",
        className: "PreviewImage",
        definition: NodeDefinitionPreviewImage,
    })

    useEffect(() => {
        if (prompt) {
            return;
        }

        if (!socket || !previewImage || !loadImage) {
            return;
        }

        if (previewImage?.inputs?.images) {
            previewImage.inputs.images = loadImage?.outputs?.IMAGE
        }

        dispatch(
            promptsThunk.createPromptWithWorkflow({
                clientId: promptId,
                nodes: [
                    loadImage,
                    previewImage,
                ]
            })
        ).catch((error) => console.error(error))
    }, [socket, dispatch, promptId, loadImage, previewImage])

    return prompt
}