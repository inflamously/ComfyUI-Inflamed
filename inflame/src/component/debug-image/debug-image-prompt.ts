import LoadImageNode from "../../prompt-nodes/load-image/load-image.node.ts";
import PreviewImageNode from "../../prompt-nodes/preview-image/preview-image.node.ts";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AppState, useAppDispatch} from "../../+state/inflame-store.ts";
import {socketStateSelectors} from "../../+state/socket/socket.selectors.ts";
import {COMFYUI_SOCKET} from "../../socket/comfyui/comfyui-socket.tsx";
import {Prompt} from "../../+state/prompt/prompt-workflow/prompt.model.ts";
import {promptsThunk} from "../../+state/prompt/prompt-workflow/prompts.thunk.ts";

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