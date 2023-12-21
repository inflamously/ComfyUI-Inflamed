import {AbstractDataNode, ObjectNodeDTO, ObjectNodesDTO} from "@inflame/models";
import {createDataNodeCollection, DataNodeCollection} from "../+state/data-nodes/data-node.utils.ts";
import {noEqualNamesValidator} from "./validators/nodes.validators.ts";


export const mapObjectNodesDtoToDataNodeCollection = (dtoNodes: ObjectNodesDTO): DataNodeCollection => {
    if (!noEqualNamesValidator(dtoNodes)) {
        console.error("Duplicate node!")
    }

    return createDataNodeCollection(
        Object.fromEntries(
            Object.keys(dtoNodes)
                .map((key: string) => (dtoNodes as Record<string, ObjectNodeDTO>)[key])
                .map((n) => mapObjectNodeDtoToDataNode(n))
                .map((n) => [n.name, n])
        )
    )
}

export const mapObjectNodeDtoToDataNode = (node: ObjectNodeDTO): AbstractDataNode => {
    const {
        name,
        display_name: label,
        description,
        category,
        input,
        output_is_list,
        output_name,
        output,
        output_node
    } = node

    return {
        name,
        description,
        category,
        label,
        input,
        dependent: output_node,
        output: output.map((outputType, i) => {
            return {
                type: `${output_is_list[i] ? "ARRAY_" : ""}${outputType}`,
                label: output_name[i]
            }
        })
    }
}