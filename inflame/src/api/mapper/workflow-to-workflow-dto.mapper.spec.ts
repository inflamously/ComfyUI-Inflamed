import {workflowToWorkflowDtoMapper} from "./workflow-to-workflow-dto.mapper.ts";
import PromptNodeLoadImage from "../../+state/prompt/prompt-nodes/load-image/load-image.node.ts";
import PromptNodePreviewImage from "../../+state/prompt/prompt-nodes/preview-image/preview-image.node.ts";
import {PromptWorkflow} from "../../+state/prompt/prompt-workflow/prompt.model.ts";

describe('Mapper for workflow conversion to DTO', () => {
    it('should map workflow to dto', () => {
        const loadImageNode = PromptNodeLoadImage({
            id: "1",
            initialState: {
                images: [],
                allowUpload: true,
                currentImage: "test.png",
            }
        })

        expect(loadImageNode.outputs?.image).toEqual({
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
        previewImageNode.inputs = {
            images: loadImageNode.outputs?.image
        }

        const workflow: PromptWorkflow = {
            nodes: [
                loadImageNode,
                previewImageNode
            ]
        }

        const workflowDto = workflowToWorkflowDtoMapper(workflow)
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