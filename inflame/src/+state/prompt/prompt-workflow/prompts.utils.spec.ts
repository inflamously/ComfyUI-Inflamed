import {getNodeFromWorkflow} from "./prompts.utils.ts";
import PromptNodeLoadImage, {nodeTypeLoadImage} from "../prompt-nodes/load-image.node.ts";
import PromptNodePreviewImage, {nodeTypePreviewImage} from "../prompt-nodes/preview-image.node.ts";
import {PromptWorkflow} from "./prompt.model.ts";

describe('test the creation of a workflow based on nodes', function () {
    it('should create workflow and acquire node', () => {
        const workflow: PromptWorkflow = {
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
        }

        expect(workflow).toBeDefined()

        const node = getNodeFromWorkflow(workflow, "1", nodeTypeLoadImage);
        if (node) {
            // Work with specific type
            expect(node.id).toEqual("1")
            // Work with abstract type
            expect(node.state).toEqual({
                currentImage: "test.png",
                images: ["test.png"]
            })
        }
    })

    it('should create workflow and acquired type node', () => {
        const workflow: PromptWorkflow = {
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
        }

        expect(workflow).toBeDefined()

        expect(() => {
            getNodeFromWorkflow(workflow, "1", nodeTypePreviewImage)
        }).toThrow()
    })
});