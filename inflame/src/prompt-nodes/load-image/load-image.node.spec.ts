import PromptNodeLoadImage, {nodeTypeLoadImage} from "./load-image.node.ts";
import {AbstractPromptNode} from "@inflame/models";

describe('should test node parameters and typings indirectly', function () {
    it('instantiates loadimage node', () => {
        const node = PromptNodeLoadImage({
            id: "1",
            initialState: {
                images: ["test.png"],
                allowUpload: true,
                currentImage: "test.png",
            }
        })
        expect(node.outputs).toEqual({
            image: {
                id: "1",
                kind: "link",
                slot: 0,
            }
        })
        expect(node.inputs).toEqual({
            "choose file to upload": {
                kind: "string",
                value: "image"
            },
            image: {
                kind: "state",
                propertyPath: "currentImage"
            }
        })
        expect(node.state).toEqual({
            currentImage: "test.png",
            allowUpload: true,
            images: ["test.png"],
        })
    })

    it('can map to abstract node and back', () => {
        // Type is correctly set to AbstractPromptNode for testing inline conversion
        const node: AbstractPromptNode = PromptNodeLoadImage({
            id: "1",
            initialState: {
                images: [],
                allowUpload: true,
                currentImage: "test.png",
            }
        })

        if (nodeTypeLoadImage(node)) {
            expect(node.id).toEqual("1");
            expect(node.state.images)
        }
    })
});