import {Prompt} from "../../+state/prompt/prompt.ts";
import {createPromptWorkflow} from "../../+state/prompt/prompt-workflow/create-prompt-workflow.ts";
import PreviewImageNode, {nodeTypePreviewImage} from "../../+state/prompt/prompt-nodes/preview-image.node.ts";
import LoadImageNode from "../../+state/prompt/prompt-nodes/load-image.node.ts";
import {PromptDTO} from "../dto/prompt-node.dto.ts";
import {promptToPromptDto} from "./prompt-to-prompt-dto.mapper.ts";
import {ComfyuiSocket} from "../../+state/socket/comfyui-socket.model.ts";

describe('Mapper for converting a full prompt into a dto object that can be passed to /prompt', function () {
    it('should convert a simple prompt object', () => {
        const socket: ComfyuiSocket = {
            name: "main",
            clientId: "test-123"
        }

        const prompt: Prompt = {
            workflow: createPromptWorkflow({
                nodes: [
                    LoadImageNode({
                        id: "1",
                        initialState: {
                            images: ["test.png"],
                            currentImage: "test.png",
                        }
                    }),
                    PreviewImageNode({
                        id: "2",
                        initialState: {
                            images: []
                        }
                    })
                ]
            })
        }

        prompt.workflow.getNode("2", nodeTypePreviewImage).setInputs({
            images: {
                kind: "link",
                id: "1",
                slot: 0,
            }
        })

        const dto: PromptDTO = promptToPromptDto({
            socket,
            prompt
        })

        expect(dto).toEqual({
            client_id: "test-123",
            prompt: {
                "1": {
                    "class_type": "LoadImage",
                    "inputs": {
                        "choose file to upload": "image",
                        "image": "test.png"
                    }
                },
                "2": {
                    "class_type": "PreviewImage",
                    "inputs": {
                        "images": ["1", 0]
                    }
                }
            },
            extra_data: {}
        })
    })

    it('should convert object and output proper json', () => {
        const socket: ComfyuiSocket = {
            name: "main",
            clientId: "test-123"
        }

        const prompt: Prompt = {
            workflow: createPromptWorkflow({
                nodes: [
                    LoadImageNode({
                        id: "1",
                        initialState: {
                            images: ["test.png"],
                            currentImage: "test.png",
                        }
                    }),
                    PreviewImageNode({
                        id: "2",
                        initialState: {
                            images: []
                        }
                    })
                ]
            })
        } satisfies Prompt

        prompt.workflow.getNode("2", nodeTypePreviewImage).setInputs({
            images: {
                kind: "link",
                id: "1",
                slot: 0,
            }
        })

        const dto: PromptDTO = promptToPromptDto({
            socket,
            prompt
        })

        expect(JSON.stringify(dto)).toEqual("{\"client_id\":\"test-123\",\"prompt\":{\"1\":{\"inputs\":{\"choose file to upload\":\"image\",\"image\":\"test.png\"},\"class_type\":\"LoadImage\"},\"2\":{\"inputs\":{\"images\":[\"1\",0]},\"class_type\":\"PreviewImage\"}},\"extra_data\":{}}")
    })

});