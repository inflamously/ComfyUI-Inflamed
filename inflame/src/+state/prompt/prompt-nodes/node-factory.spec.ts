import {getNodeTypeCreatorFunction} from "./node-factory.ts";

describe('testing out the node factory for creating various nodes', () => {
    it('should create a simple nodes from nodeMap', () => {
        const loadImage = getNodeTypeCreatorFunction("LoadImage")
        const nodeLoadImage = loadImage({
            id: "1",
            initialState: {
                images: [],
                currentImage: ""
            }
        })
        expect(nodeLoadImage?.outputs).toEqual({
            image: {
                id: "1",
                kind: "link",
                slot: 0
            }
        })

        const previewImage = getNodeTypeCreatorFunction("PreviewImage")
        const nodePreviewImage = previewImage({
            id: "1",
            initialState: {
                images: []
            }
        })
        nodePreviewImage.inputs = {
            images: nodeLoadImage?.outputs?.image
        }

        expect(nodePreviewImage?.inputs).toEqual({
            images: {
                id: "1",
                kind: "link",
                slot: 0,
            }
        })
    })
});