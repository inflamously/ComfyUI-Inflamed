import LoadImageNode from "../../+state/prompt/prompt-nodes/load-image/load-image.node.ts";
import PreviewImageNode from "../../+state/prompt/prompt-nodes/preview-image/preview-image.node.ts";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AppState, useAppDispatch} from "../../+state/inflame-store.ts";
import {socketStateSelectors} from "../../+state/socket/socket-selectors.ts";
import {promptsSelectors} from "../../+state/prompt/prompt-workflow/prompts.selectors.ts";
import {promptsThunk} from "../../+state/prompt/prompt-workflow/prompts.thunk.ts";
import {Prompt} from "../../+state/prompt/prompt-workflow/prompt.model.ts";
import {SOCKET_MAIN} from "../../+state/socket/comfyui-socket.model.ts";

export const useDebugImagePrompt = (): [(Prompt | undefined)] => {
    const socket = useSelector(
        (state: AppState) => socketStateSelectors.selectById(state, SOCKET_MAIN)
    )
    const [promptId] = useState<number | null>(null);
    const prompt = useSelector(
        (state: AppState) => promptId !== null ? promptsSelectors.selectPromptById(state, promptId) : undefined
    );
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
        })).catch((error) => console.error(error))
    }, [socket, dispatch])


    return [prompt]
}