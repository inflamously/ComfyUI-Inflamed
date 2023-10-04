import {createPromptWorkflow} from "./create-prompt-workflow.ts";
import PromptNodeLoadImage, {isPromptNodeLoadImage} from "../prompt-nodes/load-image.node.ts";
import PromptNodePreviewImage, {isPromptNodePreviewImage} from "../prompt-nodes/preview-image.node.ts";

describe('test the creation of a workflow based on nodes', function () {
    it('should create workflow and acquire node', () => {
        const nodes = [
            PromptNodeLoadImage({
                id: "1",
                initialState: {
                    images: []
                }
            }),
            PromptNodePreviewImage({
                id: "2",
                initialState: {
                    images: []
                }
            })
        ]

        const workflow = createPromptWorkflow({
            nodes
        })

        expect(workflow).toBeDefined()

        const node = workflow.getNode("1", isPromptNodeLoadImage);
        if (node) {
            // Work with specific type
            expect(node.id).toEqual("1")
            // Work with abstract type
            expect(node.state).toEqual({
                images: []
            })
        }
    })

    it('should create workflow and acquired type node', () => {
        const nodes = [
            PromptNodeLoadImage({
                id: "1",
                initialState: {
                    images: []
                }
            }),
            PromptNodePreviewImage({
                id: "2",
                initialState: {
                    images: []
                }
            })
        ]

        const workflow = createPromptWorkflow({
            nodes
        })

        expect(workflow).toBeDefined()

        const node = workflow.getNode("1", isPromptNodePreviewImage);
        if (node) {
            // Work with specific type
            expect(node?.id).toEqual("1")
            // Work with abstract type
            expect(node?.state).toEqual({
                images: []
            })
        }
    })
});