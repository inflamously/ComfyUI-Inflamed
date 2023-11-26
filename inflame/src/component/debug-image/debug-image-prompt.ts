import {Prompt} from "../../+state/prompt/prompt.model.ts";
import {createPromptWorkflow} from "../../+state/prompt/prompt-workflow/create-prompt-workflow.ts";
import LoadImageNode from "../../+state/prompt/prompt-nodes/load-image.node.ts";
import PreviewImageNode from "../../+state/prompt/prompt-nodes/preview-image.node.ts";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AppState, useAppDispatch} from "../../+state/inflame-store.ts";
import {socketStateSelectors} from "../../+state/socket/socket-selectors.ts";
import {createPromptWithWorkflow} from "../../+state/prompt/prompt-workflow/prompts.thunk.ts";
import {promptsSelectors} from "../../+state/prompt/prompt-workflow/prompts.selectors.ts";

export const useDebugImagePrompt = (): [(Prompt | undefined)] => {
    const socket = useSelector(
        (state: AppState) => socketStateSelectors.selectById(state, "main")
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
                images: [], // TODO: need images
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

        const customPrompt: Prompt = {
            workflow: createPromptWorkflow({
                nodes: [
                    loadImage,
                    previewImage,
                ]
            })
        }

        dispatch(createPromptWithWorkflow(customPrompt))
    }, [socket, dispatch])


    return [prompt]
}