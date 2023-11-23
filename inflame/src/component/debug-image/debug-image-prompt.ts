import {Prompt} from "../../+state/prompt/prompt.ts";
import {createPromptWorkflow} from "../../+state/prompt/prompt-workflow/create-prompt-workflow.ts";
import LoadImageNode from "../../+state/prompt/prompt-nodes/load-image.node.ts";
import PreviewImageNode from "../../+state/prompt/prompt-nodes/preview-image.node.ts";
import {promptToPromptDto} from "../../api/mapper/prompt-to-prompt-dto.mapper.ts";
import {useEffect, useState} from "react";
import {PromptDTO} from "../../api/dto/prompt-node.dto.ts";
import {useSelector} from "react-redux";
import {AppState} from "../../+state/inflame-store.ts";
import {socketStateSelectors} from "../../+state/socket/socket-selectors.ts";

export const useDebugImagePrompt = (): [(Prompt | null), (PromptDTO | null)] => {
    const [prompt, setPrompt] = useState<Prompt | null>(null)
    const [promptDto, setPromptDto] = useState<PromptDTO | null>(null)
    const socket = useSelector(
        (state: AppState) => socketStateSelectors.selectById(state, "main")
    )

    useEffect(() => {
        if (!socket) {
            console.warn("DebugImagePrompt: Socket initialization failed!");
            return;
        }

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

        previewImage.setInputs({
            images: loadImage.getOutputs()?.image
        })

        const customPrompt: Prompt = {
            workflow: createPromptWorkflow({
                nodes: [
                    loadImage,
                    previewImage,
                ]
            })
        }

        setPrompt(customPrompt)
        setPromptDto(promptToPromptDto({socket, prompt: customPrompt}))
    }, [socket, setPrompt, setPromptDto])


    return [prompt, promptDto]
}