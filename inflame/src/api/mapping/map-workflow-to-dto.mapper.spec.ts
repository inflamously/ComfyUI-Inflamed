import NodeLoadImage from "../../+state/workflow/nodes/load-image.node.ts";
import {mapWorkflowToDtoMapper} from "./map-workflow-to-dto.mapper.ts";
import NodePreviewImage from "../../+state/workflow/nodes/preview-image.node.ts";
import {NewPromptWorkflow, PromptWorkflow} from "../../+state/workflow/nodes/workflow.model.ts";

describe('Mapper for workflow conversion to DTO', () => {
    it('should map workflow to dto', () => {
        const loadImageNode = NodeLoadImage({
            id: "1",
        })

        expect(loadImageNode.getOutputs().image).toEqual({
            id: "1",
            slot: 0,
        })

        const previewImageNode = NodePreviewImage({
            id: "2",
            initialState: {
                images: []
            }
        })
        previewImageNode.setInputs({
            images: loadImageNode.getOutputs().image
        })

        const workflow: PromptWorkflow = NewPromptWorkflow({
            nodes: [
                loadImageNode,
                previewImageNode
            ]
        })

        const workflowDto = mapWorkflowToDtoMapper(workflow)
        expect(workflowDto).toEqual({})
    })
});