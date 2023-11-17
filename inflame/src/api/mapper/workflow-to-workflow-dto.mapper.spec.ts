import {workflowDtoMapper} from "./workflow-to-workflow-dto.mapper.ts";
import PromptNodeLoadImage from "../../+state/prompt-nodes/load-image.node.ts";
import {createPromptWorkflow} from "../../+state/prompt-workflow/create-prompt-workflow.ts";
import PromptNodePreviewImage from "../../+state/prompt-nodes/preview-image.node.ts";

describe('Mapper for workflow conversion to DTO', () => {
    it('should map workflow to dto', () => {
        const loadImageNode = PromptNodeLoadImage({
            id: "1",
            initialState: {
                images: [],
                currentImage: "test.png",
            }
        })

        expect(loadImageNode.getOutputs()?.image).toEqual({
            id: "1",
            kind: "link",
            slot: 0,
        })

        const previewImageNode = PromptNodePreviewImage({
            id: "2",
            initialState: {
                images: []
            }
        })
        previewImageNode.setInputs({
            images: loadImageNode.getOutputs()?.image
        })

        const workflow = createPromptWorkflow({
            nodes: [
                loadImageNode,
                previewImageNode
            ]
        })

        const workflowDto = workflowDtoMapper(workflow)
        expect(workflowDto).toEqual(
            {
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
                        "images": [
                            "1",
                            0
                        ]
                    }
                }
            }
        )
    })
});