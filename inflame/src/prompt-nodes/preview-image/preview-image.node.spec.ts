import {AbstractPromptNode} from "@inflame/models";
import {PromptNodeLoadImage} from "../load-image/load-image.node.ts";
import {nodeTypePreviewImage, PromptNodePreviewImage} from "./preview-image.node.ts";

describe('should test node parameters and typings indirectly', function () {
    it('instantiates previewimage node', () => {
        const externNode = PromptNodeLoadImage({
            id: "2",
            initialState: {
                currentImage: "",
                allowUpload: true,
                images: []
            }
        })

        const node = PromptNodePreviewImage({
            id: "1",
            initialState: {
                images: []
            }
        })

        expect(node.inputs).toEqual({
            images: null
        })

        node.inputs = {
            images: externNode.outputs.image,
        }

        expect(node.inputs).toEqual({
            images: {
                id: "2",
                kind: "link",
                slot: 0
            }
        })

        expect(node.outputs).toEqual({})
    })

    it('can map to abstract node and back', () => {
        const node: AbstractPromptNode = PromptNodePreviewImage({
            id: "1",
            initialState: {
                images: []
            }
        })

        if (nodeTypePreviewImage(node)) {
            expect(node.id).toEqual("1");
        }
    })
});