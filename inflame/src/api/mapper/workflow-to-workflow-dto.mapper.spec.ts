import PromptNodeLoadImage from "../+state/workflow/nodes/load-image.node.ts";
import PromptNodePreviewImage from "../+state/workflow/nodes/preview-image.node.ts";
import {createPromptWorkflow} from "../+state/workflow/create-workflow.ts";
import {workflowDtoMapper} from "./workflow-to-workflow-dto.mapper.ts";

describe('Mapper for workflow conversion to DTO', () => {
    it('should map workflow to dto', () => {
        const loadImageNode = PromptNodeLoadImage({
            id: "1",
            initialState: {
                images: []
            }
        })

        expect(loadImageNode.getOutputs()?.image).toEqual({
            id: "1",
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
        expect(workflowDto).toEqual({})
    })
});