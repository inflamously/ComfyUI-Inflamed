import {mapObjectNodeDtoToDataNode, mapObjectNodesDtoToDataNodeCollection} from "./object-dto-to-datanode.mapper.ts";
import {
    MOCK_OBJECT_NODE_DTO,
    RESULT_MOCK_ABSTRACT_PROMPT_NODE,
    RESULT_MOCK_DATA_NODE
} from "./mocks/mock-object-node-dto.ts";
import {ObjectNodeDTO} from "@inflame/models";

describe('Mappers for converting API object_info dtos to specific app types', function () {
    let node: ObjectNodeDTO

    beforeEach(() => {
        node = MOCK_OBJECT_NODE_DTO
    })

    it('map object_info node to DataNode', () => {
        expect(mapObjectNodeDtoToDataNode(node)).toEqual(RESULT_MOCK_ABSTRACT_PROMPT_NODE)
    })

    it('map multiple object_info to DataNodeCollection', () => {
        const collection = mapObjectNodesDtoToDataNodeCollection({
            "A": node,
            "B": node
        })
        expect(collection.nodes).toEqual(
            RESULT_MOCK_DATA_NODE
        )
    })

    it('map multiple object_info to DataNodeCollection using an array', () => {
        expect(mapObjectNodesDtoToDataNodeCollection([node, node]).nodes).toEqual(
            RESULT_MOCK_DATA_NODE
        )
    })

        it('allow me to retrieve a specific node with index', () => {
        expect(mapObjectNodesDtoToDataNodeCollection([node, node]).node(0)).toEqual(
            RESULT_MOCK_ABSTRACT_PROMPT_NODE
        )
    })
});