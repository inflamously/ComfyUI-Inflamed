import LoadImageNode from "../../prompt-nodes/load-image/load-image.node.ts";
import PreviewImageNode from "../../prompt-nodes/preview-image/preview-image.node.ts";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AppState, useAppDispatch} from "@inflame/state";
import {socketStateSelectors} from "@inflame/state";
import {promptsThunk} from "@inflame/state";
import {Prompt} from "@inflame/models";
import {COMFYUI_SOCKET} from "../socket/comfyui/comfyui-socket.tsx";

export const useDebugImagePrompt = (): [(Prompt | undefined)] => {
    const socket = useSelector(
        (state: AppState) => socketStateSelectors.selectSocketById(state, COMFYUI_SOCKET)
    )
    const [prompt, setPrompt] = useState<Prompt | undefined>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!socket) {
            console.warn("DebugImagePrompt: Socket initialization failed!");
            return;
        }

        // Create nodes manually
        const loadImage = LoadImageNode({
            id: "1",
            initialState: {
                images: [],
                allowUpload: true,
                currentImage: "example.png"
            }
        })

        const previewImage = PreviewImageNode({
            id: "2",
            initialState: {
                images: []
            }
        })

        previewImage.inputs = {
            images: loadImage.outputs?.image
        }

        dispatch(promptsThunk.createPromptWithWorkflow({
            nodes: [
                loadImage,
                previewImage,
            ]
        })).then((prompt) => setPrompt(prompt)).catch((error) => console.error(error))
    }, [socket, dispatch])


    return [prompt]
}