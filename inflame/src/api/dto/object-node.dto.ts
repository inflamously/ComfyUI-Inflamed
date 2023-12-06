export type ObjectNodesDTO = {
    [name: string]: ObjectNodeDTO
} | Array<ObjectNodeDTO>

export type ObjectNodeDTO = {
    input: {
        required: Record<string, unknown>
    },
    output: Array<string>,
    output_is_list: Array<boolean>,
    output_name: Array<string>,
    name: string,
    display_name: string,
    description: string,
    category: string,
    output_node: boolean
}