import {useTypedGenericPromptNode} from "../nodes/data-nodes.hooks.tsx";
import {NodeLoadImageDefinition} from "../../prompt-nodes/load-image/node-load-image-definition.ts";
import {useEffect} from "react";
import {NodePreviewImageDefinition} from "../../prompt-nodes/preview-image/node-preview-image-definition.ts";
import {promptToPromptDto} from "../../mapper/prompt-to-prompt-dto.mapper.ts";
import {Prompt} from "@inflame/models";
import {comfyApi} from "@inflame/state";

export const usePostSimpleImagePrompt = () => {
    const [postPrompt] = comfyApi.usePostPrompt();

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

    // TODO: Simplify this dynamic stuff but without losing dynamic flexibility
    useEffect(() => {
        if (!nodeLoadImage || !nodePreviewImage) {
            return;
        }

        if (nodeLoadImage.state.image) {
            nodeLoadImage.inputs.image = {
                kind: "string", value: nodeLoadImage.state.image[0][0] ?? ""
            }
        } else {
            console.error("Cannot set inputs image due to missing image in nodeLoadImage")
        }

        nodeLoadImage.inputs.upload = {
            kind: "boolean",
            value: true,
        };

        nodePreviewImage.inputs.images = nodeLoadImage.outputs.IMAGE

        const prompt: Prompt = {
            clientId: "123",
            workflow: {
                nodes: [
                    nodeLoadImage,
                    nodePreviewImage
                ]
            }
        }

        const promptDto = promptToPromptDto({
            clientId: "123",
            prompt,
        })

        postPrompt(promptDto)
    }, [nodeLoadImage, nodePreviewImage]);
}