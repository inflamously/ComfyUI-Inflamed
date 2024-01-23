import {useTypedGenericPromptNode} from "../nodes/data-nodes.hooks.tsx";
import {NodeLoadImageDefinition} from "../../prompt-nodes/load-image/node-load-image-definition.ts";
import {useEffect} from "react";
import {NodePreviewImageDefinition} from "../../prompt-nodes/preview-image/node-preview-image-definition.ts";
import {promptToPromptDto} from "../../mapper/prompt-to-prompt-dto.mapper.ts";
import {GenericSocket, Prompt} from "@inflame/models";
import {comfyApi} from "@inflame/state";

/**
 * Simple Proof-of-Concept for Dynamic-Nodes and prompting
 */
export const usePostSimpleImagePrompt = (props: {
    socket: GenericSocket
}) => {
    const {socket} = props

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
            socketId: socket.clientId,
            prompt,
        })

        setTimeout(() => {
            postPrompt(promptDto)
        }, 2000)
    }, [nodeLoadImage, nodePreviewImage]);
}