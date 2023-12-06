import PromptNodeLoadImage from "./load-image/load-image.node.ts";
import PromptNodePreviewImage from "./preview-image/preview-image.node.ts";

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