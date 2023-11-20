import {createPromptWorkflow} from "./create-prompt-workflow.ts";
import PromptNodeLoadImage, {isPromptNodeLoadImage} from "../prompt-nodes/load-image.node.ts";
import PromptNodePreviewImage, {isPromptNodePreviewImage} from "../prompt-nodes/preview-image.node.ts";

describe('test the creation of a workflow based on nodes', function () {
    it('should create workflow and acquire node', () => {
        const workflow = createPromptWorkflow({
            nodes: [
                PromptNodeLoadImage({
                    id: "1",
                    initialState: {
                        images: ["test.png"],
                        currentImage: "test.png",
                    }
                }),
                PromptNodePreviewImage({
                    id: "2",
                    initialState: {
                        images: []
                    }
                })
            ]
        })

        expect(workflow).toBeDefined()

        const node = workflow.getNode("1", isPromptNodeLoadImage);
        if (node) {
            // Work with specific type
            expect(node.id).toEqual("1")
            // Work with abstract type
            expect(node.getState()).toEqual({
                currentImage: "test.png",
                images: ["test.png"]
            })
        }
    })

    it('should create workflow and acquired type node', () => {
        const workflow = createPromptWorkflow({
            nodes: [
                PromptNodeLoadImage({
                    id: "1",
                    initialState: {
                        images: [],
                        currentImage: "",
                    }
                }),
                PromptNodePreviewImage({
                    id: "2",
                    initialState: {
                        images: []
                    }
                })
            ]
        })

        expect(workflow).toBeDefined()

        expect(() => {
            workflow.getNode("1", isPromptNodePreviewImage)
        }).toThrow()
    })
});