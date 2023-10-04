import NodeLoadImage from "./load-image.node.ts";
import NodePreviewImage from "./preview-image.node.ts";

describe('should test node parameters and typings indirectly', function () {
    it('instantiates previewimage node', () => {
        const externNode = NodeLoadImage({
            id: "2",
        })

        const node = NodePreviewImage({
            id: "1",
        })

        expect(node.getInputs()).toEqual(undefined)
        node.setInputs({
            images: externNode.getOutputs().image
        })

        expect(node.getInputs()).toEqual({
            images: {
                id: "2",
                slot: 0
            }
        })

        expect(node.getOutputs()).toEqual({})
    })
});