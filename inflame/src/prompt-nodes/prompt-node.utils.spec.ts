import {
    calculatePathsForObject, replaceNodesInPrompt, updateNodeId,
    updateNodeState
} from "./prompt-node.utils.ts";
import {PromptNodeLoadImage} from "./load-image/load-image.node.ts";
import {PromptNodePreviewImage} from "./preview-image/preview-image.node.ts";
import {PromptWorkflow} from "@inflame/models";

describe('Various utils functions collected applied to prompt nodes', function () {
    it('should calculate state inputs (predefined inside of PromptNodeLoadImage) and put them under inputs', () => {
        const node = PromptNodeLoadImage({
            id: "2",
            initialState: {
                currentImage: "test.png",
                allowUpload: true,
                images: ["test.png", "test-2.png"]
            }
        })

        expect(node.inputs).toEqual({
            "choose file to upload": {
                kind: "string",
                value: "image",
            },
            image: {
                kind: "state",
                propertyPath: "currentImage"
            }
        })
    })

    it('should update state of node', () => {
        const node = PromptNodeLoadImage({
            id: "2",
            initialState: {
                currentImage: "test.png",
                allowUpload: true,
                images: ["test.png", "test-2.png"]
            }
        })

        expect(node).toEqual({
            classtype: "LoadImage",
            id: "2",
            inputs: {
                "choose file to upload": {
                    kind: "string",
                    value: "image"
                },
                image: {
                    kind: "state",
                    propertyPath: "currentImage"
                }
            },
            outputs: {
                image: {
                    id: "2",
                    kind: "link",
                    slot: 0
                }
            },
            state: {
                currentImage: "test.png",
                allowUpload: true,
                images: ["test.png", "test-2.png"]
            }
        })

        const nodeWithNewState = updateNodeState(node, {
            images: [],
            allowUpload: true,
            currentImage: ""
        })

        expect(nodeWithNewState).not.toEqual(node)
        expect(nodeWithNewState).toEqual({
            classtype: "LoadImage",
            id: "2",
            inputs: {
                "choose file to upload": {
                    kind: "string",
                    value: "image"
                },
                image: {
                    kind: "state",
                    propertyPath: "currentImage"
                }
            },
            outputs: {
                image: {
                    id: "2",
                    kind: "link",
                    slot: 0
                }
            },
            state: {
                currentImage: "",
                allowUpload: true,
                images: []
            }
        })
    })

    it('should update ids of simple node that is part of a prompt object', () => {
        const externNode = PromptNodeLoadImage({
            id: "2",
            initialState: {
                currentImage: "test.png",
                allowUpload: true,
                images: ["test.png", "test-2.png"]
            }
        })

        const node = PromptNodePreviewImage({
            id: "1",
            initialState: {
                images: []
            }
        })

        node.inputs = {
            images: externNode.outputs?.image
        }

        expect(externNode).toEqual({
            classtype: "LoadImage",
            id: "2",
            inputs: {
                "choose file to upload": {
                    kind: "string",
                    value: "image"
                },
                image: {
                    kind: "state",
                    propertyPath: "currentImage"
                }
            },
            outputs: {
                image: {
                    id: "2",
                    kind: "link",
                    slot: 0
                }
            },
            state: {
                currentImage: "test.png",
                allowUpload: true,
                images: ["test.png", "test-2.png"]
            }
        })

        expect(node).toEqual(
            {
                classtype: "PreviewImage",
                id: "1",
                inputs: {
                    images: {
                        id: "2",
                        kind: "link",
                        slot: 0
                    }
                },
                outputs: {},
                state: {
                    images: []
                }
            }
        )

        expect(updateNodeId(externNode, "3")).toEqual({
            classtype: "LoadImage",
            id: "3",
            inputs: {
                "choose file to upload": {
                    kind: "string",
                    value: "image"
                },
                image: {
                    kind: "state",
                    propertyPath: "currentImage"
                }
            },
            outputs: {
                image: {
                    id: "3",
                    kind: "link",
                    slot: 0
                }
            },
            state: {
                currentImage: "test.png",
                allowUpload: true,
                images: ["test.png", "test-2.png"]
            }
        })

        expect(node).toEqual(
            {
                classtype: "PreviewImage",
                id: "1",
                inputs: {
                    images: {
                        id: "3",
                        kind: "link",
                        slot: 0
                    }
                },
                outputs: {},
                state: {
                    images: []
                }
            }
        )
    })

    it('should map out paths from complex object', () => {
        const testTree = {
            a: {
                b: {
                    c: 2
                }
            },
            d: {
                e: "test",
            },
            f: true
        }

        expect(calculatePathsForObject(testTree)).toEqual({
            a: {
                b: {
                    c: "a.b.c"
                }
            },
            d: {
                e: "d.e"
            },
            f: "f"
        })
    })

    it('should replace a workflows node', () => {
        const nodeLoadImage = PromptNodeLoadImage({
            id: "1",
            initialState: {
                currentImage: "",
                allowUpload: true,
                images: []
            }
        })

        const nodePreviewImage = PromptNodePreviewImage({
            id: "2",
            initialState: {
                images: []
            }
        })

        const workflow: PromptWorkflow = {
            nodes: [
                nodeLoadImage,
                nodePreviewImage,
            ]
        }

        const newNodePreviewImage = PromptNodePreviewImage({
            id: "2",
            initialState: {
                images: [
                    {
                        filename: "abc.png",
                        path: "",
                        meta: []
                    }
                ]
            }
        })

        expect(workflow.nodes).toEqual([
            nodeLoadImage,
            nodePreviewImage
        ])

        const newWorkflow = replaceNodesInPrompt(workflow, [newNodePreviewImage])

        expect(newWorkflow.nodes).toEqual([
            nodeLoadImage,
            newNodePreviewImage,
        ])
    })
});