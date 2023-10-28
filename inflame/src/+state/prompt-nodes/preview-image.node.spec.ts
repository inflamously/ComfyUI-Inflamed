import PromptNodeLoadImage from "./load-image.node.ts";
import PromptNodePreviewImage, {isPromptNodePreviewImage} from "./preview-image.node.ts";
import {AbstractPromptNodeType} from "./prompt-node.ts";

describe('should test node parameters and typings indirectly', function () {
    it('instantiates previewimage node', () => {
        const externNode = PromptNodeLoadImage({
            id: "2",
            initialState: {
                images: []
            }
        })

        const node = PromptNodePreviewImage({
            id: "1",
            initialState: {
                images: []
            }
        })

        expect(node.getInputs()).toEqual(undefined)

        node.setInputs({
            images: externNode.getOutputs()?.image
        })

        expect(node.getInputs()).toEqual({
            images: {
                id: "2",
                kind: "link",
                slot: 0
            }
        })

        expect(node.getOutputs()).toEqual(undefined)
    })

    it('can map to abstract node and back', () => {
        const node: AbstractPromptNodeType = PromptNodePreviewImage({
            id: "1",
            initialState: {
                images: []
            }
        })

        if (isPromptNodePreviewImage(node)) {
            expect(node.id).toEqual("1");
        }
    })
});