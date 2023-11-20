import PromptNodeLoadImage from "./load-image.node.ts";
import PromptNodePreviewImage from "./preview-image.node.ts";
import {AbstractPromptNodeType} from "./prompt-node.ts";

const nodeMap = {
    LoadImage: PromptNodeLoadImage,
    PreviewImage: PromptNodePreviewImage,
} as const

type NodeTypeKeys = keyof typeof nodeMap

/**
 * Narrow down to specific node type's creation function from given nodekey
 */
type NodeTypeCreatorFunction<Key extends NodeTypeKeys> = typeof nodeMap[Key]
/**
 * Parameters of NodeTypeCreatorFunction
 */
type NodeTypeCreatorFunctionParams<Key extends NodeTypeKeys> = Parameters<NodeTypeCreatorFunction<Key>>;


// TODO: do I need this anymore?
/**
 * Given a node's classname, this function returns a function to create it.
 * @param classtype
 */
export const getNodeTypeCreatorFunction = <Classtype extends NodeTypeKeys>(
    classtype: Classtype
): NodeTypeCreatorFunction<Classtype> => {
    if (!classtype) {
        throw new Error(`Classtype "${classtype}" not implemented.`)
    }

    const nodeFunc = nodeMap[classtype]
    if (!nodeFunc) {
        throw new Error(`nodeFactory("${classtype}"): NodeType not implemented!`);
    }
    return nodeFunc
}

export const createNodeFromType = <NodeKey extends NodeTypeKeys>(classtype: NodeKey, ...args: NodeTypeCreatorFunctionParams<NodeKey>): AbstractPromptNodeType => {
    const nodeFunc: (...props: NodeTypeCreatorFunctionParams<NodeKey>) => AbstractPromptNodeType = getNodeTypeCreatorFunction(classtype)
    return nodeFunc(...args)
}