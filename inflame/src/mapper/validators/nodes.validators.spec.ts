import {noEqualNamesValidator, unsetInputsValidator} from "./nodes.validators.ts";
import {MOCK_OBJECT_NODE_DTO} from "../mocks/mock-object-node-dto.ts";
import {createDataNodeCollection} from "../../+state/data-nodes/data-node.utils.ts";
import {DataNode, ObjectNodeDTO} from "@inflame/models";
import {PromptNodePreviewImage} from "../../prompt-nodes/preview-image/preview-image.node.ts";


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
        const previewImageNode = PromptNodePreviewImage({
            id: "1",
            initialState: {
                images: [
                    {
                        path: "",
                        filename: "test.png",
                        meta: []
                    }
                ]
            }
        })

        expect(unsetInputsValidator(previewImageNode)).toEqual(false)
    })

    it('should validate if given nodes where inputs are properly set is valid', () => {
        const previewImageNode = PromptNodePreviewImage({
            id: "1",
            initialState: {
                images: [
                    {
                        path: "",
                        filename: "test.png",
                        meta: []
                    }
                ]
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