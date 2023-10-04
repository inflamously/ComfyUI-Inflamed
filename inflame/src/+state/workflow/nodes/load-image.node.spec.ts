import NodeLoadImage from "./load-image.node.ts";

describe('should test node parameters and typings indirectly', function () {
    it('instantiates loadimage node', () => {
        const node = NodeLoadImage({
            id: "1"
        })
        expect(node.getOutputs().image).toEqual({
            id: "1",
            slot: 0,
        })
        expect(node.getState()).toEqual(undefined)
        expect(node.getInputs()).toEqual(undefined)
    })
});