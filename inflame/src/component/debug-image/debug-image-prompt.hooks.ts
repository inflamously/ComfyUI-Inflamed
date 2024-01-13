import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AppState, promptsSelectors, useAppDispatch} from "@inflame/state";
import {socketStateSelectors} from "@inflame/state";
import {promptsThunk} from "@inflame/state";
import {Prompt} from "@inflame/models";
import {COMFYUI_SOCKET} from "../socket/comfyui/comfyui-socket.tsx";
import {PromptNodePreviewImage} from "../../prompt-nodes/preview-image/preview-image.node.ts";
import {PromptNodeLoadImage} from "../../prompt-nodes/load-image/load-image.node.ts";

export const useDebugImagePrompt = (): Prompt | undefined => {
    const socket = useSelector(
        (state: AppState) => socketStateSelectors.selectSocketById(state, COMFYUI_SOCKET)
    )
    const [promptId] = useState<string>("debug-prompt")
    const prompt = useSelector((state: AppState) => promptsSelectors.selectPromptByClientId(state, promptId))
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (prompt) {
            console.log("Debug prompt acquired")
            return;
        }

        if (!socket) {
            console.warn("DebugImagePrompt: Socket initialization failed!");
            return;
        }

        // Create nodes manually
        const loadImage = PromptNodeLoadImage({
            id: "1",
            initialState: {
                images: [],
                allowUpload: true,
                currentImage: "example.png"
            }
        })

        const previewImage = PromptNodePreviewImage({
            id: "2",
            initialState: {
                images: []
            }
        })

        previewImage.inputs = {
            images: loadImage.outputs?.image
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
    }, [socket, dispatch, promptId])

    return prompt
}