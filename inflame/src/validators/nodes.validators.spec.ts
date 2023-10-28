import {noEqualNamesValidator} from "./nodes.validators.ts";
import {ObjectNodeDTO} from "../api/dto/object-node.dto.ts";
import {MOCK_OBJECT_NODE_DTO} from "../api/mapper/mocks/mock-object-node-dto.ts";
import {createDataNodeCollection} from "../+state/data-nodes/data-node.utils.ts";
import {DataNode} from "../+state/data-nodes/data-node.model.ts";

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
});