import PreviewImageNode, {nodeTypePreviewImage} from "../../prompt-nodes/preview-image/preview-image.node.ts";
import LoadImageNode from "../../prompt-nodes/load-image/load-image.node.ts";
import {PromptDTO} from "../dto/prompt-node.dto.ts";
import {promptToPromptDto} from "./prompt-to-prompt-dto.mapper.ts";
import {GenericSocket} from "../../+state/socket/socket.model.ts";
import {Prompt} from "../../+state/prompt/prompt-workflow/prompt.model.ts";
import {getNodeFromWorkflow} from "../../+state/prompt/prompt-workflow/prompts.utils.ts";

describe('Mapper for converting a full prompt into a dto object that can be passed to /prompt', function () {
    it('should convert a simple prompt object', () => {
        const socket: GenericSocket = {
            name: "main",
            clientId: "test-123"
        }

        const prompt: Prompt = {
            clientId: "1234",
            workflow: {
                nodes: [
                    LoadImageNode({
                        id: "1",
                        initialState: {
                            images: ["test.png"],
                            allowUpload: true,
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
            }
        }

        getNodeFromWorkflow(prompt.workflow, "2", nodeTypePreviewImage).inputs = {
            images: {
                kind: "link",
                id: "1",
                slot: 0,
            }
        }

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
        const socket: GenericSocket = {
            name: "main",
            clientId: "test-123"
        }

        const prompt: Prompt = {
            clientId: "1234",
            workflow: {
                nodes: [
                    LoadImageNode({
                        id: "1",
                        initialState: {
                            images: ["test.png"],
                            allowUpload: true,
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
            }
        }

        getNodeFromWorkflow(prompt.workflow, "2", nodeTypePreviewImage).inputs = {
            images: {
                kind: "link",
                id: "1",
                slot: 0,
            }
        }

        const dto: PromptDTO = promptToPromptDto({
            socket,
            prompt
        })

        expect(JSON.stringify(dto)).toEqual("{\"client_id\":\"test-123\",\"prompt\":{\"1\":{\"inputs\":{\"choose file to upload\":\"image\",\"image\":\"test.png\"},\"class_type\":\"LoadImage\"},\"2\":{\"inputs\":{\"images\":[\"1\",0]},\"class_type\":\"PreviewImage\"}},\"extra_data\":{}}")
    })

});