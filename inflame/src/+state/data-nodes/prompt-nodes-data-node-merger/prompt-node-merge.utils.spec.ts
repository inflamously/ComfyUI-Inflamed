import {AbstractPromptNode} from "../../../prompt-nodes/prompt-node.ts";
import {AbstractDataNode} from "../data-node.model.ts";
import PromptNodeLoadImage from "../../../prompt-nodes/load-image/load-image.node.ts";
import {mergeDataNodeIntoPromptNode} from "./prompt-node-merge.utils.ts";

describe("", () => {
    it('should invoke merge func of given node when class fits datanode', () => {
        const mergePromptDataNodeFunc = jest.fn(
            (node: AbstractPromptNode, dataNode: AbstractDataNode) => {
                node.state.currentImage = dataNode.input.required["currentImage"]
                return node
            }
        );

        const promptNode = PromptNodeLoadImage({
            id: "1",
            initialState: {
                currentImage: "",
                allowUpload: true,
                images: []
            }
        })

        const dataMergedNodes = mergeDataNodeIntoPromptNode([
            promptNode
        ], {
            "LoadImage": {
                input: {
                    required: {
                        currentImage: "test.jpg"
                    }
                },
                name: "LoadImage",
                description: "",
                category: "",
                dependent: false,
                label: "Load Image",
                output: []
            }
        }, {
            "LoadImage": mergePromptDataNodeFunc,
        })

        expect(mergePromptDataNodeFunc).toHaveBeenCalled()
        expect(promptNode.state.currentImage).toEqual("")
        expect(dataMergedNodes[0].state.currentImage).toEqual("test.jpg");
    })
})