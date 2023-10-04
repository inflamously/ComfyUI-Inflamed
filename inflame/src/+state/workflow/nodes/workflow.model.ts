import {AbstractPromptNode} from "./generic/node.ts";

export type PromptWorkflow = ReturnType<typeof NewPromptWorkflow>

export const NewPromptWorkflow = (props: {
    nodes?: AbstractPromptNode[]
}) => {
    const { nodes } = props
    const __nodes: AbstractPromptNode[] = nodes ?? []

    return {
        getNodes: (): AbstractPromptNode => __nodes,
        getNode: <NodeType>(id: string): NodeType => __nodes.find((node) => node.id === id),
        addNode: (node: AbstractPromptNode) => __nodes.push(node) // TODO: Add validation of ids and such
    }
}