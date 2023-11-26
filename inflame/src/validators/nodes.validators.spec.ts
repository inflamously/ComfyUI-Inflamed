import {noEqualNamesValidator, unsetInputsValidator} from "./nodes.validators.ts";
import {ObjectNodeDTO} from "../api/dto/object-node.dto.ts";
import {MOCK_OBJECT_NODE_DTO} from "../api/mapper/mocks/mock-object-node-dto.ts";
import {createDataNodeCollection} from "../+state/data-nodes/data-node.utils.ts";
import {DataNode} from "../+state/data-nodes/data-node.model.ts";
import PreviewImageNode from "../+state/prompt/prompt-nodes/preview-image.node.ts";

describe('tests various api validators functions', function () {
    let node: ObjectNodeDTO;

    beforeEach(() => {
        node = MOCK_OBJECT_NODE_DTO
    })

    it('should NOT allow multiple object_info nodes with same name', () => {
        expect(noEqualNamesValidator({
            "A": node,
            "B": node,
        })).toEqual(false);

        expect(noEqualNamesValidator(createDataNodeCollection({
            "test": {
                name: "test",
            } as DataNode<unknown>,
            "test2": {
                name: "test"
            } as DataNode<unknown>
        }).nodes)).toEqual(false);
    })

    it('should validate if given nodes where inputs are NOT set is valid', () => {
        const previewImageNode = PreviewImageNode({
            id: "1",
            initialState: {
                images: ["test.png"]
            }
        })

        expect(unsetInputsValidator(previewImageNode)).toEqual(false)
    })

    it('should validate if given nodes where inputs are properly set is valid', () => {
        const previewImageNode = PreviewImageNode({
            id: "1",
            initialState: {
                images: ["test.png"]
            }
        })

        // Hint: Inputs should always by linked using outputs of another node.: Example: <customNode>.outputs.images
        previewImageNode.inputs = {
            images: {
                id: "2",
                kind: "link",
                slot: 0
            }
        }

        expect(unsetInputsValidator(previewImageNode)).toEqual(true)
    })
});