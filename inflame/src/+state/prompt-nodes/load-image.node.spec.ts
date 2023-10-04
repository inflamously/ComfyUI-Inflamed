import PromptNodeLoadImage, {isPromptNodeLoadImage} from "./load-image.node.ts";
import {AbstractPromptNodeType} from "./prompt-node.ts";

describe('should test node parameters and typings indirectly', function () {
    it('instantiates loadimage node', () => {
        const node = PromptNodeLoadImage({
            id: "1",
            initialState: {
                images: ["test.png"]
            }
        })
        expect(node.getOutputs()).toEqual({
            image: {
                id: "1",
                slot: 0,
            }
        })
        expect(node.getInputs()).toEqual(undefined)
        expect(node.state).toEqual({
            images: ["test.png"]
        })
    })

    it('can map to abstract node and back', () => {
        // Type is correctly set to AbstractPromptNode for testing inline conversion
        const node: AbstractPromptNodeType = PromptNodeLoadImage({
            id: "1",
            initialState: {
                images: []
            }
        })

        if (isPromptNodeLoadImage(node)) {
            expect(node.id).toEqual("1");
            expect(node.state?.images)
        }
    })
});